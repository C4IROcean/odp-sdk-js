import { Temperature } from "./temperature";
import {
	ODPClient,
	ITimeSeries,
	ITimeSeriesFilter,
	TimeSeriesType,
	UnitType,
	INumberFilter,
	IBoundingBox,
	IGeoFilter,
} from "../";
import {
	DatapointsGetAggregateDatapoint,
	DatapointsGetDatapoint,
	TimeSeriesList,
	AssetList,
	TimeSeriesSearchDTO,
	LatestDataPropertyFilter,
	IdEither,
	DatapointsMultiQueryBase,
	SequenceListScope,
	Sequence,
} from "@cognite/sdk";
import { IDatapointFilter } from "../types/types";
import { cloneDeep } from "lodash";
import { getMRGIDBoundingBox } from "../utils";

/**
 *
 */
export class TimeSeries {
	private _client: ODPClient;
	private _temperature: Temperature;

	constructor(client: ODPClient) {
		this._client = client;
		this.init();
	}

	public get client() {
		return this._client;
	}

	public get temperature() {
		return this._temperature;
	}

	/**
	 * Convert Cognite response to a ODP response
	 */
	public convert = (
		timeseries: TimeSeriesList,
		dataPoints: Array<DatapointsGetAggregateDatapoint> | Array<DatapointsGetDatapoint>,
		assets: AssetList,
	): Array<ITimeSeries> => {
		const returnValue: Array<ITimeSeries> = [];
		for (const dp of dataPoints) {
			const ts = timeseries.find((item) => item.id === dp.id);
			const at = assets.find((item) => item.id === ts.assetId);
			if (dp.datapoints.length > 0) {
				returnValue.push({
					firstTimestamp: dp.datapoints[0].timestamp,
					lastTimestamp: dp.datapoints[dp.datapoints.length - 1].timestamp,
					dataPoints: dp.datapoints,
					location: {
						lat: parseFloat(ts.metadata.geo_lat),
						long: parseFloat(ts.metadata.geo_long),
						depth: parseInt(ts.metadata.geo_dept, 10),
						zoomLevel: parseInt(ts.metadata.geo_key, 10),
					},
					type: TimeSeriesType.TEMPERATURE,
					unit: UnitType.CELSIUS,
					id: ts.id,
					externalId: ts.externalId,
					assetId: at.id,
				});
			}
		}
		return returnValue;
	};

	/**
	 * Convert Cognite response to a ODP response
	 */
	public sequenceConvert = (
		sequences: Array<Sequence>,
		allRows,
		assets: AssetList,
		columns: Array<string>,
	): Array<ITimeSeries> => {
		const returnValue: Array<ITimeSeries> = [];
		const columnIndex: any = this.arrayIndex(columns);
		const firstTimeStamp = allRows[0].items[0][columnIndex.time];
		const lastTimeStamp = allRows[allRows.length - 1].items[0][columnIndex.time];
		const asset = assets ? assets.find((item) => item.id === sequences[0].assetId) : null;

		for (let rowIndex = 0; rowIndex < allRows[0].items.length; rowIndex++) {
			const dataPoints = [];
			// tslint:disable-next-line: prefer-for-of
			for (let allRowIndex = 0; allRowIndex < allRows.length; allRowIndex++) {
				dataPoints.push({
					timestamp: allRows[allRowIndex].items[rowIndex][columnIndex.time],
					value: allRows[allRowIndex].items[rowIndex][columnIndex.temp],
				});
			}
			const obj = {
				firstTimestamp: firstTimeStamp,
				lastTimestamp: lastTimeStamp,
				dataPoints,
				location: {
					lat: parseFloat(allRows[0].items[rowIndex][columnIndex.lat]),
					long: parseFloat(allRows[0].items[rowIndex][columnIndex.long]),
					depth: parseInt(allRows[0].items[rowIndex][columnIndex.depth], 10),
					zoomLevel: 0,
				},
				type: TimeSeriesType.TEMPERATURE,
				unit: UnitType.CELSIUS,
				id: sequences[0].id,
				externalId: sequences[0].externalId,
				assetId: asset ? asset.id : undefined,
			};
			returnValue.push(obj);
		}
		return returnValue;
	};

	/**
	 * Build cognite query from a ODP filter
	 */
	public queryBuilder = async (filter: ITimeSeriesFilter): Promise<Array<TimeSeriesSearchDTO>> => {
		const queries: Array<TimeSeriesSearchDTO> = [];
		const baseQuery: TimeSeriesSearchDTO = {
			filter: {
				unit: filter.unit,
				metadata: {},
			},
			limit: filter.limit ? filter.limit : 100,
		};
		if (filter.zoomLevel) {
			baseQuery.filter.metadata.geo_dec = this.getZoomDecimals(filter.zoomLevel).toString();
		}
		if (filter.time && filter.time.min) {
			baseQuery.filter.lastUpdatedTime = { min: filter.time.min };
		}
		const depths = this.depthExpander(filter.depth);

		if (filter.geoFilter && filter.geoFilter.mrgid) {
			filter.geoFilter.boundingBox = await getMRGIDBoundingBox(filter.geoFilter.mrgid);
		}

		let boundingBoxes = [null];
		if (filter.zoomLevel && filter.zoomLevel > 3) {
			boundingBoxes = this.boundingBoxExpander(filter.geoFilter, filter.zoomLevel);
		}

		const providers = this.providerExpander(filter.provider);

		if (depths.length === 1 && depths[0]) {
			baseQuery.filter.metadata.geo_dept = depths[0];
			depths[0] = null;
		}
		if (boundingBoxes.length === 1 && boundingBoxes[0]) {
			baseQuery.filter.metadata.geo_dept = boundingBoxes[0];
			boundingBoxes[0] = null;
		}
		if (providers.length === 1 && providers[0]) {
			baseQuery.filter.metadata.source = providers[0];
			providers[0] = null;
		}

		for (const depth of depths) {
			let depthClone = baseQuery;
			if (depth) {
				depthClone = cloneDeep(baseQuery);
				depthClone.filter.metadata.depth = depth;
			}
			for (const bb of boundingBoxes) {
				let bbClone = depthClone;
				if (bb) {
					bbClone = cloneDeep(depthClone);
					bbClone.filter.metadata.geo_key = bb;
				}
				for (const provider of providers) {
					let providerClone = bbClone;
					if (provider) {
						providerClone = cloneDeep(bbClone);
						providerClone.filter.metadata.source = provider;
					}
					queries.push(providerClone);
				}
			}
		}
		// debug
		// tslint:disable-next-line: no-console
		console.log("Generated " + queries.length + " queries");
		return queries;
	};

	public sequenceQueryBuilder = (filter: ITimeSeriesFilter) => {
		const sequenceFilter: SequenceListScope = {
			filter: {
				metadata: {
					geo_key_from: "S90_W180",
					geo_key_to: "N90_E180",
					source: filter.provider[0],
				},
			},
			limit: 1000,
		};
		return sequenceFilter;
	};

	public stringToIdExternal = (ids: Array<string>): Array<IdEither> => {
		return ids.map((id) => {
			return { externalId: id };
		});
	};

	public numberToIdInternal = (ids: Array<number>): Array<IdEither> => {
		return ids.map((id) => {
			return { id };
		});
	};

	/**
	 * Build a Cognite datapoint filter from filter
	 */
	public datapointFilter = (filter: IDatapointFilter): DatapointsMultiQueryBase => {
		const datapointFilter: DatapointsMultiQueryBase = {
			limit: filter.limit ? filter.limit : 100,
		};

		if (filter.time) {
			if (filter.time.min) {
				datapointFilter.start = filter.time.min;
			}
			if (filter.time.max) {
				datapointFilter.end = filter.time.max;
			}
		}

		if (
			filter.aggregation &&
			filter.aggregation.aggregationFunctions &&
			filter.aggregation.aggregationFunctions.length > 0
		) {
			datapointFilter.aggregates = filter.aggregation.aggregationFunctions;
			datapointFilter.granularity = filter.aggregation.granularity
				? filter.aggregation.granularity
				: this.defaultGranularity();
		}
		return datapointFilter;
	};

	public datapointLatestFilter = (filter: IDatapointFilter): LatestDataPropertyFilter => {
		const datapointLatestFilter: LatestDataPropertyFilter = {};

		if (filter.time && filter.time.max) {
			datapointLatestFilter.before = filter.time.max;
		}
		return datapointLatestFilter;
	};

	public getSequenceColumns = () => {
		return ["time", "lat", "long", "depth"];
	};

	private depthExpander = (depthFilter: INumberFilter) => {
		const depths = [];
		if (!depthFilter || (!depthFilter.max && !depthFilter.min)) {
			return [null];
		}
		let next = depthFilter.min;
		while (next <= depthFilter.max) {
			depths.push(next);
			if (next < 100) {
				next += 5;
			} else if (next < 500) {
				next += 25;
			} else if (next < 2000) {
				next += 50;
			} else {
				next += 100;
			}
		}
		return depths;
	};

	private arrayIndex = (array) => {
		const ret = {};
		for (let index = 0; index < array.length; index++) {
			ret[array[index]] = index;
		}
		return ret;
	};

	private providerExpander = (providers) => {
		if (!providers || providers.length === 0) {
			return [null];
		}
		return providers;
	};
	private boundingBoxExpander = (geoFilter: IGeoFilter, zoomLevel: number) => {
		if (!geoFilter || !geoFilter.boundingBox || zoomLevel === 0) {
			return [null];
		}
		const boundingBoxFilter: IBoundingBox = geoFilter.boundingBox;
		const geo_key = [];
		const decimals = this.getZoomDecimals(zoomLevel);
		// get bottom left tile
		// N68.000_E12.000
		// Lat = N, Lon = E
		const firstLat = this.nFloor(boundingBoxFilter.bottomLeft.latitude, decimals);
		const firstLon = this.nFloor(boundingBoxFilter.bottomLeft.longitude, decimals);
		const lastLat = this.nFloor(boundingBoxFilter.topRight.latitude, decimals);
		const lastLon = this.nFloor(boundingBoxFilter.topRight.longitude, decimals);
		let currentLat = firstLat;
		let currentLon = firstLon;
		while (currentLat < lastLat) {
			while (currentLon < lastLon) {
				geo_key.push(`N${currentLat.toFixed(decimals)}_E${currentLon.toFixed(decimals)}`);
				currentLon = this.nRound(this.nIncrement(currentLon, decimals), decimals);
			}
			currentLon = firstLon;
			currentLat = this.nRound(this.nIncrement(currentLat, decimals), decimals);
		}

		// TODO need to exclude tiles that don't have any water
		return geo_key;
	};

	private nFloor = (num, decimals) => {
		const a = Math.pow(10, decimals);
		return Math.floor((num + Number.EPSILON) * a) / a;
	};

	private nRound = (num, decimals) => {
		const a = Math.pow(10, decimals);
		return Math.round((num + Number.EPSILON) * a) / a;
	};

	private nIncrement = (num, decimals) => {
		const a = Math.pow(10, decimals);
		return num + 1 / a;
	};
	private defaultGranularity = () => {
		// Set up some auto-magic to choose a fitting granularity
		return "24h";
	};

	private getZoomDecimals = (zoomLevel: number) => {
		if (zoomLevel < 6) {
			return 0;
		} else if (zoomLevel < 8) {
			return 1;
		} else if (zoomLevel < 12) {
			return 2;
		} else if (zoomLevel < 16) {
			return 3;
		} else {
			return 4;
		}
	};

	private init = () => {
		this._temperature = new Temperature(this);
	};
}

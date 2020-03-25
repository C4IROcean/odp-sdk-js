import { Temperature } from "./temperature";
import { ODPClient, ITimeSeries, ITimeSeriesFilter, TimeSeriesType, UnitType, INumberFilter, IBoundingBox } from "../";
import {
	DatapointsGetAggregateDatapoint,
	DatapointsGetDatapoint,
	TimeSeriesList,
	AssetList,
	TimeSeriesSearchDTO,
	LatestDataPropertyFilter,
	IdEither,
	DatapointsMultiQueryBase,
} from "@cognite/sdk";
import { IDatapointFilter } from "../types/types";
import { cloneDeep } from "lodash";

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

			returnValue.push({
				firstTimestamp: dp.datapoints[0].timestamp,
				lastTimestamp: dp.datapoints[dp.datapoints.length - 1].timestamp,
				dataPoints: dp.datapoints,
				location: {
					lat: ts.metadata.geo_lat,
					long: ts.metadata.geo_long,
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
		return returnValue;
	};

	/**
	 * Build cognite query from a ODP filter
	 */
	public queryBuilder = (filter: ITimeSeriesFilter): Array<TimeSeriesSearchDTO> => {
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
		const boundingBoxes = this.boundingBoxExpander(filter.boundingBox, filter.zoomLevel);
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
		return queries;
	};

	public stringToIdEither = (ids: Array<string>): Array<IdEither> => {
		return ids.map((id) => {
			return { externalId: id };
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

	private depthExpander = (depthFilter: INumberFilter) => {
		const depths = [];
		if (!depthFilter || (!depthFilter.max && !depthFilter.min)) {
			return [null];
		}
		for (let index = depthFilter.min; index < depthFilter.max; index += 100) {
			depths.push(index);
		}
		return depths;
	};

	private providerExpander = (providers) => {
		if (!providers || providers.length === 0) {
			return [null];
		}
		return providers;
	};
	private boundingBoxExpander = (boundingBoxFilter: IBoundingBox, zoomLevel: number) => {
		const geo_key = [];
		if (!boundingBoxFilter || zoomLevel === 0) {
			return [null];
		}
		const decimals = this.getZoomDecimals(zoomLevel);
		// get bottom left tile
		// N68.000_E12.000
		// Lat = N, Lon = E
		const firstLat = this.nFloor(boundingBoxFilter.bottomLeft.lat, decimals);
		const firstLon = this.nFloor(boundingBoxFilter.bottomLeft.lon, decimals);
		const lastLat = this.nFloor(boundingBoxFilter.topRight.lat, decimals);
		const lastLon = this.nFloor(boundingBoxFilter.topRight.lon, decimals);
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
		if (zoomLevel < 2) {
			return 0;
		} else if (zoomLevel < 4) {
			return 1;
		} else if (zoomLevel < 8) {
			return 2;
		} else if (zoomLevel < 12) {
			return 3;
		} else {
			return 4;
		}
	};

	private init = () => {
		this._temperature = new Temperature(this);
	};
}

import { Temperature } from "./temperature";
import { ODPClient, ITimeSeries, ITimeSeriesFilter, TimeSeriesType, UnitType, INumberFilter, IBoundingBox } from "../";
import {
	DatapointsGetAggregateDatapoint,
	DatapointsGetDatapoint,
	TimeSeriesList,
	AssetList,
	TimeSeriesSearchDTO,
	DatapointsMultiQueryBase,
	LatestDataPropertyFilter,
	IdEither,
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
		if (depths.length === 1) {
			baseQuery.filter.metadata.geo_dept = depths[0];
		} else if (depths.length > 1) {
			throw new Error("Multiple depths is not supported yet");
		}
		const boundingBoxes = this.boundingBoxExpander(filter.boundingBox, filter.zoomLevel);
		if (boundingBoxes.length === 1) {
			baseQuery.filter.metadata.geo_dept = boundingBoxes[0];
		} else if (boundingBoxes.length > 1) {
			for (const boundingBox of boundingBoxes) {
				const query = cloneDeep(baseQuery);
				query.filter.metadata.geo_key = boundingBox;
				queries.push(query);
			}
		}

		if (filter.provider) {
			if (filter.provider.length === 1) {
				baseQuery.filter.metadata.source = filter.provider[0];
			} else if (filter.provider.length > 1) {
				throw new Error("Multiple providers is not supported yet");
			}
		}

		if (queries.length === 0) {
			queries.push(baseQuery);
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

	public datapointLatestFilter = (filter: ITimeSeriesFilter): LatestDataPropertyFilter => {
		const datapointLatestFilter: LatestDataPropertyFilter = {};

		if (filter.time && filter.time.max) {
			datapointLatestFilter.before = filter.time.max;
		}
		return datapointLatestFilter;
	};

	private depthExpander = (depthFilter: INumberFilter) => {
		if (!depthFilter || (!depthFilter.max && !depthFilter.min)) {
			return [];
		}
	};

	private boundingBoxExpander = (boundingBoxFilter: IBoundingBox, zoomLevel: number) => {
		const geo_key = [];
		if (!boundingBoxFilter || zoomLevel === 0) {
			return geo_key;
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
		while (currentLat <= lastLat) {
			while (currentLon <= lastLon) {
				geo_key.push(`N${currentLat.toFixed(decimals)}_E${currentLon.toFixed(decimals)}`);
				currentLon = this.nIncrement(currentLon, decimals);
			}
			currentLon = firstLon;
			currentLat = this.nIncrement(currentLat, decimals);
		}

		// TODO need to exclude tiles that don't have any water
		return geo_key;
	};

	private nFloor = (num, decimals) => {
		const a = Math.pow(10, decimals);
		return Math.floor((num + Number.EPSILON) * a) / a;
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

import { Temperature } from "./temperature";
import { default as ODPClient } from "../ODPClient";
import {
	DatapointsGetAggregateDatapoint,
	DatapointsGetDatapoint,
	TimeSeriesList,
	AssetList,
	TimeSeriesSearchDTO,
} from "@cognite/sdk";
import * as types from "../types/timeseries";

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
	 * Convert cognite response to a ODP response
	 */
	public convert = (
		timeseries: TimeSeriesList,
		dataPoints: Array<DatapointsGetAggregateDatapoint> | Array<DatapointsGetDatapoint>,
		assets: AssetList,
	): Array<types.ITimeSeries> => {
		const returnValue: Array<types.ITimeSeries> = [];
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
				type: types.TimeSeriesType.TEMPERATURE,
				unit: types.UnitType.CELSIUS,
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
	public queryBuilder = (filter: types.ITimeSeriesFilter): Array<TimeSeriesSearchDTO> => {
		const queries: Array<TimeSeriesSearchDTO> = [];
		const baseQuery: TimeSeriesSearchDTO = {
			filter: {
				unit: filter.unit,
				metadata: {},
			},
			limit: filter.limit ? filter.limit : 100,
		};

		if (filter.depth) {
			baseQuery.filter.metadata.geo_key = filter.zoomLevel.toString();
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
		const boundingBoxes = this.boundingBoxExpander(filter.boundingBox);
		if (boundingBoxes.length === 1) {
			baseQuery.filter.metadata.geo_dept = depths[0];
		} else if (boundingBoxes.length > 1) {
			throw new Error("Multiple bounding boxes is not supported yet");
		}

		if (filter.provider.length === 1) {
			baseQuery.filter.metadata.source = filter.provider[0];
		} else if (filter.provider.length > 1) {
			throw new Error("Multiple providers is not supported yet");
		}

		if (queries.length === 0) {
			queries.push(baseQuery);
		}
		return queries;
	};

	private depthExpander = (depthFilter: types.INumberFilter) => {
		if (!depthFilter || (!depthFilter.max && !depthFilter.min)) {
			return [];
		}
	};

	private boundingBoxExpander = (boundingBoxFilter: types.IBoundingBox) => {
		if (!boundingBoxFilter) {
			return [];
		}
	};
	private init = () => {
		this._temperature = new Temperature(this);
	};
}

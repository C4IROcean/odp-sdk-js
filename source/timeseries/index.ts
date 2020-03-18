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
	 *
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

	public queryBuilder = (filter: types.ITimeSeriesFilter): Array<TimeSeriesSearchDTO> => {
		const queries: Array<TimeSeriesSearchDTO> = [];
		const query: TimeSeriesSearchDTO = {
			filter: {
				unit: filter.unit,
				metadata: {
					geo_key: filter.zoomLevel.toString(),
				},
			},
			limit: filter.limit,
		};

		if (filter.provider) {
			query.filter.metadata.source = filter.provider[0];
		}
		return queries;
	};

	private init = () => {
		this._temperature = new Temperature(this);
	};
}

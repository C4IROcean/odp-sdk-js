import * as types from "../../types/timeseries";
import { default as ODPClient } from "../../ODPClient";

import { TimeSeriesSearchDTO } from "@cognite/sdk";
import { TimeSeries } from "../";

export class Temperature {
	private _client: ODPClient;
	private _timeSeries: TimeSeries;
	constructor(timeSeries: TimeSeries) {
		this._client = timeSeries.client;
		this._timeSeries = timeSeries;
	}

	/**
	 * @param
	 */
	public seaSurface = async (filter: types.ITimeSeriesFilter): Promise<Array<types.ITimeSeries>> => {
		const timeseries = await this._client.cognite.timeseries.search(query);
		const [assets, dataPoints] = await Promise.all([
			timeseries.getAllAssets(),
			timeseries.getAllDatapoints({ limit: 100 }),
		]);
		return this._timeSeries.convert(timeseries, dataPoints, assets);
	};

	/**
	 * Get the latest sea surface temperature for a given location, zoom level and source. Returns a list of ITimeSeries
	 *
	 * @param lat
	 * @param long
	 * @param zoomLevel
	 * @param source
	 */
	public latestSeaSurface = async (lat?, long?, zoomLevel?, source?): Promise<Array<types.ITimeSeries>> => {
		const query: TimeSeriesSearchDTO = {
			filter: {
				unit: "celsius",
				metadata: {
					geo_key: zoomLevel,
				},
			},
			limit: 100,
		};

		if (source) {
			query.filter.metadata.source = source;
		}
		const timeseries = await this._client.cognite.timeseries.search(query);
		const assets = await timeseries.getAllAssets();
		const promises = [];
		for (const ts of timeseries) {
			promises.push(ts.getLatestDatapoints());
		}
		const dataPoints = [];
		for (const dp of await Promise.all(promises)) {
			dataPoints.push(dp[0]);
		}
		return this._timeSeries.convert(timeseries, dataPoints, assets);
	};
}

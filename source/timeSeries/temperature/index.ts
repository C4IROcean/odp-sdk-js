import { ODPClient, ITimeSeriesFilter, ITimeSeries } from "../../";

import { TimeSeries } from "../";

export class Temperature {
	private _client: ODPClient;
	private _timeSeries: TimeSeries;
	constructor(timeSeries: TimeSeries) {
		this._client = timeSeries.client;
		this._timeSeries = timeSeries;
	}

	/**
	 * Get temperature datapoints from timelines that matches the provided filter
	 * @param filter
	 */
	public get = async (filter: ITimeSeriesFilter): Promise<Array<ITimeSeries>> => {
		const queries = this._timeSeries.queryBuilder(filter);
		const timeseries = await this._client.cognite.timeseries.search(queries[0]);
		const [assets, dataPoints] = await Promise.all([
			timeseries.getAllAssets(),
			timeseries.getAllDatapoints({ limit: 100 }),
		]);
		return this._timeSeries.convert(timeseries, dataPoints, assets);
	};

	/**
	 * Get the latest sea surface temperature for a given location, zoom level and source. Returns a list of ITimeSeries
	 * @param filter
	 */
	public getLatest = async (filter: ITimeSeriesFilter): Promise<Array<ITimeSeries>> => {
		const queries = this._timeSeries.queryBuilder(filter);
		const timeseries = await this._client.cognite.timeseries.search(queries[0]);
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

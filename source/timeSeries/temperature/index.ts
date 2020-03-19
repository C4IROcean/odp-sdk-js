import { ODPClient, ITimeSeriesFilter, ITimeSeries } from "../../";
import { TimeSeries } from "../";

/**
 * Class to get all temperature related data from ODP
 */
export class Temperature {
	private _client: ODPClient;
	private _timeSeries: TimeSeries;

	/**
	 * @constructor
	 * @param timeSeries
	 */
	constructor(timeSeries: TimeSeries) {
		this._client = timeSeries.client;
		this._timeSeries = timeSeries;
	}

	/**
	 * Get temperature datapoints from timelines that matches the provided filter. Returns a list of ITimeSeries
	 * @param filter
	 */
	public getAll = async (filter: ITimeSeriesFilter): Promise<Array<ITimeSeries>> => {
		// Get Cognite time series query from filter
		const queries = this._timeSeries.queryBuilder(filter);
		// Get Cognite datapoint filter from filter
		const dataPointFilter = this._timeSeries.datapointFilter(filter);
		// Get time series from Cognite
		const timeseries = await this._client.cognite.timeseries.search(queries[0]);
		// Get assets and datapoints from Cognite
		const [assets, dataPoints] = await Promise.all([
			timeseries.getAllAssets(),
			timeseries.getAllDatapoints(dataPointFilter),
		]);
		// Convert Cognite data to ODP data model
		return this._timeSeries.convert(timeseries, dataPoints, assets);
	};

	/**
	 * Get the latest temperature for timelines that matches the provided filter. Returns a list of ITimeSeries
	 * @param filter
	 */
	public getLatest = async (filter: ITimeSeriesFilter): Promise<Array<ITimeSeries>> => {
		// Get Cognite time series query from filter
		const queries = this._timeSeries.queryBuilder(filter);
		// Get Cognite datapoint filter from filter
		const dataPointLatestFilter = this._timeSeries.datapointLatestFilter(filter);
		// Get time series from Cognite
		const timeseries = await this._client.cognite.timeseries.search(queries[0]);
		// Get assets involved
		const assets = await timeseries.getAllAssets();
		const promises = [];
		for (const ts of timeseries) {
			// Get latest datapoint from each time series
			promises.push(ts.getLatestDatapoints(dataPointLatestFilter));
		}
		const dataPoints = [];
		for (const dp of await Promise.all(promises)) {
			dataPoints.push(dp[0]);
		}
		// Convert Cognite data to ODP data model
		return this._timeSeries.convert(timeseries, dataPoints, assets);
	};
}

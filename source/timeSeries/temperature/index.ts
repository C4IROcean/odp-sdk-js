import { ODPClient, ITimeSeriesFilter, ITimeSeries, IDatapointFilter } from "../../";
import { TimeSeries } from "../";
import { throttleActions } from "../../utils";
import { TimeSeriesList } from "@cognite/sdk";
import { Readable } from "stream";

/**
 * Class to get all temperature related data from ODP
 */
export class Temperature {
	private _client: ODPClient;
	private _timeSeries: TimeSeries;
	private _concurrency = 50;

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
	public getAll = async (filter: ITimeSeriesFilter, stream?: Readable): Promise<Array<ITimeSeries>> => {
		// Get Cognite time series query from filter
		const queries = this._timeSeries.queryBuilder(filter);
		const promises = [];

		for (const query of queries) {
			promises.push(() => this.getSingleTimeSeriesQueryResult(query, filter));
		}
		try {
			const timelines = await throttleActions(promises, this._concurrency, stream);
			return [].concat(...timelines);
		} catch (error) {
			throw error;
		}
	};

	/**
	 * Get the latest temperature for timelines that matches the provided filter. Returns a list of ITimeSeries
	 * @param filter
	 */
	public getLatest = async (filter: ITimeSeriesFilter, stream?: Readable): Promise<Array<ITimeSeries>> => {
		// set filter to get only latest value
		filter.latestValue = true;
		return this.getAll(filter, stream);
	};

	public get = async (externalIds: Array<string>, filter: IDatapointFilter) => {
		const timeseries = await this._client.cognite.timeseries.retrieve(
			this._timeSeries.stringToIdEither(externalIds),
		);
		const dataPointFilter = this._timeSeries.datapointFilter(filter);

		const [assets, dataPoints] = await Promise.all([
			timeseries.getAllAssets(),
			timeseries.getAllDatapoints(dataPointFilter),
		]);
		// Convert Cognite data to ODP data model
		return this._timeSeries.convert(timeseries, dataPoints, assets);
	};

	private getSingleTimeSeriesQueryResult = async (query, filter: ITimeSeriesFilter) => {
		let timeseries: TimeSeriesList;
		let assets;
		let dataPoints;
		try {
			timeseries = await this._client.cognite.timeseries.search(query);
		} catch (error) {
			throw error;
		}
		if (timeseries.length === 0) {
			return [];
		}
		// Get assets from Cognite
		try {
			assets = await timeseries.getAllAssets();
		} catch (error) {
			throw error;
		}
		try {
			const promises = [];

			if (filter.latestValue) {
				const datapointFilter = this._timeSeries.datapointLatestFilter(filter);
				for (const ts of timeseries) {
					// Get latest datapoint from each time series
					promises.push(() => ts.getLatestDatapoints(datapointFilter));
				}
			} else {
				for (const ts of timeseries) {
					// Get all datapoint from each time series (seems to be a bug in the typings)
					promises.push(() => ts.getDatapoints(this._timeSeries.datapointFilter(filter) as any));
				}
			}

			const result = await throttleActions(promises, this._concurrency);
			dataPoints = [].concat(...result);
		} catch (error) {
			throw error;
		}

		// Convert Cognite data to ODP data model
		return this._timeSeries.convert(timeseries, dataPoints, assets);
	};
}

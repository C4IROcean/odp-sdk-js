import { ODPClient, ITimeSeriesFilter, ITimeSeries, IDatapointFilter } from "../../";
import { TimeSeries } from "../";

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
	public getAll = async (filter: ITimeSeriesFilter): Promise<Array<ITimeSeries>> => {
		// Get Cognite time series query from filter
		const queries = this._timeSeries.queryBuilder(filter);
		const promises = [];

		for (const query of queries) {
			promises.push(() => this.getSingleTimeSeries(query, filter));
		}
		try {
			const timelines = await this.throttleActions(promises, this._concurrency);
			return [].concat(...timelines);
		} catch (error) {
			return [];
		}
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

	private getSingleTimeSeries = async (query, filter) => {
		let timeseries;
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
		// Get Cognite datapoint filter from filter
		// const dataPointFilter = this._timeSeries.datapointFilter(filter);
		// Get assets and datapoints from Cognite
		try {
			assets = await timeseries.getAllAssets();
		} catch (error) {
			throw error;
		}
		try {
			const promises = [];
			const dataPointLatestFilter = this._timeSeries.datapointLatestFilter(filter);

			for (const ts of timeseries) {
				// Get latest datapoint from each time series
				promises.push(() => ts.getLatestDatapoints(dataPointLatestFilter));
			}

			const result = await this.throttleActions(promises, this._concurrency);
			dataPoints = [].concat(...result);
		} catch (error) {
			throw error;
		}

		// Convert Cognite data to ODP data model
		return this._timeSeries.convert(timeseries, dataPoints, assets);
	};

	private throttleActions = (listOfCallableActions, limit) => {
		// We'll need to store which is the next promise in the list.
		let i = 0;
		const resultArray = new Array(listOfCallableActions.length);

		// Now define what happens when any of the actions completes. Javascript is
		// (mostly) single-threaded, so only one completion handler will call at a
		// given time. Because we return doNextAction, the Promise chain continues as
		// long as there's an action left in the list.
		function doNextAction() {
			if (i < listOfCallableActions.length) {
				// Save the current value of i, so we can put the result in the right place
				const actionIndex = i++;
				const nextAction = listOfCallableActions[actionIndex];
				return Promise.resolve(nextAction())
					.then((result) => {
						// Save results to the correct array index.
						resultArray[actionIndex] = result;
						return;
					})
					.then(doNextAction);
			}
		}

		// Now start up the original <limit> number of promises.
		// i advances in calls to doNextAction.
		const listOfPromises = [];
		while (i < limit && i < listOfCallableActions.length) {
			listOfPromises.push(doNextAction());
		}
		return Promise.all(listOfPromises).then(() => resultArray);
	};
}

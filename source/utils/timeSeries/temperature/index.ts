import { ODPClient, ITimeSeriesFilter, ITimeSeries, IDatapointFilter } from "../../../";
import { TimeSeries } from "../";
import { throttleActions } from "../../geoUtils";
import { TimeSeriesList, Sequence } from "@cognite/sdk";
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
	public constructor(timeSeries: TimeSeries) {
		this._client = timeSeries.client;
		this._timeSeries = timeSeries;
	}

	/**
	 * Get temperature datapoints from timelines that matches the provided filter. Returns a list of ITimeSeries
	 *
	 * @param filter
	 */
	public getAll = async (filter: ITimeSeriesFilter, stream?: Readable): Promise<Array<ITimeSeries>> => {
		if (!filter.zoomLevel || filter.zoomLevel < 5) {
			return this.getSequenceQueryResult(this._timeSeries.sequenceQueryBuilder(filter), filter, stream);
		} else {
			// Get Cognite time series query from filter
			const queries = await this._timeSeries.queryBuilder(filter);
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
		}
	};

	/**
	 * Get the latest temperature for timelines that matches the provided filter. Returns a list of ITimeSeries
	 *
	 * @param filter
	 */
	public getLatest = async (filter: ITimeSeriesFilter, stream?: Readable): Promise<Array<ITimeSeries>> => {
		// set filter to get only latest value
		filter.latestValue = true;
		return this.getAll(filter, stream);
	};

	public get = async (externalIds: Array<string>, filter: IDatapointFilter) => {
		const timeseries = await this._client.cognite.timeseries.retrieve(
			this._timeSeries.stringToIdExternal(externalIds),
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

	private getSequenceColumns = () => {
		const columns = this._timeSeries.getSequenceColumns();
		columns.push("temp");
		return columns;
	};

	private getSequenceQueryResult = async (query, filter: ITimeSeriesFilter, stream?: Readable) => {
		let sequences: Array<Sequence>;
		let assets;
		const columns = this.getSequenceColumns();
		try {
			sequences = await this._client.cognite.sequences.search(query);
		} catch (error) {
			throw error;
		}
		if (sequences.length === 0) {
			return [];
		}
		sequences.sort((a, b) => (a.metadata.date > b.metadata.date ? 1 : b.metadata.date > a.metadata.date ? -1 : 0));

		if (filter.latestValue) {
			sequences = [sequences[sequences.length - 1]];
		}

		try {
			const ids = sequences.map((s) => s.assetId);
			if (ids.length > 0 && ids[0] !== undefined) {
				assets = await this._client.cognite.assets.retrieve(
					this._timeSeries.numberToIdInternal([...new Set(ids)]),
				);
			}
		} catch (error) {
			throw error;
		}
		const all = [];
		try {
			let response;

			while (true) {
				const q = [];
				for (const sq of sequences) {
					// Get latest datapoint from each time series
					q.push({
						id: sq.id,
						columns,
						limit: 10000,
						cursor: response ? response[q.length].nextCursor : null,
					});
				}
				response = await this.getSequenceRows(q);
				const converted = this._timeSeries.sequenceConvert(sequences, response, assets, columns);
				if (!stream) {
					all.push(...converted);
				} else {
					stream.push(converted);
				}
				if (!response[0].nextCursor) {
					break;
				}
			}
		} catch (error) {
			throw error;
		}
		if (stream) {
			// close stream
			stream.push(null);
		}

		return all;
	};

	private getSequenceRows = (seqRows) => {
		const promises = [];
		for (const seq of seqRows) {
			promises.push(this._client.cognite.sequences.retrieveRows(seq));
		}
		return Promise.all(promises);
	};
}

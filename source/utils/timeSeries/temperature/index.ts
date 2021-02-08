import { ODPClient, ITimeSeriesFilter, ITimeSeries, IDatapointFilter } from "../../../";
import { TimeSeries } from "../";
import { throttleActions } from "../../geoUtils";
import {
	Sequence,
	Timeseries,
	DatapointsMultiQueryBase,
	LatestDataPropertyFilter,
	DatapointsMultiQuery,
} from "@cognite/sdk";
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
			this.getAllAssets(timeseries),
			this.getAllDatapoints(timeseries, dataPointFilter),
		]);
		// Convert Cognite data to ODP data model
		return this._timeSeries.convert(timeseries, dataPoints, assets);
	};

	private getAllAssets = async (timeseries: Array<Timeseries>) => {
		const assetIds = timeseries.flatMap((item) => (item.assetId !== undefined ? { id: item.assetId } : []));
		return this._client.cognite.assets.retrieve(assetIds);
	};

	// NOTE: This is practically the same as getAllDatapoints and shouldn't be used
	private async getDatapoints(timeseries: Timeseries, options?: DatapointsMultiQuery) {
		return this._client.cognite.datapoints.retrieve({
			items: [{ ...options, id: timeseries.id }],
		});
	}

	private getAllDatapoints = async (timeseries: Array<Timeseries>, options: DatapointsMultiQueryBase = {}) =>
		this._client.cognite.datapoints.retrieve({
			items: timeseries.map((ts) => ({ id: ts.id })),
			...options,
		});

	// NOTE: this should take Array<Timeseries> so it matches the Array<Item> query of retrieveLatest
	private getLatestDatapoints = async (timeseries: Timeseries, filter: LatestDataPropertyFilter) =>
		this._client.cognite.datapoints.retrieveLatest([{ ...filter, id: timeseries.id }]);

	private getSingleTimeSeriesQueryResult = async (query, filter: ITimeSeriesFilter) => {
		const timeseries = await this._client.cognite.timeseries.search(query);
		if (timeseries.length === 0) {
			return [];
		}

		const assets = await this.getAllAssets(timeseries);

		const fetchDatapoints = () => {
			if (filter.latestValue) {
				const datapointFilter = this._timeSeries.datapointLatestFilter(filter);
				// Get latest datapoint from each time series
				return timeseries.map((ts) => () => this.getLatestDatapoints(ts, datapointFilter));
			} else {
				const datapointFilter = this._timeSeries.datapointFilter(filter);
				// Get all datapoint from each time series (seems to be a bug in the typings)
				return timeseries.map((ts) => this.getDatapoints(ts, datapointFilter as any));
			}
		};

		const dataPoints = await throttleActions(fetchDatapoints(), this._concurrency);

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

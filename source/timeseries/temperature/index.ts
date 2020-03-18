import { converter } from "../..";
import * as types from "../../types/timeseries";
import { default as ODPClient } from "../../ODPClient";

import { TimeSeriesSearchDTO } from "@cognite/sdk";

export class Temperature {
	private _client;
	constructor(client: ODPClient) {
		this._client = client;
	}

	public seaSurfaceTemperature = async (
		lat?,
		long?,
		zoomLevel = "1",
		timestamp?,
		source?,
	): Promise<Array<types.ITimeSeries>> => {
		const query: TimeSeriesSearchDTO = {
			filter: {
				unit: types.UnitType.CELSIUS,
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
		const [assets, dataPoints] = await Promise.all([
			timeseries.getAllAssets(),
			timeseries.getAllDatapoints({ limit: 100 }),
		]);
		return converter(timeseries, dataPoints, assets);
	};

	/**
	 * Get the latest sea surface temperature for a given location, zoom level and source. Returns a list of ITimeSeries
	 *
	 * @param lat
	 * @param long
	 * @param zoomLevel
	 * @param source
	 */
	public latestSeaSurfaceTemperature = async (
		lat?,
		long?,
		zoomLevel?,
		source?,
	): Promise<Array<types.ITimeSeries>> => {
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
		const timeseries = await this._client.timeseries.search(query);
		const assets = await timeseries.getAllAssets();
		const promises = [];
		for (const ts of timeseries) {
			promises.push(ts.getLatestDatapoints());
		}
		const dataPoints = [];
		for (const dp of await Promise.all(promises)) {
			dataPoints.push(dp[0]);
		}
		return converter(timeseries, dataPoints, assets);
	};
}

import { getClient, converter } from "../../";
import * as types from "../../types/timeseries";
import { TimeSeriesSearchDTO } from "@cognite/sdk";

export const getSeaSurfaceTemperature = async (
	lat,
	long,
	zoomLevel,
	timestamp?,
	source?,
): Promise<Array<types.ITimeSeries>> => {
	const client = getClient();
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
	const timeseries = await client.timeseries.search(query);
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
export const getLatestSeaSurfaceTemperature = async (
	lat,
	long,
	zoomLevel,
	source?,
): Promise<Array<types.ITimeSeries>> => {
	const client = getClient();
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
	const timeseries = await client.timeseries.search(query);
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

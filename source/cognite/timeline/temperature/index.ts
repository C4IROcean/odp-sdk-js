import { getClient, converter } from "../../";
import * as types from "../../../types/timeseries";
import { TimeSeriesSearchDTO } from "@cognite/sdk";

export const getSeaSurfaceTemperature = async (
	lat,
	long,
	zoomLevel,
	timestamp,
	source,
): Promise<Array<types.ITimeSeries>> => {
	const client = getClient();
	const query: TimeSeriesSearchDTO = {
		filter: {
			unit: "celsius",
			metadata: {
				source: "simulated",
			},
		},
		limit: 100,
	};
	const timeseries = await client.timeseries.search(query);
	const dataPoints = await timeseries.getAllDatapoints({ limit: 1 });
	return converter(timeseries, dataPoints);
};

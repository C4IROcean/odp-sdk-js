import * as types from "../types/timeseries";
import { DatapointsGetAggregateDatapoint, DatapointsGetDatapoint, TimeSeriesList } from "@cognite/sdk";

export const converter = (
	timeseries: TimeSeriesList,
	dataPoints: Array<DatapointsGetAggregateDatapoint> | Array<DatapointsGetDatapoint>,
): Array<types.ITimeSeries> => {
	const returnValue: Array<types.ITimeSeries> = [];
	for (const dp of dataPoints) {
		const ts = timeseries.find((item) => item.id === dp.id);
		returnValue.push({
			firstTimestamp: dp.datapoints[0].timestamp,
			lastTimestamp: dp.datapoints[dp.datapoints.length - 1].timestamp,
			dataPoints: dp.datapoints,
			location: {
				lat: ts.metadata.geo_lat,
				long: ts.metadata.geo_long,
				depth: parseInt(ts.metadata.geo_dept, 10),
			},
			type: types.TimeSeriesType.TEMPERATURE,
			unit: types.UnitType.CELSIUS,
		});
	}
	return returnValue;
};

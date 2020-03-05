export interface ITimeSeries {
	type: TimeSeriesType;
	unit: UnitType;
	location: {
		long: string;
		lat: string;
		depth: number;
	};
	lastTimestamp: Date;
	firstTimestamp: Date;
	dataPoints: Array<any>;
}

export interface IDataPoints {
	value: number;
	timestamp: Date;
}

export enum TimeSeriesType {
	TEMPERATURE = "temperature",
}

export enum UnitType {
	CELSIUS = "celsius",
}

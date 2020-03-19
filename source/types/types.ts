import { Aggregate, GetAggregateDatapoint, GetStringDatapoint, GetDoubleDatapoint } from "@cognite/sdk";

export interface ITimeSeries {
	type: TimeSeriesType;
	unit: UnitType;
	id: number;
	externalId: string;
	assetId: number;
	location: {
		long: string;
		lat: string;
		depth: number;
		zoomLevel: number;
	};
	lastTimestamp: Date;
	firstTimestamp: Date;
	dataPoints: Array<GetAggregateDatapoint> | Array<GetStringDatapoint> | Array<GetDoubleDatapoint>;
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

export enum ZoomLevel {
	_1 = 1,
	_2 = 2,
	_3 = 3,
	_4 = 4,
	_5 = 5,
}

export interface IBoundingBox {
	topLeft: IGeoLocation;
	bottomRight: IGeoLocation;
}

export interface IGeoLocation {
	lat: number;
	lan: number;
}

export interface INumberFilter {
	min?: number;
	max?: number;
}

export interface ITimeFilter {
	min?: Date;
	max?: Date;
}

export interface IAggregation {
	aggregationFunctions: Array<Aggregate>;
	granularity: string;
}

export interface IDatapointFilter {
	time?: ITimeFilter;
	aggregation?: IAggregation;
	limit?: number;
}
export interface ITimeSeriesFilter extends IDatapointFilter {
	unit: UnitType;
	boundingBox?: IBoundingBox;
	depth?: INumberFilter;
	zoomLevel?: ZoomLevel;
	provider?: Array<string>;
}

export interface IAssetsFilter {
	externalId?: Array<string>;
}

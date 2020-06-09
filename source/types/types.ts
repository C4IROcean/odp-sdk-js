import { Aggregate, GetAggregateDatapoint, GetStringDatapoint, GetDoubleDatapoint, Metadata } from "@cognite/sdk";

export { GetStringDatapoint, GetDoubleDatapoint, GetAggregateDatapoint };

export interface ITimeSeries {
	type: TimeSeriesType;
	unit: UnitType;
	id: number;
	externalId: string;
	assetId: number;
	location: {
		long: number;
		lat: number;
		depth: number;
		zoomLevel: number;
	};
	lastTimestamp: Date;
	firstTimestamp: Date;
	dataPoints: Array<GetAggregateDatapoint> | Array<GetStringDatapoint> | Array<GetDoubleDatapoint>;
}

export interface ISequence {
	location: {
		long: number;
		lat: number;
		depth?: number;
	};
	cruise?: {
		country: string;
		id: string;
		vesselName: string;
	};
	id: number;
	externalId: string;
	time?: number;
}

export interface ISequenceRow extends ISequence {
	value: {
		temperature?: number;
		count?: number;
		name?: string;
		salinity?: number;
		oxygen?: number;
		phosphate?: number;
		silicate?: number;
		nitrate?: number;
		nitrite?: number;
		ph?: number;
		chlorophyll?: number;
		pressure?: number;
	};
	rowNumber: number;
}

export interface IDataPoints {
	value: number;
	timestamp: Date;
}

export enum TimeSeriesType {
	TEMPERATURE = "temperature",
}

export enum SequenceType {
	ALL = "all",
	COUNT = "count",
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
	bottomLeft: IGeoLocation;
	topRight: IGeoLocation;
}

export interface IGeoLocation {
	lat: number;
	lon: number;
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

export interface IGeoFilter {
	boundingBox?: IBoundingBox;
	polygon?: Array<IGeoLocation>;
	mrgid?: number;
}

export interface IDatapointFilter {
	time?: ITimeFilter;
	aggregation?: IAggregation;
	limit?: number;
	latestValue?: boolean;
}
export interface ITimeSeriesFilter extends IDatapointFilter {
	unit: UnitType;
	geoFilter?: IGeoFilter;
	depth?: INumberFilter;
	zoomLevel?: ZoomLevel; // mapbox zoom levels 0 (the earth) - 22 (very close)
	provider?: Array<string>;
}

export interface IAssetsFilter {
	externalId?: Array<string>;
}

export interface ICogniteGeo extends Metadata {
	geo_key?: string;
}

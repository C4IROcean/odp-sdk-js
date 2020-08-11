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
		country?: string;
		id?: string;
		vesselName?: string;
	};
	id: number;
	externalId: string;
	time?: number;
}

export interface ISequenceRow extends ISequence {
	value: ISequenceRowValue;
	rowNumber: number;
}

export interface ISequenceRowValue {
	temperature?: INumberValue;
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
	externalId?: string;
	castId?: number;
	cruiseId?: string;
	countryCode?: string;
	latitudeMax?: number;
	latitudeMin?: number;
	longitudeMax?: number;
	longitudeMin?: number;
	pressureMax?: number;
	pressureMin?: number;
	temperatureMax?: number;
	temperatureMin?: number;
	depth?: number;
}

export interface INumberValue {
	value: number;
	flags?: any;
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

export enum SequenceColumnType {
	TEMPERATURE = "temperature",
	COUNT = "cast_count",
	NAME = "name",
	SALINITY = "salinity",
	OXYGEN = "oxygen",
	PHOSPHATE = "phosphate",
	SILICATE = "silicate",
	NITRATE = "nitrate",
	NITRITE = "nitrite",
	PH = "pH",
	CHLOROPHYLL = "chlorophyll",
	PRESSURE = "pressure",
	DATE = "date",
	LATITUDE = "latitude",
	LONGITUDE = "longitude",
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
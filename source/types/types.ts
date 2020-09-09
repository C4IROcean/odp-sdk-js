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
	unit;
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

export enum ObservedLevelFlag {
	ACCEPTED_VALUE = 0,
	RANGE_OUTLIER = 1,
	FAILED_INVERSION_CHECK = 2,
	FAILED_GRADIENT_CHECK = 3,
	OBSERVED_LEVEL_BULLSEYE_FLAG_AND_ZERO_GRADIENT_CHECK = 4,
	COMBINED_GRADIENT_AND_INVERSION_CHECKS = 5,
	FAILED_RANGE_AND_INVERSION_CHECKS = 6,
	FAILED_RANGE_AND_GRADIENT_CHECKS = 7,
	FAILED_RANGE_AND_QUESTIONABLE_DATA_CHECKS = 8,
	FAILED_RANGE_AND_COMBINED_GRADIENT_AND_INVERSION_CHECKS = 9,
}

export enum StandardLevelFlag {
	ACCEPTED_VALUE = 0,
	BULLSEYE_MARKER = 1,
	DENSITY_INVERSION = 2,
	FAILED_ANNUAL_STANDARD_DEVIATION_CHECK = 3,
	FAILED_SEASONAL_STANDARD_DEVIATION_CHECK = 4,
	FAILED_MONTHLY_STANDARD_DEVIATION_CHECK = 5,
	FAILED_ANNUAL_AND_SEASONAL_STANDARD_DEVIATION_CHECK = 6,
	FAILED_ANNUAL_AND_MONTHLY_STANDARD_DEVIATION_CHECK = 7,
	FAILED_SEASONAL_AND_MONTHLY_STANDARD_DEVIATION_CHECK = 8,
	FAILED_ANNUAL_SEASONAL_AND_MONTHLY_STANDARD_DEVIATION_CHECK_ = 9,
}

export enum Unit {
	TEMPERATURE = "degree_C",
	COUNT = "",
	DEPTH = "m",
	SALINITY = "",
	OXYGEN = "umol/kg",
	PHOSPHATE = "",
	SILICATE = "",
	NITRATE = "µmol/kg",
	NITRITE = "",
	PH = "",
	CHLOROPHYLL = "ugram/l",
	PRESSURE = "dbar",
	LATITUDE = "degrees_north",
	LONGITUDE = "degrees_east",
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
	latitude: number;
	longitude: number;
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
	location?: IGeoLocation;
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

export interface ICastFilter {
	time?: ITimeFilter;
	year?: number;
	geoFilter?: IGeoFilter;
	depth?: INumberFilter;
	columns?: Array<SequenceColumnType>;
	castId?: string;
	provider?: Array<string>;
	quality?: ObservedLevelFlag | Array<ObservedLevelFlag>;
}

export interface IAssetsFilter {
	externalId?: Array<string>;
}

export interface ICogniteGeo extends Metadata {
	geo_key?: string;
}

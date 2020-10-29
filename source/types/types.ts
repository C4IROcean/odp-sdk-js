import { Aggregate, GetAggregateDatapoint, GetStringDatapoint, GetDoubleDatapoint, Metadata } from "@cognite/sdk";

export { GetStringDatapoint, GetDoubleDatapoint, GetAggregateDatapoint };

export interface ITimeSeries {
	type: TimeSeriesTypeEnum;
	unit: UnitTypeEnum;
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

export interface ICast {
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
	time?: Date;
	metadata?: {
		date?: string;
		country?: string;
		Conventions?: string;
		Platform?: string;
		references?: string;
		prefix?: string;
		castYear?: string;
		real_time?: string;
		z_first?: string;
		standard_name_vocabulary?: string;
		project?: string;
		Salinity_last?: string;
		Orig_Stat_Num?: string;
		source?: string;
		Temperature_last?: string;
		institution?: string;
		creator_email?: string;
		id?: string;
		originators_cruise_identifier?: string;
		lat?: string;
		level?: string;
		CDF_extIdFile?: string;
		z_last?: string;
		equipment?: string;
		geo_index?: string;
		geo_key?: string;
		publisher_url?: string;
		Access_no?: string;
		Temperature_first?: string;
		GMT_time?: string;
		parent_seq_name?: string;
		naming_authority?: string;
		lon?: string;
		title?: string;
		dataset_code?: string;
		WOD_cruise_identifier?: string;
		publisher_email?: string;
		cdm_data_type?: string;
		featureType?: string;
		WOD_cruise_name?: string;
		summary?: string;
		dbase_orig?: string;
		publisher_name?: string;
		date_created?: string;
		Recorder?: string;
		Salinity_first?: string;
		geo_long?: string;
		wod_unique_cast?: string;
		date_modified?: string;
		geo_lat?: string;
		castSize?: string;
		creator_name?: string;
		time?: string;
		creator_url?: string;
		dataset?: string;
	};
}

export interface ICastRow extends ICast {
	value: ICastRowValue;
	rowNumber: number;
}

export interface ICastRowValue {
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

export enum TimeSeriesTypeEnum {
	TEMPERATURE = "temperature",
}

export enum CastTypeEnum {
	ALL = "all",
	COUNT = "count",
}

export enum UnitTypeEnum {
	CELSIUS = "celsius",
}

export enum CastColumnTypeEnum {
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

export enum ObservedLevelFlagEnum {
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

export enum StandardLevelFlagEnum {
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

export enum UnitEnum {
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

export enum ProviderEnum {
	WOD = "wod",
	AUV_NTNU = "auv_ntnu",
	AUV_SINTEF = "auv_sintef",
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
	min: Date;
	max: Date;
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
	unit: UnitTypeEnum;
	geoFilter?: IGeoFilter;
	depth?: INumberFilter;
	zoomLevel?: number; // mapbox zoom levels 0 (the earth) - 22 (very close)
	provider?: Array<string>;
}

export interface ICastFilter {
	time?: ITimeFilter;
	year?: number;
	geoFilter?: IGeoFilter;
	depth?: INumberFilter;
	columns?: Array<CastColumnTypeEnum>;
	castId?: string;
	providers?: Array<ProviderEnum>;
	quality?: ObservedLevelFlagEnum | Array<ObservedLevelFlagEnum>;
}

export interface IAssetsFilter {
	externalId?: Array<string>;
}

export interface ICogniteGeo extends Metadata {
	geo_key?: string;
}

export interface IMarineRegion {
	name?: string;
	parentId?: number;
	parentExternalId?: string;
	id: number;
	externalId: string;
	source?: string;
	polygon?: Array<IGeoLocation>;
	metadata?: any;
}

export interface IMarineRegionType {
	name: string;
	parentId?: number;
	parentExternalId?: string;
	id: number;
	externalId: string;
	source: string;
}

export enum DataSources {
	MapboxVectorTile = "vnd.mapbox-vector-tile",
}

export enum Filters {
	Depth = "depth",
	Time = "time",
}

export enum OdpDataAccessSolutions {
	ODE = "ODE",
	ODC = "ODC",
}

export const DATA_PRODUCTS_META: IDataProductMeta[] = [];

export const DATA_LAYERS: IDataLayer[] = [];

export const DATA_PRODUCTS_TAGS_INDEX: string[] = [
	"iho sea",
	"bathymetry",
	"biodiversity",
	"world register of marine species",
	"marine regions - world marine heritage sites",
	"salinity",
	"ocean biodiversity information system",
	"gridded",
	"summaries",
	"ctd",
	"marine species",
	"atlas",
	"ocean salinity",
	"climatological distributions",
	"alkalinity",
	"world ocean atlas 2018 temperature",
	"gebco gridded bathymetry data",
	"offshore wind - proposals for study areas",
	"ocean",
	"norway power lines",
	"world ocean atlas 2018 nutrients",
	"phosphate",
	"marine regions - world eez",
	"world ocean database",
	"study areas",
	"offshore wind power",
	"taxa",
	"analyses",
	"ocean oxygen",
	"world ocean atlas 2018 oxygen",
	"energy",
	"network system",
	"eez",
	"species",
	"profile",
	"biogeochemistry",
	"nitrate",
	"xbt",
	"global",
	"boundaries",
	"argo",
	"region",
	"ocean nutrients",
	"terrain",
	"nutrients",
	"temperature",
	"seabed",
	"ocean temperature",
	"marine regions - intersect eez iho sea",
	"pressure",
	"ph",
	"overhead lines",
	"chemistry",
	"physical",
	"marine regions - iho sea areas",
	"world ocean atlas 2018 salinity",
	"marine regions - eez land union",
	"silicate",
	"oxygen",
	"chlorophyll",
];
export interface IDataProductExtendedMainInfo {
	uuid: string;
	name: string;
	tags: string[];
	provider: string[];
	providerAcronym: string[];
	creator: string;
	databaseDescription: string;
	accessType: "public" | "private";
	timespan: number[];
	availableIn: OdpDataAccessSolutions[];
}
export interface IDataProductMeta extends IDataProductExtendedMainInfo {
	citation: string;
	contact: string;
	dateCreated: string;
	dateUpdated: string;
	tableDescription: string;
	format: string;
	homepage: string;
	language: string;
	license: string;
	managedBy: string;
	publisher: string;
	subject: string;
	source: string;
	dataType: string;
	usageExamples: string;
	boundingBox: number[];
	doi: string;
}

export interface IDataProductResult {
	dataProductResult: IDataProductExtendedMainInfo;
	dataLayers: IDataLayerMain[];
}

export interface IDataLayerMain {
	id: number;
	name: string;
	dataProductUuid: string;
}
export interface IDataLayer extends IDataLayerMain {
	dateCreated: string;
	dateUpdated: string;
	sourceUrl: string;
	sourceType: DataSources;
	layerType: IMapboxLayerType;
	filter: Filters[];
	unit: string;
	unit_abbr: string;
	explorerStyling: IDataProductStyling;
}

export interface IDataProduct {
	dataProduct: IDataProductMeta;
	layers: IDataLayerMain[];
}

export interface IDataProductStyling {
	type?: "circle" | "line" | "fill";
	color?: string;
	strokeColor?: string;
	strokeWidth?: number;
	circleRadius?: number;
	opacity?: number;
	lineStyle?: "dashed";
}

export type IMapboxLayerType =
	| "fill"
	| "line"
	| "symbol"
	| "circle"
	| "heatmap"
	| "fill-extrusion"
	| "raster"
	| "hillshade"
	| "background";

export const ODP_DATAMESH_BASE_URL: string = "https://mesh.dev.oceandata.xyz/catalog/v1";
export const ODP_DATAHUB_GRAPHQL_ENDPOINT: string = "https://catalog.dev.oceandata.xyz/api/gms";
export const ODP_BACKEND_TOKEN_SCOPE: string[] = ["https://oceandataplatform.onmicrosoft.com/odp-backend/ODP_ACCESS"];

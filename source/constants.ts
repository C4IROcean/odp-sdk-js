enum OdpDataAccessSolutions {
	ODP = "ODP",
	ODC = "ODC",
}
export interface IDataProductMainInfo {
	uuid: string;
	name: string;
	tags: string[];
}
export interface IDataProductExtendedMainInfo extends IDataProductMainInfo {
	provider: string[];
	providerAcronym: string[];
	creator: string;
	databaseDescription: string;
	accessType: "public" | "private";
	timespan: string[];
	availableIn: OdpDataAccessSolutions[];
	layers: IDataLayerMain[];
}
export interface IDataProductMeta extends IDataProductExtendedMainInfo {
	citaton: string;
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
	boundingBox: string[];
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
	explorerStyling: IDataProductStyling;
}

export interface IDataProduct {
	dataProduct: IDataProductMeta;
	layers: IDataLayer[];
}

export enum Filters {
	Depth = "depth",
	Time = "time",
}

export enum DataSources {
	MapboxVectorTile = "vnd.mapbox-vector-tile",
}

export interface IDataProductStyling {
	dataProductId: string;
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
export const ODP_DATAHUB_TOKEN_SCOPE: string[] = ["https://oceandataplatform.onmicrosoft.com/odp-backend/ODP_ACCESS"];

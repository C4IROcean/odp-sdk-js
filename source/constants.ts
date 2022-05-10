export enum DataSources {
	MapboxVectorTile = "vnd.mapbox-vector-tile",
}

export enum Filters {
	Depth = "depth",
	Time = "time",
}

enum OdpDataAccessSolutions {
	ODE = "ODE",
	ODC = "ODC",
}

export const DATA_PRODUCTS_META: IDataProductMeta[] = [
	{
		name: "World Ocean Database",
		provider: ["National Oceanic and Atmospheric Administration", "National Centers for Environmental Information"],
		providerAcronym: ["NOAA", "NCEI"],
		citation:
			"Boyer, T.P., O.K. Baranova, C. Coleman, H.E. Garcia, A. Grodsky, R.A. Locarnini, A.V. Mishonov, C.R. Paver, J.R. Reagan, D. Seidov, I.V. Smolyar, K. Weathers, M.M. Zweng,(2018): World Ocean Database 2018. A.V. Mishonov, Technical Ed., NOAA Atlas NESDIS 87.",
		contact: "NCEI.Info@noaa.gov",
		creator: "NOAA National Centers for Enfvironmental Information",
		dateCreated: null,
		dateUpdated: null,
		databaseDescription:
			"The World Ocean Database (WOD) is world's largest collection of uniformly formatted, quality controlled, publicly available ocean profile data. It is a powerful tool for oceanographic, climatic, and environmental research, and the end result of more than 20 years of coordinated efforts to incorporate data from institutions, agencies, individual researchers, and data recovery initiatives into a single database.",
		tableDescription: null,
		format: null,
		homepage: "https://www.ncei.noaa.gov/products/world-ocean-database",
		language: "English",
		license: "The World Ocean Database and World Ocean Atlas are available for public use without restriction.",
		managedBy: "NOAA National Centers for Environmental Information",
		publisher: "NOAA National Centers for Environmental Information",
		subject: "global ocean variables",
		source: null,
		accessType: "public",
		dataType: "geospatial",
		tags: [
			"temperature",
			"salinity",
			"oxygen",
			"nutrients",
			"pressure",
			"nitrate,ph",
			"chlorophyll",
			"alkalinity",
			"phosphate",
			"silicate",
			"biogeochemistry",
			"pressure",
			"physical",
			"chemistry",
			"profile",
			"CTD",
			"XBT",
			"Argo",
		],
		timespan: [1770, 2022],
		usageExamples: null,
		boundingBox: [-90, -180, 90, 180],
		availableIn: [OdpDataAccessSolutions.ODC, OdpDataAccessSolutions.ODE],
		doi: null,
		uuid: "3b9d00ec-2ede-4946-b105-df010d273c63",
	},
];

export const DATA_LAYERS: IDataLayer[] = [
	{
		id: 0,
		name: "World Ocean Database Salinity",
		dataProductUuid: "3b9d00ec-2ede-4946-b105-df010d273c63",
		dateCreated: "2022-01-26T00:00:00",
		dateUpdated: "2022-01-26T00:00:00",
		sourceUrl: "mapbox://oceandatafoundation.salinity_aggregates",
		sourceType: DataSources.MapboxVectorTile,
		layerType: "circle",
		filter: [Filters.Time, Filters.Depth],
		unit: null,
		unit_abbr: null,
		explorerStyling: { color: "#58FCD4", circleRadius: 3, strokeWidth: 1, strokeColor: "#ffffff" },
	},
	{
		id: 1,
		name: "World Ocean Database Temperature",
		dataProductUuid: "3b9d00ec-2ede-4946-b105-df010d273c63",
		dateCreated: "2022-03-10T00:00:00",
		dateUpdated: "2022-03-10T00:00:00",
		sourceUrl: "mapbox://oceandatafoundation.1nze98kc",
		sourceType: DataSources.MapboxVectorTile,
		layerType: "circle",
		filter: [Filters.Time, Filters.Depth],
		unit: "Celsius",
		unit_abbr: "C",
		explorerStyling: { color: "#ff69a2", circleRadius: 3, strokeWidth: 1, strokeColor: "#ffffff" },
	},
	{
		id: 2,
		name: "World Ocean Database Pressure",
		dataProductUuid: "3b9d00ec-2ede-4946-b105-df010d273c63",
		dateCreated: "2022-01-26T00:00:00",
		dateUpdated: "2022-01-26T00:00:00",
		sourceUrl: "mapbox://oceandatafoundation.pressure_aggregates",
		sourceType: DataSources.MapboxVectorTile,
		layerType: "circle",
		filter: [Filters.Time, Filters.Depth],
		unit: "Decibar",
		unit_abbr: null,
		explorerStyling: { color: "#EBB931", circleRadius: 3, strokeWidth: 1, strokeColor: "#ffffff" },
	},
	{
		id: 3,
		name: "World Ocean Database Oxygen",
		dataProductUuid: "3b9d00ec-2ede-4946-b105-df010d273c63",
		dateCreated: "2022-01-26T00:00:00",
		dateUpdated: "2022-01-26T00:00:00",
		sourceUrl: "mapbox://oceandatafoundation.oxygen_aggregates",
		sourceType: DataSources.MapboxVectorTile,
		layerType: "circle",
		filter: [Filters.Time, Filters.Depth],
		unit: "Micromole per kilogram ",
		unit_abbr: "\u00b5mol/kg",
		explorerStyling: { color: "#E7862E", circleRadius: 3, strokeWidth: 1, strokeColor: "#ffffff" },
	},
	{
		id: 4,
		name: "World Ocean Database Nitrate",
		dataProductUuid: "3b9d00ec-2ede-4946-b105-df010d273c63",
		dateCreated: "2022-01-26T00:00:00",
		dateUpdated: "2022-01-26T00:00:00",
		sourceUrl: "mapbox://oceandatafoundation.nitrate_aggregates",
		sourceType: DataSources.MapboxVectorTile,
		layerType: "circle",
		filter: [Filters.Time, Filters.Depth],
		unit: "Micromole per kilogram ",
		unit_abbr: "\u00b5mol/kg",
		explorerStyling: { color: "#555BE3", circleRadius: 3, strokeWidth: 1, strokeColor: "#ffffff" },
	},
	{
		id: 5,
		name: "World Ocean Database ph",
		dataProductUuid: "3b9d00ec-2ede-4946-b105-df010d273c63",
		dateCreated: "2022-01-26T00:00:00",
		dateUpdated: "2022-01-26T00:00:00",
		sourceUrl: "mapbox://oceandatafoundation.ph_aggregates",
		sourceType: DataSources.MapboxVectorTile,
		layerType: "circle",
		filter: [Filters.Time, Filters.Depth],
		unit: null,
		unit_abbr: null,
		explorerStyling: { color: "#FE9FE4", circleRadius: 3, strokeWidth: 1, strokeColor: "#ffffff" },
	},
	{
		id: 6,
		name: "World Ocean Database chlorophyll",
		dataProductUuid: "3b9d00ec-2ede-4946-b105-df010d273c63",
		dateCreated: "2022-01-26T00:00:00",
		dateUpdated: "2022-01-26T00:00:00",
		sourceUrl: "mapbox://oceandatafoundation.chlorophyll_aggregates",
		sourceType: DataSources.MapboxVectorTile,
		layerType: "circle",
		filter: [Filters.Time, Filters.Depth],
		unit: "Microgram per liter",
		unit_abbr: "\u00b5g/l",
		explorerStyling: { color: "#78C35E", circleRadius: 3, strokeWidth: 1, strokeColor: "#ffffff" },
	},
	{
		id: 7,
		name: "World Ocean Database Alkalinity",
		dataProductUuid: "3b9d00ec-2ede-4946-b105-df010d273c63",
		dateCreated: "2022-01-26T00:00:00",
		dateUpdated: "2022-01-26T00:00:00",
		sourceUrl: "mapbox://oceandatafoundation.alkalinity_aggregates",
		sourceType: DataSources.MapboxVectorTile,
		layerType: "circle",
		filter: [Filters.Time, Filters.Depth],
		unit: "Milli-equivalent per liter",
		unit_abbr: "meq/l",
		explorerStyling: { color: "#0E8484", circleRadius: 3, strokeWidth: 1, strokeColor: "#ffffff" },
	},
	{
		id: 8,
		name: "World Ocean Database Phosphate",
		dataProductUuid: "3b9d00ec-2ede-4946-b105-df010d273c63",
		dateCreated: "2022-01-26T00:00:00",
		dateUpdated: "2022-01-26T00:00:00",
		sourceUrl: "mapbox://oceandatafoundation.phosphate_aggregates",
		sourceType: DataSources.MapboxVectorTile,
		layerType: "circle",
		filter: [Filters.Time, Filters.Depth],
		unit: "Micromole per kilogram ",
		unit_abbr: "\u00b5mol/kg",
		explorerStyling: { color: "#2DB7F1", circleRadius: 3, strokeWidth: 1, strokeColor: "#ffffff" },
	},
	{
		id: 9,
		name: "World Ocean Database Silicate",
		dataProductUuid: "3b9d00ec-2ede-4946-b105-df010d273c63",
		dateCreated: "2022-01-26T00:00:00",
		dateUpdated: "2022-01-26T00:00:00",
		sourceUrl: "mapbox://oceandatafoundation.silicate_aggregates",
		sourceType: DataSources.MapboxVectorTile,
		layerType: "circle",
		filter: [Filters.Time, Filters.Depth],
		unit: "Micromole per kilogram ",
		unit_abbr: "\u00b5mol/kg",
		explorerStyling: { color: "#FB6299", circleRadius: 3, strokeWidth: 1, strokeColor: "#ffffff" },
	},
	{
		id: 10,
		name: "Norwegian windfarms",
		dataProductUuid: "1bba9c89-44b3-42cf-91ad-db0f8822ff33",
		dateCreated: "2021-12-08T00:00:00",
		dateUpdated: "2021-12-08T00:00:00",
		sourceUrl: "mapbox://oceandatafoundation.6nk4oxtx",
		sourceType: DataSources.MapboxVectorTile,
		layerType: "fill",
		filter: null,
		unit: null,
		unit_abbr: null,
		explorerStyling: { color: "#98D5A8", opacity: 0.5 },
	},
	{
		id: 11,
		name: "Marine regions EEZ",
		dataProductUuid: "1da84b40-be1a-4d9c-a352-7e9cb1ccc99b",
		dateCreated: "2021-11-26T00:00:00",
		dateUpdated: "2021-11-26T00:00:00",
		sourceUrl: "mapbox://oceandatafoundation.382xxha1",
		sourceType: DataSources.MapboxVectorTile,
		layerType: "line",
		filter: null,
		unit: null,
		unit_abbr: null,
		explorerStyling: { color: "#16BFF4", strokeWidth: 1, lineStyle: "dashed" },
	},
	{
		id: 12,
		name: "Seacables",
		dataProductUuid: "c1a6d28e-b7a8-42bf-8a1f-faed97e3b5da",
		dateCreated: "2021-12-02T00:00:00",
		dateUpdated: "2021-12-02T00:00:00",
		sourceUrl: "mapbox://oceandatafoundation.bz79mnos",
		sourceType: DataSources.MapboxVectorTile,
		layerType: "line",
		filter: null,
		unit: null,
		unit_abbr: null,
		explorerStyling: { color: "#8CA5EC", strokeWidth: 1, opacity: 0.5 },
	},
];

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

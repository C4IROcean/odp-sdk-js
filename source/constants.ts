/* eslint-disable max-len */
import { IMetadata } from "./Catalog/Connectors/DataHubClient";

export enum Filters {
	Depth = "depth",
	Time = "time",
}

export enum DataSources {
	MapboxVectorTile = "vnd.mapbox-vector-tile",
}

export type IDataProduct = IDataType & IDataProductPart;

// For now we only have mapbox data types, but this could be come a union if we have more types
export type IDataType = IMapboxDataType;

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
interface IDataProductPart {
	name: string;
	description: string;
	unit?: string;
	source: string;
	id: string;
	sourceUrl: string;
	tags: string[];
	filters?: Filters[];
	provider: string;
	providerAcronym: string;
}

interface IMapboxDataType {
	sourceType: DataSources.MapboxVectorTile;
	layerType: IMapboxLayerType;
}

import { IDataProductStyling } from "./DataProductStylingClient";

export const DATA_PRODUCTS: IDataProduct[] = [
	{
		name: "salinity",
		description: "this is the salinity",
		source: "mapbox",
		id: "wod-salinity-aggregates",
		sourceUrl: "mapbox://oceandatafoundation.salinity_aggregates",
		tags: ["WOD", "salinity"],
		sourceType: DataSources.MapboxVectorTile,
		layerType: "circle",
		filters: [Filters.Depth, Filters.Time],
		provider: "WOD",
		providerAcronym: "NOAA",
	},
	{
		name: "temperature",
		description: "this is the temp",
		source: "mapbox",
		id: "wod-temperature-year-aggregates",
		sourceUrl: "mapbox://oceandatafoundation.1nze98kc",
		tags: ["WOD", "temperature"],
		sourceType: DataSources.MapboxVectorTile,
		layerType: "circle",
		filters: [Filters.Depth],
		unit: "°C",
		provider: "WOD",
		providerAcronym: "NOAA",
	},
	{
		name: "pressure",
		description: "this is the pressure",
		source: "mapbox",
		id: "wod-pressure-aggregates",
		sourceUrl: "mapbox://oceandatafoundation.pressure_aggregates",
		tags: ["WOD", "pressure"],
		sourceType: DataSources.MapboxVectorTile,
		layerType: "circle",
		filters: [Filters.Depth, Filters.Time],
		unit: "N/A",
		provider: "WOD",
		providerAcronym: "NOAA",
	},
	{
		name: "oxygen",
		description: "this is the oxygen",
		source: "mapbox",
		id: "wod-oxygen-aggregates",
		sourceUrl: "mapbox://oceandatafoundation.oxygen_aggregates",
		tags: ["WOD", "oxygen"],
		sourceType: DataSources.MapboxVectorTile,
		layerType: "circle",
		filters: [Filters.Depth, Filters.Time],
		unit: "ml/l",
		provider: "WOD",
		providerAcronym: "NOAA",
	},
	{
		name: "nitrate",
		description: "this is the nitrate",
		source: "mapbox",
		id: "wod-nitrate-aggregates",
		sourceUrl: "mapbox://oceandatafoundation.nitrate_aggregates",
		tags: ["WOD", "nitrate"],
		sourceType: DataSources.MapboxVectorTile,
		layerType: "circle",
		filters: [Filters.Depth, Filters.Time],
		unit: "µmol/l",
		provider: "WOD",
		providerAcronym: "NOAA",
	},
	{
		name: "ph",
		description: "this is the ph",
		source: "mapbox",
		id: "wod-ph-aggregates",
		sourceUrl: "mapbox://oceandatafoundation.ph_aggregates",
		tags: ["WOD", "ph"],
		sourceType: DataSources.MapboxVectorTile,
		layerType: "circle",
		filters: [Filters.Depth, Filters.Time],
		unit: "µmol/l",
		provider: "WOD",
		providerAcronym: "NOAA",
	},
	{
		name: "chlorophyll",
		description: "this is the chlorophyll",
		source: "mapbox",
		id: "wod-chlorophyll-aggregates",
		sourceUrl: "mapbox://oceandatafoundation.chlorophyll_aggregates",
		tags: ["WOD", "chlorophyll"],
		sourceType: DataSources.MapboxVectorTile,
		layerType: "circle",
		filters: [Filters.Depth, Filters.Time],
		unit: "N/A",
		provider: "WOD",
		providerAcronym: "NOAA",
	},
	{
		name: "alkalinity",
		description: "this is the alkalinity",
		source: "mapbox",
		id: "wod-alkalinity-aggregates",
		sourceUrl: "mapbox://oceandatafoundation.alkalinity_aggregates",
		tags: ["WOD", "alkalinity"],
		sourceType: DataSources.MapboxVectorTile,
		layerType: "circle",
		filters: [Filters.Depth, Filters.Time],
		unit: "N/A",
		provider: "WOD",
		providerAcronym: "NOAA",
	},
	{
		name: "phosphate",
		description: "this is the phosphate",
		source: "mapbox",
		id: "wod-phosphate-aggregates",
		sourceUrl: "mapbox://oceandatafoundation.phosphate_aggregates",
		tags: ["WOD", "phosphate"],
		sourceType: DataSources.MapboxVectorTile,
		layerType: "circle",
		filters: [Filters.Depth, Filters.Time],
		unit: "N/A",
		provider: "WOD",
		providerAcronym: "NOAA",
	},
	{
		name: "silicate",
		description: "this is the silicate",
		source: "mapbox",
		id: "wod-silicate-aggregates",
		sourceUrl: "mapbox://oceandatafoundation.silicate_aggregates",
		tags: ["WOD", "silicate"],
		sourceType: DataSources.MapboxVectorTile,
		layerType: "circle",
		filters: [Filters.Depth, Filters.Time],
		unit: "N/A",
		provider: "WOD",
		providerAcronym: "NOAA",
	},
	{
		name: "windfarms",
		description: "these are the windfarms",
		source: "mapbox",
		id: "norwegian-windfarms",
		sourceUrl: "mapbox://oceandatafoundation.6nk4oxtx",
		layerType: "fill",
		tags: ["windfarms", "norway"],
		sourceType: DataSources.MapboxVectorTile,
		provider: "Havvind",
		providerAcronym: "Windfarms owner",
	},
	{
		name: "seacables",
		description: "these are the seacables",
		source: "mapbox",
		id: "norwegian-seacables",
		sourceUrl: "mapbox://oceandatafoundation.bz79mnos",
		layerType: "line",
		tags: ["seacables", "norway"],
		sourceType: DataSources.MapboxVectorTile,
		provider: "Seacables domain",
		providerAcronym: "Seacables owner",
	},
	{
		name: "economic zones",
		description: "these are the economic zones",
		source: "mapbox",
		id: "economic-zones",
		sourceUrl: "mapbox://oceandatafoundation.382xxha1",
		layerType: "line",
		tags: ["economic zones", "eez"],
		sourceType: DataSources.MapboxVectorTile,
		provider: "Economic zones domain",
		providerAcronym: "EEZ owner",
	},
];

export const STYLING_DATA_PRODUCTS: IDataProductStyling[] = [
	{
		dataProductId: "wod-salinity-aggregates",
		type: "circle",
		color: "#58FCD4",
		circleRadius: 3,
		strokeWidth: 1,
		strokeColor: "#ffffff",
	},
	{
		dataProductId: "wod-temperature-year-aggregates",
		type: "circle",
		color: "#ff69a2",
		circleRadius: 3,
		strokeWidth: 1,
		strokeColor: "#ffffff",
	},
	{
		dataProductId: "wod-pressure-aggregates",
		type: "circle",
		color: "#EBB931",
		circleRadius: 3,
		strokeWidth: 1,
		strokeColor: "#ffffff",
	},
	{
		dataProductId: "wod-oxygen-aggregates",
		type: "circle",
		color: "#E7862E",
		circleRadius: 3,
		strokeWidth: 1,
		strokeColor: "#ffffff",
	},
	{
		dataProductId: "wod-nitrate-aggregates",
		type: "circle",
		color: "#555BE3",
		circleRadius: 3,
		strokeWidth: 1,
		strokeColor: "#ffffff",
	},
	{
		dataProductId: "wod-ph-aggregates",
		type: "circle",
		color: "#FE9FE4",
		circleRadius: 3,
		strokeWidth: 1,
		strokeColor: "#ffffff",
	},
	{
		dataProductId: "wod-chlorophyll-aggregates",
		type: "circle",
		color: "#78C35E",
		circleRadius: 3,
		strokeWidth: 1,
		strokeColor: "#ffffff",
	},
	{
		dataProductId: "wod-alkalinity-aggregates",
		type: "circle",
		color: "#0E8484",
		circleRadius: 3,
		strokeWidth: 1,
		strokeColor: "#ffffff",
	},
	{
		dataProductId: "wod-phosphate-aggregates",
		type: "circle",
		color: "#2DB7F1",
		circleRadius: 3,
		strokeWidth: 1,
		strokeColor: "#ffffff",
	},
	{
		dataProductId: "wod-silicate-aggregates",
		type: "circle",
		color: "#FB6299",
		circleRadius: 3,
		strokeWidth: 1,
		strokeColor: "#ffffff",
	},
	{
		dataProductId: "norwegian-windfarms",
		type: "fill",
		color: "#98D5A8",
		opacity: 0.5,
	},
	{
		dataProductId: "norwegian-seacables",
		type: "line",
		color: "#8CA5EC",
		strokeWidth: 1,
		opacity: 0.5,
	},
	{
		dataProductId: "economic-zones",
		type: "line",
		color: "#16BFF4",
		strokeWidth: 1,
		lineStyle: "dashed",
	},
];

export const METADATA_DATA_PRODUCTS: IMetadata[] = [
	{
		dataProductId: "wod-salinity-aggregates",
		name: "Salinity",
		source: "NOAA",
		tags: ["NOAA", "WOD"],
		description:
			"Salinity technically measures the saltiness of seawater which is a function of dissolved inorganic materials. It directly affects the density of water which in turn influences ocean circulation. Many organisms can only live within certain ranges of salinity. Salinity also reveals information about the world's freshwater cycle.",
		boundingBox: [-90, -180, 90, 180],
		timeSpan: ["1770", "2020"],
		citation: ["NOAA", "test citation"],
	},
	{
		dataProductId: "wod-temperature-year-aggregates",
		name: "Temperature",
		source: "NOAA",
		tags: ["NOAA", "WOD"],
		description:
			"Temperature is direct measure of how climate is affecting the ocean. Temperature influences biological, chemical, and even meteorological processes.",
		boundingBox: [-90, -180, 90, 180],
		timeSpan: ["1770", "2020"],
		citation: ["NOAA", "test citation"],
	},
	{
		dataProductId: "wod-pressure-aggregates",
		name: "Pressure",
		source: "NOAA",
		tags: ["NOAA", "WOD"],
		description: "The pressure",
		boundingBox: [-90, -180, 90, 180],
		timeSpan: ["1770", "2020"],
		citation: ["NOAA", "test citation"],
	},
	{
		dataProductId: "wod-oxygen-aggregates",
		name: "Oxygen",
		source: "NOAA",
		tags: ["NOAA", "WOD"],
		description:
			"Oxygen is the most important gas in the sea, as it is necessary for all higher forms of life. Surface water is usually saturated with oxygen, absorbed from the atmosphere and produced by photosynthesis from marine plants.",
		boundingBox: [-90, -180, 90, 180],
		timeSpan: ["1770", "2020"],
		citation: ["NOAA", "test citation"],
	},
	{
		dataProductId: "wod-nitrate-aggregates",
		name: "Nitrate",
		source: "NOAA",
		tags: ["NOAA", "WOD"],
		description:
			"Nitrate (NO3)  in the ocean, is the end product of decomposition of organic nitrogen. It is the main nitrogenous compound utilized by primary producers in the ocean and is a major nutrient required for photosynthesis – its scarcity limits the amount of photosynthesis that can take place.",
		boundingBox: [-90, -180, 90, 180],
		timeSpan: ["1770", "2020"],
		citation: ["NOAA", "test citation"],
	},
	{
		dataProductId: "wod-ph-aggregates",
		name: "Ph",
		source: "NOAA",
		tags: ["NOAA", "WOD"],
		description:
			"Ocean pH is a measure of how acidic or basic the ocean is. The pH of the ocean varies as a result of natural processes and can be influenced by temperature, fresh water run-off, upwellings, and increased carbon dioxide in the atmosphere. Many organisms are sensitive to the decline in ocean pH driven by increased atmospheric carbon dioxide. ",
		boundingBox: [-90, -180, 90, 180],
		timeSpan: ["1770", "2020"],
		citation: ["NOAA", "test citation"],
	},
	{
		dataProductId: "wod-chlorophyll-aggregates",
		name: "Chlorophyll",
		source: "NOAA",
		tags: ["NOAA", "WOD"],
		description: "Description Chlorophyll",
		boundingBox: [-90, -180, 90, 180],
		timeSpan: ["1770", "2020"],
		citation: ["NOAA", "test citation"],
	},
	{
		dataProductId: "wod-alkalinity-aggregates",
		name: "Alkalinity",
		source: "NOAA",
		tags: ["NOAA", "WOD"],
		description: "Description Alkalinity",
		boundingBox: [-90, -180, 90, 180],
		timeSpan: ["1770", "2020"],
		citation: ["NOAA", "test citation"],
	},
	{
		dataProductId: "wod-phosphate-aggregates",
		name: "Phosphate",
		source: "NOAA",
		tags: ["NOAA", "WOD"],
		description: "Description Phosphate",
		boundingBox: [-90, -180, 90, 180],
		timeSpan: ["1770", "2020"],
		citation: ["NOAA", "test citation"],
	},
	{
		dataProductId: "wod-silicate-aggregates",
		name: "Silicate",
		source: "NOAA",
		tags: ["NOAA", "WOD"],
		description: "https://en.wikipedia.org/wiki/Silicate",
		boundingBox: [-90, -180, 90, 180],
		timeSpan: ["1770", "2020"],
		citation: ["NOAA", "test citation"],
	},
	{
		dataProductId: "norwegian-windfarms",
		name: "Norwegian Windfarms",
		source: "Unknown",
		tags: [],
		description: "None added...",
		boundingBox: [-90, -180, 90, 180],
		timeSpan: [],
		citation: ["test citation"],
	},
	{
		dataProductId: "norwegian-seacables",
		name: "Norwegian Seacables",
		source: "Unknown",
		tags: [],
		description: "None added...",
		boundingBox: [-90, -180, 90, 180],
		timeSpan: [],
		citation: ["test citation"],
	},
	{
		dataProductId: "economic-zones",
		name: "Economic zones",
		source: "Unknown",
		tags: [],
		description: "None added...",
		boundingBox: [-90, -180, 90, 180],
		timeSpan: [],
		citation: ["test citation"],
	},
];

export const ODP_DATAMESH_BASE_URL: string = "http://localhost:8787";
export const ODP_DATAHUB_GRAPHQL_ENDPOINT: string = "https://catalog.dev.oceandata.xyz/api/gms";
export const ODP_DATAHUB_TOKEN_SCOPE: string = "https://oceandataplatform.onmicrosoft.com/odp-backend/ODP_ACCESS";

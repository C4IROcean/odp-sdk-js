import { Auth } from "./auth";

interface IDataHubClientOptions {
	auth: Auth;
}

export interface IMetadata {
	name: string;
	source: string;
	tags: Array<string>;
	description: string;
	boundingBox: Array<number>;
	timeSpan: Array<string>;
	citation: Array<string>;
}

enum Filters {
	Depth = "depth",
	Time = "time",
}
export interface ISearchResult {
	name: string;
	description: string;
	unit?: string;
	source: string;
	id: string;
	sourceUrl: string;
	tags: Array<string>;
	dataType: string;
	filters?: Array<Filters>;
}

enum DataSources {
	MapboxVectorTile = "vnd.mapbox-vector-tile",
}

export default class DataHubClient {
	private _auth: Auth;
	private _graphQlEndpoint: string;
	private _tokenScope: string;

	public constructor(options: IDataHubClientOptions) {
		this._auth = options.auth;
		this._graphQlEndpoint = "https://catalog.dev.oceandata.xyz/api/gms";
		this._tokenScope = "https://oceandataplatform.onmicrosoft.com/odp-backend/ODP_ACCESS";
	}

	public searchFullText = async (type: "DATASET", searchString: string) => {
		// In the future we will request this from datahub instead of the hardcoded object.
		// const token = await this._getToken();
		// this._searchFullTextWithAuth(type, searchString, token);
		return hardcodedDataSources.filter(
			(source) =>
				source.tags.find((tag) => tag.includes(searchString)) ||
				source.name.includes(searchString) ||
				source.id.includes(searchString),
		);
	};

	public autocompleteResults = async (searchString: string) => {
		return this._getToken().then((token) => this._autocompleteResultsWithAuth(searchString, token));
	};

	public getDataSetByUrn = async (urn: string) => {
		return this._getToken().then((token) => this._getDatasetByUrnWithAuth(urn, token));
	};

	public getTagsWithUrn = async (urn: string) => {
		return this._getToken().then((token) => this._getTagsWithUrnWithAuth(urn, token));
	};

	private _getDatasetByUrnWithAuth = async (urn: string, token: string) => {
		return fetch(this._graphQlEndpoint, {
			method: "POST",
			headers: {
				authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({
				query: `
				{
					dataset(urn: "${urn}")
					{
					  urn
					  type
					  properties {
						name
						origin
						description
						externalUrl
					  }
					  ownership {
						lastModified {
						  time
						  actor
						}
					  }
					  domain {
						id
					  }
					}	
				  }
				`,
			}),
		}).then((r) => r.json());
	};

	// private _searchFullTextWithAuth = async (type: "DATASET", searchString: string, token: string) => {
	// 	fetch(this._graphQlEndpoint, {
	// 		method: "POST",
	// 		headers: {
	// 			authorization: `Bearer ${token}`,
	// 			"Content-Type": "application/json",
	// 			Accept: "application/json",
	// 		},
	// 		body: JSON.stringify({
	// 			query: `
	// 			{
	// 				search(input: { type: ${type}, query: "${searchString}", start: 0, count: 10 }) {
	// 				start
	// 				count
	// 				total
	// 				searchResults {
	// 					entity {
	// 					urn
	// 					type
	// 					...on Dataset {
	// 						name
	// 					}
	// 					}
	// 				}
	// 				}
	// 			}
	// 		`,
	// 		}),
	// 	}).then((r) => r.json());
	// };

	private _autocompleteResultsWithAuth = async (searchString: string, token: string) => {
		return fetch(this._graphQlEndpoint, {
			method: "POST",
			headers: {
				authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({
				query: `
				{
					autoComplete(input: { type: DATASET, query: "${searchString}", limit: 10 }) {
						suggestions 
					}
    			}
			`,
			}),
		}).then((r) => r.json());
	};

	private _getTagsWithUrnWithAuth = async (urn: string, token: string) => {
		return fetch(this._graphQlEndpoint, {
			method: "POST",
			headers: {
				authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({
				query: `
				query {
					dataset(urn: "urn:li:dataset:(urn:li:dataPlatform:hdfs,SampleHdfsDataset,PROD)") {
					  tags {
						tags {
						  tag {
							name
						  }
						}
					  }
					}
				  }
			`,
			}),
		}).then((r) => r.json());
	};

	private _getToken = async () => {
		const account = this._auth.getMsalInstance().getAllAccounts()[0];

		const request = {
			account,
			scopes: [this._tokenScope],
		};

		return new Promise<string>((resolve, reject) => {
			this._auth
				.getMsalInstance()
				.acquireTokenSilent(request)
				.then((res) => {
					if (res.accessToken) {
						resolve(res.accessToken);
					} else {
						reject(new Error("No token acquired..."));
					}
				});
		});
	};
}

const hardcodedDataSources: Array<ISearchResult> = [
	{
		name: "temperature",
		description: "this is the temp",
		source: "mapbox",
		id: "wod-temperature-year-aggregates",
		sourceUrl: "mapbox://oceandatafoundation.1nze98kc",
		tags: ["WOD", "temperature"],
		dataType: DataSources.MapboxVectorTile,
		filters: [Filters.Depth],
		unit: "°C",
	},
	{
		name: "pressure",
		description: "this is the pressure",
		source: "mapbox",
		id: "wod-pressure-aggregates",
		sourceUrl: "mapbox://oceandatafoundation.pressure_aggregates",
		tags: ["WOD", "pressure"],
		dataType: DataSources.MapboxVectorTile,
		filters: [Filters.Depth, Filters.Time],
		unit: "N/A",
	},
	{
		name: "oxygen",
		description: "this is the oxygen",
		source: "mapbox",
		id: "wod-oxygen-aggregates",
		sourceUrl: "mapbox://oceandatafoundation.oxygen_aggregates",
		tags: ["WOD", "oxygen"],
		dataType: DataSources.MapboxVectorTile,
		filters: [Filters.Depth, Filters.Time],
		unit: "ml/l",
	},
	{
		name: "nitrage",
		description: "this is the nitrate",
		source: "mapbox",
		id: "wod-nitrate-aggregates",
		sourceUrl: "mapbox://oceandatafoundation.nitrate_aggregates",
		tags: ["WOD", "nitrate"],
		dataType: DataSources.MapboxVectorTile,
		filters: [Filters.Depth, Filters.Time],
		unit: "µmol/l",
	},
	{
		name: "ph",
		description: "this is the ph",
		source: "mapbox",
		id: "wod-ph-aggregates",
		sourceUrl: "mapbox://oceandatafoundation.ph_aggregates",
		tags: ["WOD", "ph"],
		dataType: DataSources.MapboxVectorTile,
		filters: [Filters.Depth, Filters.Time],
		unit: "µmol/l",
	},
	{
		name: "chlorophyll",
		description: "this is the chlorophyll",
		source: "mapbox",
		id: "wod-chlorophyll-aggregates",
		sourceUrl: "mapbox://oceandatafoundation.chlorophyll_aggregates",
		tags: ["WOD", "chlorophyll"],
		dataType: DataSources.MapboxVectorTile,
		filters: [Filters.Depth, Filters.Time],
		unit: "N/A",
	},
	{
		name: "alkalinity",
		description: "this is the alkalinity",
		source: "mapbox",
		id: "wod-alkalinity-aggregates",
		sourceUrl: "mapbox://oceandatafoundation.alkalinity_aggregates",
		tags: ["WOD", "alkalinity"],
		dataType: DataSources.MapboxVectorTile,
		filters: [Filters.Depth, Filters.Time],
		unit: "N/A",
	},
	{
		name: "phosphate",
		description: "this is the phosphate",
		source: "mapbox",
		id: "wod-phosphate-aggregates",
		sourceUrl: "mapbox://oceandatafoundation.phosphate_aggregates",
		tags: ["WOD", "phosphate"],
		dataType: DataSources.MapboxVectorTile,
		filters: [Filters.Depth, Filters.Time],
		unit: "N/A",
	},
	{
		name: "silicate",
		description: "this is the silicate",
		source: "mapbox",
		id: "wod-silicate-aggregates",
		sourceUrl: "mapbox://oceandatafoundation.silicate_aggregates",
		tags: ["WOD", "silicate"],
		dataType: DataSources.MapboxVectorTile,
		filters: [Filters.Depth, Filters.Time],
		unit: "N/A",
	},
	{
		name: "windfarms",
		description: "these are the windfarms",
		source: "mapbox",
		id: "norwegian-windfarms",
		sourceUrl: "mapbox://oceandatafoundation.6nk4oxtx",
		tags: ["windfarms", "norway"],
		dataType: DataSources.MapboxVectorTile,
	},
	{
		name: "seacables",
		description: "these are the seacables",
		source: "mapbox",
		id: "norwegian-seacables",
		sourceUrl: "mapbox://oceandatafoundation.bz79mnos",
		tags: ["seacables", "norway"],
		dataType: DataSources.MapboxVectorTile,
	},
	{
		name: "economic zones",
		description: "these are the economic zones",
		source: "mapbox",
		id: "economic-zones",
		sourceUrl: "mapbox://oceandatafoundation.382xxha1",
		tags: ["economic zones", "eez"],
		dataType: DataSources.MapboxVectorTile,
	},
];

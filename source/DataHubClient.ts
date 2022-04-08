import { Auth } from "./auth";
import { DATA_SOURCES, METADATA_DATA_SOURCES } from "./constants";

interface IDataHubClientOptions {
	auth: Auth;
	graphQlEndpoint?: string;
	datahubTokenScope?: string;
}

export interface IMetadata {
	dataSourceId: string;
	name: string;
	source: string;
	tags: string[];
	description: string;
	boundingBox: number[];
	timeSpan: string[];
	citation: string[];
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

	public getMetadataForDataSetById = (dataSourceId: string): IMetadata => {
		return METADATA_DATA_SOURCES.find((source) => source.dataSourceId === dataSourceId);
	};

	public searchFullText = async (type: "DATASET", searchString: string) => {
		// In the future we will request this from datahub instead of the hardcoded object.
		// const token = await this._getToken();
		// this._searchFullTextWithAuth(type, searchString, token);
		return DATA_SOURCES.filter(
			(source) =>
				source.tags.find((tag) => tag.toLowerCase().includes(searchString.toLowerCase())) ||
				source.name.toLowerCase().includes(searchString.toLowerCase()) ||
				source.description.toLowerCase().includes(searchString.toLowerCase()) ||
				source.id.toLowerCase().includes(searchString.toLowerCase()),
		);
	};

	public autocompleteResults = async (searchString: string): Promise<string[]> => {
		// return this._getToken().then((token) => this._autocompleteResultsWithAuth(searchString, token));
		return DATA_SOURCES.filter(
			(source) =>
				source.tags.find((tag) => tag.toLowerCase().includes(searchString.toLowerCase())) ||
				source.name.toLowerCase().includes(searchString.toLowerCase()) ||
				source.description.toLowerCase().includes(searchString.toLowerCase()) ||
				source.id.toLowerCase().includes(searchString.toLowerCase()),
		).map((res) => res.name);
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

	private _searchFullTextWithAuth = async (type: "DATASET", searchString: string, token: string) => {
		fetch(this._graphQlEndpoint, {
			method: "POST",
			headers: {
				authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({
				query: `
				{
					search(input: { type: ${type}, query: "${searchString}", start: 0, count: 10 }) {
					start
					count
					total
					searchResults {
						entity {
						urn
						type
						...on Dataset {
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

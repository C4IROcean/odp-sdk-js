import { Auth } from "../../auth";
import { ODP_BACKEND_TOKEN_SCOPE, ODP_DATAHUB_GRAPHQL_ENDPOINT } from "../../constants";

interface IDataHubClientOptions {
	auth: Auth;
	graphQlEndpoint?: string;
	backendTokenScope?: string[];
}

export interface IMetadata {
	dataProductId: string;
	name: string;
	source: string;
	tags: string[];
	description: string;
	boundingBox: number[];
	timeSpan: string[];
	citation: string[];
}

export default class DataHubClient {
	private static _dataHubClient: DataHubClient;
	private _auth: Auth;
	private _tokenScope: string[];
	private _graphQlEndpoint: string;

	private constructor(options: IDataHubClientOptions) {
		this._auth = options.auth;
		this._graphQlEndpoint = options.graphQlEndpoint ?? ODP_DATAHUB_GRAPHQL_ENDPOINT;
		this._tokenScope = options.backendTokenScope ?? ODP_BACKEND_TOKEN_SCOPE;
	}

	public static getDatahubClient(options: IDataHubClientOptions) {
		if (this._dataHubClient) {
			return this._dataHubClient;
		}
		this._dataHubClient = new DataHubClient(options);
		return this._dataHubClient;
	}

	public searchFullText = async (type: "DATASET", searchString: string): Promise<any> => {
		const token = await this._auth.getToken(this._tokenScope);
		return this._searchFullTextWithAuth(type, searchString, token);
	};

	public autocompleteResults = async (searchString: string): Promise<any> => {
		return this._auth
			.getToken(this._tokenScope)
			.then((token) => this._autocompleteResultsWithAuth(searchString, token));
	};

	public getDataSetByUrn = async (urn: string) => {
		return this._auth.getToken(this._tokenScope).then((token) => this._getDatasetByUrnWithAuth(urn, token));
	};

	public getTagsWithUrn = async (urn: string) => {
		return this._auth.getToken(this._tokenScope).then((token) => this._getTagsWithUrnWithAuth(urn, token));
	};

	private _searchFullTextWithAuth = async (type: "DATASET", searchString: string, token: string): Promise<any> => {
		const result = await fetch(this._graphQlEndpoint, {
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
		});
		return result.json();
	};

	private _autocompleteResultsWithAuth = async (searchString: string, token: string): Promise<any> => {
		const results = await fetch(this._graphQlEndpoint, {
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
		});
		return results.json();
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
}

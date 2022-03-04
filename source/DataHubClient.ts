import { Auth } from './auth';

interface IDataHubClientOptions {
	auth: Auth;
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

	public searchFullText = async (type: "DATSET", searchString: string) => {
		return this._getToken().then((token) => this._searchFullTextWithAuth(type, searchString, token));
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
		})
			.then((r) => r.json())
			.then((data) => data);
	};

	private _searchFullTextWithAuth = async (type: "DATSET", searchString: string, token: string) => {
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
		})
			.then((r) => r.json())
			.then((data) => data);
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
		})
			.then((r) => r.json())
			.then((data) => data);
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
		})
			.then((r) => r.json())
			.then((data) => data);
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

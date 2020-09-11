import { ODPClient } from "../";

export class Files {
	private _client: ODPClient;
	constructor(client: ODPClient) {
		this._client = client;
	}
	public get client() {
		return this._client;
	}

	public getFileUrl = (externalIds: Array<string>) => {
		const query = [];
		for (const externalId of externalIds) {
			query.push({ externalId });
		}
		return this._client.cognite.files.getDownloadUrls(query);
	};
}

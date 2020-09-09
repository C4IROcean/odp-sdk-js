import { ODPClient } from "../";
import { FileFilter } from "@cognite/sdk";

export class Files {
	private _client: ODPClient;
	constructor(client: ODPClient) {
		this._client = client;
	}
	public get client() {
		return this._client;
	}

	public getFile = (externalId: string) => {
		return this._client.cognite.files.getDownloadUrls([{ externalId }]);
	};
}

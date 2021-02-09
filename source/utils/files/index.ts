import { FilesAPI } from "@cognite/sdk";
import { ODPClient } from "../..";

type IFilesApi = FilesAPI;

export class Files {
	private _client: ODPClient;

	public constructor(client: ODPClient) {
		this._client = client;
	}

	public get client() {
		return this._client;
	}

	public getFileUrl = (externalIds: Array<string>) => {
		const query = externalIds.map((externalId) => ({ externalId }));
		return this._client.cognite.files.getDownloadUrls(query);
	};

	public search: IFilesApi["search"] = (args) => this._client.cognite.files.search(args);
}

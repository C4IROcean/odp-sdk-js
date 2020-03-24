import { ODPClient } from "../";

export class Assets {
	private _client: ODPClient;

	constructor(client: ODPClient) {
		this._client = client;
		this._client.temperatures();
	}
}

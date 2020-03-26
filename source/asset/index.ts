import { ODPClient } from "../";
import { AssetListScope } from "@cognite/sdk";

export class Assets {
	private _client: ODPClient;

	constructor(client: ODPClient) {
		this._client = client;
	}
	public get = (id: string) => {
		return this._client.cognite.assets.retrieve([{ externalId: id }]);
	};
	public getChildren = (id: string) => {
		const scope: AssetListScope = { filter: {} };
		return this._client.cognite.assets.list(scope);
	};
}

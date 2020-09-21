import { ODPClient } from "../..";

export class Sequences {
	private _client: ODPClient;

	constructor(client: ODPClient) {
		this._client = client;
	}
	public get client() {
		return this._client;
	}

	public retrieve = async (query) => {
		return this._client.cognite.sequences.retrieve(query);
	};
	public search = async (query) => {
		return this._client.cognite.sequences.search(query);
	};

	public retrieveRows = async (query) => {
		return this._client.cognite.sequences.retrieveRows(query);
	};

	public list = async (query) => {
		return this._client.cognite.sequences.list(query);
	};
}

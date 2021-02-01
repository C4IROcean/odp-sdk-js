import { ODPClient } from "../..";

export class Sequences {
	private _client: ODPClient;

	public constructor(client: ODPClient) {
		this._client = client;
	}
	public get client() {
		return this._client;
	}

	public retrieve = async (query) => this._client.cognite.sequences.retrieve(query);

	public search = async (query) => this._client.cognite.sequences.search(query);

	public retrieveRows = async (query) => this._client.cognite.sequences.retrieveRows(query);

	public list = async (query) => this._client.cognite.sequences.list(query);
}

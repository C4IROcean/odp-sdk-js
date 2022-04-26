import log from "loglevel";
import { Auth } from "../../auth";
import { ODP_DATAHUB_TOKEN_SCOPE, ODP_DATAMESH_BASE_URL } from "../../constants";
import * as http from "http";
import axios from "axios";

interface IDataMeshApiClientOptions {
	auth: Auth;
	datahubTokenScope?: string;
	datahMeshApiBaseUrl?: string;
}

export default class DataMeshApiClient {
	private static _dataMeshApiClient;
	private _auth: Auth;
	private _tokenScope: string;
	private _dataMeshApiBaseUrl: string;

	private constructor(options: IDataMeshApiClientOptions) {
		this._auth = options.auth;
		this._tokenScope = options.datahubTokenScope ?? ODP_DATAHUB_TOKEN_SCOPE;
		this._dataMeshApiBaseUrl = options.datahMeshApiBaseUrl ?? ODP_DATAMESH_BASE_URL;
	}

	public static getDataMeshApiClient(options: IDataMeshApiClientOptions) {
		if (this._dataMeshApiClient) {
			return this._dataMeshApiClient;
		}
		this._dataMeshApiClient = new DataMeshApiClient(options);
		return this._dataMeshApiClient;
	}

	public searchCatalog = async (searchWord: string): Promise<any> => {
		try {
			const response = await axios.get(`${this._dataMeshApiBaseUrl}/catalog/v1/search?q=${searchWord}`);
			return response.data;
		} catch (error) {
			log.error(error);
		}
	};
	public autocompleteCatalog = async (searchWord: string): Promise<any> => {
		try {
			const response = await axios.get(`${this._dataMeshApiBaseUrl}/catalog/v1/search?q=${searchWord}`);
			return response.data;
		} catch (error) {
			log.error(error);
		}
	};
}

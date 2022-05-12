import axios from "axios";
import log from "loglevel";
import { Auth } from "../../auth";
import {
	IDataLayerMain,
	IDataProduct,
	IDataProductResult,
	ODP_BACKEND_TOKEN_SCOPE,
	ODP_DATAMESH_BASE_URL,
} from "../../constants";
import { IDataLayer } from "./../../constants";

interface IDataMeshApiClientOptions {
	auth: Auth;
	backendTokenScope?: string[];
	datahMeshApiBaseUrl?: string;
}

export default class DataMeshApiClient {
	private static _dataMeshApiClient;
	private _auth: Auth;
	private _tokenScope: string[];
	private _dataMeshApiBaseUrl: string;

	private constructor(options: IDataMeshApiClientOptions) {
		this._auth = options.auth;
		this._dataMeshApiBaseUrl = options.datahMeshApiBaseUrl ?? ODP_DATAMESH_BASE_URL;
		this._tokenScope = options.backendTokenScope ?? ODP_BACKEND_TOKEN_SCOPE;
	}

	public static getDataMeshApiClient(options: IDataMeshApiClientOptions) {
		if (this._dataMeshApiClient) {
			return this._dataMeshApiClient;
		}
		this._dataMeshApiClient = new DataMeshApiClient(options);
		return this._dataMeshApiClient;
	}

	public async searchCatalog(searchWord: string): Promise<IDataProductResult[]> {
		try {
			const token = await this._auth.getToken(this._tokenScope);
			const response = await fetch(`${this._dataMeshApiBaseUrl}/search?q=${searchWord}`, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			});
			return response.json();
		} catch (error) {
			log.error(error);
		}
	}
	public autocompleteCatalog = async (searchWord: string): Promise<string[]> => {
		try {
			const response = await axios.get(`${this._dataMeshApiBaseUrl}/autocomplete?q=${searchWord}`);
			return response.data;
		} catch (error) {
			log.error(error);
		}
	};
	public autocompleteDataLayers = async (searchWord: string): Promise<IDataLayerMain[]> => {
		try {
			const response = await axios.get(`${this._dataMeshApiBaseUrl}/autocompletelayers?q=${searchWord}`);
			return response.data;
		} catch (error) {
			log.error(error);
		}
	};
	public getLayerById = async (id: number): Promise<IDataLayer> => {
		try {
			const response = await axios.get(`${this._dataMeshApiBaseUrl}/layer?id=${id}`);
			return response.data;
		} catch (error) {
			log.error(error);
		}
	};
	public getDataProductByUuid = async (uuid: string): Promise<IDataProduct> => {
		try {
			const response = await axios.get(`${this._dataMeshApiBaseUrl}/dataproduct?uuid=${uuid}`);
			return response.data;
		} catch (error) {
			log.error(error);
		}
	};
}

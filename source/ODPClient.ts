import { CogniteClient } from "@cognite/sdk";
import { TimeSeries } from "./timeSeries";
import { Assets } from "./assets";
import { Sequences } from "./sequences";

export interface IClientOptions {
	/** App identifier (ex: 'FileExtractor') */
	appId: string;
	baseUrl?: string;
}

export interface IProject {
	/**
	 * Cognite project to login into
	 */
	project: string;
}

export interface IApiKeyLoginOptions extends IProject {
	/**
	 * A Cognite issued api-key
	 */
	apiKey: string;
}

export interface IOAuthLoginOptions extends IProject {
	onAuthenticate?: any | "REDIRECT" | "POPUP";
	onTokens?: any;
	/**
	 * Provide optional cached access token to skip the authentication flow (client.authenticate will still override this).
	 */
	accessToken?: string;
}

export default class ODPClient {
	private _client: CogniteClient = null;
	private _timeSeries: TimeSeries;
	private _sequences: Sequences;
	private _assets: Assets;

	constructor(options: IClientOptions) {
		this._client = new CogniteClient(options);
		this.init();
	}
	public get temperatures() {
		return null;
	}
	public get login() {
		return this._client.login;
	}
	public get logout() {
		return this._client.logout;
	}
	public get project() {
		return this._client.project;
	}
	public get cognite() {
		return this._client;
	}
	public loginWithApiKey = (options: IApiKeyLoginOptions) => {
		this._client.loginWithApiKey(options);
	};

	public loginWithOAuth = (options: any) => {
		this._client.loginWithOAuth(options);
	};

	public authenticate = () => {
		return this._client.authenticate();
	};

	public get timeSeries() {
		return this._timeSeries;
	}

	public get sequences() {
		return this._sequences;
	}

	public get asset() {
		return this._assets;
	}

	private init = () => {
		this._timeSeries = new TimeSeries(this);
		this._sequences = new Sequences(this);
		this._assets = new Assets(this);
	};
}

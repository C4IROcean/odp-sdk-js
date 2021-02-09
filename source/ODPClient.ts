import { CogniteClient } from "@cognite/sdk";
import { Assets } from "./utils/assets";
import { Sequences } from "./utils/sequences";
import { Files } from "./utils/files";
import { Casts } from "./casts";
import { MarineRegions } from "./marineRegions";

export interface IClientOptions {
	/** App identifier (ex: 'FileExtractor') */
	appId: string;
	baseUrl?: string;
}

export interface IProject {
	/**
	 * Cognite project to login into
	 */
	project?: string;
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
	 * Provide optional cached access token to skip the authentication flow
	 * (client.authenticate will still override this).
	 */
	accessToken?: string;
}

export default class ODPClient {
	private _client: CogniteClient = null;
	// private _timeSeries: TimeSeries;
	private _sequences: Sequences;
	private _files: Files;
	private _assets: Assets;
	private _casts: Casts;
	private _marineRegions: MarineRegions;

	public constructor(options: IClientOptions) {
		this._client = new CogniteClient(options);

		// this._timeSeries = new TimeSeries(this);
		this._sequences = new Sequences(this);
		this._assets = new Assets(this);
		this._files = new Files(this);
		this._casts = new Casts(this._sequences);
		this._marineRegions = new MarineRegions(this._sequences);
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
		if (!options.project) {
			options.project = "odp";
		}
		this._client.loginWithApiKey(options as any);
	};

	public loginWithOAuth = (options?: IOAuthLoginOptions) => {
		if (!options) {
			options = {};
		}
		if (!options.project) {
			options.project = "odp";
		}
		this._client.loginWithOAuth(options as any);
	};

	public authenticate = () => this._client.authenticate();

	/*
	public get timeSeries() {
		return this._timeSeries;
	}
	*/

	public get sequences() {
		return this._sequences;
	}

	public get files() {
		return this._files;
	}
	public get asset() {
		return this._assets;
	}
	public get casts() {
		return this._casts;
	}
	public get marineRegions() {
		return this._marineRegions;
	}
}

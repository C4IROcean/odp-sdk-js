import { AuthenticationResult, BrowserAuthOptions } from "@azure/msal-browser";
import { ClientOptions, CogniteClient } from "@cognite/sdk";
import { Auth } from "./auth";
import { Casts } from "./casts";
import { IDataSource } from "./constants";
import DataHubClient, { IMetadata } from "./Catalog/Connectors/DataHubClient";
import DataSourceStylingClient, { IDataSourceStyling } from "./DataSourceStylingClient";
import { MarineRegions } from "./marineRegions";
import { IIdTokenClaims } from "./types";
import Catalog, { CatalogConnectors } from "./Catalog/Catalog";

// This client id only allows for certain auth_redirects, ideally you'll have a client id per app.
// Contact us if this is your use case.
const ODP_SDK_CLIENT_ID = "b2a2d339-e785-4213-a773-8b289abd2199"; // B2C app reg: ODP SDKs

type RequiredConfig = Pick<ClientOptions, "appId">;
type OptionalConfig = Partial<Omit<ClientOptions, keyof RequiredConfig | "baseUrl">> &
	Partial<{
		baseUrl: "https://api.cognitedata.com" | "https://westeurope-1.cognitedata.com";
	}>;

interface IAuthTokens {
	accessToken: string;
	idToken: string;
	idTokenClaims: IIdTokenClaims;
	authority: string;
	scopes: string[];
}

type AuthListenersT = (token?: IAuthTokens) => void;

const defaultOptions: Pick<ClientOptions, "project" | "apiKeyMode" | "baseUrl"> = {
	project: "odp",
	apiKeyMode: false,
	baseUrl: "https://api.cognitedata.com",
};

export default class ODPClient extends CogniteClient {
	private authResult: AuthenticationResult | undefined = undefined;
	private listeners: AuthListenersT[] = [];

	private _casts: Casts;
	private _marineRegions: MarineRegions;
	private auth: Auth;
	private _catalog: Catalog;
	private _dataSourceStylingClient: DataSourceStylingClient;

	public constructor(options: RequiredConfig & OptionalConfig, authConfig: BrowserAuthOptions) {
		super({
			...defaultOptions,
			getToken: async () => {
				const token = await this.auth.handleRedirectAuth();
				if (this.authResult?.uniqueId !== token?.uniqueId) {
					this.authStateUpdated(token);
				}

				return token?.accessToken;
			},
			...options,
		});

		this.auth = new Auth(options.baseUrl || defaultOptions.baseUrl, {
			clientId: ODP_SDK_CLIENT_ID,
			redirectUri: "http://localhost:3000/", // This should be overwritten!
			knownAuthorities: ["oceandataplatform.b2clogin.com"],
			authority:
				// eslint-disable-next-line max-len
				"https://oceandataplatform.b2clogin.com/oceandataplatform.onmicrosoft.com/B2C_1A_signup_signin_custom",
			...authConfig,
		});

		this._dataSourceStylingClient = new DataSourceStylingClient();
		this._catalog = new Catalog({ auth: this.auth });
	}

	/**
	 * Get access tokens if they exist.
	 */
	public get authTokens(): IAuthTokens | undefined {
		if (!this.authResult) {
			return undefined;
		}

		return {
			accessToken: this.authResult.accessToken,
			idToken: this.authResult.idToken,
			idTokenClaims: this.authResult.idTokenClaims as IIdTokenClaims,
			authority: this.authResult.authority,
			scopes: this.authResult.scopes,
		};
	}

	/**
	 * The unstable namespace exposes APIs that we are experimenting with,
	 * and should never be relied upon in production outside the ODP team.
	 */
	public get unstable() {
		return {
			casts: this._casts ? this._casts : new Casts(this),
			marineRegions: this._marineRegions ? this._marineRegions : new MarineRegions(this),
		};
	}

	public unauthorizeUser() {
		return this.auth.logout();
	}

	public getMsalInstance() {
		return this.auth.getMsalInstance();
	}

	public async getDataSourceStyling(dataSourceId: string): Promise<IDataSourceStyling | undefined> {
		return this._dataSourceStylingClient.getDataSourceStyling(dataSourceId);
	}

	public async searchCatalog(keyword: string): Promise<IDataSource[]> {
		return this._catalog.searchCatalog(keyword, [CatalogConnectors.Hardcoded]);
	}

	public async autocompleteCatalog(keyword: string): Promise<string[]> {
		return this._catalog.autocompleteResults(keyword, [CatalogConnectors.Hardcoded]);
	}

	public async autocompleteDisplayableDatasources(keyword: string): Promise<IDataSource[]> {
		return this._catalog.autocompleteDisplayableDatasources(keyword, [CatalogConnectors.Hardcoded]);
	}

	public async getMetadataForDataSourceById(dataSourceId: string): Promise<IMetadata> {
		return this._catalog.getMetadataForDataSourceById(dataSourceId, CatalogConnectors.Hardcoded);
	}

	/**
	 * Subscribe to changes in authentication.
	 * NOTE: Does not trigger on first login, check the authResult attribute
	 * after resolving `odpSdk.authenticate()`.
	 *
	 * @param listenerFn The function that will be called with the auth state
	 * @returns undefined
	 */
	public listenToAuthChanges = (listenerFn: AuthListenersT) => {
		if (!(typeof listenerFn === "function")) {
			throw new Error(`Listener function is not of type function, got ${typeof listenerFn}`);
		}

		this.listeners.push(listenerFn);
		return () => {
			this.listeners = this.listeners.filter((fn) => fn === listenerFn);
		};
	};

	private notifyListeners = () => {
		for (const listenerFn of this.listeners) {
			try {
				listenerFn(this.authTokens);
			} catch (error) {
				console.warn("Listener function threw uncaught error", listenerFn);
			}
		}
	};

	private authStateUpdated = (token?: AuthenticationResult) => {
		this.authResult = token;
		this.notifyListeners();
	};
}

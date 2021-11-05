import { AuthenticationResult, BrowserAuthOptions } from "@azure/msal-browser";
import { ClientOptions, CogniteClient } from "@cognite/sdk";

import { Auth } from "./auth";
import { Casts } from "./casts";

// This client id only allows for certain auth_redirects, ideally you'll have a client id per app.
// Contact us if this is your use case.
const ODP_SDK_CLIENT_ID = "b2a2d339-e785-4213-a773-8b289abd2199"; // B2C app reg: ODP SDKs

type RequiredConfig = Pick<ClientOptions, "appId">;
type OptionalConfig = Partial<Omit<ClientOptions, keyof RequiredConfig | "baseUrl">> &
	Partial<{
		// clientId: string;
		baseUrl: "https://api.cognitedata.com" | "https://westeurope-1.cognitedata.com";
	}>;

type AuthListenersT = (token?: AuthenticationResult) => void;

const defaultOptions: Pick<ClientOptions, "project" | "apiKeyMode" | "baseUrl"> = {
	project: "odp",
	apiKeyMode: false,
	baseUrl: "https://api.cognitedata.com",
};

export default class ODPClient extends CogniteClient {
	public authToken: AuthenticationResult | undefined = undefined;
	private listeners: Array<AuthListenersT> = [];

	private _casts: Casts;
	private auth: Auth;
	//  = new Auth(
	// 	{
	// 		api: "https://api.cognitedata.com",
	// 		appClientId: "5c615a6e-62c2-4bca-905e-7bc148a4ade2", // Ocean Data Explorer
	// 	},
	// 	{ redirectUri: "https://localhost:3000/oauth_callback" },
	// );

	public constructor(options: RequiredConfig & OptionalConfig, authConfig: BrowserAuthOptions) {
		super({
			...defaultOptions,
			getToken: async () => {
				const token = await this.auth.handleRedirectAuthV2();
				if (this.authToken?.uniqueId !== token?.uniqueId) {
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

		this._casts = new Casts(this);
	}

	public get unstable() {
		return {
			casts: this._casts,
		};
	}

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
				listenerFn(this.authToken);
			} catch (error) {
				console.warn("Listener function threw uncaught error", listenerFn);
			}
		}
	};

	private authStateUpdated = (token?: AuthenticationResult) => {
		this.authToken = token;
		this.notifyListeners();
	};
}

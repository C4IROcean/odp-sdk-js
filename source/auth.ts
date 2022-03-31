import {
	AuthenticationResult,
	BrowserAuthOptions,
	ILoggerCallback,
	InteractionRequiredAuthError,
	LogLevel,
	PublicClientApplication,
} from "@azure/msal-browser";
import log from "loglevel";

const loggerCallback: ILoggerCallback = (level: LogLevel, message: string, containsPii: boolean): void => {
	if (containsPii) {
		return;
	}

	switch (level) {
		case LogLevel.Error:
			log.error(message);
			return;
		case LogLevel.Info:
			log.info(message);
			return;
		case LogLevel.Verbose:
			log.debug(message);
			return;
		case LogLevel.Warning:
			log.warn(message);
			return;
	}
};

interface BaseResponseT {
	ok: boolean;
	message: string;
}
interface UnauthenticatedResponseT extends BaseResponseT {
	authenticated: false;
}
interface AuthenticatedResponseT extends BaseResponseT {
	authenticated: true;
	token: AuthenticationResult;
}

export type AuthResponseT = AuthenticatedResponseT | UnauthenticatedResponseT;

/**
 * Auth class
 */
export class Auth {
	private audience: string;
	private _msalInstance: PublicClientApplication;

	public constructor(audience: string, authConfig: BrowserAuthOptions) {
		this.audience = audience;

		this._msalInstance = new PublicClientApplication({
			auth: authConfig,
			cache: {
				cacheLocation: "sessionStorage",
				storeAuthStateInCookie: false,
				secureCookies: false,
			},
			system: {
				loggerOptions: {
					piiLoggingEnabled: false,
					loggerCallback,
				},
				windowHashTimeout: 60000,
				iframeHashTimeout: 6000,
				loadFrameTimeout: 0,
				asyncPopups: false,
			},
		});
	}

	public logout = () => {
		return this._msalInstance.logoutRedirect();
	};

	public getToken = async (scope: string | string[]): Promise<string> => {
		const account = this._msalInstance.getAllAccounts()[0];
		const request = {
			account,
			scopes: [...scope],
		};
		return new Promise<string>((resolve, reject) => {
			this._msalInstance.acquireTokenSilent(request).then((res) => {
				if (res.accessToken) {
					resolve(res.accessToken);
				} else {
					reject(new Error("No token acquired..."));
				}
			});
		});
	};

	/*
	 * When using redirect APIs, handleRedirectPromise must be invoked when returning from the redirect. This ensures
	 * that the token response from the server is properly handled and temporary cache entries are cleaned up.
	 */
	public handleRedirectAuth = async (): Promise<AuthenticationResult | null> => {
		try {
			const redirectResponse = await this._msalInstance.handleRedirectPromise();
			if (redirectResponse !== null) {
				log.debug("Auth: Got redirect token");
				// Acquire token silent success
				return redirectResponse;
			}
		} catch (error) {
			log.error(error);
			return;
		}

		// MSAL.js v2 exposes several account APIs, logic to determine which account to use
		// is the responsibility of the developer
		const account = this._msalInstance.getAllAccounts()[0];

		const accessTokenRequest = {
			account,
			scopes: [
				"openid",
				"profile",
				"email",
				// "offline_access",
				`${this.audience}/user_impersonation`,
			],
		};

		const loginWithRedirect = () => {
			this._msalInstance.acquireTokenRedirect(accessTokenRequest);
		};

		log.debug("Auth: Acquiring access token", accessTokenRequest);

		if (!account) {
			loginWithRedirect();
		}

		try {
			const accessTokenResponse = await this._msalInstance.acquireTokenSilent(accessTokenRequest);
			// Acquire token silent success
			log.debug("Auth: Got silent token");
			return accessTokenResponse;
		} catch (error) {
			// Acquire token silent failure, and send an interactive request
			if (error instanceof InteractionRequiredAuthError) {
				log.debug("using fallback");
				loginWithRedirect();
				return;
			}
			log.error("Auth: Failed to get silent token");
			log.error(error);
		}
	};
}

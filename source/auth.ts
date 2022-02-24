import {
    AuthenticationResult,
    BrowserAuthOptions,
    ILoggerCallback,
    InteractionRequiredAuthError,
    LogLevel,
    PublicClientApplication,
} from '@azure/msal-browser';

const loggerCallback: ILoggerCallback = (level: LogLevel, message: string, containsPii: boolean): void => {
	if (containsPii) {
		return;
	}

	switch (level) {
		case LogLevel.Error:
			console.error(message);
			return;
		case LogLevel.Info:
			console.info(message);
			return;
		case LogLevel.Verbose:
			console.debug(message);
			return;
		case LogLevel.Warning:
			console.warn(message);
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
	private msalInstance: PublicClientApplication;

	public constructor(audience: string, authConfig: BrowserAuthOptions) {
		this.audience = audience;

		this.msalInstance = new PublicClientApplication({
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

	public getMsalInstance = () => {
		return this.msalInstance;
	};

	public logout = () => {
		return this.msalInstance.logoutRedirect();
	};

	/*
	 * When using redirect APIs, handleRedirectPromise must be invoked when returning from the redirect. This ensures
	 * that the token response from the server is properly handled and temporary cache entries are cleaned up.
	 */
	public handleRedirectAuth = async (): Promise<AuthenticationResult | null> => {
		try {
			const redirectResponse = await this.msalInstance.handleRedirectPromise();
			if (redirectResponse !== null) {
				console.log("Auth: Got redirect token");
				// Acquire token silent success
				return redirectResponse;
			}
		} catch (error) {
			console.error(error);
			return;
		}

		// MSAL.js v2 exposes several account APIs, logic to determine which account to use
		// is the responsibility of the developer
		const account = this.msalInstance.getAllAccounts()[0];

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
			this.msalInstance.acquireTokenRedirect(accessTokenRequest);
		};

		console.log("Auth: Acquiring access token", accessTokenRequest);

		if (!account) {
			loginWithRedirect();
		}

		try {
			const accessTokenResponse = await this.msalInstance.acquireTokenSilent(accessTokenRequest);
			// Acquire token silent success
			console.log("Auth: Got silent token");
			return accessTokenResponse;
		} catch (error) {
			// Acquire token silent failure, and send an interactive request
			if (error instanceof InteractionRequiredAuthError) {
				console.log("using fallback");
				loginWithRedirect();
				return;
			}
			console.log("Auth: Failed to get silent token");
			console.log(error);
		}
	};
}

import { AuthenticationResult, BrowserAuthOptions } from "@azure/msal-browser"
import { ClientOptions, CogniteClient } from "@cognite/sdk"
import log from "loglevel"
import { Auth } from "./auth"
import Catalog from "./Catalog/Catalog"
import { IDataLayer, IDataLayerMain, IDataProduct, IDataProductResult, IIdTokenClaims } from "./types"

// This client id only allows for certain auth_redirects, ideally you'll have a client id per app.
// Contact us if this is your use case.
const ODP_SDK_CLIENT_ID = "b2a2d339-e785-4213-a773-8b289abd2199" // B2C app reg: ODP SDKs

type RequiredConfig = Pick<ClientOptions, "appId">
type OptionalConfig = Partial<Omit<ClientOptions, keyof RequiredConfig | "baseUrl">> &
  Partial<{
    baseUrl: "https://api.cognitedata.com" | "https://westeurope-1.cognitedata.com"
    logLevel: log.LogLevelDesc
  }>

interface IAuthTokens {
  accessToken: string
  idToken: string
  idTokenClaims: IIdTokenClaims
  authority: string
  scopes: string[]
}

type AuthListenersT = (token?: IAuthTokens) => void

const defaultOptions: { project: string; apiKeyMode: boolean; baseUrl: string } = {
  project: "odp",
  apiKeyMode: false,
  baseUrl: "https://api.cognitedata.com",
}

export default class ODPClient extends CogniteClient {
  private authResult: AuthenticationResult | undefined
  private listeners: AuthListenersT[] = []

  private auth: Auth
  private _catalog: Catalog

  public constructor(options: RequiredConfig & OptionalConfig, authConfig: BrowserAuthOptions) {
    super({
      ...defaultOptions,
      getToken: async () => {
        const token = await this.auth.handleRedirectAuth()
        if (!token) throw new Error("Could not retrieve token.")
        if (this.authResult?.uniqueId !== token?.uniqueId) {
          this.authStateUpdated(token)
        }
        return token.accessToken
      },
      ...options,
    })

    log.setLevel(options.logLevel ?? log.levels.SILENT)

    this.auth = new Auth(options.baseUrl || defaultOptions.baseUrl, {
      redirectUri: "http://localhost:3000/", // This should be overwritten!
      knownAuthorities: ["oceandataplatform.b2clogin.com"],
      authority:
        // eslint-disable-next-line max-len
        "https://oceandataplatform.b2clogin.com/oceandataplatform.onmicrosoft.com/B2C_1A_signup_signin_custom",
      ...authConfig,
    })

    this._catalog = new Catalog({ auth: this.auth })
  }

  /**
   * Get access tokens if they exist.
   */
  public get authTokens(): IAuthTokens | undefined {
    if (!this.authResult) {
      return undefined
    }

    return {
      accessToken: this.authResult.accessToken,
      idToken: this.authResult.idToken,
      idTokenClaims: this.authResult.idTokenClaims as IIdTokenClaims,
      authority: this.authResult.authority,
      scopes: this.authResult.scopes,
    }
  }

  public unauthorizeUser() {
    return this.auth.logout()
  }

  public async searchCatalog(keyword: string): Promise<IDataProductResult[]> {
    return this._catalog.searchCatalog(keyword)
  }

  public async autocompleteCatalog(keyword: string): Promise<string[]> {
    return this._catalog.autocompleteCatalog(keyword)
  }

  public async autocompleteDataLayers(keyword: string): Promise<IDataLayerMain[]> {
    return this._catalog.autocompleteDataLayers(keyword)
  }

  public async getDataLayerById(id: number): Promise<IDataLayer | null> {
    return this._catalog.getDataLayerById(id)
  }

  public async getDataProductByUuid(dataProductUuid: string): Promise<IDataProduct | null> {
    return this._catalog.getDataProductByUuid(dataProductUuid)
  }

  public async getAllDataProducts(): Promise<IDataProductResult[]> {
    return this._catalog.getAllDataProducts()
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
      throw new Error(`Listener function is not of type function, got ${typeof listenerFn}`)
    }

    this.listeners.push(listenerFn)
    return () => {
      this.listeners = this.listeners.filter(fn => fn === listenerFn)
    }
  }

  private notifyListeners = () => {
    for (const listenerFn of this.listeners) {
      try {
        listenerFn(this.authTokens)
      } catch (error) {
        log.warn("Listener function threw uncaught error", listenerFn)
      }
    }
  }

  private authStateUpdated = (token?: AuthenticationResult) => {
    this.authResult = token
    this.notifyListeners()
  }
}

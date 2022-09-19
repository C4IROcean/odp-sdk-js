import { AuthenticationResult, BrowserAuthOptions } from "@azure/msal-browser"
import log from "loglevel"
import { Auth } from "./auth"
import Catalog from "./Catalog/Catalog"
import { IAuthTokens, IDataLayer, IDataLayerMain, IDataProduct, IDataProductResult, IIdTokenClaims } from "./types"

type OdpClientConfig = {
  logLevel: log.LogLevelDesc
}

type AuthListenersT = (token?: IAuthTokens) => void

export default class ODPClient {
  private authResult: AuthenticationResult | undefined
  private listeners: AuthListenersT[] = []

  private auth: Auth
  private _catalog: Catalog

  public constructor(options: OdpClientConfig, authConfig: BrowserAuthOptions) {
    log.setLevel(options.logLevel ?? log.levels.SILENT)

    this.auth = new Auth({
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

  public async authenticate() {
    if (!this.authResult) {
      this.authResult = await this.auth.handleRedirectAuth()
      return this.authTokens
    }
    return this.authTokens
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

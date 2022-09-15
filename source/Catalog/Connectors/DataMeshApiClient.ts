import log from "loglevel"
import { Auth } from "../../auth"
import { IDataLayerMain, IDataProduct, IDataProductResult, IDataLayer } from "../../types"
import { ODP_BACKEND_TOKEN_SCOPE, ODP_DATAMESH_BASE_URL } from "./../../constants"

interface IDataMeshApiClientOptions {
  auth: Auth
  backendTokenScope?: string[]
  datahMeshApiBaseUrl?: string
}

export default class DataMeshApiClient {
  private static _dataMeshApiClient: DataMeshApiClient
  private _auth: Auth
  private _tokenScope: string[]
  private _dataMeshApiBaseUrl: string

  private constructor(options: IDataMeshApiClientOptions) {
    this._auth = options.auth
    this._dataMeshApiBaseUrl = options.datahMeshApiBaseUrl ?? ODP_DATAMESH_BASE_URL
    this._tokenScope = options.backendTokenScope ?? ODP_BACKEND_TOKEN_SCOPE
  }

  public static getDataMeshApiClient(options: IDataMeshApiClientOptions) {
    if (this._dataMeshApiClient) {
      return this._dataMeshApiClient
    }
    this._dataMeshApiClient = new DataMeshApiClient(options)
    return this._dataMeshApiClient
  }

  public async searchCatalog(searchWord: string): Promise<IDataProductResult[]> {
    try {
      const token = await this._auth.getToken(this._tokenScope)
      const response = await fetch(`${this._dataMeshApiBaseUrl}/search?q=${searchWord}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.json()
    } catch (error) {
      throw new Error(`Searching the catalog failed with the following error: ${error}`)
    }
  }
  public autocompleteCatalog = async (searchWord: string): Promise<string[]> => {
    try {
      const token = await this._auth.getToken(this._tokenScope)
      const response = await fetch(`${this._dataMeshApiBaseUrl}/autocomplete?q=${searchWord}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.json()
    } catch (error) {
      throw new Error(`Autocompleting the catalog failed with the following error: ${error}`)
    }
  }
  public autocompleteDataLayers = async (searchWord: string): Promise<IDataLayerMain[]> => {
    try {
      const token = await this._auth.getToken(this._tokenScope)
      const response = await fetch(`${this._dataMeshApiBaseUrl}/autocompletelayers?q=${searchWord}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.json()
    } catch (error) {
      throw new Error(`Autocompleting the data layers failed with the following error: ${error}`)
    }
  }
  public getLayerById = async (id: number): Promise<IDataLayer> => {
    try {
      const token = await this._auth.getToken(this._tokenScope)
      const result = await (
        await fetch(`${this._dataMeshApiBaseUrl}/layer?id=${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      ).json()
      return { ...result, explorerStyling: JSON.parse(result.explorerStyling) }
    } catch (error) {
      throw new Error(`Fetching the data layer with id ${id} has failed with the following error: ${error}`)
    }
  }
  public getDataProductByUuid = async (uuid: string): Promise<IDataProduct> => {
    try {
      const token = await this._auth.getToken(this._tokenScope)
      const dataProduct = await (
        await fetch(`${this._dataMeshApiBaseUrl}/dataproduct?uuid=${uuid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      ).json()
      return dataProduct
    } catch (error) {
      throw new Error(`Fetching the data product with uuid ${uuid} has failed with the following error: ${error}`)
    }
  }

  public getAllDataProducts = async (): Promise<IDataProductResult[]> => {
    try {
      const token = await this._auth.getToken(this._tokenScope)
      const dataProducts = await (
        await fetch(`${this._dataMeshApiBaseUrl}/dataproducts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      ).json()
      return dataProducts
    } catch (error) {
      throw new Error(`Fetching all data products has failed with the following error: ${error}`)
    }
  }
}

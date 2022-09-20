import { Auth } from "./../auth"
import { IDataLayer, IDataLayerMain, IDataProduct, IDataProductResult } from "./../types"
import DataMeshApiClient from "./DataMeshApiClient"

interface ICatalogOptions {
  auth: Auth
}
export default class Catalog {
  private _dataMeshApiClient: DataMeshApiClient

  public constructor(options: ICatalogOptions) {
    this._dataMeshApiClient = DataMeshApiClient.getDataMeshApiClient(options)
  }

  public searchCatalog = async (searchString: string): Promise<IDataProductResult[]> => {
    return this._dataMeshApiClient.searchCatalog(searchString)
  }

  public autocompleteCatalog = async (searchString: string): Promise<string[]> => {
    return this._dataMeshApiClient.autocompleteCatalog(searchString)
  }

  public autocompleteDataLayers = async (keyword: string): Promise<IDataLayerMain[]> => {
    return this._dataMeshApiClient.autocompleteDataLayers(keyword)
  }

  public getDataLayerById = async (id: number): Promise<IDataLayer | null> => {
    return this._dataMeshApiClient.getLayerById(id)
  }

  public getDataProductByUuid = async (dataProductUuid: string): Promise<IDataProduct | null> => {
    return this._dataMeshApiClient.getDataProductByUuid(dataProductUuid)
  }

  public getAllDataProducts = async (): Promise<IDataProductResult[]> => {
    return this._dataMeshApiClient.getAllDataProducts()
  }
}

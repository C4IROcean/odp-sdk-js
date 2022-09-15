import { Auth } from "./../auth"
import { IDataLayer, IDataLayerMain, IDataProduct, IDataProductResult } from "./../types"
import DataMeshApiClient from "./Connectors/DataMeshApiClient"

export enum CatalogConnectors {
  DataMeshApi = "datameshapi",
}
interface ICatalogOptions {
  auth: Auth
}
export default class Catalog {
  private _dataMeshApiClient: DataMeshApiClient

  public constructor(options: ICatalogOptions) {
    this._dataMeshApiClient = DataMeshApiClient.getDataMeshApiClient(options)
  }

  public searchCatalog = async (
    searchString: string,
    connectors: CatalogConnectors[]
  ): Promise<IDataProductResult[]> => {
    let results: IDataProductResult[] = []
    for (const connector of connectors) {
      switch (connector) {
        case CatalogConnectors.DataMeshApi:
          const meshApiResults: IDataProductResult[] = await this._dataMeshApiClient.searchCatalog(searchString)
          results = [...results, ...meshApiResults]
          break
      }
    }
    return results
  }

  public autocompleteCatalog = async (searchString: string, connectors: CatalogConnectors[]): Promise<string[]> => {
    let results: string[] = []
    for (const connector of connectors) {
      switch (connector) {
        case CatalogConnectors.DataMeshApi:
          const psAutocompleteResults = await this._dataMeshApiClient.autocompleteCatalog(searchString)
          results = [...results, ...psAutocompleteResults]
          break
      }
    }
    return results
  }

  public autocompleteDataLayers = async (
    keyword: string,
    connectors: CatalogConnectors[]
  ): Promise<IDataLayerMain[]> => {
    let results: IDataLayerMain[] = []
    for (const connector of connectors) {
      switch (connector) {
        case CatalogConnectors.DataMeshApi:
          const meshAutocompleteDataLayersResults = await this._dataMeshApiClient.autocompleteDataLayers(keyword)
          results = [...results, ...meshAutocompleteDataLayersResults]
          break
      }
    }
    return results
  }

  public getDataLayerById = async (id: number, connector: CatalogConnectors): Promise<IDataLayer | null> => {
    let result: IDataLayer | null = null
    switch (connector) {
      case CatalogConnectors.DataMeshApi:
        result = await this._dataMeshApiClient.getLayerById(id)
        break
    }
    return result
  }

  public getDataProductByUuid = async (
    dataProductUuid: string,
    connector: CatalogConnectors
  ): Promise<IDataProduct | null> => {
    let dataProduct: IDataProduct | null = null
    switch (connector) {
      case CatalogConnectors.DataMeshApi:
        dataProduct = await this._dataMeshApiClient.getDataProductByUuid(dataProductUuid)
        break
    }
    return dataProduct
  }

  public getAllDataProducts = async (connector: CatalogConnectors): Promise<IDataProductResult[]> => {
    let dataProducts: IDataProductResult[] = []
    switch (connector) {
      case CatalogConnectors.DataMeshApi:
        dataProducts = await this._dataMeshApiClient.getAllDataProducts()
        break
    }
    return dataProducts
  }
}

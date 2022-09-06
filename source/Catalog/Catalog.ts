import { Auth } from "./../auth"
import { IDataLayer, IDataLayerMain, IDataProduct, IDataProductResult } from "./../types"
import DataHubClient from "./Connectors/DataHubClient"
import DataMeshApiClient from "./Connectors/DataMeshApiClient"
import HardcodedClient from "./Connectors/HardcodedClient"

export enum CatalogConnectors {
  Hardcoded = "hardcoded",
  Datahub = "datahub",
  DataMeshApi = "datameshapi",
}

interface ICatalogOptions {
  auth: Auth
}

export default class Catalog {
  private _datahubClient: DataHubClient
  private _dataMeshApiClient: DataMeshApiClient

  public constructor(options: ICatalogOptions) {
    this._datahubClient = DataHubClient.getDatahubClient(options)
    this._dataMeshApiClient = DataMeshApiClient.getDataMeshApiClient(options)
  }

  public searchCatalog = async (
    searchString: string,
    connectors: CatalogConnectors[]
  ): Promise<IDataProductResult[]> => {
    let results: IDataProductResult[] = []
    for (const connector of connectors) {
      switch (connector) {
        case CatalogConnectors.Hardcoded:
          const hardcodedResult: IDataProductResult[] = HardcodedClient.searchCatalog(searchString)
          results = [...results, ...hardcodedResult]
          break
        case CatalogConnectors.DataMeshApi:
          const meshApiResults: IDataProductResult[] = await this._dataMeshApiClient.searchCatalog(searchString)
          results = [...results, ...meshApiResults]
          break
        case CatalogConnectors.Datahub:
          results = await this._datahubClient.searchFullText("DATASET", searchString)
          break
      }
    }
    return results
  }

  public autocompleteCatalog = async (searchString: string, connectors: CatalogConnectors[]): Promise<string[]> => {
    let results: string[] = []
    for (const connector of connectors) {
      switch (connector) {
        case CatalogConnectors.Hardcoded:
          results = [...results, ...HardcodedClient.autocompleteCatalog(searchString)]
          break
        case CatalogConnectors.Datahub:
          const dhResults = await this._datahubClient.autocompleteResults(searchString)
          results = [...results, ...this._mapAutocompleteResultsToOdp(connector, dhResults)]
          break
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
        case CatalogConnectors.Hardcoded:
          results = [...results, ...HardcodedClient.autocompleteDataLayers(keyword)]
          break
        case CatalogConnectors.DataMeshApi:
          const meshAutocompleteDataLayersResults = await this._dataMeshApiClient.autocompleteDataLayers(keyword)
          results = [...results, ...meshAutocompleteDataLayersResults]
          break
        // TODO: add datahub option to find displayable dataproducts
      }
    }
    return results
  }

  public getDataLayerById = async (id: number, connector: CatalogConnectors): Promise<IDataLayer> => {
    let result: IDataLayer = null
    switch (connector) {
      case CatalogConnectors.Hardcoded:
        result = HardcodedClient.getLayerById(id)
        break
      case CatalogConnectors.DataMeshApi:
        result = await this._dataMeshApiClient.getLayerById(id)
        break
      // TODO: add datahub option to find displayable dataproducts
    }
    return result
  }

  public getDataProductByUuid = async (
    dataProductUuid: string,
    connector: CatalogConnectors
  ): Promise<IDataProduct> => {
    let dataProduct: IDataProduct = null
    switch (connector) {
      case CatalogConnectors.Hardcoded:
        dataProduct = HardcodedClient.getDataProductByUuid(dataProductUuid)
        break
      case CatalogConnectors.DataMeshApi:
        dataProduct = await this._dataMeshApiClient.getDataProductByUuid(dataProductUuid)
        break
      // TODO: add datahub option to get full metadata
    }
    return dataProduct
  }

  public getAllDataProducts = async (connector: CatalogConnectors): Promise<IDataProductResult[]> => {
    let dataProducts: IDataProductResult[] = null
    switch (connector) {
      case CatalogConnectors.DataMeshApi:
        dataProducts = await this._dataMeshApiClient.getAllDataProducts()
        break
      // TODO: add datahub option to get full metadata
    }
    return dataProducts
  }

  private _mapAutocompleteResultsToOdp(connector: CatalogConnectors, autocompleteResults: any) {
    let mappedResults
    switch (connector) {
      case "datahub":
        // TODO: map datahub structure to ODP structure ones we know it
        mappedResults = autocompleteResults
    }
    return mappedResults
  }

  private _mapSearchResultsToOdp(connector: CatalogConnectors, searchResults: IDataProduct[]) {
    let mappedResults
    switch (connector) {
      case CatalogConnectors.Datahub:
        // TODO: map datahub structure to ODP structure ones we know it
        mappedResults = searchResults
    }
    return mappedResults
  }
}

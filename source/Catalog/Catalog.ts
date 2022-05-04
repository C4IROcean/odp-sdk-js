import { Auth } from "./../auth";
import { IDataLayer, IDataLayerMain, IDataProduct, IDataProductMainInfo, IDataProductResult } from "./../constants";
import DataHubClient from "./Connectors/DataHubClient";
import DataMeshApiClient from "./Connectors/DataMeshApiClient";

export enum CatalogConnectors {
	Datahub = "datahub",
	DataMeshApi = "datameshapi",
}

interface ICatalogOptions {
	auth: Auth;
}

export default class Catalog {
	private _datahubClient: DataHubClient;
	private _dataMeshApiClient: DataMeshApiClient;

	public constructor(options: ICatalogOptions) {
		this._datahubClient = DataHubClient.getDatahubClient(options);
		this._dataMeshApiClient = DataMeshApiClient.getDataMeshApiClient(options);
	}

	public searchCatalog = async (
		searchString: string,
		connectors: CatalogConnectors[],
	): Promise<IDataProductResult[]> => {
		let results: IDataProductResult[] = null;
		for (const connector of connectors) {
			switch (connector) {
				case CatalogConnectors.DataMeshApi:
					results = await this._dataMeshApiClient.searchCatalog(searchString);
					break;
			}
		}
		return results;
	};

	public autocompleteCatalog = async (
		searchString: string,
		connectors: CatalogConnectors[],
	): Promise<IDataProductMainInfo[]> => {
		let results: IDataProductMainInfo[] = [];
		for (const connector of connectors) {
			switch (connector) {
				case CatalogConnectors.Datahub:
					const dhResults = await this._datahubClient.autocompleteResults(searchString);
					results = [...results, ...this._mapAutocompleteResultsToOdp(connector, dhResults)];
					break;
				case CatalogConnectors.DataMeshApi:
					const psAutocompleteResults = await this._dataMeshApiClient.autocompleteCatalog(searchString);
					results = [...results, ...psAutocompleteResults];
					break;
			}
		}
		return results;
	};

	public autocompleteDataLayers = async (
		keyword: string,
		connectors: CatalogConnectors[],
	): Promise<IDataLayerMain[]> => {
		let results: IDataLayerMain[] = [];
		for (const connector of connectors) {
			switch (connector) {
				case CatalogConnectors.DataMeshApi:
					results = await this._dataMeshApiClient.autocompleteDataLayers(keyword);
					break;
				// TODO: add datahub option to find displayable dataproducts
			}
		}
		return results;
	};

	public getDataLayerById = async (id: number, connectors: CatalogConnectors[]): Promise<IDataLayer> => {
		let results: IDataLayer = null;
		for (const connector of connectors) {
			switch (connector) {
				case CatalogConnectors.DataMeshApi:
					results = await this._dataMeshApiClient.getLayerById(id);
					break;
				// TODO: add datahub option to find displayable dataproducts
			}
		}
		return results;
	};

	public getDataProductByUuid = async (
		dataProductUuid: string,
		connector: CatalogConnectors,
	): Promise<IDataProduct> => {
		let metadata: IDataProduct = null;
		switch (connector) {
			case CatalogConnectors.DataMeshApi:
				metadata = await this._dataMeshApiClient.getDataProductByUuid(dataProductUuid);
				break;
			// TODO: add datahub option to get full metadata
		}
		return metadata;
	};

	private _mapAutocompleteResultsToOdp(connector: CatalogConnectors, autocompleteResults: any) {
		let mappedResults;
		switch (connector) {
			case "datahub":
				// TODO: map datahub structure to ODP structure ones we know it
				mappedResults = autocompleteResults;
		}
		return mappedResults;
	}

	private _mapSearchResultsToOdp(connector: CatalogConnectors, searchResults: IDataProduct[]) {
		let mappedResults;
		switch (connector) {
			case CatalogConnectors.Datahub:
				// TODO: map datahub structure to ODP structure ones we know it
				mappedResults = searchResults;
		}
		return mappedResults;
	}
}

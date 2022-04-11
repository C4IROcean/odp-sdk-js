import { Auth } from "./../auth";
import { DataSources, IDataSource, METADATA_DATA_SOURCES } from "./../constants";
import { DATA_SOURCES } from "../constants";
import DataHubClient, { IMetadata } from "./Connectors/DataHubClient";

export enum CatalogConnectors {
	Hardcoded = "hardcoded",
	Datahub = "datahub",
}

interface ICatalogOptions {
	auth: Auth;
}

export default class Catalog {
	private _datahubClient: DataHubClient;

	public constructor(options: ICatalogOptions) {
		this._datahubClient = new DataHubClient({ auth: options.auth });
	}

	public searchCatalog = async (searchString: string, connectors: CatalogConnectors[]): Promise<IDataSource[]> => {
		let results: IDataSource[] = [];
		connectors.forEach(async (connector) => {
			switch (connector) {
				case CatalogConnectors.Hardcoded:
					results = [
						...results,
						...DATA_SOURCES.filter(
							(source) =>
								source.tags.find((tag) => tag.toLowerCase().includes(searchString.toLowerCase())) ||
								source.name.toLowerCase().includes(searchString.toLowerCase()) ||
								source.description.toLowerCase().includes(searchString.toLowerCase()) ||
								source.id.toLowerCase().includes(searchString.toLowerCase()),
						),
					];
					break;
				case CatalogConnectors.Datahub:
					const dhResults = await this._datahubClient.searchFullText("DATASET", searchString);
					results = [...results, ...this._mapSearchResultsToOdp(connector, dhResults)];
					break;
			}
		});
		return results;
	};

	public autocompleteResults = async (searchString: string, connectors: CatalogConnectors[]): Promise<string[]> => {
		let results: string[] = [];
		connectors.forEach(async (connector) => {
			switch (connector) {
				case CatalogConnectors.Hardcoded:
					results = [
						...results,
						...DATA_SOURCES.filter(
							(source) =>
								source.tags.find((tag) => tag.toLowerCase().includes(searchString.toLowerCase())) ||
								source.name.toLowerCase().includes(searchString.toLowerCase()) ||
								source.description.toLowerCase().includes(searchString.toLowerCase()) ||
								source.id.toLowerCase().includes(searchString.toLowerCase()),
						).map((res) => res.name),
					];
					break;
				case CatalogConnectors.Datahub:
					const dhResults = await this._datahubClient.autocompleteResults(searchString);
					results = [...results, ...this._mapAutocompleteResultsToOdp(connector, dhResults)];
					break;
			}
		});
		return results;
	};

	public async autocompleteDisplayableDatasources(
		keyword: string,
		connectors: CatalogConnectors[],
	): Promise<IDataSource[]> {
		let results: IDataSource[] = [];
		connectors.forEach(async (connector) => {
			switch (connector) {
				case CatalogConnectors.Hardcoded:
					results = [
						...results,
						...DATA_SOURCES.filter(
							(source) =>
								(source.tags.find((tag) => tag.toLowerCase().includes(keyword.toLowerCase())) ||
									source.name.toLowerCase().includes(keyword.toLowerCase()) ||
									source.description.toLowerCase().includes(keyword.toLowerCase()) ||
									source.id.toLowerCase().includes(keyword.toLowerCase())) &&
								source.sourceType === DataSources.MapboxVectorTile,
						),
					];
					break;
				// TODO: add datahub option to find displayable datasources
			}
		});
		return results;
	}

	public async getMetadataForDataSourceById(dataSourceId: string, connector: CatalogConnectors): Promise<IMetadata> {
		let metadata: IMetadata;
		switch (connector) {
			case CatalogConnectors.Hardcoded:
				metadata = METADATA_DATA_SOURCES.find((el) => el.dataSourceId === dataSourceId);
				break;
			// TODO: add datahub option to get full metadata
		}
		return metadata;
	}

	private _mapAutocompleteResultsToOdp(connector: CatalogConnectors, autocompleteResults: any) {
		let mappedResults;
		switch (connector) {
			case "hardcoded":
				mappedResults = autocompleteResults;
			case "datahub":
				// TODO: map datahub structure to ODP structure ones we know it
				mappedResults = autocompleteResults;
		}
		return mappedResults;
	}

	private _mapSearchResultsToOdp(connector: CatalogConnectors, searchResults: IDataSource[]) {
		let mappedResults;
		switch (connector) {
			case CatalogConnectors.Hardcoded:
				mappedResults = searchResults;
			case CatalogConnectors.Datahub:
				// TODO: map datahub structure to ODP structure ones we know it
				mappedResults = searchResults;
		}
		return mappedResults;
	}
}

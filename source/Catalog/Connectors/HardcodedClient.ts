import {
	DATA_LAYERS,
	DATA_PRODUCTS_META,
	IDataLayerMain,
	IDataProduct,
	IDataProductExtendedMainInfo,
	IDataProductResult,
} from "../../constants";
import { IDataLayer, IDataProductMainInfo } from "./../../constants";

export default class HardcodedClient {
	public static searchCatalog(searchWord: string): IDataProductResult[] {
		const dataProductResults: IDataProductExtendedMainInfo[] = DATA_PRODUCTS_META.filter((value) => {
			return (
				value.name.toLowerCase().includes(searchWord.toLowerCase()) ||
				value.databaseDescription.includes(searchWord.toLowerCase()) ||
				value.tags.find((tag) => tag.toLowerCase().includes(searchWord.toLowerCase()))
			);
		}).map((el) => {
			return {
				uuid: el.uuid,
				name: el.name,
				tags: el.tags,
				provider: el.provider,
				providerAcronym: el.providerAcronym,
				creator: el.creator,
				databaseDescription: el.databaseDescription,
				accessType: el.accessType,
				timespan: el.timespan,
				availableIn: el.availableIn,
			};
		});
		return dataProductResults.map((el) => {
			return {
				dataProductResult: el,
				dataLayers: DATA_LAYERS.filter((val) => val.dataProductUuid === el.uuid),
			};
		});
	}
	public static autocompleteCatalog(searchWord: string): IDataProductMainInfo[] {
		return DATA_PRODUCTS_META.filter((el) => {
			return (
				el.name.toLowerCase().includes(searchWord.toLowerCase()) ||
				el.tags.find((tag) => tag.toLowerCase().includes(searchWord.toLowerCase()))
			);
		}).map((el) => {
			return {
				name: el.name,
				tags: el.tags,
				uuid: el.uuid,
			};
		});
	}
	public static autocompleteDataLayers(searchWord: string): IDataLayerMain[] {
		return DATA_LAYERS.filter((el) => {
			return el.name.toLowerCase().includes(searchWord.toLowerCase());
		}).map((el) => {
			return {
				id: el.id,
				name: el.name,
				dataProductUuid: el.dataProductUuid,
			};
		});
	}
	public static getLayerById(id: number): IDataLayer {
		return DATA_LAYERS.filter((val) => val.id === id)[0];
	}
	public static getDataProductByUuid(uuid: string): IDataProduct {
		const dataProductResult = DATA_PRODUCTS_META.filter((val) => val.uuid === uuid)[0];
		return {
			dataProduct: dataProductResult,
			layers: DATA_LAYERS.filter((val) => val.dataProductUuid === dataProductResult.uuid).map((el) => {
				return {
					id: el.id,
					name: el.name,
					dataProductUuid: el.dataProductUuid,
				};
			}),
		};
	}
}

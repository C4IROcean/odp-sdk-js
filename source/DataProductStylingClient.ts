import { STYLING_DATA_PRODUCTS } from "./constants";

export interface IDataProductStyling {
	dataProductId: string;
	type?: "circle" | "line" | "fill";
	color?: string;
	strokeColor?: string;
	strokeWidth?: number;
	circleRadius?: number;
	opacity?: number;
	lineStyle?: "dashed";
}

export default class DataProductStylingClient {
	public async getDataProductStyling(dataProductId: string): Promise<IDataProductStyling | undefined> {
		return this._fetchStyling(dataProductId);
	}

	private async _fetchStyling(dataProductId): Promise<IDataProductStyling | undefined> {
		// Filter on hardcoded object for now.
		// Fetch styling from API when available
		return STYLING_DATA_PRODUCTS.find((el) => el.dataProductId === dataProductId);
	}
}

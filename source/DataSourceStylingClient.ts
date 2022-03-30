import { STYLING_DATA_SOURCES } from "./constants";

export interface IDataSourceStyling {
	dataSourceId: string;
	type?: "circle" | "line" | "fill";
	color?: string;
	strokeColor?: string;
	strokeWidth?: number;
	circleRadius?: number;
	opacity?: number;
	lineStyle?: "dashed";
}

export default class DataSourceStylingClient {
	public getDataSourceStyling(dataSourceId: string): IDataSourceStyling | null {
		return this._fetchStyling(dataSourceId);
	}

	private _fetchStyling(dataSourceId): IDataSourceStyling | null {
		// Filter on hardcoded object for now.
		// Fetch styling from API when available
		return STYLING_DATA_SOURCES.find((el) => el.dataSourceId === dataSourceId);
	}
}

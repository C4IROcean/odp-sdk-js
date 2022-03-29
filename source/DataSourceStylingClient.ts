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
	public getStylingOfDataSource(dataSourceId: string): IDataSourceStyling | null {
		return this._fetchStyling(dataSourceId);
	}

	private _fetchStyling(dataSourceId): IDataSourceStyling | null {
		// Filter on hardcoded object for now.
		// Fetch styling from API when available
		return hardcodedStyleObject.find((el) => el.dataSourceId === dataSourceId);
	}
}

const hardcodedStyleObject: Array<IDataSourceStyling> = [
	{
		dataSourceId: "wod-temperature-year-aggregates",
		type: "circle",
		color: "#58FCD4",
		circleRadius: 3,
		strokeWidth: 1,
		strokeColor: "#ffffff",
	},
	{
		dataSourceId: "wod-pressure-aggregates",
		type: "circle",
		color: "#EBB931",
		circleRadius: 3,
		strokeWidth: 1,
		strokeColor: "#ffffff",
	},
	{
		dataSourceId: "wod-oxygen-aggregates",
		type: "circle",
		color: "#E7862E",
		circleRadius: 3,
		strokeWidth: 1,
		strokeColor: "#ffffff",
	},
	{
		dataSourceId: "wod-nitrate-aggregates",
		type: "circle",
		color: "#555BE3",
		circleRadius: 3,
		strokeWidth: 1,
		strokeColor: "#ffffff",
	},
	{
		dataSourceId: "wod-ph-aggregates",
		type: "circle",
		color: "#FE9FE4",
		circleRadius: 3,
		strokeWidth: 1,
		strokeColor: "#ffffff",
	},
	{
		dataSourceId: "wod-chlorophyll-aggregates",
		type: "circle",
		color: "#78C35E",
		circleRadius: 3,
		strokeWidth: 1,
		strokeColor: "#ffffff",
	},
	{
		dataSourceId: "wod-alkalinity-aggregates",
		type: "circle",
		color: "#0E8484",
		circleRadius: 3,
		strokeWidth: 1,
		strokeColor: "#ffffff",
	},
	{
		dataSourceId: "wod-phosphate-aggregates",
		type: "circle",
		color: "#2DB7F1",
		circleRadius: 3,
		strokeWidth: 1,
		strokeColor: "#ffffff",
	},
	{
		dataSourceId: "wod-silicate-aggregates",
		type: "circle",
		color: "#FB6299",
		circleRadius: 3,
		strokeWidth: 1,
		strokeColor: "#ffffff",
	},
	{
		dataSourceId: "norwegian-windfarms",
		type: "fill",
		color: "#98D5A8",
		opacity: 0.5,
	},
	{
		dataSourceId: "norwegian-seacables",
		type: "line",
		color: "#8CA5EC",
		strokeWidth: 1,
		opacity: 0.5,
	},
	{
		dataSourceId: "economic zones",
		type: "line",
		color: "#16BFF4",
		strokeWidth: 1,
		lineStyle: "dashed",
	},
];

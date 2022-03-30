import { ODPClient } from ".";

let odpClient: ODPClient;

jest.mock("./constants.ts", () => ({
	STYLING_DATA_SOURCES: [
		{
			dataSourceId: "testId",
			type: "circle",
			color: "#58FCD4",
			circleRadius: 3,
			strokeWidth: 1,
			strokeColor: "#ffffff",
		},
	],
}));

beforeAll(() => {
	odpClient = new ODPClient(
		{ appId: "Ocean Data Explorer", baseUrl: "https://api.cognitedata.com" },
		{
			clientId: "", // Ocean Data Explorer
			redirectUri: "",
		},
	);
});

test("data source styling should be retrieved", async () => {
	const dataSourceId = "testId";

	const result = await odpClient.getDataSourceStyling(dataSourceId);
	expect(result).toBeDefined();
});

test("non existent data source styling lookup should give undefined", async () => {
	const dataSourceId = "undefined data source styling";

	const result = await odpClient.getDataSourceStyling(dataSourceId);
	expect(result).toBeUndefined();
});

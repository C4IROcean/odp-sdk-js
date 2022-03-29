import { ODPClient } from ".";

let odpClient: ODPClient;

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
	const searchWord = "wod-temperature-year-aggregates";

	const result = await odpClient.getDataSourceStyling(searchWord);
	expect(result).toBeDefined();
});

test("non existent data source styling lookup should give undefined", async () => {
	const searchWord = "undefined data source styling";

	const result = await odpClient.getDataSourceStyling(searchWord);
	expect(result).toBeUndefined();
});

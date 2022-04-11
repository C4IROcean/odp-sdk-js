import ODPClient from "../../ODPClient";

let odpClient: ODPClient;

jest.mock("../../constants.ts", () => ({
	DATA_SOURCES: [
		{
			name: "testTemperatureTilesetName",
			description: "This describes some test institution called worlds oceans protection organization.",
			source: "mapbox",
			id: "testTilesetId",
			sourceUrl: "mapbox://oceandatafoundation",
			tags: ["WOD", "temperature", "testTag-9e832dnas"],
			dataType: "vnd.mapbox-vector-tile",
			filters: ["depth"],
			unit: "°C",
		},
	],
	METADATA_DATA_SOURCES: [
		{
			dataSourceId: "testTilesetId",
			name: "Salinity",
			source: "NOAA",
			tags: ["NOAA", "WOD"],
			description: "test description",
			boundingBox: [-90, -180, 90, 180],
			timeSpan: ["1770", "2020"],
			citation: ["NOAA", "test citation"],
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

test("data source with tag that contains search keyword should be retreived", async () => {
	const searchWord = "testTag";

	const results = await odpClient.searchCatalog(searchWord);
	expect(results.find((result) => result.id === "testTilesetId")).toBeDefined();
});

test("data source with description that contains search keyword should be retreived", async () => {
	const searchWord = "worlds ocean";

	const results = await odpClient.searchCatalog(searchWord);
	expect(results.find((result) => result.id === "testTilesetId")).toBeDefined();
});

test("data source with name that contains search keyword should be retreived", async () => {
	const searchWord = "setna";

	const results = await odpClient.searchCatalog(searchWord);
	expect(results.find((result) => result.id === "testTilesetId")).toBeDefined();
});

test("data source with id that contains search keyword should be retreived", async () => {
	const searchWord = "lesetId";

	const results = await odpClient.searchCatalog(searchWord);
	expect(results.find((result) => result.id === "testTilesetId")).toBeDefined();
});

test("retrieve metadata for existing data source", async () => {
	const dataSourceId = "testTilesetId";

	const results = await odpClient.getMetadataForDataSourceById(dataSourceId);
	expect(results).toBeDefined();
});

test("retrieve no metadata for not existing data source", async () => {
	const dataSourceId = "notExistingId";

	const results = await odpClient.getMetadataForDataSourceById(dataSourceId);
	expect(results).toBeUndefined();
});

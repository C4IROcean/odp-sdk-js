import { ODPClient } from ".";

let odpClient: ODPClient;

jest.mock("./constants.ts", () => ({
	STYLING_DATA_PRODUCTS: [
		{
			dataProductId: "testId",
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

test("data product styling should be retrieved", async () => {
	const dataProductId = "testId";

	const result = await odpClient.getDataProductStyling(dataProductId);
	expect(result).toBeDefined();
});

test("non existent data product styling lookup should give undefined", async () => {
	const dataProductId = "undefined data product styling";

	const result = await odpClient.getDataProductStyling(dataProductId);
	expect(result).toBeUndefined();
});

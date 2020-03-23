import { ODPClient, ITimeSeriesFilter, UnitType } from "../source";

describe("temperature", () => {
	let odp: ODPClient;
	beforeAll(() => {
		jest.setTimeout(30000);

		odp = new ODPClient({ appId: "SDKTests" });
		odp.loginWithApiKey({
			project: process.env.COGNITE_PROJECT,
			apiKey: process.env.COGNITE_KEY,
		});
	});

	test("check if we have connection to Cognite", async () => {
		expect(odp.project).toBe(process.env.COGNITE_PROJECT);
	});

	test("get readings for a specific region", async () => {
		const filter: ITimeSeriesFilter = {
			unit: UnitType.CELSIUS,
			provider: ["simulated"],
			boundingBox: { bottomLeft: { lat: 67.99, lon: 11.99 }, topRight: { lat: 68.01, lon: 12.01 } },
			zoomLevel: 8,
			limit: 500,
		};
		const temps = await odp.timeSeries.temperature.getAll(filter);
		expect(temps.length).toBe(112);
	});

	test.skip("get latest readings for a specific region", async () => {
		const filter: ITimeSeriesFilter = {
			unit: UnitType.CELSIUS,
			provider: ["simulated"],
		};
		const temps = await odp.timeSeries.temperature.getLatest(filter);
		expect(temps.length).toBe(36);
	});
});

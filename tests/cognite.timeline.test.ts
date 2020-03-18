import { ODPClient } from "../source/";

describe("temperature", () => {
	let client: ODPClient;
	beforeAll(() => {
		client = new ODPClient({ appId: "SDKTests" });
		client.loginWithApiKey({
			project: process.env.COGNITE_PROJECT,
			apiKey: process.env.COGNITE_KEY,
		});
	});

	test("check if we have connection to Cognite", async () => {
		expect(client.project).toBe(process.env.COGNITE_PROJECT);
	});

	test("get readings for a specific region", async () => {
		const temps = await client.timeSeries.temperature.seaSurfaceTemperature("", "", "1", "", "simulated");
		// tslint:disable-next-line: no-console
		console.log(JSON.stringify(temps));
		expect(temps.length).toBe(36);
	});
	/*
	test("get latest readings for a specific region", async () => {
		const temps = await timeseries.temperature.latestSeaSurfaceTemperature("47.91", "0.34", "1", "simulated");
		// tslint:disable-next-line: no-console
		console.log(JSON.stringify(temps));
		expect(temps.length).toBe(36);
	});
	*/
});

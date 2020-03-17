import { timeseries } from "../source/";

describe("temperature", () => {
	test("get readings for a specific region", async () => {
		const temps = await timeseries.temperature.getSeaSurfaceTemperature("", "", "1", "", "simulated");
		// tslint:disable-next-line: no-console
		console.log(JSON.stringify(temps));
		expect(temps.length).toBe(36);
	});

	test("get latest readings for a specific region", async () => {
		const temps = await timeseries.temperature.getLatestSeaSurfaceTemperature("47.91", "0.34", "1", "simulated");
		// tslint:disable-next-line: no-console
		console.log(JSON.stringify(temps));
		expect(temps.length).toBe(36);
	});
});

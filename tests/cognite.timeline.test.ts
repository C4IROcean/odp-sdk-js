import { timelines } from "../source/";

describe("temperature", () => {
	test("get latest readings for a specific region", async () => {
		const temps = await timelines.temperature.getSeaSurfaceTemperature("", "", "", "", "");
		expect(temps.length).toBe(36);
	});
});

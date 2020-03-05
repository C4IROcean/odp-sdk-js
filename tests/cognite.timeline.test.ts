import { getSeaSurfaceTemperature } from "../source/cognite/timeline/temperature";

describe("temperature", () => {
	test("get latest readings for a specific region", async () => {
		const temps = await getSeaSurfaceTemperature("", "", "", "", "");
		expect(temps.length).toBe(36);
	});
});

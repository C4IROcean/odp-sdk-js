import { ODPClient } from "../source";

describe("sequences", () => {
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

	test("get cast count", async () => {
		const count = await odp.sequences.casts.getCastsCount();
		expect(count.length).toBe(33056);
	});

	test.only("get cast years", async () => {
		const years = await odp.sequences.casts.getCastYears();
		expect(years.length).toBe(3);
	});

	test("get cast count for a single location", async () => {
		const count = await odp.sequences.casts.getCastsCount({
			year: 2018,
			geoFilter: { location: { latitude: 20, longitude: 173 } },
		});
		expect(count.length).toBe(1);
	});

	test("get a specific cast", async () => {
		const values = await odp.sequences.casts.getCastRows({ castId: "cast_wod_3_2018_63470_18777858" });
		expect(values.length).toBe(115);
		expect(values[0].value.temperature.value).toBe(25.790000915527344);
	});

	test("get casts from polygon", async () => {
		/*const polygon = [
			{ longitude: 0.1, latitude: 0.1 },
			{ longitude: 0.1, latitude: 1.1 },
			{ longitude: 2.2, latitude: 1.1 },
			{ longitude: 2.1, latitude: 0.1 },
			{ longitude: 0.1, latitude: 0.1 },
		];*/

		const polygon = [
			{ longitude: 170, latitude: 15 },
			{ longitude: 170, latitude: 25 },
			{ longitude: 180, latitude: 25 },
			{ longitude: 180, latitude: 15 },
			{ longitude: 170, latitude: 15 },
		];
		const values = await odp.sequences.casts.getCastsFromPolygon({ year: 2018, geoFilter: { polygon } });
		expect(values.length).toBe(370);
	});

	test("get casts level 2", async () => {
		const values = await odp.sequences.casts.getCasts({
			year: 2018,
			geoFilter: { location: { latitude: 32, longitude: 131 } },
		});
		expect(values.length).toBe(85);
	});

	test("get rows from polygon", async () => {
		const polygon = [
			{ longitude: -1, latitude: 59 },
			{ longitude: -1, latitude: 61 },
			{ longitude: 3, latitude: 61 },
			{ longitude: 3, latitude: 59 },
			{ longitude: -1, latitude: 59 },
		];
		const values = await odp.sequences.casts.getCastRowsFromPolygon({ year: 2018, geoFilter: { polygon } });
		expect(values.length).toBe(15570);
	});
});

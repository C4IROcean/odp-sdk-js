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
		expect(count.length).toBe(27300);
	});

	test("get cast count for a single location", async () => {
		const count = await odp.sequences.casts.getCastsCount({ lat: 12, lon: 12 });
		expect(count.length).toBe(1);
	});

	test("get a specific cast", async () => {
		const values = await odp.sequences.casts.getCastRows("wod_detail_133_32");
		expect(values.length).toBe(232);
		expect(values[0].value.temperature).toBe(156.4);
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
			{ longitude: -5, latitude: 57 },
			{ longitude: -5, latitude: 62 },
			{ longitude: 5, latitude: 62 },
			{ longitude: 5, latitude: 57 },
			{ longitude: -5, latitude: 57 },
		];
		const values = await odp.sequences.casts.getCastsFromPolygon(polygon);
		expect(values.length).toBe(8);
	});

	test("get casts level 2", async () => {
		const values = await odp.sequences.casts.getCasts({ lat: 32, lon: 131 });
		expect(values.length).toBe(2);
	});

	test("get rows from polygon", async () => {
		const polygon = [
			{ longitude: -5, latitude: 57 },
			{ longitude: -5, latitude: 62 },
			{ longitude: 5, latitude: 62 },
			{ longitude: 5, latitude: 57 },
			{ longitude: -5, latitude: 57 },
		];
		const values = await odp.sequences.casts.getCastRowsFromPolygon(polygon);
		expect(values.length).toBe(1231);
	});
});

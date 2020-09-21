import { ODPClient, CastColumnType, ObservedLevelFlag } from "../source";

describe("sequences", () => {
	let odp: ODPClient;
	beforeAll(() => {
		jest.setTimeout(60000);

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
		const count = await odp.casts.getCastsCount();
		expect(count.length > 38632).toBeTruthy();
	});

	test("get cast years", async () => {
		const years = await odp.casts.getCastYears();
		expect(years.length > 8).toBeTruthy();
	});

	test("get cast count for a single location", async () => {
		const count = await odp.casts.getCastsCount({
			year: 2018,
			geoFilter: { location: { latitude: 20, longitude: 173 } },
		});
		expect(count.length).toBe(1);
	});

	test("get a specific cast", async () => {
		const values = await odp.casts.getCastRows({ castId: "cast_wod_3_2018_63470_18777858" });
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
		const values = await odp.casts.getCasts({
			year: 2018,
			geoFilter: { polygon },
			columns: [CastColumnType.TEMPERATURE],
		});
		expect(values.length).toBe(370);
	});

	test("get casts level 2", async () => {
		const values = await odp.casts.getCasts({
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
		const values = await odp.casts.getCastRows({
			year: 2018,
			geoFilter: { polygon },
			columns: [CastColumnType.TEMPERATURE],
		});
		expect(values.length > 15500).toBeTruthy();
		expect(values[0].value.temperature).toBeTruthy();
		expect(values[0].value.nitrate).toBeFalsy();
	});

	test("get source file url for cast", async () => {
		const url = await odp.casts.getCastSourceFileUrl({
			castId: "cast_wod_3_2018_32370_19272466",
		});
		expect(url[0].downloadUrl).toMatch(
			/^https:\/\/api.cognitedata.com\/api\/v1\/files\/gcs_proxy\/cognite-storage/,
		);
		expect(url[0].castId).toBe("cast_wod_3_2018_32370_19272466");
	});

	test("filter polygon rows by quality", async () => {
		const polygon = [
			{ longitude: 1.8, latitude: 56 },
			{ longitude: 1.8, latitude: 57 },
			{ longitude: 2, latitude: 57 },
			{ longitude: 2, latitude: 56 },
			{ longitude: 1.8, latitude: 56 },
		];
		const values = await odp.casts.getCastRows({
			year: 2018,
			geoFilter: { polygon },
			quality: ObservedLevelFlag.FAILED_GRADIENT_CHECK,
			columns: [CastColumnType.TEMPERATURE],
		});
		expect(values.length).toBe(543);
		expect(values[0].value.temperature).toBeTruthy();
		expect(values[0].value.temperature.flags.wod).toBe(ObservedLevelFlag.FAILED_GRADIENT_CHECK);
		expect(values[0].value.nitrate).toBeFalsy();
	});
});

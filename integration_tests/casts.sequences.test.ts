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
});

import { ODPClient } from "../source";

describe.only("marine regions", () => {
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
	test("get marine regions type", async () => {
		const mr = await odp.sequences.marineRegions.getChildRegions();
		expect(mr.length).toBe(13);
	});

	test("get marine regions eez", async () => {
		const mr = await odp.sequences.marineRegions.getChildRegions(7151095269305513);
		expect(mr.length).toBe(281);
	});

	test("get marine region polygon", async () => {
		const mrpol = await odp.sequences.marineRegions.getPolygons(232174795580313);
		expect(mrpol.polygon.length).toBe(11849);
	});
});

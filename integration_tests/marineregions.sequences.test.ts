import { ODPClient } from "../source";

let odp: ODPClient;
beforeAll(() => {
	jest.setTimeout(60000);

	odp = new ODPClient(
		{
			appId: "SDKTests",
			apiKeyMode: true,
			project: process.env.COGNITE_PROJECT,
			getToken: () => Promise.resolve(process.env.COGNITE_KEY),
		},
		{ clientId: "" },
	);
});

test("check if we have connection to Cognite", async () => {
	expect(odp.project).toBe(process.env.COGNITE_PROJECT);
});
test("get marine regions type", async () => {
	const mr = await odp.unstable.marineRegions.getRegionTypes();
	expect(mr.length).toBe(13);
});

test("get marine regions eez", async () => {
	const mr = await odp.unstable.marineRegions.getMarineRegions(7151095269305513);
	expect(mr.length).toBe(281);
});

test.skip("get marine regions eez with polygons", async () => {
	const mr = await odp.unstable.marineRegions.getMarineRegions(7151095269305513, true);
	expect(mr.length).toBe(281);
});

test("get marine region polygon", async () => {
	const mrpol = await odp.unstable.marineRegions.getMarineRegion(232174795580313);
	expect(mrpol.polygon.length).toBe(11849);
});

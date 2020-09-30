import { ODPClient } from "../source";
// tslint:disable: no-console

const apiKey: string = process.env.ODP_CREDENTIALS || "";
if (!apiKey) {
	throw Error("You must set the environment variable ODP_CREDENTIALS to your api-key to be able to run the example.");
}
const odp = new ODPClient({ appId: "ODP samples" });
odp.loginWithApiKey({
	project: "odp",
	apiKey,
});

/**
 * Get all available marine region types
 */
async function getMarineRegions() {
	console.log("Get marine region types");
	const result = await odp.marineRegions.getRegionTypes();
	console.log("\tFound " + result.length + " marine region types");
}

/**
 * Get all regions of a given region type
 */
async function getMarineRegionsOfAGivenType() {
	console.log("Get all regions of a given region type");
	const result = await odp.marineRegions.getMarineRegions(7151095269305513);
	console.log("\tFound " + result.length + " marine regions in " + 7151095269305513);
}

/**
 * Get polygon for a given marine region
 */
async function getMarineRegionPolygon() {
	console.log("Get polygon for a given marine region");
	const result = await odp.marineRegions.getMarineRegion(232174795580313);

	console.log("\tFound marine region with polygon of " + result.polygon.length + " length");
}

getMarineRegions()
	.then(() => getMarineRegionsOfAGivenType())
	.then(() => getMarineRegionPolygon());

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
 * Get at global count of all casts
 */
async function getGlobalCastCount() {
	console.log("Global cast count");
	const result = await odp.sequences.casts.getCastsCount({});
	console.log("\tFound " + result.length + " global casts");
}

/**
 * Get global count of casts for a given year
 */
async function getGlobalCastCountForAGivenYear() {
	console.log("Global cast count for a given year");
	const result = await odp.sequences.casts.getCastsCount({ year: 2015 });
	console.log("\tFound " + result.length + " global casts from 2015");
}

/**
 * Get cast count for a given polygon and find average sea surface temperature and sea bed temperature
 */
async function getCastsFromPolygon() {
	console.log("Casts for a given polygon");
	const result = await odp.sequences.casts.getCasts({
		year: 2018,
		geoFilter: {
			polygon: [
				{ latitude: 68, longitude: 9 },
				{ latitude: 68, longitude: 0 },
				{ latitude: 71, longitude: 0 },
				{ latitude: 71, longitude: 9 },
				{ latitude: 68, longitude: 9 },
			],
		},
	});
	console.log("\tFound " + result.length + " casts");

	let topTemp = 0;
	let bottomTemp = 0;
	let numValues = 0;
	for (const cast of result) {
		topTemp += +cast.value.Temperature_first;
		bottomTemp += +cast.value.Temperature_last;
		numValues += +cast.value.castSize;
	}
	console.log("\tAverage see surface temperatures: " + topTemp / result.length + " celsius");
	console.log("\tAverage see bottom temperatures: " + bottomTemp / result.length + " celsius");
	console.log("\tNumber of readings " + numValues);
}

/**
 * Get cast row values for a given polygon and calculate max/min/average temperature for casts within the polygon
 */
async function getCastRowsFromPolygon() {
	console.log("Cast rows for a given polygon");
	const result = await odp.sequences.casts.getCastRows({
		year: 2018,
		geoFilter: {
			polygon: [
				{ latitude: 68, longitude: 9 },
				{ latitude: 68, longitude: 0 },
				{ latitude: 71, longitude: 0 },
				{ latitude: 71, longitude: 9 },
				{ latitude: 68, longitude: 9 },
			],
		},
	});
	console.log("\tFound " + result.length + " cast rows");
	let maxTemp = -100;
	let minTemp = 100;
	let averageTemp = 0;
	let numTempValues = 0;
	for (const cast of result) {
		if (!cast.value.temperature) {
			continue;
		}
		numTempValues++;
		if (cast.value.temperature.value > maxTemp) {
			maxTemp = +cast.value.temperature.value;
		}
		if (cast.value.temperature.value < minTemp) {
			minTemp = +cast.value.temperature.value;
		}
		averageTemp += +cast.value.temperature.value;
	}
	console.log("\tMax temperature: " + maxTemp + " celsius");
	console.log("\tMin temperature: " + minTemp + " celsius");
	console.log("\tAverage temperature " + averageTemp / numTempValues + " celsius");
}

getGlobalCastCount()
	.then(() => getGlobalCastCountForAGivenYear())
	.then(() => getCastsFromPolygon())
	.then(() => getCastRowsFromPolygon());

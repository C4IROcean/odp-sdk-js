import { ODPClient, ITimeSeriesFilter, UnitType } from ".";
import { Readable } from "stream";
import * as ndjson from "ndjson";

let odp: ODPClient;

odp = new ODPClient({ appId: "SDKTests" });
odp.loginWithApiKey({
	project: process.env.COGNITE_PROJECT,
	apiKey: process.env.COGNITE_KEY,
});

const test = async () => {
	const filter: ITimeSeriesFilter = {
		provider: ["World Ocean Atlas"],
		limit: 100,
		unit: UnitType.CELSIUS,
	};
	for (let index = 0; index < 10; index++) {
		const temps = [];
		const readableStream = new Readable({
			read() {
				// should be empty
			},
		})
			.pipe(ndjson.parse())
			.on("data", (json) => {
				temps.push(...json);
			});
		// tslint:disable-next-line: no-console
		console.time("sequence");
		await odp.timeSeries.temperature.getAll(filter, readableStream);
		// tslint:disable-next-line: no-console
		console.timeEnd("sequence");
	}
};

test().then(() => {
	// tslint:disable-next-line: no-console
	console.log("done");
});

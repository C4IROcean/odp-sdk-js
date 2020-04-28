import { ODPClient, ITimeSeriesFilter, UnitType, GetDoubleDatapoint, GetAggregateDatapoint } from "../source";
import { Readable } from "stream";
import * as ndjson from "ndjson";

describe("temperature", () => {
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

	test("get readings for a specific region", async () => {
		const filter: ITimeSeriesFilter = {
			unit: UnitType.CELSIUS,
			provider: ["simulated"],
			geoFilter: {
				boundingBox: { bottomLeft: { lat: 67.99, lon: 11.99 }, topRight: { lat: 68.01, lon: 12.01 } },
			},
			zoomLevel: 8,
			limit: 500,
		};
		const temps = await odp.timeSeries.temperature.getAll(filter);
		expect(temps.length).toBe(1);
		expect(typeof temps[0].location.lat).toBe("number");
		expect(typeof temps[0].location.long).toBe("number");
	});

	test("get latest readings for a specific region", async () => {
		const filter: ITimeSeriesFilter = {
			unit: UnitType.CELSIUS,
			provider: ["simulated"],
			limit: 100,
		};
		const temps = await odp.timeSeries.temperature.getLatest(filter);
		expect(temps.length).toBe(100);
	});

	test("get latest readings for a specific region using stream", async () => {
		const filter: ITimeSeriesFilter = {
			unit: UnitType.CELSIUS,
			provider: ["simulated"],
			limit: 100,
		};

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

		await odp.timeSeries.temperature.getLatest(filter, readableStream);
		expect(temps.length).toBe(100);
	});

	test("get readings from a specific timeline", async () => {
		const filter: ITimeSeriesFilter = {
			unit: UnitType.CELSIUS,
			provider: ["simulated"],
		};

		const temps = await odp.timeSeries.temperature.get(["sim_N68.0_E11.8_0_temprature"], filter);
		expect(temps.length).toBe(1);
		expect(temps[0].dataPoints.length).toBe(31);
		expect(temps[0].dataPoints[0].timestamp.getTime()).toBe(1577833200000);
		expect((temps[0].dataPoints[0] as GetDoubleDatapoint).value).toBe(9.299999999999997);
	});

	test("get aggregate readings from a specific timeline", async () => {
		const filter: ITimeSeriesFilter = {
			unit: UnitType.CELSIUS,
			provider: ["simulated"],
			aggregation: { aggregationFunctions: ["average"], granularity: "7d" },
		};

		const temps = await odp.timeSeries.temperature.get(["sim_N68.0_E11.8_0_temprature"], filter);
		expect(temps.length).toBe(1);
		expect(temps[0].dataPoints.length).toBe(6);
		expect(temps[0].dataPoints[0].timestamp.getTime()).toBe(1577318400000);
		expect((temps[0].dataPoints[3] as GetAggregateDatapoint).average).toBe(9.65999999999999);
	});

	test("get time specific readings from a specific timeline", async () => {
		const filter: ITimeSeriesFilter = {
			unit: UnitType.CELSIUS,
			provider: ["simulated"],
			time: { max: new Date(1579500679000), min: new Date(1578204679000) },
		};

		const temps = await odp.timeSeries.temperature.get(["sim_N68.0_E11.8_0_temprature"], filter);
		expect(temps.length).toBe(1);
		expect(temps[0].dataPoints.length).toBe(15);
		expect(temps[0].dataPoints[0].timestamp.getTime()).toBe(1578265200000);
		expect((temps[0].dataPoints[0] as GetDoubleDatapoint).value).toBe(9.379999999999995);
	});
});

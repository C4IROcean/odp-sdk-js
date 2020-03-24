import { ODPClient, ITimeSeriesFilter, UnitType } from "../source";
import { TimeSeries } from "../source/timeSeries/";

describe("filter", () => {
	const odp: ODPClient = null;
	let timeSeries: TimeSeries;
	beforeAll(() => {
		timeSeries = new TimeSeries(odp);
	});

	test("simpleFilter", () => {
		const filter: ITimeSeriesFilter = { unit: UnitType.CELSIUS };
		const query = timeSeries.queryBuilder(filter);
		expect(query.length).toBe(1);
		expect(query[0].limit).toBe(100);
		expect(query[0].filter.unit).toBe(UnitType.CELSIUS);
	});

	test("geoFilter", () => {
		const filter: ITimeSeriesFilter = {
			unit: UnitType.CELSIUS,
			limit: 500,
			boundingBox: { bottomLeft: { lat: 67, lon: 11 }, topRight: { lat: 68, lon: 12 } },
			zoomLevel: 3,
		};
		const query = timeSeries.queryBuilder(filter);
		expect(query.length).toBe(100);
		expect(query[0].filter.metadata.geo_key).toBe("N67.0_E11.0");
		expect(query[query.length - 1].filter.metadata.geo_key).toBe("N67.9_E11.9");
		expect(query[0].limit).toBe(500);
		expect(query[0].filter.unit).toBe(UnitType.CELSIUS);
	});

	test("advancedFilter", () => {
		const filter: ITimeSeriesFilter = {
			unit: UnitType.CELSIUS,
			limit: 500,
			boundingBox: { bottomLeft: { lat: 67.9, lon: 11.9 }, topRight: { lat: 68.1, lon: 12.1 } },
			zoomLevel: 8,
			provider: ["provider1", "provider2"],
			depth: { max: 500, min: 0 },
		};
		const query = timeSeries.queryBuilder(filter);
		expect(query.length).toBe(400000);
		expect(query[0].filter.metadata.geo_key).toBe("N67.900_E11.900");
		expect(query[query.length - 1].filter.metadata.geo_key).toBe("N68.099_E12.099");
		expect(query[0].limit).toBe(500);
		expect(query[0].filter.unit).toBe(UnitType.CELSIUS);
	});
});

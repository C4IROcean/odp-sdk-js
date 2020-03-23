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
			boundingBox: { bottomLeft: { lat: 67, lon: 11 }, topRight: { lat: 70, lon: 13 } },
			zoomLevel: 3,
		};
		const query = timeSeries.queryBuilder(filter);
		expect(query.length).toBe(651);
		expect(query[0].filter.metadata.geo_key).toBe("N67.0_E11.0");
		expect(query[query.length - 1].filter.metadata.geo_key).toBe("N70.0_E13.0");
		expect(query[0].limit).toBe(500);
		expect(query[0].filter.unit).toBe(UnitType.CELSIUS);
	});
});

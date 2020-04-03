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
			zoomLevel: 6,
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
		expect(query.length).toBe(3800);
		expect(query[0].filter.metadata.geo_key).toBe("N67.90_E11.90");
		expect(query[query.length - 1].filter.metadata.geo_key).toBe("N68.08_E12.09");
		expect(query[0].limit).toBe(500);
		expect(query[0].filter.unit).toBe(UnitType.CELSIUS);
	});

	test("datapointFilter", () => {
		const filter: ITimeSeriesFilter = {
			unit: UnitType.CELSIUS,
			limit: 500,
			aggregation: { aggregationFunctions: ["average"], granularity: "1d" },
			time: { max: new Date(1585203079000), min: new Date(1582697479000) },
		};
		const DPFilter = timeSeries.datapointFilter(filter);
		expect(DPFilter.limit).toBe(500);
		expect(DPFilter.aggregates.length).toBe(1);
		expect(DPFilter.granularity).toBe("1d");
		expect((DPFilter.start as Date).getTime()).toBe(1582697479000);
		expect((DPFilter.end as Date).getTime()).toBe(1585203079000);
	});
});

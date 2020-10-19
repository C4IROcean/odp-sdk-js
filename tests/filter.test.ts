import { ODPClient, ITimeSeriesFilter, UnitTypeEnum } from "../source";
import { TimeSeries } from "../source/utils/timeSeries/";

describe("filter", () => {
	const odp: ODPClient = null;
	let timeSeries: TimeSeries;
	beforeAll(() => {
		timeSeries = new TimeSeries(odp);
	});

	test("simpleFilter", async () => {
		const filter: ITimeSeriesFilter = { unit: UnitTypeEnum.CELSIUS };
		const query = await timeSeries.queryBuilder(filter);
		expect(query.length).toBe(1);
		expect(query[0].limit).toBe(100);
		expect(query[0].filter.unit).toBe(UnitTypeEnum.CELSIUS);
	});

	test("geoFilter", async () => {
		const filter: ITimeSeriesFilter = {
			unit: UnitTypeEnum.CELSIUS,
			limit: 500,
			geoFilter: {
				boundingBox: { bottomLeft: { latitude: 67, longitude: 11 }, topRight: { latitude: 68, longitude: 12 } },
			},
			zoomLevel: 6,
		};
		const query = await timeSeries.queryBuilder(filter);
		expect(query.length).toBe(100);
		expect(query[0].filter.metadata.geo_key).toBe("N67.0_E11.0");
		expect(query[query.length - 1].filter.metadata.geo_key).toBe("N67.9_E11.9");
		expect(query[0].limit).toBe(500);
		expect(query[0].filter.unit).toBe(UnitTypeEnum.CELSIUS);
	});

	test("mrgidFilter", async () => {
		const filter: ITimeSeriesFilter = {
			unit: UnitTypeEnum.CELSIUS,
			limit: 500,
			geoFilter: { mrgid: 48975 },
			zoomLevel: 6,
		};
		const query = await timeSeries.queryBuilder(filter);
		expect(query.length).toBe(1000);
		expect(query[0].filter.metadata.geo_key).toBe("N68.0_E-10.5");
		expect(query[query.length - 1].filter.metadata.geo_key).toBe("N70.4_E-6.6");
		expect(query[0].limit).toBe(500);
		expect(query[0].filter.unit).toBe(UnitTypeEnum.CELSIUS);
	});

	test("advancedFilter", async () => {
		const filter: ITimeSeriesFilter = {
			unit: UnitTypeEnum.CELSIUS,
			limit: 500,
			geoFilter: {
				boundingBox: {
					bottomLeft: { latitude: 67.9, longitude: 11.9 },
					topRight: { latitude: 68.1, longitude: 12.1 },
				},
			},
			zoomLevel: 8,
			provider: ["provider1", "provider2"],
			depth: { max: 500, min: 0 },
		};
		const query = await timeSeries.queryBuilder(filter);
		expect(query.length).toBe(28120);
		expect(query[0].filter.metadata.geo_key).toBe("N67.90_E11.90");
		expect(query[query.length - 1].filter.metadata.geo_key).toBe("N68.08_E12.09");
		expect(query[0].limit).toBe(500);
		expect(query[0].filter.unit).toBe(UnitTypeEnum.CELSIUS);
	});

	test("datapointFilter", () => {
		const filter: ITimeSeriesFilter = {
			unit: UnitTypeEnum.CELSIUS,
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

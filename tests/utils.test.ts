import * as sequenceUtils from "../source/sequences/utils";

describe("utils", () => {
	test("sequence utils", async () => {
		expect(sequenceUtils.mapCoordinateToIndex({ lat: 20, lon: 173 })).toBe(63470);
		expect(sequenceUtils.gridCoordinateToIndex(2, 1, 1)).toBe(181);
		expect(sequenceUtils.indexToGridCoordinate(181, 1).x).toBe(2);
		expect(sequenceUtils.indexToGridCoordinate(181, 1).y).toBe(1);
		expect(sequenceUtils.indexToGridCoordinate(3600, 1).x).toBe(20);
		expect(sequenceUtils.indexToGridCoordinate(64800, 1).x).toBe(360);
		// expect(sequenceUtils.indexToMapCoordinate(64800, 1).lat).toBe(360);
		expect(sequenceUtils.indexToMapCoordinate(63651, 1).lat).toBe(20.5);
		expect(sequenceUtils.indexToMapCoordinate(3600, 1).lat).toBe(89.5);
		expect(sequenceUtils.mapCoordinateToIndex({ lat: -89.3, lon: -179 })).toBe(1);
		expect(sequenceUtils.mapCoordinateToIndex({ lat: 20, lon: 173 })).toBe(63470);
		expect(sequenceUtils.indexToMapCoordinate(63470, 1).lat).toBe(19.5);
	});
});

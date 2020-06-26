import * as sequenceUtils from "../source/sequences/utils";

describe("utils", () => {
	test("sequence utils", async () => {
		expect(sequenceUtils.gridCoordinateToIndex(2, 1, 1)).toBe(181);
		expect(sequenceUtils.indexToGridCoordinate(3600, 1).x).toBe(20);
		expect(sequenceUtils.indexToMapCoordinate(3600, 1).lat).toBe(89.5);
		expect(sequenceUtils.mapCoordinateToIndex({ lat: -89.3, lon: -179 })).toBe(181);
	});
});

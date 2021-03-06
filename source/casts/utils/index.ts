import { IGeoLocation, CastColumnTypeEnum } from "../..";

const start = 1;

/**
 * Returns cartesian grid coordinates, given index and resolution
 *
 * @param index
 * @param resolution resolution, defaults to 1
 */
export const indexToGridCoordinate = (index, resolution = 1) => {
	const lat_range = resolution * 180;
	const x_loc = Math.floor((index - start) / lat_range + start);
	const y_loc = ((index - start) % lat_range) + start;
	return { x: x_loc, y: y_loc };
};

// returns index of specific grid-coordinate, given x and y coordinates
export const gridCoordinateToIndex = (x, y, resolution = 1): number => ((x - start) * 180) / resolution + y;

export const mapCoordinateToIndex = (location: IGeoLocation, resolution = 1): number => {
	// returns index of specific grid-coordinate, given lon lat
	const lat = location.latitude + 90;
	const lon = location.longitude + 180;

	const roundLat = resolution * Math.ceil(lat / resolution);
	const roundLong = resolution * Math.ceil(lon / resolution);

	const x = Math.floor(roundLong / resolution);
	const y = Math.floor(roundLat / resolution);

	return ((x - start) * 180) / resolution + y;
};

export const indexToMapCoordinate = (index, resolution = 1): IGeoLocation => {
	// Index to longitude and latitude
	const location = indexToGridCoordinate(index, resolution);
	const longitude = -180 + (location.x - 0.5) / resolution; // +0.5 is to put location to center of grid tile
	const latitude = -90 + (location.y - 0.5) / resolution;
	return { longitude, latitude };
};

// Handle date strings on the format YYYYMMDD
export const convertStringToDate = (dateString: string): Date => {
	const dateComponents: Array<number> = [];
	dateString = dateString.replace(/-/g, "");
	// parse year
	if (dateString.length >= 4) {
		dateComponents.push(parseInt(dateString.slice(0, 4), 10));
	}

	// parse month
	if (dateString.length >= 6) {
		dateComponents.push(parseInt(dateString.slice(5, 6), 10) - 1);
	}

	// parse day
	if (dateString.length >= 8) {
		dateComponents.push(parseInt(dateString.slice(7, 8), 10));
	}

	// ensure date components were parsed correctly
	if (dateComponents.filter(isNaN).length > 0) {
		throw new Error(`Failed to parse "${dateString}" into a valid date`);
	}

	// create new date and validate
	const date = new Date(...(dateComponents as [number, number, number]));
	if (isNaN(date.getTime())) {
		throw new Error(`Failed to parse "${dateString}" into a valid date`);
	}

	return date;
};
/*
export const cornerCoordinatesToAllCoordinates = (corners, resolution = 1) => {
	// ***needs verification***

	// tuple of tuples ->((x1,y1),(x2,y2)) or ((x1,x2))
	const x1 = corners[0][0];
	const y1 = corners[0][1];
	let x2;
	let y2;
	if (corners.length === 1) {
		x2 = corners[0][0];
		y2 = corners[0][1];
	} else {
		x2 = corners[1][0];
		y2 = corners[1][1];
	}
	const boxCoords = []; // list of all coordinate tuples within the box
	const boxIndexes = []; // list of all indexes within the box

	for (let x = Math.min(x1, x2); x < Math.max(x1, x2) + 1; x++) {
		for (let y = Math.min(y1, y2); y < Math.max(y1, y2) + 1; y++) {
			boxCoords.push(x, y);
			boxIndexes.push(gridCoordinateToIndex(x, y, resolution));
		}
	}

	return [boxCoords, boxIndexes];
};
*/
export const getColumnsFromEnum = (cols: Array<CastColumnTypeEnum>, available) => {
	const columns = ["date", "lat", "lon", "z"];

	for (const col of cols) {
		if (col === CastColumnTypeEnum.NITRATE && available.includes("Nitrate")) {
			columns.push("Nitrate");
			columns.push("Nitrate_WODflag");
			columns.push("Nitrate_origflag");
		} else if (col === CastColumnTypeEnum.TEMPERATURE && available.includes("Temperature")) {
			columns.push("Temperature");
			columns.push("Temperature_WODflag");
			columns.push("Temperature_origflag");
		} else if (col === CastColumnTypeEnum.OXYGEN && available.includes("Oxygen")) {
			columns.push("Oxygen");
			columns.push("Oxygen_WODflag");
			columns.push("Oxygen_origflag");
		} else if (col === CastColumnTypeEnum.SALINITY && available.includes("Salinity")) {
			columns.push("Salinity");
			columns.push("Salinity_WODflag");
			columns.push("Salinity_origflag");
		} else if (col === CastColumnTypeEnum.CHLOROPHYLL && available.includes("Chlorophyll")) {
			columns.push("Chlorophyll");
			columns.push("Chlorophyll_WODflag");
			columns.push("Chlorophyll_origflag");
		} else if (col === CastColumnTypeEnum.PRESSURE && available.includes("Pressure")) {
			columns.push("Pressure");
			columns.push("Pressure_WODflag");
			columns.push("Pressure_origflag");
		} else if (col === CastColumnTypeEnum.PRESSURE && available.includes("pH")) {
			columns.push("pH");
			columns.push("pH_WODflag");
			columns.push("pH_origflag");
		} else if (col === CastColumnTypeEnum.ALKALINITY && available.includes("Alkalinity")) {
			columns.push("Alkalinity");
			columns.push("Alkalinity_WODflag");
			columns.push("Alkalinity_origflag");
		} else if (col === CastColumnTypeEnum.PRESSURE && available.includes("plankton")) {
			columns.push("plankton");
			columns.push("plankton_WODflag");
			columns.push("plankton_origflag");
		}
	}
	return columns;
};

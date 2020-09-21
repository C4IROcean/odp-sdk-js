import { IGeoLocation, CastColumnType } from "../..";

const start = 1;

export const indexToGridCoordinate = (index, resolution = 1) => {
	// returns cartesian grid coordinates, given index and resolution
	const lat_range = resolution * 180;
	const x_loc = Math.floor((index - start) / lat_range + start);
	const y_loc = ((index - start) % lat_range) + start;
	return { x: x_loc, y: y_loc };
};

export const gridCoordinateToIndex = (x, y, resolution = 1): number => {
	// returns index of specific grid-coordinate, given x and y coordinates
	return ((x - start) * 180) / resolution + y;
};

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
export const getColumnsFromEnum = (cols: Array<CastColumnType>, available) => {
	const columns = ["date", "lat", "lon", "Latitude", "Longitude", "z"];

	for (const col of cols) {
		if (col === CastColumnType.NITRATE && available.includes("Nitrate")) {
			columns.push("Nitrate");
			columns.push("Nitrate_WODflag");
			columns.push("Nitrate_origflag");
		} else if (col === CastColumnType.TEMPERATURE && available.includes("Temperature")) {
			columns.push("Temperature");
			columns.push("Temperature_WODflag");
			columns.push("Temperature_origflag");
		} else if (col === CastColumnType.OXYGEN && available.includes("Oxygen")) {
			columns.push("Oxygen");
			columns.push("Oxygen_WODflag");
			columns.push("Oxygen_origflag");
		} else if (col === CastColumnType.SALINITY && available.includes("Salinity")) {
			columns.push("Salinity");
			columns.push("Salinity_WODflag");
			columns.push("Salinity_origflag");
		} else if (col === CastColumnType.CHLOROPHYLL && available.includes("Chlorophyll")) {
			columns.push("Chlorophyll");
			columns.push("Chlorophyll_WODflag");
			columns.push("Chlorophyll_origflag");
		} else if (col === CastColumnType.PRESSURE && available.includes("Pressure")) {
			columns.push("Pressure");
			columns.push("Pressure_WODflag");
			columns.push("Pressure_origflag");
		} else if (col === CastColumnType.PRESSURE && available.includes("pH")) {
			columns.push("pH");
			columns.push("pH_WODflag");
			columns.push("pH_origflag");
		}
	}
	return columns;
};

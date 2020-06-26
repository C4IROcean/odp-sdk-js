import { IGeoLocation } from "..";

export const indexToGridCoordinate = (index, resolution = 1) => {
	// returns cartesian grid coordinates, given index and resolution
	const lat_range = resolution * 180;
	const x_loc = Math.floor((index - 1) / lat_range + 1);
	const y_loc = ((index - 1) % lat_range) + 1;
	return { x: x_loc, y: y_loc };
};

export const gridCoordinateToIndex = (x, y, resolution = 1): number => {
	// returns index of specific grid-coordinate, given
	return (x - 1) * 180 * resolution + y;
};

export const mapCoordinateToIndex = (location: IGeoLocation, resolution = 1): number => {
	// returns index of specific grid-coordinate, given

	const x = Math.floor((180 + location.lon) * resolution);
	const y = Math.floor((90 + location.lat) * resolution);

	return x * 180 + y + 1;
};

export const indexToMapCoordinate = (index, resolution = 1): IGeoLocation => {
	// Index to longitude and latitude
	const location = indexToGridCoordinate(index, resolution);
	const longitude = -180 + (location.x - 0.5) / resolution; // +0.5 is to put location to center of grid tile
	const latitude = -90 + (location.y - 0.5) / resolution;
	return { lon: longitude, lat: latitude };
};

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

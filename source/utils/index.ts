import * as https from "https";
import { IBoundingBox } from "../types/types";

export const throttleActions = (listOfCallableActions, limit, stream?) => {
	// We'll need to store which is the next promise in the list.
	let i = 0;
	const resultArray = new Array(listOfCallableActions.length);

	// Now define what happens when any of the actions completes. Javascript is
	// (mostly) single-threaded, so only one completion handler will call at a
	// given time. Because we return doNextAction, the Promise chain continues as
	// long as there's an action left in the list.
	function doNextAction() {
		if (i < listOfCallableActions.length) {
			// Save the current value of i, so we can put the result in the right place
			const actionIndex = i++;
			const nextAction = listOfCallableActions[actionIndex];
			return Promise.resolve(nextAction())
				.then((result) => {
					// Save results to the correct array index.
					if (stream) {
						stream.push(result);
					} else {
						resultArray[actionIndex] = result;
					}
					return;
				})
				.then(doNextAction);
		}
	}

	// Now start up the original <limit> number of promises.
	// i advances in calls to doNextAction.
	const listOfPromises = [];
	while (i < limit && i < listOfCallableActions.length) {
		listOfPromises.push(doNextAction());
	}
	return Promise.all(listOfPromises).then(() => {
		if (stream) {
			// close stream
			stream.push(null);
		}
		return resultArray;
	});
};

export const getMRGIDBoundingBox = (mrgid: number): Promise<IBoundingBox> => {
	return new Promise((resolve, reject) => {
		const url = `https://marineregions.org/mrgid/${mrgid}`;
		https
			.get(url, (res) => {
				let body = "";

				res.on("data", (chunk) => {
					body += chunk;
				});

				res.on("end", () => {
					try {
						const json = JSON.parse(body);
						return resolve({
							bottomLeft: { lat: json.minLatitude, lon: json.minLongitude },
							topRight: { lat: json.maxLatitude, lon: json.maxLongitude },
						});
					} catch (error) {
						return reject(error);
					}
				});
			})
			.on("error", (error) => {
				return reject(error);
			});
	});
};
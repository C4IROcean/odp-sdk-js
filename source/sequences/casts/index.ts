import { Sequences } from "..";
import { ODPClient, IGeoLocation } from "../../";
import { gridCoordinateToIndex, mapCoordinateToIndex } from "../utils";
import { Sequence } from "@cognite/sdk";
import { getBounds, isPointInPolygon } from "geolib";

/**
 * Casts class. Responsible for handling the three levels of casts.
 *
 * Level 1 contains an overview of all 1x1 grid cast count and is useful
 * for for getting an globe (or large area) overview.
 *
 * Level 2 contains a list of all casts for a given 1x1 grid with some metadata
 *
 * Level 3 contains the raw data for a given cast
 */

export class Casts {
	private _client: ODPClient;
	private _sequences: Sequences;
	constructor(sequences: Sequences) {
		this._client = sequences.client;
		this._sequences = sequences;
	}

	/**
	 * Get a cast count for the globe or a specific location. Level 1
	 *
	 * @param location optional longitude latitude object
	 * @param stream optional stream
	 *
	 * #TODO
	 * - Need to support polygon location object the get multiple values
	 */

	public getCastsCount = async (location?: IGeoLocation, stream?) => {
		let start = 0;
		let end;
		if (location && location.lon && location.lat) {
			start = gridCoordinateToIndex(location.lon, location.lat, 1);
			end = start + 1;
		}
		return this.getSequenceQueryResult(this._sequences.sequenceQueryBuilder(), null, start, end, stream);
	};

	/**
	 * Get casts and metadata for a given area. Note: Either castId or location needs to be provided. Level 2
	 *
	 * @param location optional location latitude longitude object
	 * @param castId optional cast id.
	 * @param stream optional stream
	 */
	public getCasts = async (location?: IGeoLocation, castId?: string, stream?) => {
		if (!location && !castId) {
			throw new Error("Either location or castId is required");
		}
		if (!castId) {
			castId = "CASTS_WOD_" + mapCoordinateToIndex(location);
		}
		return this.getSequenceQueryResult({ filter: { name: castId } }, undefined, 0, undefined, stream);
	};

	/**
	 * Get cast rows that fit within a given polygon. Level 3
	 *
	 * @param polygon Polygon with lists of location objects. The list have to be in a correct order.
	 * @param stream Optional stream
	 */
	public getCastsFromPolygon = async (polygon, stream?) => {
		const geoBounds = getBounds(polygon);
		const castPromises = [];
		const rowPromises = [];
		for (let lat = geoBounds.minLat; lat < geoBounds.maxLat; lat++) {
			for (let lon = geoBounds.minLng; lon < geoBounds.maxLng; lon++) {
				castPromises.push(this.getCasts({ lat, lon }));
			}
		}
		const casts = await Promise.all(castPromises);
		for (const cast of casts) {
			if (isPointInPolygon({ latitude: cast.location.lat, longitude: cast.location.lon }, polygon)) {
				rowPromises.push(this.getCastRows(cast.id, undefined, stream));
			}
		}
		return Promise.all(rowPromises);
	};

	/**
	 * Get content for a given cast. Level 3
	 *
	 * @param castId Id for the cast
	 * @param columns Columns that we want returned
	 * @param stream Optional stream
	 */
	public getCastRows = async (castId, columns?, stream?) => {
		if (!castId) {
			throw new Error("castId is required");
		}
		return this.getSequenceQueryResult(
			{ filter: { name: castId } },
			columns,
			0,
			undefined,
			stream,
			this._sequences.castSequenceConvert,
		);
	};

	private getSequenceQueryResult = async (query, columns?, start = 0, end = undefined, stream?, converter?) => {
		let sequences: Array<Sequence>;
		try {
			sequences = await this._client.cognite.sequences.search(query);
		} catch (error) {
			throw error;
		}
		if (sequences.length === 0) {
			return [];
		}

		sequences.sort((a, b) => (a.metadata.date > b.metadata.date ? 1 : b.metadata.date > a.metadata.date ? -1 : 0));

		if (!columns) {
			columns = sequences[0].columns.map((col) => {
				return col.externalId;
			});
		}

		const all = [];
		try {
			let response;

			while (true) {
				const q = [];
				for (const sq of sequences) {
					q.push({
						id: sq.id,
						limit: 10000,
						cursor: response ? response[q.length].nextCursor : null,
						start,
						end,
					});
				}
				response = await this.getSequenceRows(q);
				const converted = converter
					? converter(sequences, response, columns)
					: this._sequences.sequenceConvert(sequences, response, columns);
				if (!stream) {
					all.push(...converted);
				} else {
					stream.push(converted);
				}
				if (!response[0].nextCursor) {
					break;
				}
			}
		} catch (error) {
			throw error;
		}
		if (stream) {
			// close stream
			stream.push(null);
		}

		return all;
	};

	private getSequenceRows = (seqRows) => {
		const promises = [];
		for (const seq of seqRows) {
			promises.push(this._client.cognite.sequences.retrieveRows(seq));
		}
		return Promise.all(promises);
	};
}

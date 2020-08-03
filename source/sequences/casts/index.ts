import { Sequences } from "..";
import { ODPClient, IGeoLocation, SequenceColumnType } from "../../";
import { mapCoordinateToIndex } from "../utils";
import { Sequence } from "@cognite/sdk";
import { getBounds, isPointInPolygon } from "geolib";

/**
 * Casts class. Responsible for handling the three levels of casts.
 *
 * Level 1 contains an overview of all 1x1 grid cast count and is useful
 * for for getting a globe (or large area) overview.
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
	 * @param
	 * @param location optional longitude latitude object
	 * @param stream optional stream
	 *
	 * #TODO
	 * - Need to support polygon location object the get multiple values
	 */

	public getCastsCount = async (year: number = 2018, location?: IGeoLocation, stream?) => {
		let start = 0;
		let end;
		const level = 1;
		if (location && location.lon && location.lat) {
			start = mapCoordinateToIndex(location, 1);
			end = start + 1;
		}
		return this.getSequenceQueryResult(this._sequences.sequenceQueryBuilder(level, year), null, start, end, stream);
	};

	/**
	 * Get casts and metadata for a given area. Note: Either castId or location needs to be provided. Level 2
	 *
	 * @param location optional location latitude longitude object
	 * @param castId optional cast id.
	 * @param stream optional stream
	 */
	public getCasts = async (year: number = 2018, location?: IGeoLocation, castId?: string, stream?) => {
		if (!location && !castId) {
			throw new Error("Either location or castId is required");
		}
		if (!castId) {
			castId = this._sequences.constants().sequence.prefix[2] + "_" + year + "_" + mapCoordinateToIndex(location);
		}
		return this.getSequenceQueryResult(
			{ filter: { name: castId } },
			undefined,
			0,
			undefined,
			stream,
			this._sequences.castSequenceLv2Convert,
		);
	};

	/**
	 * Get cast rows that fit within a given polygon. Level 2
	 *
	 * @param polygon Polygon with lists of location objects. The list have to be in a correct order.
	 * @param stream Optional stream
	 */
	public getCastsFromPolygon = async (polygon, year = 2018, columns?, stream?) => {
		const geoBounds = getBounds(polygon);
		const all = [];
		geoBounds.maxLat = Math.ceil(geoBounds.maxLat);
		geoBounds.maxLng = Math.ceil(geoBounds.maxLng);
		geoBounds.minLat = Math.floor(geoBounds.minLat);
		geoBounds.minLng = Math.floor(geoBounds.minLng);
		const castPromises = [];
		for (let lat = geoBounds.minLat + 1; lat <= geoBounds.maxLat; lat++) {
			for (let lon = geoBounds.minLng + 1; lon <= geoBounds.maxLng; lon++) {
				castPromises.push(this.getCasts(year, { lat, lon }, columns, stream));
			}
		}
		for (const iterator of await Promise.all(castPromises)) {
			all.push(...iterator);
		}
		return all;
	};

	/**
	 * Get cast rows that fit within a given polygon. Level 3
	 *
	 * @param polygon Polygon with lists of location objects. The list have to be in a correct order.
	 * @param stream Optional stream
	 */
	public getCastRowsFromPolygon = async (polygon, columns?, stream?) => {
		const promises = [];
		const all = [];

		const casts = await this.getCastsFromPolygon(polygon);
		for (const cast of casts) {
			promises.push(
				this.getCastRows(cast.value.extId, columns, stream).then((rows) => {
					return this.filterLocationByPolygon(rows, polygon);
				}),
			);
		}
		for (const iterator of await Promise.all(promises)) {
			all.push(...iterator);
		}
		return all;
	};

	/**
	 * Get content for a given cast. Level 3
	 *
	 * @param castId Id for the cast
	 * @param columns Columns that we want returned
	 * @param stream Optional stream
	 */
	public getCastRows = async (castId: string, columns?: Array<SequenceColumnType>, stream?) => {
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

	private filterLocationByPolygon = (rows, polygon) => {
		const all = [];
		for (const row of rows) {
			if (isPointInPolygon({ latitude: row.location.lat, longitude: row.location.long }, polygon)) {
				all.push(row);
			}
		}
		return all;
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

import { Sequences } from "..";
import { ODPClient } from "../../";
import { mapCoordinateToIndex, getColumnsFromEnum } from "../utils";
import { boundingBoxToPolygon } from "../../utils";
import { Sequence, SequenceRowsRetrieve } from "@cognite/sdk";
import { getBounds, isPointInPolygon } from "geolib";
import { ICastFilter, SequenceColumnType } from "../../types/types";

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
	 * @param filter cast filter object
	 * @param stream optional stream
	 *
	 * #TODO
	 * - Need to support polygon location object the get multiple values
	 */

	public getCastsCount = async (filter: ICastFilter = {}, stream?) => {
		let start = 0;
		let end;

		let level = 0;
		if (filter.year) {
			level = 1;
		}
		if (
			filter.geoFilter &&
			filter.geoFilter.location &&
			filter.geoFilter.location.longitude &&
			filter.geoFilter.location.latitude
		) {
			start = mapCoordinateToIndex(filter.geoFilter.location, 1);
			end = start + 1;
		}
		return this.getSequenceQueryResult(
			this._sequences.sequenceQueryBuilder(level, filter.year),
			null,
			start,
			end,
			stream,
		);
	};

	public getCastYears = async () => {
		const cast = await this._client.cognite.sequences.retrieve([{ externalId: "cast_wod_0" }]);
		if (cast.length > 0 && cast[0].metadata.cast_years) {
			return cast[0].metadata.cast_years.split(", ");
		}
		return [];
	};

	public getCastColumns = () => {
		return Object.values(SequenceColumnType);
	};

	public getCastUnits = () => {
		throw new Error("Not implemented");
	};

	/**
	 * Get casts and metadata for a given area. Level 2
	 *
	 * @param filter cast filter object
	 * @param stream optional stream
	 */
	public getCasts = async (filter: ICastFilter, stream?) => {
		if (filter.geoFilter && filter.geoFilter.boundingBox) {
			filter.geoFilter.polygon = boundingBoxToPolygon(filter.geoFilter.boundingBox);
		}
		if (filter.geoFilter.polygon && filter.geoFilter.polygon && filter.geoFilter.polygon.length > 2) {
			return this.getCastsFromPolygon(filter, stream);
		}

		if (!filter.geoFilter && !filter.geoFilter.location && !filter.castId) {
			throw new Error("Either location or castId is required");
		}
		if (!filter.castId) {
			if (!filter.year) {
				throw new Error("Need a given year when castId is missing");
			}
			filter.castId =
				this._sequences.constants().sequence.prefix[2] +
				"_" +
				filter.year +
				"_" +
				mapCoordinateToIndex(filter.geoFilter.location);
		}
		return this.getSequenceQueryResult(
			{ filter: { name: filter.castId } },
			undefined,
			0,
			undefined,
			stream,
			this._sequences.castSequenceLv2Convert,
		);
	};

	/**
	 * Get content for a given cast. Level 3
	 *
	 * @param filter cast filter object
	 * @param stream Optional stream
	 */
	public getCastRows = async (filter: ICastFilter, stream?) => {
		if (filter.geoFilter && filter.geoFilter.boundingBox) {
			filter.geoFilter.polygon = boundingBoxToPolygon(filter.geoFilter.boundingBox);
		}

		if (
			filter.geoFilter &&
			filter.geoFilter.polygon &&
			filter.geoFilter.polygon &&
			filter.geoFilter.polygon.length > 2
		) {
			return this.getCastRowsFromPolygon(filter, stream);
		}
		if (!filter.castId) {
			throw new Error("castId is required");
		}
		return this.getSequenceQueryResult(
			{ filter: { name: filter.castId } },
			filter.columns,
			0,
			undefined,
			stream,
			this._sequences.castSequenceConvert,
		);
	};

	/**
	 * Internal methods
	 */

	private getCastRowsFromPolygon = async (filter: ICastFilter, stream?) => {
		const promises = [];
		const all = [];

		const casts = await this.getCastsFromPolygon(filter);
		for (const cast of casts) {
			promises.push(
				this.getCastRows({ castId: cast.value.extId, columns: filter.columns }, stream).then((rows) => {
					return this.filterLocationByPolygon(rows, filter.geoFilter.polygon);
				}),
			);
		}
		for (const iterator of await Promise.all(promises)) {
			all.push(...iterator);
		}
		return all;
	};

	private getCastsFromPolygon = async (filter: ICastFilter, stream?) => {
		if ((!filter.geoFilter.polygon && !filter.geoFilter.polygon) || filter.geoFilter.polygon.length < 3) {
			throw new Error("A polygon with a length > 2 is required");
		}
		if (!filter.year) {
			throw new Error("A year is required in filter");
		}
		const geoBounds = getBounds(filter.geoFilter.polygon);
		const all = [];
		geoBounds.maxLat = Math.ceil(geoBounds.maxLat);
		geoBounds.maxLng = Math.ceil(geoBounds.maxLng);
		geoBounds.minLat = Math.floor(geoBounds.minLat);
		geoBounds.minLng = Math.floor(geoBounds.minLng);
		const castPromises = [];
		for (let latitude = geoBounds.minLat + 1; latitude <= geoBounds.maxLat; latitude++) {
			for (let longitude = geoBounds.minLng + 1; longitude <= geoBounds.maxLng; longitude++) {
				castPromises.push(
					this.getCasts(
						{
							year: filter.year,
							geoFilter: { location: { latitude, longitude } },
							columns: filter.columns,
						},
						stream,
					),
				);
			}
		}
		for (const iterator of await Promise.all(castPromises)) {
			all.push(...iterator);
		}
		return all;
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
		} else {
			const availableColumns = sequences[0].columns.map((col) => {
				return col.externalId;
			});

			columns = getColumnsFromEnum(columns, availableColumns);
		}

		const all = [];
		try {
			let response;

			while (true) {
				const q: Array<SequenceRowsRetrieve> = [];
				for (const sq of sequences) {
					q.push({
						id: sq.id,
						limit: 10000,
						cursor: response ? response[q.length].nextCursor : null,
						start,
						end,
						columns,
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

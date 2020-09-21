import { Sequences } from "../utils/sequences";
import { mapCoordinateToIndex, getColumnsFromEnum } from "./utils";
import { boundingBoxToPolygon, throttleActions } from "../utils/geoUtils";
import { Sequence, SequenceListScope, SequenceRowsRetrieve } from "@cognite/sdk";
import { getBounds, isPointInPolygon } from "geolib";
import { ICastFilter, CastColumnType, ICast, ICastRow, ICastRowValue } from "../types/types";
import { Files } from "../utils/files";
import { MarineRegions } from "../marineRegions";

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
	private _concurrency = 50;
	private _files: Files;
	private _sequences: Sequences;
	private _marineRegions: MarineRegions;

	constructor(sequences: Sequences) {
		this._files = sequences.client.files;
		this._marineRegions = sequences.client.marineRegions;
		this._sequences = sequences;
	}

	/**
	 * Get a cast count for the globe or a specific location. Level 1/0
	 *
	 * @param filter cast filter object
	 * @param stream optional stream
	 *
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
		return this.getSequenceQueryResult(this.sequenceQueryBuilder(level, filter.year), null, start, end, stream);
	};

	/**
	 * Get years that are available
	 */

	public getCastYears = async () => {
		let cast;
		try {
			cast = await this._sequences.retrieve([{ externalId: "cast_wod_0" }]);
		} catch (e) {
			throw e;
		}
		if (cast.length > 0 && cast[0].metadata.cast_years) {
			return cast[0].metadata.cast_years.split(", ");
		}
		return [];
	};

	/**
	 * Get available cast columns
	 */

	public getCastColumns = () => {
		return Object.values(CastColumnType);
	};

	/**
	 * Get available cast units (not implemented)
	 */
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
		if (filter.geoFilter && filter.geoFilter.mrgid) {
			let mr;
			try {
				mr = await this._marineRegions.getMarineRegionByMRGID(filter.geoFilter.mrgid);
			} catch (e) {
				throw e;
			}

			filter.geoFilter.polygon = mr.polygon;
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
				this.constants().sequence.prefix[2] +
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
			this.castSequenceLv2Convert,
		);
	};

	public getCastMetadata = async (filter: ICastFilter) => {
		if (!filter.castId) {
			throw new Error("castId is required");
		}
		let sequences = [];
		try {
			sequences = await this._sequences.search({ filter: { name: filter.castId } });
		} catch (error) {
			throw error;
		}
		if (sequences.length === 0) {
			return null;
		}
		return this.castSequenceMetadataConvert(sequences);
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
			this.castSequenceConvert,
		);
	};

	public getCastSourceFileUrl = async (filter: ICastFilter) => {
		if (!filter.castId) {
			throw new Error("Need a castId ");
		}
		let sequences;
		try {
			sequences = await this.getCastMetadata(filter);
		} catch (e) {
			throw e;
		}
		const extId = [];
		for (const sequence of sequences) {
			extId.push(sequence.metadata.CDF_extIdFile);
		}
		let urls;
		try {
			urls = await this._files.getFileUrl(extId);
		} catch (e) {
			throw e;
		}
		for (const url of urls) {
			for (const sequence of sequences) {
				if (url.externalId === sequence.metadata.CDF_extIdFile) {
					url.castId = sequence.externalId;
					break;
				}
			}
		}
		return urls;
	};

	/**
	 * Internal methods
	 */

	private getCastRowsFromPolygon = async (filter: ICastFilter, stream?) => {
		const promises = [];
		const all = [];
		let casts;
		try {
			casts = await this.getCastsFromPolygon(filter);
		} catch (e) {
			throw e;
		}
		for (const cast of casts) {
			promises.push(() =>
				this.getCastRows({ castId: cast.value.extId, columns: filter.columns }, stream).then((rows) => {
					return this.postRowFilter(rows, filter);
				}),
			);
		}

		const allResult = await throttleActions(promises, this._concurrency, stream);
		for (const iterator of allResult) {
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
				castPromises.push(() =>
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

		const allResult = await throttleActions(castPromises, this._concurrency, stream);

		for (const iterator of allResult) {
			all.push(...iterator);
		}
		return all;
	};

	private filterLocationByPolygon = (row, polygon) => {
		if (isPointInPolygon({ latitude: row.location.lat, longitude: row.location.long }, polygon)) {
			return row;
		}
	};

	private postRowFilter = (rows, filter: ICastFilter) => {
		const all = [];
		for (const row of rows) {
			if (filter.quality !== undefined) {
				const qFilterResult = this.filterByQuality(row, filter);
				if (!qFilterResult) {
					continue;
				}
			}
			if (filter.geoFilter.polygon) {
				const pFilterResult = this.filterLocationByPolygon(row, filter.geoFilter.polygon);
				if (!pFilterResult) {
					continue;
				}
			}
			all.push(row);
		}
		return all;
	};

	private filterByQuality = (row, filter: ICastFilter) => {
		let skip = false;
		for (const value of Object.keys(row.value)) {
			if (row.value[value].flags && row.value[value].flags.wod !== null) {
				if (
					filter.quality !== undefined &&
					((Array.isArray(filter.quality) && !filter.quality.includes(row.value[value].flags.wod)) ||
						row.value[value].flags.wod !== filter.quality)
				) {
					skip = true;
					break;
				}
			}
		}
		if (!skip) {
			return row;
		}
	};

	private getSequenceQueryResult = async (query, columns?, start = 0, end = undefined, stream?, converter?) => {
		let sequences: Array<Sequence>;
		try {
			sequences = await this._sequences.search(query);
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
					: this.sequenceConvert(sequences, response, columns);
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
			promises.push(() => this._sequences.retrieveRows(seq));
		}
		return throttleActions(promises, this._concurrency);
	};

	private constants = () => {
		return {
			sequence: {
				prefix: { 0: "cast_wod_0", 1: "cast_wod_1", 2: "cast_wod_2", 3: "cast_wod_3" },
				rowNames: ["Oxygen", "Temperature", "Salinity", "Chlorophyll", "Pressure", "Nitrate", "pH"],
			},
		};
	};

	private sequenceQueryBuilder = (level: number, year?: number) => {
		const sequenceFilter: SequenceListScope = {
			filter: {
				externalIdPrefix: this.constants().sequence.prefix[level],
				metadata: {},
			},
			limit: 1000,
		};
		if (year) {
			sequenceFilter.filter.externalIdPrefix += "_" + year;
		}
		return sequenceFilter;
	};

	/**
	 * Convert Cognite response to a ODP response
	 */
	private sequenceConvert = (sequences: Array<Sequence>, allRows, columns): Array<ICastRow> => {
		const returnValue: Array<ICastRow> = [];
		const columnIndex: any = this.arrayIndex(columns);

		for (const item of allRows[0].items) {
			returnValue.push({
				location: {
					lat: parseFloat(item[columnIndex.geo_lat]),
					long: parseFloat(item[columnIndex.geo_long]),
					depth: parseInt(item[columnIndex.depth], 10),
				},
				id: sequences[0].id,
				rowNumber: item.rowNumber,
				externalId: sequences[0].externalId,
				value: {
					count: item[columnIndex.castCount],
					depth: item[columnIndex.z_first_avg],
					oxygen: item[columnIndex.Oxygen_first_avg],
					temperature: item[columnIndex.Temperature_first_avg],
					salinity: item[columnIndex.Salinity_first_avg],
					chlorophyll: item[columnIndex.Chlorophyll_first_avg],
					pressure: item[columnIndex.Pressure_first_avg],
					nitrate: item[columnIndex.Nitrate_first_avg],
					ph: item[columnIndex.pH_first_avg],
				},
			});
		}
		return returnValue;
	};

	/**
	 * Convert a cast sequence
	 */

	private castSequenceConvert = (sequences: Array<Sequence>, allRows, columns): Array<ICastRow> => {
		const returnValue: Array<ICastRow> = [];
		const columnIndex: any = this.arrayIndex(columns);
		const cruise = {
			country: sequences[0].metadata.country,
			id: sequences[0].metadata.WOD_cruise_identifier,
			vesselName: sequences[0].metadata.WOD_cruise_name,
		};

		for (const item of allRows[0].items) {
			returnValue.push({
				location: {
					lat: parseFloat(item[columnIndex.lat]),
					long: parseFloat(item[columnIndex.lon]),
					depth: parseInt(item[columnIndex.z], 10),
				},
				id: sequences[0].id,
				rowNumber: item.rowNumber,
				externalId: sequences[0].externalId,
				value: this.castRowValues(item, columnIndex),
				time: item[columnIndex.date],
				cruise,
			});
		}
		return returnValue;
	};

	/**
	 * Convert a cast sequence
	 */

	private castSequenceLv2Convert = (sequences: Array<Sequence>, allRows, columns): Array<ICastRow> => {
		const returnValue: Array<ICastRow> = [];
		const columnIndex: any = this.arrayIndex(columns);

		for (const item of allRows[0].items) {
			const value = this.castValues(item, columnIndex);
			returnValue.push({
				location: {
					lat: parseFloat(value.lat),
					long: parseFloat(value.lon),
				},
				id: sequences[0].id,
				rowNumber: item.rowNumber,
				externalId: sequences[0].externalId,
				value,
				time: item[columnIndex.date],
			});
		}
		return returnValue;
	};

	private castSequenceMetadataConvert = (sequences: Array<Sequence>): Array<ICast> => {
		const returnValue: Array<ICast> = [];
		for (const sequence of sequences) {
			const seqMeta: ICast = {
				cruise: {
					country: sequence.metadata.country,
					id: sequence.metadata.WOD_cruise_identifier,
					vesselName: sequence.metadata.WOD_cruise_name,
				},
				externalId: sequence.externalId,
				id: sequence.id,
				location: {
					lat: parseFloat(sequence.metadata.lat),
					long: parseFloat(sequence.metadata.lon),
				},
				time: parseInt(sequence.metadata.date, 10),
				metadata: {},
			};
			for (const item of Object.keys(sequence.metadata)) {
				if (!["country", "WOD_cruise_identifier", "WOD_cruise_name", "lat", "lon", "date"].includes(item)) {
					seqMeta.metadata[item] = sequence.metadata[item];
				}
			}
			returnValue.push(seqMeta);
		}

		return returnValue;
	};

	private castRowValues = (item, columnIndex) => {
		const values: ICastRowValue = {};

		for (const rowName of this.constants().sequence.rowNames) {
			if (rowName in columnIndex && item[columnIndex[rowName]] !== null) {
				const lowerCaseName = rowName.toLocaleLowerCase();
				values[lowerCaseName] = { value: item[columnIndex[rowName]], flags: {} };
				if (rowName + "_WODflag" in columnIndex) {
					values[lowerCaseName].flags.wod = item[columnIndex[rowName + "_WODflag"]];
				}
				if (rowName + "_origflag" in columnIndex && item[columnIndex[rowName + "_origflag"]] !== null) {
					values[lowerCaseName].flags.orig = item[columnIndex[rowName + "_origflag"]];
				}
			}
		}

		return values;
	};

	private castValues = (item, columnIndex) => {
		const values: any = {};

		for (const iterator of Object.keys(columnIndex)) {
			values[iterator] = item[columnIndex[iterator]];
		}
		/*
		if ("external_id" in columnIndex) {
			values.externalId = item[columnIndex.external_id];
		}
		if ("cast_id" in columnIndex) {
			values.castId = item[columnIndex.cast_id];
		}
		if ("cruise_id" in columnIndex) {
			values.cruiseId = item[columnIndex.cruise_id];
		}
		if ("country_code" in columnIndex) {
			values.countryCode = item[columnIndex.country_code];
		}
		if ("latitude_max" in columnIndex) {
			values.latitudeMax = parseFloat(item[columnIndex.latitude_max]);
		}
		if ("latitude_min" in columnIndex) {
			values.latitudeMin = parseFloat(item[columnIndex.latitude_min]);
		}
		if ("longitude_max" in columnIndex) {
			values.longitudeMax = parseFloat(item[columnIndex.longitude_max]);
		}
		if ("longitude_min" in columnIndex) {
			values.longitudeMin = parseFloat(item[columnIndex.longitude_min]);
		}
		if ("pressure_max" in columnIndex) {
			values.pressureMax = parseFloat(item[columnIndex.pressure_max]);
		}
		if ("pressure_min" in columnIndex) {
			values.pressureMin = parseFloat(item[columnIndex.pressure_min]);
		}
		if ("temperature_max" in columnIndex) {
			values.temperatureMax = parseFloat(item[columnIndex.temperature_max]);
		}
		if ("temperature_min" in columnIndex) {
			values.temperatureMin = parseFloat(item[columnIndex.temperature_min]);
		}*/
		return values;
	};

	private arrayIndex = (array) => {
		const ret = {};
		for (let index = 0; index < array.length; index++) {
			ret[array[index]] = index;
		}
		return ret;
	};
}

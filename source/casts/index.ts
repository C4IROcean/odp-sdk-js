import { Sequences } from "../utils/sequences";
import { mapCoordinateToIndex, getColumnsFromEnum } from "./utils";
import { boundingBoxToPolygon, throttleActions } from "../utils/geoUtils";
import { Sequence, SequenceListScope, SequenceRowsRetrieve } from "@cognite/sdk";
import { getBounds, isPointInPolygon } from "geolib";
import { ICastFilter, CastColumnType, ICast, ICastRow, ICastRowValue, Provider } from "../types/types";
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
		let years = [];
		if (filter.year || filter.time) {
			level = 1;
			years = this.getYears(filter);
		} else {
			years.push(undefined);
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
		const promises = [];
		for (const year of years) {
			for (const ft of this.sequenceQueryBuilder(level, year, filter.provider)) {
				promises.push(this.getSequenceQueryResult(ft, null, start, end, stream));
			}
		}
		const result = await Promise.all(promises);
		const all = [];
		for (const iterator of result) {
			all.push(...iterator);
		}

		return all;
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

	public getCastProviders = () => {
		return Object.values(Provider);
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

		const castIds = [];

		if (!filter.castId) {
			for (const year of this.getYears(filter)) {
				for (const ids of this.getCastIds(filter, 2)) {
					castIds.push(ids + "_" + year + "_" + mapCoordinateToIndex(filter.geoFilter.location));
				}
			}
		} else {
			castIds.push(filter.castId);
		}
		const promises = [];
		for (const castId of castIds) {
			promises.push(
				this.getSequenceQueryResult(
					{ filter: { name: castId } },
					undefined,
					0,
					undefined,
					stream,
					this.castSequenceLv2Convert,
				),
			);
		}
		const all = [];
		const result = await Promise.all(promises);
		for (const iterator of result) {
			const filtered = this.postCastFilter(iterator, filter);
			all.push(...filtered);
		}

		return all;
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
		if (!filter.year && !filter.time) {
			throw new Error("Need a given year or time filter when castId is missing");
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
				const newFilter: ICastFilter = {
					year: filter.year,
					geoFilter: { location: { latitude, longitude } },
					columns: filter.columns,
					provider: filter.provider,
				};
				if (filter.year) {
					newFilter.year = filter.year;
				} else {
					newFilter.time = filter.time;
				}
				castPromises.push(() => this.getCasts(newFilter, stream));
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

	private postCastFilter = (casts, filter: ICastFilter) => {
		const all = [];
		for (const cast of casts) {
			if (filter.time !== undefined) {
				const castDate = new Date(
					cast.value.date.slice(0, 4),
					cast.value.date.slice(5, 6),
					cast.value.date.slice(7, 8),
				);
				if (castDate < filter.time.min || castDate > filter.time.max) {
					continue;
				}
			}
			all.push(cast);
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

	private getCastIds = (filter: ICastFilter, level) => {
		const ids = [];
		if (filter.provider && filter.provider.length > 0) {
			for (const provider of filter.provider) {
				ids.push(this.constants2().sequence.prefix[level].replace("{provider}", provider));
			}
		} else {
			for (const provider of ["auv", "wod"]) {
				ids.push(this.constants2().sequence.prefix[level].replace("{provider}", provider));
			}
		}
		return ids;
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

	private constants2 = () => {
		return {
			sequence: {
				prefix: {
					0: "cast_{provider}_0",
					1: "cast_{provider}_1",
					2: "cast_{provider}_2",
					3: "cast_{provider}_3",
				},
				rowNames: ["Oxygen", "Temperature", "Salinity", "Chlorophyll", "Pressure", "Nitrate", "pH"],
			},
		};
	};

	private sequenceQueryBuilder = (level: number, year?: number, provider?: Array<string>) => {
		const sequenceFilters: Array<SequenceListScope> = [];
		if (!provider || provider.length === 0) {
			provider = Object.values(Provider);
		}
		for (const prov of provider) {
			const sequenceFilter = {
				filter: {
					externalIdPrefix: this.constants2().sequence.prefix[level].replace("{provider}", prov),
					metadata: {},
				},
				limit: 1000,
			};
			if (year) {
				sequenceFilter.filter.externalIdPrefix += "_" + year;
			}
			sequenceFilters.push(sequenceFilter);
		}

		return sequenceFilters;
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
					lat: parseFloat(value.lat ? value.lat : value.geo_lat),
					long: parseFloat(value.lon ? value.lon : value.geo_lon),
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

	private getYears = (filter: ICastFilter) => {
		const years = [];
		if (!filter.year && !filter.time) {
			throw new Error("Need a given year or time filter when castId is missing");
		}
		if (filter.year) {
			years.push(filter.year);
		} else {
			for (let year = filter.time.min.getFullYear(); year <= filter.time.max.getFullYear(); year++) {
				years.push(year);
			}
		}
		return years;
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

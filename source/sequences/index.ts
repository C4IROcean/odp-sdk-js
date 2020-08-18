import { ODPClient, ISequenceRow, ISequenceRowValue } from "../";
import { Casts } from "./casts";
import { SequenceListScope, Sequence } from "@cognite/sdk";

export class Sequences {
	private _client: ODPClient;
	private _casts: Casts;
	constructor(client: ODPClient) {
		this._client = client;
		this.init();
	}
	public get client() {
		return this._client;
	}

	public get casts() {
		return this._casts;
	}

	public constants = () => {
		return {
			sequence: {
				prefix: { 0: "cast_wod_0", 1: "cast_wod_1", 2: "cast_wod_2", 3: "cast_wod_3" },
				rowNames: ["Oxygen", "Temperature", "Salinity", "Chlorophyll", "Pressure", "Nitrate", "pH"],
			},
		};
	};

	public sequenceQueryBuilder = (level: number, year?: number, index?: number, castId?: number) => {
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
	public sequenceConvert = (sequences: Array<Sequence>, allRows, columns): Array<ISequenceRow> => {
		const returnValue: Array<ISequenceRow> = [];
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

	public castSequenceConvert = (sequences: Array<Sequence>, allRows, columns): Array<ISequenceRow> => {
		const returnValue: Array<ISequenceRow> = [];
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

	public castSequenceLv2Convert = (sequences: Array<Sequence>, allRows, columns): Array<ISequenceRow> => {
		const returnValue: Array<ISequenceRow> = [];
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
	private castRowValues = (item, columnIndex) => {
		const values: ISequenceRowValue = {};

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

	private init = () => {
		this._casts = new Casts(this);
	};
}

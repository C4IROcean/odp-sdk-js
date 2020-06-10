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

	public sequenceQueryBuilder = () => {
		const sequenceFilter: SequenceListScope = {
			filter: {
				externalIdPrefix: "cast_count_map_2",
				metadata: {
					geo_key_from: "-90S_-180W",
					geo_key_to: "90N_180E",
				},
			},
			limit: 1000,
		};
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
					lat: parseFloat(item[columnIndex.lat]),
					long: parseFloat(item[columnIndex.long]),
					depth: parseInt(item[columnIndex.depth], 10),
				},
				id: sequences[0].id,
				rowNumber: item.rowNumber,
				externalId: sequences[0].externalId,
				value: { count: item[columnIndex.cast_count] },
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

		for (const item of allRows[0].items) {
			returnValue.push({
				location: {
					lat: parseFloat(item[columnIndex.latitude]),
					long: parseFloat(item[columnIndex.longitude]),
					depth: parseInt(item[columnIndex.depth], 10),
				},
				id: sequences[0].id,
				rowNumber: item.rowNumber,
				externalId: sequences[0].externalId,
				value: this.castValues(item, columnIndex),
				time: item[columnIndex.date],
				cruise: {
					country: item[columnIndex.country],
					id: item[columnIndex.WOD_cruise_id],
					vesselName: item[columnIndex.vessel_name],
				},
			});
		}
		return returnValue;
	};

	private castValues = (item, columnIndex) => {
		const values: ISequenceRowValue = {};
		if ("temperature" in columnIndex) {
			values.temperature = parseFloat(item[columnIndex.temperature]);
		}
		if ("cast_count" in columnIndex) {
			values.count = parseInt(item[columnIndex.cast_count], 10);
		}
		if ("oxygen" in columnIndex) {
			values.oxygen = parseFloat(item[columnIndex.oxygen]);
		}
		if ("salinity" in columnIndex) {
			values.salinity = parseFloat(item[columnIndex.salinity]);
		}
		if ("chlorophyll" in columnIndex) {
			values.chlorophyll = parseFloat(item[columnIndex.chlorophyll]);
		}
		if ("pressure" in columnIndex) {
			values.pressure = parseFloat(item[columnIndex.pressure]);
		}
		if ("nitrate" in columnIndex) {
			values.chlorophyll = parseFloat(item[columnIndex.nitrate]);
		}
		if ("pH" in columnIndex) {
			values.ph = parseFloat(item[columnIndex.pH]);
		}
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

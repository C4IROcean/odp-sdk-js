import { ODPClient, ISequenceRow, SequenceType } from "../";
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

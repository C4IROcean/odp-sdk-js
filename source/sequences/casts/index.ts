import { Sequences } from "..";
import { ODPClient, IGeoLocation } from "../../";
import { gridCoordinateToIndex, mapCoordinateToIndex } from "../utils";
import { Sequence } from "@cognite/sdk";

export class Casts {
	private _client: ODPClient;
	private _sequences: Sequences;
	constructor(sequences: Sequences) {
		this._client = sequences.client;
		this._sequences = sequences;
	}

	public getCastsCount = async (location?: IGeoLocation, stream?) => {
		let start = 0;
		let end;
		if (location && location.lon && location.lat) {
			start = gridCoordinateToIndex(location.lon, location.lat, 1);
			end = start + 1;
		}
		return this.getSequenceQueryResult(this._sequences.sequenceQueryBuilder(), null, start, end, stream);
	};

	public getCasts = async (location?: IGeoLocation, castId?: string, stream?) => {
		if (!location && !castId) {
			throw new Error("Either location or castId is required");
		}
		if (!castId) {
			castId = "CASTS_WOD_" + mapCoordinateToIndex(location);
		}
		return this.getSequenceQueryResult({ filter: { name: castId } }, undefined, 0, undefined, stream);
	};

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

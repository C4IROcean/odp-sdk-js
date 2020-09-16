import { Sequences } from "..";
import { IGeoLocation, ODPClient } from "../../";
import { throttleActions } from "../../utils";
import { Sequence } from "@cognite/sdk";
import { IMarineRegion } from "../../types/types";

/**
 * Marine regions class.
 */

export class MarineRegions {
	private _concurrency = 50;
	private _client: ODPClient;
	constructor(sequences: Sequences) {
		this._client = sequences.client;
	}

	public getChildRegions = async (id?, polygon = false): Promise<Array<any>> => {
		if (id) {
			return this.getMarineRegions(id, polygon);
		}
		return (await this._client.asset.getChildren("marine-regions")).items;
	};

	public getPolygons = async (id) => {
		const sequences = await this._client.cognite.sequences.retrieve([{ id }]);
		if (sequences.length === 0) {
			return null;
		}
		const asset = await this._client.cognite.assets.retrieve([{ id: sequences[0].assetId }]);
		return this.getPolygonRows(sequences[0], asset[0]);
	};

	private getPolygonRows = async (sequence, asset?) => {
		const all: Array<IGeoLocation> = [];
		if (!asset && sequence.assetId) {
			asset = (await this._client.cognite.assets.retrieve([{ id: sequence.assetId }]))[0];
		}
		try {
			let response;

			while (true) {
				response = await this.getSequenceRows({
					id: sequence.id,
					limit: 10000,
					cursor: response ? response.nextCursor : null,
				});
				for (const item of response.items) {
					all.push({ latitude: item[1], longitude: item[2] });
				}
				if (!response.nextCursor) {
					break;
				}
			}
		} catch (error) {
			throw error;
		}
		const seq = this.MRSequenceConvert([sequence], asset);
		seq[0].polygon = all;
		return seq[0];
	};

	private getMarineRegions = async (id, polygon = false) => {
		let sequences = [];
		let asset;
		try {
			sequences = await (await this._client.cognite.sequences.list({ filter: { assetIds: [id] }, limit: 1000 }))
				.items;
			asset = (await this._client.cognite.assets.retrieve([{ id }]))[0];
		} catch (error) {
			throw error;
		}
		if (sequences.length === 0) {
			return null;
		}
		if (polygon) {
			const promises = [];

			for (const sequence of sequences) {
				promises.push(() => this.getPolygonRows(sequence, asset));
			}
			return throttleActions(promises, this._concurrency);
		} else {
			return this.MRSequenceConvert(sequences, asset);
		}
	};

	private MRSequenceConvert = (sequences: Array<Sequence>, asset?): Array<IMarineRegion> => {
		const returnValue: Array<IMarineRegion> = [];
		for (const sequence of sequences) {
			const seqMeta: IMarineRegion = {
				externalId: sequence.externalId,
				parentId: asset ? asset.id : undefined,
				parentExternalId: asset ? asset.externalId : undefined,
				id: sequence.id,
				metadata: sequence.metadata,
			};
			returnValue.push(seqMeta);
		}

		return returnValue;
	};

	private getSequenceRows = (seqRows) => {
		return this._client.cognite.sequences.retrieveRows(seqRows);
	};
}

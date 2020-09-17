import { Sequences } from "../utils/sequences";
import { IGeoLocation, ODPClient } from "..";
import { throttleActions } from "../utils/geoUtils";
import { Sequence } from "@cognite/sdk";
import { IMarineRegion, IMarineRegionType } from "../types/types";

/**
 * Marine regions class.
 */

export class MarineRegions {
	private _concurrency = 50;
	private _sequences: Sequences;
	private _client: ODPClient;
	constructor(sequences: Sequences) {
		this._sequences = sequences;
		this._client = sequences.client;
	}

	/**
	 * Get regions within a given id or if no id is given, get ids for the root asset
	 *
	 * @param regionTypeId root asset
	 * @param polygon fetch polygons for each marine regions
	 */

	public getMarineRegions = async (regionTypeId, polygon = false): Promise<Array<IMarineRegion>> => {
		let sequences = [];
		let asset;
		try {
			sequences = await (await this._sequences.list({ filter: { assetIds: [regionTypeId] }, limit: 1000 })).items;
			asset = (await this._client.cognite.assets.retrieve([{ id: regionTypeId }]))[0];
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

	/**
	 *
	 */
	public getRegionTypes = async (): Promise<Array<IMarineRegionType>> => {
		let marineRegions;
		try {
			marineRegions = await this._client.asset.getChildren("marine-regions");
		} catch (e) {
			throw e;
		}
		return this.MRTypeConvert(marineRegions.items);
	};

	/**
	 * Get polygons for a given sequence id
	 *
	 * @param id
	 */
	public getMarineRegion = async (id) => {
		let sequences;
		try {
			sequences = await this._sequences.retrieve([{ id }]);
		} catch (e) {
			throw e;
		}
		if (sequences.length === 0) {
			return null;
		}
		let asset;
		try {
			asset = await this._client.cognite.assets.retrieve([{ id: sequences[0].assetId }]);
		} catch (e) {
			throw e;
		}
		return this.getPolygonRows(sequences[0], asset[0]);
	};

	/**
	 * Private methods
	 */

	private getPolygonRows = async (sequence, asset?) => {
		const all: Array<IGeoLocation> = [];
		if (!asset && sequence.assetId) {
			try {
				asset = (await this._client.cognite.assets.retrieve([{ id: sequence.assetId }]))[0];
			} catch (e) {
				throw e;
			}
		}
		try {
			let response;

			while (true) {
				try {
					response = await this.getSequenceRows({
						id: sequence.id,
						limit: 10000,
						cursor: response ? response.nextCursor : null,
					});
				} catch (e) {
					throw e;
				}
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

	private MRTypeConvert = (assets): Array<IMarineRegionType> => {
		const returnValue: Array<IMarineRegionType> = [];
		for (const asset of assets) {
			const seqMeta: IMarineRegionType = {
				externalId: asset.externalId,
				parentId: asset.parentId,
				parentExternalId: asset.parentExternalId,
				id: asset.id,
				name: asset.name,
				source: asset.source,
			};
			returnValue.push(seqMeta);
		}

		return returnValue;
	};
	private getSequenceRows = (seqRows) => {
		return this._sequences.retrieveRows(seqRows);
	};
}

import { Asset, CogniteInternalId, CursorAndAsyncIterator, Sequence, SequenceRowsRetrieve } from "@cognite/sdk"
import { SequenceRow } from "@cognite/sdk/dist/src/api/sequences/sequenceRow"

import { IGeoLocation, ODPClient } from "."
import { throttleActions } from "./geoUtils"
import { IMarineRegion, IMarineRegionType } from "./types"

export class MarineRegions {
  private _concurrency = 50
  private _client: ODPClient

  public constructor(client: ODPClient) {
    this._client = client
  }

  /**
   * Get regions within a given id
   *
   * @param regionTypeId root asset
   * @param polygon If set to true, fetch polygons for each marine regions
   */

  public getMarineRegions = async (regionTypeId: CogniteInternalId, polygon = false): Promise<IMarineRegion[]> => {
    let sequences = []
    let asset: Asset
    try {
      const result = await Promise.all([
        this._client.sequences.list({ filter: { assetIds: [regionTypeId] }, limit: 1000 }),
        this._client.assets.retrieve([{ id: regionTypeId }]),
      ])
      sequences = result[0].items
      asset = result[1][0]
    } catch (error) {
      throw error
    }
    if (sequences.length === 0) {
      return []
    }
    if (polygon) {
      const promises = []

      for (const sequence of sequences) {
        promises.push(() => this.getPolygonRows(sequence, asset))
      }
      return throttleActions(promises, this._concurrency)
    } else {
      return this.MRSequenceConvert(sequences, asset)
    }
  }

  /**
   * Get all available region types
   */
  public getRegionTypes = async (): Promise<IMarineRegionType[]> => {
    let marineRegions
    try {
      marineRegions = await this._client.assets.list({
        filter: {
          parentExternalIds: ["marine-regions"],
        },
      })
    } catch (e) {
      throw e
    }
    return this.MRTypeConvert(marineRegions.items)
  }

  /**
   * Get polygons for a given sequence id
   *
   * @param id
   */
  public getMarineRegion = async (id: CogniteInternalId) => {
    let sequences: Sequence[]
    try {
      sequences = await this._client.sequences.retrieve([{ id }])
    } catch (e) {
      throw e
    }
    if (sequences.length === 0 || !sequences[0].assetId) {
      return null
    }
    let assets: Asset[]
    try {
      assets = await this._client.assets.retrieve([{ id: sequences[0].assetId }])
    } catch (e) {
      throw e
    }
    return this.getPolygonRows(sequences[0], assets[0])
  }

  public getMarineRegionByMRGID = async (mrgid: any) => {
    let sequences
    try {
      // @ts-ignore
      sequences = await this._client.sequences.retrieve([{ metadata: { MRGID: mrgid } }])
    } catch (e) {
      throw e
    }
    if (sequences.length === 0 || !sequences[0].assetId) {
      return null
    }
    let asset
    try {
      asset = await this._client.assets.retrieve([{ id: sequences[0].assetId }])
    } catch (e) {
      throw e
    }
    return this.getPolygonRows(sequences[0], asset[0])
  }
  /**
   * Private methods
   */

  private getPolygonRows = async (sequence: Sequence, asset?: Asset) => {
    const all: IGeoLocation[] = []
    if (!asset && sequence.assetId) {
      try {
        asset = (await this._client.assets.retrieve([{ id: sequence.assetId }]))[0]
      } catch (e) {
        throw e
      }
    }
    try {
      let response

      while (true) {
        try {
          response = await this.getSequenceRows({
            id: sequence.id,
            limit: 10000,
            cursor: response ? response.nextCursor : undefined,
          })
        } catch (e) {
          throw e
        }
        for (const item of response.items) {
          if (item[1] && item[2]) {
            all.push({ latitude: Number(item[1]), longitude: Number(item[2]) })
          }
        }
        if (!response.nextCursor) {
          break
        }
      }
    } catch (error) {
      throw error
    }
    const seq = this.MRSequenceConvert([sequence], asset)
    seq[0].polygon = all
    return seq[0]
  }

  private MRSequenceConvert = (sequences: Sequence[], asset?: Asset): IMarineRegion[] => {
    const returnValue: IMarineRegion[] = []
    for (const sequence of sequences) {
      const seqMeta: IMarineRegion = {
        externalId: sequence.externalId ?? "",
        parentId: asset ? asset.id : undefined,
        parentExternalId: asset ? asset.externalId : undefined,
        id: sequence.id,
        metadata: sequence.metadata,
      }
      returnValue.push(seqMeta)
    }

    return returnValue
  }

  private MRTypeConvert = (assets: Asset[]): IMarineRegionType[] => {
    const returnValue: IMarineRegionType[] = []
    for (const asset of assets) {
      const seqMeta: IMarineRegionType = {
        externalId: asset.externalId ?? "",
        parentId: asset.parentId,
        parentExternalId: asset.parentExternalId,
        id: asset.id,
        name: asset.name,
        source: asset.source ?? "",
      }
      returnValue.push(seqMeta)
    }

    return returnValue
  }

  private getSequenceRows = (seqRows: SequenceRowsRetrieve): CursorAndAsyncIterator<SequenceRow> =>
    this._client.sequences.retrieveRows(seqRows)
}

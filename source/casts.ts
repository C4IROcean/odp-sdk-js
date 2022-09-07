import { ExternalId, FileLink, Sequence, SequenceListScope, SequenceRowsRetrieve } from "@cognite/sdk"
import { getBounds, isPointInPolygon } from "geolib"

import { CastColumnTypeEnum, ICast, ICastFilter, ICastRow, ICastRowValue, ProviderEnum } from "./types"
import { boundingBoxToPolygon, throttleActions } from "./geoUtils"
import { convertStringToDate, getColumnsFromEnum, mapCoordinateToIndex } from "./castUtils"
import { ODPClient } from "."
import { GeolibInputCoordinates } from "geolib/es/types"

enum CastLevelEnum {
  _0 = 0,
  _1 = 1,
  _2 = 2,
  _3 = 3,
}

type ValueOf<T> = T[keyof T] & number
type ValidZoomLevelsT = ValueOf<CastLevelEnum>

/**
 * Casts class. Responsible for handling the three levels of casts.
 *
 * Level 0 contains an overview of all 1x1 grid cast count across all years and is useful
 * for for getting a globe (or large area) overview.
 *
 * Level 1 contains an overview of all 1x1 grid cast count for a specific year/years and is useful
 * for for getting a globe (or large area) overview.
 *
 * Level 2 contains a list of all casts for a given 1x1 grid with some metadata
 *
 * Level 3 contains the raw data for a given cast
 */

export class Casts {
  private _concurrency = 50
  private odpClient: ODPClient

  public constructor(client: ODPClient) {
    this.odpClient = client
  }

  /**
   * Get a cast count for the globe or a specific location. Level 1/0
   *
   * @param filter cast filter object
   * @param stream optional stream
   *
   */
  public getCastsCount = async (filter: ICastFilter = {}, stream?: any): Promise<ICastRow[]> => {
    let start: number = 0
    let end: number | undefined

    // Default level, used if there is no time filter.
    let level = CastLevelEnum._0
    let years: number[] = []
    if (filter.year || filter.time) {
      level = CastLevelEnum._1
      years = this.getYears(filter)
    }

    const location = filter.geoFilter?.location
    if (location?.longitude && location?.latitude) {
      start = mapCoordinateToIndex(location, 1)
      end = start + 1
    }
    const promises = []
    if (years.length > 0) {
      for (const year of years) {
        for (const query of this.sequenceQueryBuilder({ level, year, providers: filter.providers })) {
          promises.push(() => this.getSequenceQueryResult(query, null, start, end, stream))
        }
      }
    } else {
      for (const query of this.sequenceQueryBuilder({ level, providers: filter.providers })) {
        promises.push(() => this.getSequenceQueryResult(query, null, start, end, stream))
      }
    }
    const result = await throttleActions(promises, this._concurrency, stream)
    return result.flatMap(castCount => castCount)
  }

  /**
   * Get years that are available
   */
  public getCastYears = async (): Promise<string[]> => {
    const cast: Sequence[] = await this.odpClient.sequences.retrieve([{ externalId: "cast_wod_0" }])
    if (cast.length > 0 && cast[0].metadata?.cast_years) {
      return cast[0].metadata.cast_years.split(", ")
    }
    return []
  }

  /**
   * Get available cast columns
   */
  public getCastColumns(): string[] {
    return Object.values(CastColumnTypeEnum)
  }

  /**
   * Get available data providers
   */
  public getCastProviders(): string[] {
    return Object.values(ProviderEnum)
  }

  /**
   * Get available cast units (not implemented)
   */
  public getCastUnits = () => {
    throw new Error("Not implemented")
  }

  /**
   * Get casts and metadata for a given area. Level 2
   *
   * @param filter cast filter object
   * @param stream optional stream
   */
  public getCasts = async (filter: ICastFilter, stream?: any): Promise<ICastRow[]> => {
    if (filter.geoFilter?.boundingBox) {
      filter.geoFilter.polygon = boundingBoxToPolygon(filter.geoFilter.boundingBox)
    }

    // get polygon from mrgid
    if (filter.geoFilter?.mrgid) {
      const mr = await this.odpClient.unstable.marineRegions.getMarineRegionByMRGID(filter.geoFilter.mrgid)
      filter.geoFilter.polygon = mr?.polygon
    }

    // get casts using a polygon, minimum length 2 to validate
    if ((filter.geoFilter?.polygon?.length ?? 0) > 0) {
      const polygon = filter.geoFilter?.polygon
      if (polygon?.length && polygon.length < 3) {
        throw new Error(`Invalid polygon provided to "getCasts", expected at least 3 points, got ${polygon.length}`)
      }
      return this.getCastsFromPolygon(filter, stream)
    }

    if (!filter.geoFilter?.location && !filter.castId) {
      throw new Error("Either location or castId is required")
    }

    const castIds = []
    if (!filter.castId) {
      for (const year of this.getYears(filter)) {
        for (const ids of this.getCastIds(filter, 2)) {
          if (!!filter.geoFilter?.location) {
            castIds.push(ids + "_" + year + "_" + mapCoordinateToIndex(filter.geoFilter.location))
          }
        }
      }
    } else {
      castIds.push(filter.castId)
    }

    const result = await Promise.all(
      castIds.map(castId =>
        this.getSequenceQueryResult(
          { filter: { name: castId } },
          undefined,
          0,
          undefined,
          stream,
          this.castSequenceLv2Convert
        )
      )
    )

    return result.flatMap(iterator => this.postCastFilter(iterator, filter))
  }

  /**
   * Get metadata for a given castId
   *
   * @param castId id for a given cast
   */
  public getCastMetadata = async (castId: string): Promise<ICast[] | null> => {
    if (!castId) {
      throw new Error("castId is required")
    }

    const sequences = await this.odpClient.sequences.search({ filter: { name: castId } })
    if (sequences.length === 0) {
      return null
    }

    return this.castSequenceMetadataConvert(sequences)
  }

  /**
   * Get content for a given cast. Level 3
   *
   * @param filter cast filter object
   * @param stream Optional stream
   */
  public getCastRows = async (filter: ICastFilter, stream?: any): Promise<ICastRow[]> => {
    if (filter.geoFilter?.boundingBox) {
      filter.geoFilter.polygon = boundingBoxToPolygon(filter.geoFilter.boundingBox)
    }

    if ((filter.geoFilter?.polygon?.length ?? 0) > 2) {
      return this.getCastRowsFromPolygon(filter, stream)
    }
    if (!filter.castId) {
      throw new Error("castId is required")
    }

    return this.getSequenceQueryResult(
      { filter: { name: filter.castId } },
      filter.columns,
      0,
      undefined,
      stream,
      this.castSequenceConvert
    )
  }

  /**
   * Get the source file of the given cast
   *
   * @param castId id of a cast
   */
  public getCastSourceFileUrl = async (castId: string): Promise<(FileLink & ExternalId & { castId: string })[]> => {
    if (!castId) {
      throw new Error("Need a castId")
    }
    const sequences = await this.getCastMetadata(castId)
    if (!sequences) {
      throw new Error("No casts available for given id.")
    }
    const fileIdToSequenceMap = new Map(sequences.map(sequence => [sequence.metadata?.CDF_extIdFile, sequence]))
    const extFileIds = Array.from(fileIdToSequenceMap.keys())

    const externalIds = extFileIds.map(externalId => ({ externalId }))
    const fileUrls = (await this.odpClient.files.getDownloadUrls(externalIds)) as (FileLink & ExternalId)[]

    return fileUrls.map(fileUrl => {
      const sequence = fileIdToSequenceMap.get(fileUrl.externalId)
      if (!sequence) throw new Error(`Sequence with externalId ${fileUrl.externalId} was not found.`)
      return {
        ...fileUrl,
        castId: sequence.externalId,
      }
    })
  }

  /**
   * Internal methods
   */

  private isValidCastLevel(n: number): n is ValidZoomLevelsT {
    return Object.values(CastLevelEnum).includes(n)
  }

  private getCastRowsFromPolygon = async (filter: ICastFilter, stream?: any): Promise<ICastRow[]> => {
    const promises = []
    let casts
    try {
      casts = await this.getCastsFromPolygon(filter)
    } catch (e) {
      throw e
    }
    for (const cast of casts) {
      promises.push(() =>
        this.getCastRows({ castId: cast.value.extId, columns: filter.columns }, stream).then(rows =>
          this.postRowFilter(rows, filter)
        )
      )
    }

    const result = await throttleActions(promises, this._concurrency, stream)
    return result.flatMap(castRows => castRows)
  }

  private getCastsFromPolygon = async (filter: ICastFilter, stream?: any): Promise<ICastRow[]> => {
    if ((!filter.geoFilter?.polygon && !filter.geoFilter?.polygon) || filter.geoFilter.polygon.length < 3) {
      throw new Error("A polygon with a length > 2 is required")
    }
    if (!filter.year && !filter.time) {
      throw new Error("Need a given year or time filter when castId is missing")
    }
    const geoBounds = getBounds(filter.geoFilter.polygon)
    geoBounds.maxLat = Math.ceil(geoBounds.maxLat)
    geoBounds.maxLng = Math.ceil(geoBounds.maxLng)
    geoBounds.minLat = Math.floor(geoBounds.minLat)
    geoBounds.minLng = Math.floor(geoBounds.minLng)
    const castPromises = []
    for (let latitude = geoBounds.minLat + 1; latitude <= geoBounds.maxLat; latitude++) {
      for (let longitude = geoBounds.minLng + 1; longitude <= geoBounds.maxLng; longitude++) {
        const newFilter: ICastFilter = {
          year: filter.year,
          geoFilter: { location: { latitude, longitude } },
          columns: filter.columns,
          providers: filter.providers,
        }
        if (filter.year) {
          newFilter.year = filter.year
        } else {
          newFilter.time = filter.time
        }
        castPromises.push(() => this.getCasts(newFilter, stream))
      }
    }

    const result = await throttleActions(castPromises, this._concurrency, stream)
    return result.flatMap(casts => casts)
  }

  private filterLocationByPolygon = (row: ICastRow, polygon: GeolibInputCoordinates[]) => {
    if (isPointInPolygon({ latitude: row.location.lat, longitude: row.location.long }, polygon)) {
      return row
    }
  }

  private postRowFilter = (rows: ICastRow[], filter: ICastFilter): ICastRow[] => {
    const all = []
    for (const row of rows) {
      if (filter.quality !== undefined) {
        const qFilterResult = this.filterByQuality(row, filter)
        if (!qFilterResult) {
          continue
        }
      }
      if (filter.geoFilter?.polygon) {
        const pFilterResult = this.filterLocationByPolygon(row, filter.geoFilter.polygon)
        if (!pFilterResult) {
          continue
        }
      }
      all.push(row)
    }
    return all
  }

  private postCastFilter = (casts: ICast[], filter: ICastFilter): ICast[] => {
    const all = []
    for (const cast of casts) {
      if (!!filter.time && !!cast.time) {
        if (cast.time < filter.time.min || cast.time > filter.time.max) {
          continue
        }
      }
      all.push(cast)
    }
    return all
  }

  private filterByQuality = (row: ICastRow, filter: ICastFilter) => {
    let skip = false
    for (const value of Object.keys(row.value)) {
      if (row.value[value].flags && row.value[value].flags.wod !== null) {
        if (
          filter.quality !== undefined &&
          ((Array.isArray(filter.quality) && !filter.quality.includes(row.value[value].flags.wod)) ||
            row.value[value].flags.wod !== filter.quality)
        ) {
          skip = true
          break
        }
      }
    }
    if (!skip) {
      return row
    }
  }

  private getCastIds = (filter: ICastFilter, level: CastLevelEnum) => {
    const ids = []
    if (filter.providers && filter.providers.length > 0) {
      for (const provider of filter.providers) {
        ids.push(this.getSequencePrefix({ provider, level }))
      }
    } else {
      for (const provider of Object.values(ProviderEnum)) {
        ids.push(this.getSequencePrefix({ provider, level }))
      }
    }
    return ids
  }

  private getSequenceQueryResult = async (
    query: SequenceListScope,
    columns?: any,
    start = 0,
    end?: number,
    stream?: any,
    converter?: any
  ) => {
    const sequences = await this.odpClient.sequences.search(query)
    if (sequences.length === 0) {
      return []
    }

    sequences.sort((a, b) => (a.metadata.date > b.metadata.date ? 1 : b.metadata.date > a.metadata.date ? -1 : 0))

    if (!columns) {
      columns = sequences[0].columns.map(col => col.externalId)
    } else {
      const availableColumns = sequences[0].columns.map(col => col.externalId)

      columns = getColumnsFromEnum(columns, availableColumns)
    }

    const all = []

    let response

    while (true) {
      const q: SequenceRowsRetrieve[] = []
      for (const sq of sequences) {
        q.push({
          id: sq.id,
          limit: 10000,
          cursor: response ? response[q.length].nextCursor : null,
          start,
          end,
          columns,
        })
      }
      response = await this.getSequenceRows(q)
      const converted = converter
        ? converter(sequences, response, columns)
        : this.sequenceConvert(sequences, response, columns)
      if (!stream) {
        all.push(...converted)
      } else {
        stream.push(converted)
      }
      if (!response[0].nextCursor) {
        break
      }
    }

    if (stream) {
      // close stream
      stream.push(null)
    }

    return all
  }

  private getSequenceRows = seqRows => {
    const promises = []
    for (const seq of seqRows) {
      promises.push(() => this.odpClient.sequences.retrieveRows(seq))
    }
    return throttleActions(promises, this._concurrency)
  }

  private constants = () => ({
    sequence: {
      rowNames: ["Oxygen", "Temperature", "Salinity", "Chlorophyll", "Pressure", "Nitrate", "pH"],
    },
  })

  private getSequencePrefix = (options: { provider: ProviderEnum; level: CastLevelEnum; year?: number }): string => {
    const { provider, level, year } = options
    if (!Object.values(ProviderEnum).includes(provider)) {
      throw new Error("invalid provider")
    }
    if (!this.isValidCastLevel(level)) {
      throw new Error("invalid level")
    }

    let prefix = `cast_${provider}_${level}`
    if (typeof year === "number") {
      prefix += `_${year}`
    }

    return prefix
  }

  private sequenceQueryBuilder = (options: {
    level: CastLevelEnum
    year?: number
    providers?: ProviderEnum[]
  }): SequenceListScope[] => {
    const providers = options.providers ?? Object.values(ProviderEnum)

    return providers.map(provider => ({
      filter: {
        externalIdPrefix: this.getSequencePrefix({ provider, level: options.level, year: options.year }),
        metadata: {},
      },
      limit: 1000,
    }))
  }

  /**
   * Convert Cognite response to a ODP response
   */
  private sequenceConvert = (sequences: Sequence[], allRows, columns): ICastRow[] => {
    const returnValue: ICastRow[] = []
    const columnIndex: any = this.arrayIndex(columns)

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
      })
    }
    return returnValue
  }

  /**
   * Convert a cast sequence
   */

  private castSequenceConvert = (sequences: Sequence[], allRows, columns): ICastRow[] => {
    const returnValue: ICastRow[] = []
    const columnIndex: any = this.arrayIndex(columns)
    const cruise = {
      country: sequences[0].metadata.country,
      id: sequences[0].metadata.WOD_cruise_identifier,
      vesselName: sequences[0].metadata.WOD_cruise_name,
    }

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
      })
    }
    return returnValue
  }

  /**
   * Convert a cast sequence
   */

  private castSequenceLv2Convert = (sequences: Sequence[], allRows, columns): ICastRow[] => {
    const returnValue: ICastRow[] = []
    const columnIndex: any = this.arrayIndex(columns)

    for (const item of allRows[0].items) {
      const value = this.castValues(item, columnIndex)
      returnValue.push({
        location: {
          lat: parseFloat(value.lat ?? value.geo_lat),
          long: parseFloat(value.lon ?? value.geo_lon),
        },
        id: sequences[0].id,
        rowNumber: item.rowNumber,
        externalId: sequences[0].externalId,
        value,
        time: convertStringToDate(item[columnIndex.date]),
      })
    }
    return returnValue
  }

  private castSequenceMetadataConvert = (sequences: Sequence[]): ICast[] => {
    const returnValue: ICast[] = []
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
        time: convertStringToDate(sequence.metadata.date),

        metadata: {},
      }
      for (const item of Object.keys(sequence.metadata)) {
        if (!["country", "WOD_cruise_identifier", "WOD_cruise_name", "lat", "lon", "date"].includes(item)) {
          seqMeta.metadata[item] = sequence.metadata[item]
        }
      }
      returnValue.push(seqMeta)
    }

    return returnValue
  }

  private castRowValues = (item, columnIndex) => {
    const values: ICastRowValue = {}

    for (const rowName of this.constants().sequence.rowNames) {
      if (rowName in columnIndex && item[columnIndex[rowName]] !== null) {
        const lowerCaseName = rowName.toLocaleLowerCase()
        values[lowerCaseName] = { value: item[columnIndex[rowName]], flags: {} }
        if (rowName + "_WODflag" in columnIndex) {
          values[lowerCaseName].flags.wod = item[columnIndex[rowName + "_WODflag"]]
        }
        if (rowName + "_origflag" in columnIndex && item[columnIndex[rowName + "_origflag"]] !== null) {
          values[lowerCaseName].flags.orig = item[columnIndex[rowName + "_origflag"]]
        }
      }
    }

    return values
  }

  private getYears = (filter: ICastFilter): number[] => {
    if (!filter.year && !filter.time) {
      throw new Error("Need a given year or time filter when castId is missing")
    }

    const years: number[] = []
    if (filter.year) {
      years.push(filter.year)
    } else {
      for (let year = filter.time.min.getFullYear(); year <= filter.time.max.getFullYear(); year++) {
        years.push(year)
      }
    }
    return years
  }

  private castValues = (item, columnIndex) => {
    const values: any = {}

    for (const iterator of Object.keys(columnIndex)) {
      values[iterator] = item[columnIndex[iterator]]
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
    return values
  }

  private arrayIndex = array => {
    const ret = {}
    for (let index = 0; index < array.length; index++) {
      ret[array[index]] = index
    }
    return ret
  }
}

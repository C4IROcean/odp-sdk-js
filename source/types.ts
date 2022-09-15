export const DATA_PRODUCTS_META: IDataProductMeta[] = []

export const DATA_LAYERS: IDataLayer[] = []

export const DATA_PRODUCTS_TAGS_INDEX: string[] = []
export interface IIdTokenClaims {
  acr: string
  at_hash: string
  aud: string
  auth_time: number
  email: string
  exp: number
  family_name: string
  given_name: string
  groups: string[]
  grp: string[]
  iat: number
  idp: string
  iss: string
  name: string
  nbf: number
  nonce: string
  oid: string
  pgrest_role: string
  sub: string
  tid: string
  upn: string
  ver: string
}

// types used in app-odp
export enum DataSources {
  MapboxVectorTile = "vnd.mapbox-vector-tile",
}

export enum Filters {
  Depth = "depth",
  Time = "time",
}

export enum OdpDataAccessSolutions {
  ODE = "ODE",
  ODC = "ODC",
}

export interface IDataProductExtendedMainInfo {
  uuid: string
  name: string
  tags: string[]
  provider: string[]
  providerAcronym: string[] | null
  creator: string
  databaseDescription: string | null
  accessType: "public" | "private"
  timespan: number[] | null
  availableIn: OdpDataAccessSolutions[]
}
export interface IDataProductMeta extends IDataProductExtendedMainInfo {
  citation: string | null
  contact: string
  dateCreated: string | null
  dateUpdated: string | null
  tableDescription: string | null
  format: string | null
  homepage: string
  language: string
  license: string
  managedBy: string
  publisher: string
  subject: string
  source: string | null
  dataType: string
  usageExamples: string | null
  boundingBox: number[]
  doi: string | null
  odcNotebookLink: string
}

export interface IDataProductResult {
  dataProductResult: IDataProductExtendedMainInfo
  dataLayersMain: IDataLayerMain[]
}

export interface IDataLayerMain {
  id: number
  name: string
  dataProductUuid: string
}
export interface IDataLayer extends IDataLayerMain {
  dateCreated: string
  dateUpdated: string | null
  sourceUrl: string
  sourceType: DataSources
  layerType: IMapboxLayerType
  filter: Filters[] | null
  unit: string | null
  unit_abbr: string | null
  explorerStyling: IDataProductStyling
}

export interface IDataProduct {
  dataProduct: IDataProductMeta
  layersMain: IDataLayerMain[]
}

export interface IDataProductStyling {
  type?: "circle" | "line" | "fill"
  color?: string
  strokeColor?: string
  strokeWidth?: number
  circleRadius?: number
  opacity?: number
  lineStyle?: "dashed"
}

export type IMapboxLayerType =
  | "fill"
  | "line"
  | "symbol"
  | "circle"
  | "heatmap"
  | "fill-extrusion"
  | "raster"
  | "hillshade"
  | "background"

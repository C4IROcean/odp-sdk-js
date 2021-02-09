**[Ocean Data Platform JavaScript SDK](../README.md)**

> [Globals](../README.md) / Casts

# Class: Casts

Casts class. Responsible for handling the three levels of casts.

Level 0 contains an overview of all 1x1 grid cast count across all years and is useful
for for getting a globe (or large area) overview.

Level 1 contains an overview of all 1x1 grid cast count for a specific year/years and is useful
for for getting a globe (or large area) overview.

Level 2 contains a list of all casts for a given 1x1 grid with some metadata

Level 3 contains the raw data for a given cast

## Hierarchy

* **Casts**

## Index

### Constructors

* [constructor](casts.md#constructor)

### Methods

* [getCastColumns](casts.md#getcastcolumns)
* [getCastMetadata](casts.md#getcastmetadata)
* [getCastProviders](casts.md#getcastproviders)
* [getCastRows](casts.md#getcastrows)
* [getCastSourceFileUrl](casts.md#getcastsourcefileurl)
* [getCastUnits](casts.md#getcastunits)
* [getCastYears](casts.md#getcastyears)
* [getCasts](casts.md#getcasts)
* [getCastsCount](casts.md#getcastscount)

## Constructors

### constructor

\+ **new Casts**(`sequences`: Sequences): [Casts](casts.md)

*Defined in [source/casts/index.ts:38](https://github.com/C4IROcean/odp-sdk-js/blob/0e2fd46/source/casts/index.ts#L38)*

#### Parameters:

Name | Type |
------ | ------ |
`sequences` | Sequences |

**Returns:** [Casts](casts.md)

## Methods

### getCastColumns

▸ **getCastColumns**(): Array\<string>

*Defined in [source/casts/index.ts:100](https://github.com/C4IROcean/odp-sdk-js/blob/0e2fd46/source/casts/index.ts#L100)*

Get available cast columns

**Returns:** Array\<string>

___

### getCastMetadata

▸ **getCastMetadata**(`castId`: string): Promise\<Array\<[ICast](../interfaces/icast.md)>>

*Defined in [source/casts/index.ts:182](https://github.com/C4IROcean/odp-sdk-js/blob/0e2fd46/source/casts/index.ts#L182)*

Get metadata for a given castId

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`castId` | string | id for a given cast  |

**Returns:** Promise\<Array\<[ICast](../interfaces/icast.md)>>

___

### getCastProviders

▸ **getCastProviders**(): Array\<string>

*Defined in [source/casts/index.ts:107](https://github.com/C4IROcean/odp-sdk-js/blob/0e2fd46/source/casts/index.ts#L107)*

Get available data providers

**Returns:** Array\<string>

___

### getCastRows

▸ **getCastRows**(`filter`: [ICastFilter](../interfaces/icastfilter.md), `stream?`: any): Promise\<Array\<[ICastRow](../interfaces/icastrow.md)>>

*Defined in [source/casts/index.ts:201](https://github.com/C4IROcean/odp-sdk-js/blob/0e2fd46/source/casts/index.ts#L201)*

Get content for a given cast. Level 3

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`filter` | [ICastFilter](../interfaces/icastfilter.md) | cast filter object |
`stream?` | any | Optional stream  |

**Returns:** Promise\<Array\<[ICastRow](../interfaces/icastrow.md)>>

___

### getCastSourceFileUrl

▸ **getCastSourceFileUrl**(`castId`: string): Promise\<Array\<FileLink & ExternalId & { castId: string  }>>

*Defined in [source/casts/index.ts:228](https://github.com/C4IROcean/odp-sdk-js/blob/0e2fd46/source/casts/index.ts#L228)*

Get the source file of the given cast

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`castId` | string | id of a cast  |

**Returns:** Promise\<Array\<FileLink & ExternalId & { castId: string  }>>

___

### getCastUnits

▸ **getCastUnits**(): never

*Defined in [source/casts/index.ts:114](https://github.com/C4IROcean/odp-sdk-js/blob/0e2fd46/source/casts/index.ts#L114)*

Get available cast units (not implemented)

**Returns:** never

___

### getCastYears

▸ **getCastYears**(): Promise\<Array\<string>>

*Defined in [source/casts/index.ts:89](https://github.com/C4IROcean/odp-sdk-js/blob/0e2fd46/source/casts/index.ts#L89)*

Get years that are available

**Returns:** Promise\<Array\<string>>

___

### getCasts

▸ **getCasts**(`filter`: [ICastFilter](../interfaces/icastfilter.md), `stream?`: any): Promise\<Array\<[ICastRow](../interfaces/icastrow.md)>>

*Defined in [source/casts/index.ts:124](https://github.com/C4IROcean/odp-sdk-js/blob/0e2fd46/source/casts/index.ts#L124)*

Get casts and metadata for a given area. Level 2

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`filter` | [ICastFilter](../interfaces/icastfilter.md) | cast filter object |
`stream?` | any | optional stream  |

**Returns:** Promise\<Array\<[ICastRow](../interfaces/icastrow.md)>>

___

### getCastsCount

▸ **getCastsCount**(`filter`: [ICastFilter](../interfaces/icastfilter.md), `stream?`: any): Promise\<Array\<[ICastRow](../interfaces/icastrow.md)>>

*Defined in [source/casts/index.ts:53](https://github.com/C4IROcean/odp-sdk-js/blob/0e2fd46/source/casts/index.ts#L53)*

Get a cast count for the globe or a specific location. Level 1/0

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`filter` | [ICastFilter](../interfaces/icastfilter.md) | {} | cast filter object |
`stream?` | any | - | optional stream   |

**Returns:** Promise\<Array\<[ICastRow](../interfaces/icastrow.md)>>

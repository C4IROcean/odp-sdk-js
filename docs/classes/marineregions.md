**[Ocean Data Platform JavaScript SDK](../README.md)**

> [Globals](../README.md) / MarineRegions

# Class: MarineRegions

Marine regions class.

## Hierarchy

* **MarineRegions**

## Index

### Constructors

* [constructor](marineregions.md#constructor)

### Methods

* [getMarineRegion](marineregions.md#getmarineregion)
* [getMarineRegionByMRGID](marineregions.md#getmarineregionbymrgid)
* [getMarineRegions](marineregions.md#getmarineregions)
* [getRegionTypes](marineregions.md#getregiontypes)

## Constructors

### constructor

\+ **new MarineRegions**(`sequences`: Sequences): [MarineRegions](marineregions.md)

*Defined in [source/marineRegions/index.ts:14](https://github.com/C4IROcean/ODP-sdk-js/blob/0525c32/source/marineRegions/index.ts#L14)*

#### Parameters:

Name | Type |
------ | ------ |
`sequences` | Sequences |

**Returns:** [MarineRegions](marineregions.md)

## Methods

### getMarineRegion

▸ **getMarineRegion**(`id`: any): Promise\<[IMarineRegion](../interfaces/imarineregion.md)>

*Defined in [source/marineRegions/index.ts:73](https://github.com/C4IROcean/ODP-sdk-js/blob/0525c32/source/marineRegions/index.ts#L73)*

Get polygons for a given sequence id

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`id` | any |   |

**Returns:** Promise\<[IMarineRegion](../interfaces/imarineregion.md)>

___

### getMarineRegionByMRGID

▸ **getMarineRegionByMRGID**(`mrgid`: any): Promise\<[IMarineRegion](../interfaces/imarineregion.md)>

*Defined in [source/marineRegions/index.ts:92](https://github.com/C4IROcean/ODP-sdk-js/blob/0525c32/source/marineRegions/index.ts#L92)*

#### Parameters:

Name | Type |
------ | ------ |
`mrgid` | any |

**Returns:** Promise\<[IMarineRegion](../interfaces/imarineregion.md)>

___

### getMarineRegions

▸ **getMarineRegions**(`regionTypeId`: any, `polygon`: boolean): Promise\<Array\<[IMarineRegion](../interfaces/imarineregion.md)>>

*Defined in [source/marineRegions/index.ts:27](https://github.com/C4IROcean/ODP-sdk-js/blob/0525c32/source/marineRegions/index.ts#L27)*

Get regions within a given id

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`regionTypeId` | any | - | root asset |
`polygon` | boolean | false | If set to true, fetch polygons for each marine regions  |

**Returns:** Promise\<Array\<[IMarineRegion](../interfaces/imarineregion.md)>>

___

### getRegionTypes

▸ **getRegionTypes**(): Promise\<Array\<[IMarineRegionType](../interfaces/imarineregiontype.md)>>

*Defined in [source/marineRegions/index.ts:58](https://github.com/C4IROcean/ODP-sdk-js/blob/0525c32/source/marineRegions/index.ts#L58)*

Get all available region types

**Returns:** Promise\<Array\<[IMarineRegionType](../interfaces/imarineregiontype.md)>>

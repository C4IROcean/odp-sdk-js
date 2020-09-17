[Ocean Data Platform JavaScript SDK](../README.md) > [MarineRegions](../classes/marineregions.md)

# Class: MarineRegions

## Hierarchy

**MarineRegions**

## Index

### Constructors

* [constructor](marineregions.md#constructor)

### Methods

* [getMarineRegion](marineregions.md#getmarineregion)
* [getMarineRegions](marineregions.md#getmarineregions)
* [getRegionTypes](marineregions.md#getregiontypes)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new MarineRegions**(sequences: *[Sequences](sequences.md)*): [MarineRegions](marineregions.md)

*Defined in marineRegions/index.ts:13*

**Parameters:**

| Name | Type |
| ------ | ------ |
| sequences | [Sequences](sequences.md) |

**Returns:** [MarineRegions](marineregions.md)

___

## Methods

<a id="getmarineregion"></a>

###  getMarineRegion

▸ **getMarineRegion**(id: *`any`*): `Promise`<[IMarineRegion](../interfaces/imarineregion.md)>

*Defined in marineRegions/index.ts:69*

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| id | `any` |   |

**Returns:** `Promise`<[IMarineRegion](../interfaces/imarineregion.md)>

___
<a id="getmarineregions"></a>

###  getMarineRegions

▸ **getMarineRegions**(regionTypeId: *`any`*, polygon?: *`boolean`*): `Promise`<`Array`<[IMarineRegion](../interfaces/imarineregion.md)>>

*Defined in marineRegions/index.ts:25*

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| regionTypeId | `any` | - |  root asset |
| `Default value` polygon | `boolean` | false |  fetch polygons for each marine regions |

**Returns:** `Promise`<`Array`<[IMarineRegion](../interfaces/imarineregion.md)>>

___
<a id="getregiontypes"></a>

###  getRegionTypes

▸ **getRegionTypes**(): `Promise`<`Array`<[IMarineRegionType](../interfaces/imarineregiontype.md)>>

*Defined in marineRegions/index.ts:54*

**Returns:** `Promise`<`Array`<[IMarineRegionType](../interfaces/imarineregiontype.md)>>

___


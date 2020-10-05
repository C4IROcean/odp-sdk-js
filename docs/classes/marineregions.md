[Ocean Data Platform JavaScript SDK](../README.md) > [MarineRegions](../classes/marineregions.md)

# Class: MarineRegions

## Hierarchy

**MarineRegions**

## Index

### Constructors

* [constructor](marineregions.md#constructor)

### Methods

* [getMarineRegion](marineregions.md#getmarineregion)
* [getMarineRegionByMRGID](marineregions.md#getmarineregionbymrgid)
* [getMarineRegions](marineregions.md#getmarineregions)
* [getRegionTypes](marineregions.md#getregiontypes)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new MarineRegions**(sequences: *`Sequences`*): [MarineRegions](marineregions.md)

*Defined in [marineRegions/index.ts:14](https://github.com/C4IROcean/ODP-sdk-js/blob/7cb7662/source/marineRegions/index.ts#L14)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| sequences | `Sequences` |

**Returns:** [MarineRegions](marineregions.md)

___

## Methods

<a id="getmarineregion"></a>

###  getMarineRegion

▸ **getMarineRegion**(id: *`any`*): `Promise`<[IMarineRegion](../interfaces/imarineregion.md)>

*Defined in [marineRegions/index.ts:73](https://github.com/C4IROcean/ODP-sdk-js/blob/7cb7662/source/marineRegions/index.ts#L73)*

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| id | `any` |   |

**Returns:** `Promise`<[IMarineRegion](../interfaces/imarineregion.md)>

___
<a id="getmarineregionbymrgid"></a>

###  getMarineRegionByMRGID

▸ **getMarineRegionByMRGID**(mrgid: *`any`*): `Promise`<[IMarineRegion](../interfaces/imarineregion.md)>

*Defined in [marineRegions/index.ts:92](https://github.com/C4IROcean/ODP-sdk-js/blob/7cb7662/source/marineRegions/index.ts#L92)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| mrgid | `any` |

**Returns:** `Promise`<[IMarineRegion](../interfaces/imarineregion.md)>

___
<a id="getmarineregions"></a>

###  getMarineRegions

▸ **getMarineRegions**(regionTypeId: *`any`*, polygon?: *`boolean`*): `Promise`<`Array`<[IMarineRegion](../interfaces/imarineregion.md)>>

*Defined in [marineRegions/index.ts:27](https://github.com/C4IROcean/ODP-sdk-js/blob/7cb7662/source/marineRegions/index.ts#L27)*

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| regionTypeId | `any` | - |  root asset |
| `Default value` polygon | `boolean` | false |  If set to true, fetch polygons for each marine regions |

**Returns:** `Promise`<`Array`<[IMarineRegion](../interfaces/imarineregion.md)>>

___
<a id="getregiontypes"></a>

###  getRegionTypes

▸ **getRegionTypes**(): `Promise`<`Array`<[IMarineRegionType](../interfaces/imarineregiontype.md)>>

*Defined in [marineRegions/index.ts:58](https://github.com/C4IROcean/ODP-sdk-js/blob/7cb7662/source/marineRegions/index.ts#L58)*

**Returns:** `Promise`<`Array`<[IMarineRegionType](../interfaces/imarineregiontype.md)>>

___


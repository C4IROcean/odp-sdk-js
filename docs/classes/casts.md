[Ocean Data Platform JavaScript SDK](../README.md) > [Casts](../classes/casts.md)

# Class: Casts

## Hierarchy

**Casts**

## Index

### Constructors

* [constructor](casts.md#constructor)

### Methods

* [getCastColumns](casts.md#getcastcolumns)
* [getCastMetadata](casts.md#getcastmetadata)
* [getCastRows](casts.md#getcastrows)
* [getCastSourceFileUrl](casts.md#getcastsourcefileurl)
* [getCastUnits](casts.md#getcastunits)
* [getCastYears](casts.md#getcastyears)
* [getCasts](casts.md#getcasts)
* [getCastsCount](casts.md#getcastscount)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Casts**(sequences: *`Sequences`*): [Casts](casts.md)

*Defined in [casts/index.ts:25](https://github.com/C4IROcean/ODP-sdk-js/blob/cbd469b/source/casts/index.ts#L25)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| sequences | `Sequences` |

**Returns:** [Casts](casts.md)

___

## Methods

<a id="getcastcolumns"></a>

###  getCastColumns

▸ **getCastColumns**(): `any`[]

*Defined in [casts/index.ts:82](https://github.com/C4IROcean/ODP-sdk-js/blob/cbd469b/source/casts/index.ts#L82)*

**Returns:** `any`[]

___
<a id="getcastmetadata"></a>

###  getCastMetadata

▸ **getCastMetadata**(filter: *[ICastFilter](../interfaces/icastfilter.md)*): `Promise`<[ICast](../interfaces/icast.md)[]>

*Defined in [casts/index.ts:141](https://github.com/C4IROcean/ODP-sdk-js/blob/cbd469b/source/casts/index.ts#L141)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| filter | [ICastFilter](../interfaces/icastfilter.md) |

**Returns:** `Promise`<[ICast](../interfaces/icast.md)[]>

___
<a id="getcastrows"></a>

###  getCastRows

▸ **getCastRows**(filter: *[ICastFilter](../interfaces/icastfilter.md)*, stream?: *`any`*): `Promise`<`any`[]>

*Defined in [casts/index.ts:162](https://github.com/C4IROcean/ODP-sdk-js/blob/cbd469b/source/casts/index.ts#L162)*

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| filter | [ICastFilter](../interfaces/icastfilter.md) |  cast filter object |
| `Optional` stream | `any` |  Optional stream |

**Returns:** `Promise`<`any`[]>

___
<a id="getcastsourcefileurl"></a>

###  getCastSourceFileUrl

▸ **getCastSourceFileUrl**(filter: *[ICastFilter](../interfaces/icastfilter.md)*): `Promise`<`any`>

*Defined in [casts/index.ts:188](https://github.com/C4IROcean/ODP-sdk-js/blob/cbd469b/source/casts/index.ts#L188)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| filter | [ICastFilter](../interfaces/icastfilter.md) |

**Returns:** `Promise`<`any`>

___
<a id="getcastunits"></a>

###  getCastUnits

▸ **getCastUnits**(): `never`

*Defined in [casts/index.ts:89](https://github.com/C4IROcean/ODP-sdk-js/blob/cbd469b/source/casts/index.ts#L89)*

**Returns:** `never`

___
<a id="getcastyears"></a>

###  getCastYears

▸ **getCastYears**(): `Promise`<`any`>

*Defined in [casts/index.ts:65](https://github.com/C4IROcean/ODP-sdk-js/blob/cbd469b/source/casts/index.ts#L65)*

**Returns:** `Promise`<`any`>

___
<a id="getcasts"></a>

###  getCasts

▸ **getCasts**(filter: *[ICastFilter](../interfaces/icastfilter.md)*, stream?: *`any`*): `Promise`<`any`[]>

*Defined in [casts/index.ts:99](https://github.com/C4IROcean/ODP-sdk-js/blob/cbd469b/source/casts/index.ts#L99)*

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| filter | [ICastFilter](../interfaces/icastfilter.md) |  cast filter object |
| `Optional` stream | `any` |  optional stream |

**Returns:** `Promise`<`any`[]>

___
<a id="getcastscount"></a>

###  getCastsCount

▸ **getCastsCount**(filter?: *[ICastFilter](../interfaces/icastfilter.md)*, stream?: *`any`*): `Promise`<`any`[]>

*Defined in [casts/index.ts:41](https://github.com/C4IROcean/ODP-sdk-js/blob/cbd469b/source/casts/index.ts#L41)*

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `Default value` filter | [ICastFilter](../interfaces/icastfilter.md) |  {} |  cast filter object |
| `Optional` stream | `any` | - |  optional stream<br><br> |

**Returns:** `Promise`<`any`[]>

___


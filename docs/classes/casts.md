[Ocean Data Platform JavaScript SDK](../README.md) > [Casts](../classes/casts.md)

# Class: Casts

## Hierarchy

**Casts**

## Index

### Constructors

* [constructor](casts.md#constructor)

### Methods

* [getCastColumns](casts.md#getcastcolumns)
* [getCastRows](casts.md#getcastrows)
* [getCastUnits](casts.md#getcastunits)
* [getCastYears](casts.md#getcastyears)
* [getCasts](casts.md#getcasts)
* [getCastsCount](casts.md#getcastscount)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Casts**(sequences: *[Sequences](sequences.md)*): [Casts](casts.md)

*Defined in [source/sequences/casts/index.ts:22](https://github.com/C4IROcean/ODP-sdk-js/blob/4709765/source/sequences/casts/index.ts#L22)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| sequences | [Sequences](sequences.md) |

**Returns:** [Casts](casts.md)

___

## Methods

<a id="getcastcolumns"></a>

###  getCastColumns

▸ **getCastColumns**(): `any`[]

*Defined in [source/sequences/casts/index.ts:72](https://github.com/C4IROcean/ODP-sdk-js/blob/4709765/source/sequences/casts/index.ts#L72)*

**Returns:** `any`[]

___
<a id="getcastrows"></a>

###  getCastRows

▸ **getCastRows**(filter: *[ICastFilter](../interfaces/icastfilter.md)*, stream?: *`any`*): `Promise`<`any`[]>

*Defined in [source/sequences/casts/index.ts:124](https://github.com/C4IROcean/ODP-sdk-js/blob/4709765/source/sequences/casts/index.ts#L124)*

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| filter | [ICastFilter](../interfaces/icastfilter.md) |  cast filter object |
| `Optional` stream | `any` |  Optional stream |

**Returns:** `Promise`<`any`[]>

___
<a id="getcastunits"></a>

###  getCastUnits

▸ **getCastUnits**(): `never`

*Defined in [source/sequences/casts/index.ts:76](https://github.com/C4IROcean/ODP-sdk-js/blob/4709765/source/sequences/casts/index.ts#L76)*

**Returns:** `never`

___
<a id="getcastyears"></a>

###  getCastYears

▸ **getCastYears**(): `Promise`<`string`[]>

*Defined in [source/sequences/casts/index.ts:64](https://github.com/C4IROcean/ODP-sdk-js/blob/4709765/source/sequences/casts/index.ts#L64)*

**Returns:** `Promise`<`string`[]>

___
<a id="getcasts"></a>

###  getCasts

▸ **getCasts**(filter: *[ICastFilter](../interfaces/icastfilter.md)*, stream?: *`any`*): `Promise`<`any`[]>

*Defined in [source/sequences/casts/index.ts:86](https://github.com/C4IROcean/ODP-sdk-js/blob/4709765/source/sequences/casts/index.ts#L86)*

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

*Defined in [source/sequences/casts/index.ts:38](https://github.com/C4IROcean/ODP-sdk-js/blob/4709765/source/sequences/casts/index.ts#L38)*

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `Default value` filter | [ICastFilter](../interfaces/icastfilter.md) |  {} |  cast filter object |
| `Optional` stream | `any` | - |  optional stream<br><br>#TODO*   Need to support polygon location object the get multiple values |

**Returns:** `Promise`<`any`[]>

___


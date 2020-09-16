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

⊕ **new Casts**(sequences: *[Sequences](sequences.md)*): [Casts](casts.md)

*Defined in [sequences/casts/index.ts:23](https://github.com/C4IROcean/ODP-sdk-js/blob/26e019a/source/sequences/casts/index.ts#L23)*

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

*Defined in [sequences/casts/index.ts:73](https://github.com/C4IROcean/ODP-sdk-js/blob/26e019a/source/sequences/casts/index.ts#L73)*

**Returns:** `any`[]

___
<a id="getcastmetadata"></a>

###  getCastMetadata

▸ **getCastMetadata**(filter: *[ICastFilter](../interfaces/icastfilter.md)*): `Promise`<[ISequence](../interfaces/isequence.md)[]>

*Defined in [sequences/casts/index.ts:122](https://github.com/C4IROcean/ODP-sdk-js/blob/26e019a/source/sequences/casts/index.ts#L122)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| filter | [ICastFilter](../interfaces/icastfilter.md) |

**Returns:** `Promise`<[ISequence](../interfaces/isequence.md)[]>

___
<a id="getcastrows"></a>

###  getCastRows

▸ **getCastRows**(filter: *[ICastFilter](../interfaces/icastfilter.md)*, stream?: *`any`*): `Promise`<`any`[]>

*Defined in [sequences/casts/index.ts:143](https://github.com/C4IROcean/ODP-sdk-js/blob/26e019a/source/sequences/casts/index.ts#L143)*

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

*Defined in [sequences/casts/index.ts:169](https://github.com/C4IROcean/ODP-sdk-js/blob/26e019a/source/sequences/casts/index.ts#L169)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| filter | [ICastFilter](../interfaces/icastfilter.md) |

**Returns:** `Promise`<`any`>

___
<a id="getcastunits"></a>

###  getCastUnits

▸ **getCastUnits**(): `never`

*Defined in [sequences/casts/index.ts:77](https://github.com/C4IROcean/ODP-sdk-js/blob/26e019a/source/sequences/casts/index.ts#L77)*

**Returns:** `never`

___
<a id="getcastyears"></a>

###  getCastYears

▸ **getCastYears**(): `Promise`<`string`[]>

*Defined in [sequences/casts/index.ts:65](https://github.com/C4IROcean/ODP-sdk-js/blob/26e019a/source/sequences/casts/index.ts#L65)*

**Returns:** `Promise`<`string`[]>

___
<a id="getcasts"></a>

###  getCasts

▸ **getCasts**(filter: *[ICastFilter](../interfaces/icastfilter.md)*, stream?: *`any`*): `Promise`<`any`[]>

*Defined in [sequences/casts/index.ts:87](https://github.com/C4IROcean/ODP-sdk-js/blob/26e019a/source/sequences/casts/index.ts#L87)*

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

*Defined in [sequences/casts/index.ts:39](https://github.com/C4IROcean/ODP-sdk-js/blob/26e019a/source/sequences/casts/index.ts#L39)*

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `Default value` filter | [ICastFilter](../interfaces/icastfilter.md) |  {} |  cast filter object |
| `Optional` stream | `any` | - |  optional stream<br><br>#TODO*   Need to support polygon location object the get multiple values |

**Returns:** `Promise`<`any`[]>

___


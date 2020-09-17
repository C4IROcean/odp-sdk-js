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

*Defined in [casts/index.ts:23](https://github.com/C4IROcean/ODP-sdk-js/blob/17df383/source/casts/index.ts#L23)*

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

*Defined in [casts/index.ts:67](https://github.com/C4IROcean/ODP-sdk-js/blob/17df383/source/casts/index.ts#L67)*

**Returns:** `any`[]

___
<a id="getcastmetadata"></a>

###  getCastMetadata

▸ **getCastMetadata**(filter: *[ICastFilter](../interfaces/icastfilter.md)*): `Promise`<[ICast](../interfaces/icast.md)[]>

*Defined in [casts/index.ts:116](https://github.com/C4IROcean/ODP-sdk-js/blob/17df383/source/casts/index.ts#L116)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| filter | [ICastFilter](../interfaces/icastfilter.md) |

**Returns:** `Promise`<[ICast](../interfaces/icast.md)[]>

___
<a id="getcastrows"></a>

###  getCastRows

▸ **getCastRows**(filter: *[ICastFilter](../interfaces/icastfilter.md)*, stream?: *`any`*): `Promise`<`any`[]>

*Defined in [casts/index.ts:137](https://github.com/C4IROcean/ODP-sdk-js/blob/17df383/source/casts/index.ts#L137)*

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

*Defined in [casts/index.ts:163](https://github.com/C4IROcean/ODP-sdk-js/blob/17df383/source/casts/index.ts#L163)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| filter | [ICastFilter](../interfaces/icastfilter.md) |

**Returns:** `Promise`<`any`>

___
<a id="getcastunits"></a>

###  getCastUnits

▸ **getCastUnits**(): `never`

*Defined in [casts/index.ts:71](https://github.com/C4IROcean/ODP-sdk-js/blob/17df383/source/casts/index.ts#L71)*

**Returns:** `never`

___
<a id="getcastyears"></a>

###  getCastYears

▸ **getCastYears**(): `Promise`<`string`[]>

*Defined in [casts/index.ts:59](https://github.com/C4IROcean/ODP-sdk-js/blob/17df383/source/casts/index.ts#L59)*

**Returns:** `Promise`<`string`[]>

___
<a id="getcasts"></a>

###  getCasts

▸ **getCasts**(filter: *[ICastFilter](../interfaces/icastfilter.md)*, stream?: *`any`*): `Promise`<`any`[]>

*Defined in [casts/index.ts:81](https://github.com/C4IROcean/ODP-sdk-js/blob/17df383/source/casts/index.ts#L81)*

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

*Defined in [casts/index.ts:39](https://github.com/C4IROcean/ODP-sdk-js/blob/17df383/source/casts/index.ts#L39)*

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `Default value` filter | [ICastFilter](../interfaces/icastfilter.md) |  {} |  cast filter object |
| `Optional` stream | `any` | - |  optional stream<br><br>#TODO*   Need to support polygon location object the get multiple values |

**Returns:** `Promise`<`any`[]>

___


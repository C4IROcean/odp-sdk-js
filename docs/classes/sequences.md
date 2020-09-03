[Ocean Data Platform JavaScript SDK](../README.md) > [Sequences](../classes/sequences.md)

# Class: Sequences

## Hierarchy

**Sequences**

## Index

### Constructors

* [constructor](sequences.md#constructor)

### Accessors

* [casts](sequences.md#casts)
* [client](sequences.md#client)

### Methods

* [castSequenceConvert](sequences.md#castsequenceconvert)
* [castSequenceLv2Convert](sequences.md#castsequencelv2convert)
* [constants](sequences.md#constants)
* [sequenceConvert](sequences.md#sequenceconvert)
* [sequenceQueryBuilder](sequences.md#sequencequerybuilder)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Sequences**(client: *[ODPClient](odpclient.md)*): [Sequences](sequences.md)

*Defined in [source/sequences/index.ts:7](https://github.com/C4IROcean/ODP-sdk-js/blob/d16dc4d/source/sequences/index.ts#L7)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| client | [ODPClient](odpclient.md) |

**Returns:** [Sequences](sequences.md)

___

## Accessors

<a id="casts"></a>

###  casts

**casts**: 

*Defined in [source/sequences/index.ts:16](https://github.com/C4IROcean/ODP-sdk-js/blob/d16dc4d/source/sequences/index.ts#L16)*

___
<a id="client"></a>

###  client

**client**: 

*Defined in [source/sequences/index.ts:12](https://github.com/C4IROcean/ODP-sdk-js/blob/d16dc4d/source/sequences/index.ts#L12)*

___

## Methods

<a id="castsequenceconvert"></a>

###  castSequenceConvert

▸ **castSequenceConvert**(sequences: *`Array`<`Sequence`>*, allRows: *`any`*, columns: *`any`*): `Array`<[ISequenceRow](../interfaces/isequencerow.md)>

*Defined in [source/sequences/index.ts:80](https://github.com/C4IROcean/ODP-sdk-js/blob/d16dc4d/source/sequences/index.ts#L80)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| sequences | `Array`<`Sequence`> |
| allRows | `any` |
| columns | `any` |

**Returns:** `Array`<[ISequenceRow](../interfaces/isequencerow.md)>

___
<a id="castsequencelv2convert"></a>

###  castSequenceLv2Convert

▸ **castSequenceLv2Convert**(sequences: *`Array`<`Sequence`>*, allRows: *`any`*, columns: *`any`*): `Array`<[ISequenceRow](../interfaces/isequencerow.md)>

*Defined in [source/sequences/index.ts:111](https://github.com/C4IROcean/ODP-sdk-js/blob/d16dc4d/source/sequences/index.ts#L111)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| sequences | `Array`<`Sequence`> |
| allRows | `any` |
| columns | `any` |

**Returns:** `Array`<[ISequenceRow](../interfaces/isequencerow.md)>

___
<a id="constants"></a>

###  constants

▸ **constants**(): `object`

*Defined in [source/sequences/index.ts:20](https://github.com/C4IROcean/ODP-sdk-js/blob/d16dc4d/source/sequences/index.ts#L20)*

**Returns:** `object`

___
<a id="sequenceconvert"></a>

###  sequenceConvert

▸ **sequenceConvert**(sequences: *`Array`<`Sequence`>*, allRows: *`any`*, columns: *`any`*): `Array`<[ISequenceRow](../interfaces/isequencerow.md)>

*Defined in [source/sequences/index.ts:46](https://github.com/C4IROcean/ODP-sdk-js/blob/d16dc4d/source/sequences/index.ts#L46)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| sequences | `Array`<`Sequence`> |
| allRows | `any` |
| columns | `any` |

**Returns:** `Array`<[ISequenceRow](../interfaces/isequencerow.md)>

___
<a id="sequencequerybuilder"></a>

###  sequenceQueryBuilder

▸ **sequenceQueryBuilder**(level: *`number`*, year?: *`number`*): `SequenceListScope`

*Defined in [source/sequences/index.ts:29](https://github.com/C4IROcean/ODP-sdk-js/blob/d16dc4d/source/sequences/index.ts#L29)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| level | `number` |
| `Optional` year | `number` |

**Returns:** `SequenceListScope`

___


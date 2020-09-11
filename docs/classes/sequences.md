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
* [castSequenceMetadataConvert](sequences.md#castsequencemetadataconvert)
* [constants](sequences.md#constants)
* [sequenceConvert](sequences.md#sequenceconvert)
* [sequenceQueryBuilder](sequences.md#sequencequerybuilder)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Sequences**(client: *[ODPClient](odpclient.md)*): [Sequences](sequences.md)

*Defined in [sequences/index.ts:8](https://github.com/C4IROcean/ODP-sdk-js/blob/4911c12/source/sequences/index.ts#L8)*

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

*Defined in [sequences/index.ts:17](https://github.com/C4IROcean/ODP-sdk-js/blob/4911c12/source/sequences/index.ts#L17)*

___
<a id="client"></a>

###  client

**client**: 

*Defined in [sequences/index.ts:13](https://github.com/C4IROcean/ODP-sdk-js/blob/4911c12/source/sequences/index.ts#L13)*

___

## Methods

<a id="castsequenceconvert"></a>

###  castSequenceConvert

▸ **castSequenceConvert**(sequences: *`Array`<`Sequence`>*, allRows: *`any`*, columns: *`any`*): `Array`<[ISequenceRow](../interfaces/isequencerow.md)>

*Defined in [sequences/index.ts:81](https://github.com/C4IROcean/ODP-sdk-js/blob/4911c12/source/sequences/index.ts#L81)*

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

*Defined in [sequences/index.ts:112](https://github.com/C4IROcean/ODP-sdk-js/blob/4911c12/source/sequences/index.ts#L112)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| sequences | `Array`<`Sequence`> |
| allRows | `any` |
| columns | `any` |

**Returns:** `Array`<[ISequenceRow](../interfaces/isequencerow.md)>

___
<a id="castsequencemetadataconvert"></a>

###  castSequenceMetadataConvert

▸ **castSequenceMetadataConvert**(sequences: *`Array`<`Sequence`>*): `Array`<[ISequence](../interfaces/isequence.md)>

*Defined in [sequences/index.ts:133](https://github.com/C4IROcean/ODP-sdk-js/blob/4911c12/source/sequences/index.ts#L133)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| sequences | `Array`<`Sequence`> |

**Returns:** `Array`<[ISequence](../interfaces/isequence.md)>

___
<a id="constants"></a>

###  constants

▸ **constants**(): `object`

*Defined in [sequences/index.ts:21](https://github.com/C4IROcean/ODP-sdk-js/blob/4911c12/source/sequences/index.ts#L21)*

**Returns:** `object`

___
<a id="sequenceconvert"></a>

###  sequenceConvert

▸ **sequenceConvert**(sequences: *`Array`<`Sequence`>*, allRows: *`any`*, columns: *`any`*): `Array`<[ISequenceRow](../interfaces/isequencerow.md)>

*Defined in [sequences/index.ts:47](https://github.com/C4IROcean/ODP-sdk-js/blob/4911c12/source/sequences/index.ts#L47)*

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

*Defined in [sequences/index.ts:30](https://github.com/C4IROcean/ODP-sdk-js/blob/4911c12/source/sequences/index.ts#L30)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| level | `number` |
| `Optional` year | `number` |

**Returns:** `SequenceListScope`

___


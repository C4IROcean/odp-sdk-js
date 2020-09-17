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
* [marineRegions](sequences.md#marineregions)

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

*Defined in utils/sequences/index.ts:10*

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

*Defined in utils/sequences/index.ts:18*

___
<a id="client"></a>

###  client

**client**: 

*Defined in utils/sequences/index.ts:14*

___
<a id="marineregions"></a>

###  marineRegions

**marineRegions**: 

*Defined in utils/sequences/index.ts:22*

___

## Methods

<a id="castsequenceconvert"></a>

###  castSequenceConvert

▸ **castSequenceConvert**(sequences: *`Array`<`Sequence`>*, allRows: *`any`*, columns: *`any`*): `Array`<[ISequenceRow](../interfaces/isequencerow.md)>

*Defined in utils/sequences/index.ts:85*

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

*Defined in utils/sequences/index.ts:116*

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

*Defined in utils/sequences/index.ts:137*

**Parameters:**

| Name | Type |
| ------ | ------ |
| sequences | `Array`<`Sequence`> |

**Returns:** `Array`<[ISequence](../interfaces/isequence.md)>

___
<a id="constants"></a>

###  constants

▸ **constants**(): `object`

*Defined in utils/sequences/index.ts:25*

**Returns:** `object`

___
<a id="sequenceconvert"></a>

###  sequenceConvert

▸ **sequenceConvert**(sequences: *`Array`<`Sequence`>*, allRows: *`any`*, columns: *`any`*): `Array`<[ISequenceRow](../interfaces/isequencerow.md)>

*Defined in utils/sequences/index.ts:51*

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

*Defined in utils/sequences/index.ts:34*

**Parameters:**

| Name | Type |
| ------ | ------ |
| level | `number` |
| `Optional` year | `number` |

**Returns:** `SequenceListScope`

___


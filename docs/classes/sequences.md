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

*Defined in [sequences/index.ts:10](https://github.com/C4IROcean/ODP-sdk-js/blob/26e019a/source/sequences/index.ts#L10)*

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

*Defined in [sequences/index.ts:19](https://github.com/C4IROcean/ODP-sdk-js/blob/26e019a/source/sequences/index.ts#L19)*

___
<a id="client"></a>

###  client

**client**: 

*Defined in [sequences/index.ts:15](https://github.com/C4IROcean/ODP-sdk-js/blob/26e019a/source/sequences/index.ts#L15)*

___
<a id="marineregions"></a>

###  marineRegions

**marineRegions**: 

*Defined in [sequences/index.ts:23](https://github.com/C4IROcean/ODP-sdk-js/blob/26e019a/source/sequences/index.ts#L23)*

___

## Methods

<a id="castsequenceconvert"></a>

###  castSequenceConvert

▸ **castSequenceConvert**(sequences: *`Array`<`Sequence`>*, allRows: *`any`*, columns: *`any`*): `Array`<[ISequenceRow](../interfaces/isequencerow.md)>

*Defined in [sequences/index.ts:86](https://github.com/C4IROcean/ODP-sdk-js/blob/26e019a/source/sequences/index.ts#L86)*

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

*Defined in [sequences/index.ts:117](https://github.com/C4IROcean/ODP-sdk-js/blob/26e019a/source/sequences/index.ts#L117)*

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

*Defined in [sequences/index.ts:138](https://github.com/C4IROcean/ODP-sdk-js/blob/26e019a/source/sequences/index.ts#L138)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| sequences | `Array`<`Sequence`> |

**Returns:** `Array`<[ISequence](../interfaces/isequence.md)>

___
<a id="constants"></a>

###  constants

▸ **constants**(): `object`

*Defined in [sequences/index.ts:26](https://github.com/C4IROcean/ODP-sdk-js/blob/26e019a/source/sequences/index.ts#L26)*

**Returns:** `object`

___
<a id="sequenceconvert"></a>

###  sequenceConvert

▸ **sequenceConvert**(sequences: *`Array`<`Sequence`>*, allRows: *`any`*, columns: *`any`*): `Array`<[ISequenceRow](../interfaces/isequencerow.md)>

*Defined in [sequences/index.ts:52](https://github.com/C4IROcean/ODP-sdk-js/blob/26e019a/source/sequences/index.ts#L52)*

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

*Defined in [sequences/index.ts:35](https://github.com/C4IROcean/ODP-sdk-js/blob/26e019a/source/sequences/index.ts#L35)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| level | `number` |
| `Optional` year | `number` |

**Returns:** `SequenceListScope`

___


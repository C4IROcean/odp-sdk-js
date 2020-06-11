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
* [sequenceConvert](sequences.md#sequenceconvert)
* [sequenceQueryBuilder](sequences.md#sequencequerybuilder)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Sequences**(client: *[ODPClient](odpclient.md)*): [Sequences](sequences.md)

*Defined in sequences/index.ts:7*

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

*Defined in sequences/index.ts:16*

___
<a id="client"></a>

###  client

**client**: 

*Defined in sequences/index.ts:12*

___

## Methods

<a id="castsequenceconvert"></a>

###  castSequenceConvert

▸ **castSequenceConvert**(sequences: *`Array`<`Sequence`>*, allRows: *`any`*, columns: *`any`*): `Array`<[ISequenceRow](../interfaces/isequencerow.md)>

*Defined in sequences/index.ts:61*

**Parameters:**

| Name | Type |
| ------ | ------ |
| sequences | `Array`<`Sequence`> |
| allRows | `any` |
| columns | `any` |

**Returns:** `Array`<[ISequenceRow](../interfaces/isequencerow.md)>

___
<a id="sequenceconvert"></a>

###  sequenceConvert

▸ **sequenceConvert**(sequences: *`Array`<`Sequence`>*, allRows: *`any`*, columns: *`any`*): `Array`<[ISequenceRow](../interfaces/isequencerow.md)>

*Defined in sequences/index.ts:37*

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

▸ **sequenceQueryBuilder**(): `SequenceListScope`

*Defined in sequences/index.ts:20*

**Returns:** `SequenceListScope`

___


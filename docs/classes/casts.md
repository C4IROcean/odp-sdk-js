[Ocean Data Platform JavaScript SDK](../README.md) > [Casts](../classes/casts.md)

# Class: Casts

## Hierarchy

**Casts**

## Index

### Constructors

* [constructor](casts.md#constructor)

### Methods

* [getCastRows](casts.md#getcastrows)
* [getCastRowsFromPolygon](casts.md#getcastrowsfrompolygon)
* [getCasts](casts.md#getcasts)
* [getCastsCount](casts.md#getcastscount)
* [getCastsFromPolygon](casts.md#getcastsfrompolygon)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Casts**(sequences: *[Sequences](sequences.md)*): [Casts](casts.md)

*Defined in sequences/casts/index.ts:20*

**Parameters:**

| Name | Type |
| ------ | ------ |
| sequences | [Sequences](sequences.md) |

**Returns:** [Casts](casts.md)

___

## Methods

<a id="getcastrows"></a>

###  getCastRows

▸ **getCastRows**(castId: *`string`*, columns?: *`Array`<[SequenceColumnType](../enums/sequencecolumntype.md)>*, stream?: *`any`*): `Promise`<`any`[]>

*Defined in sequences/casts/index.ts:128*

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| castId | `string` |  Id for the cast |
| `Optional` columns | `Array`<[SequenceColumnType](../enums/sequencecolumntype.md)> |  Columns that we want returned |
| `Optional` stream | `any` |  Optional stream |

**Returns:** `Promise`<`any`[]>

___
<a id="getcastrowsfrompolygon"></a>

###  getCastRowsFromPolygon

▸ **getCastRowsFromPolygon**(polygon: *`any`*, columns?: *`any`*, stream?: *`any`*): `Promise`<`any`[]>

*Defined in sequences/casts/index.ts:101*

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| polygon | `any` |  Polygon with lists of location objects. The list have to be in a correct order. |
| `Optional` columns | `any` |
| `Optional` stream | `any` |  Optional stream |

**Returns:** `Promise`<`any`[]>

___
<a id="getcasts"></a>

###  getCasts

▸ **getCasts**(location?: *[IGeoLocation](../interfaces/igeolocation.md)*, castId?: *`string`*, stream?: *`any`*): `Promise`<`any`[]>

*Defined in sequences/casts/index.ts:53*

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| `Optional` location | [IGeoLocation](../interfaces/igeolocation.md) |  optional location latitude longitude object |
| `Optional` castId | `string` |  optional cast id. |
| `Optional` stream | `any` |  optional stream |

**Returns:** `Promise`<`any`[]>

___
<a id="getcastscount"></a>

###  getCastsCount

▸ **getCastsCount**(location?: *[IGeoLocation](../interfaces/igeolocation.md)*, stream?: *`any`*): `Promise`<`any`[]>

*Defined in sequences/casts/index.ts:36*

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| `Optional` location | [IGeoLocation](../interfaces/igeolocation.md) |  optional longitude latitude object |
| `Optional` stream | `any` |  optional stream<br><br>#TODO*   Need to support polygon location object the get multiple values |

**Returns:** `Promise`<`any`[]>

___
<a id="getcastsfrompolygon"></a>

###  getCastsFromPolygon

▸ **getCastsFromPolygon**(polygon: *`any`*, columns?: *`any`*, stream?: *`any`*): `Promise`<`any`[]>

*Defined in sequences/casts/index.ts:76*

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| polygon | `any` |  Polygon with lists of location objects. The list have to be in a correct order. |
| `Optional` columns | `any` |
| `Optional` stream | `any` |  Optional stream |

**Returns:** `Promise`<`any`[]>

___


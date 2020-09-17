[Ocean Data Platform JavaScript SDK](../README.md) > [Files](../classes/files.md)

# Class: Files

## Hierarchy

**Files**

## Index

### Constructors

* [constructor](files.md#constructor)

### Accessors

* [client](files.md#client)

### Methods

* [getFileUrl](files.md#getfileurl)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Files**(client: *[ODPClient](odpclient.md)*): [Files](files.md)

*Defined in utils/files/index.ts:4*

**Parameters:**

| Name | Type |
| ------ | ------ |
| client | [ODPClient](odpclient.md) |

**Returns:** [Files](files.md)

___

## Accessors

<a id="client"></a>

###  client

**client**: 

*Defined in utils/files/index.ts:8*

___

## Methods

<a id="getfileurl"></a>

###  getFileUrl

▸ **getFileUrl**(externalIds: *`Array`<`string`>*): `Promise`<(`FileLink` & `InternalId` \| `FileLink` & `ExternalId`)[]>

*Defined in utils/files/index.ts:12*

**Parameters:**

| Name | Type |
| ------ | ------ |
| externalIds | `Array`<`string`> |

**Returns:** `Promise`<(`FileLink` & `InternalId` \| `FileLink` & `ExternalId`)[]>

___


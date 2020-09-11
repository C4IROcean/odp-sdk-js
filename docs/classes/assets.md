[Ocean Data Platform JavaScript SDK](../README.md) > [Assets](../classes/assets.md)

# Class: Assets

## Hierarchy

**Assets**

## Index

### Constructors

* [constructor](assets.md#constructor)

### Methods

* [get](assets.md#get)
* [getChildren](assets.md#getchildren)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Assets**(client: *[ODPClient](odpclient.md)*): [Assets](assets.md)

*Defined in [assets/index.ts:5](https://github.com/C4IROcean/ODP-sdk-js/blob/4911c12/source/assets/index.ts#L5)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| client | [ODPClient](odpclient.md) |

**Returns:** [Assets](assets.md)

___

## Methods

<a id="get"></a>

###  get

▸ **get**(id: *`string`*): `Promise`<`AssetList`>

*Defined in [assets/index.ts:10](https://github.com/C4IROcean/ODP-sdk-js/blob/4911c12/source/assets/index.ts#L10)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| id | `string` |

**Returns:** `Promise`<`AssetList`>

___
<a id="getchildren"></a>

###  getChildren

▸ **getChildren**(id: *`string`*): `Promise`<`ListResponse`<`AssetList`>> & `CogniteAsyncIterator`<`Asset`>

*Defined in [assets/index.ts:13](https://github.com/C4IROcean/ODP-sdk-js/blob/4911c12/source/assets/index.ts#L13)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| id | `string` |

**Returns:** `Promise`<`ListResponse`<`AssetList`>> & `CogniteAsyncIterator`<`Asset`>

___


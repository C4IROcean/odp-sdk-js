[Ocean Data Platform JavaScript SDK](../README.md) > [ODPClient](../classes/odpclient.md)

# Class: ODPClient

## Hierarchy

**ODPClient**

## Index

### Constructors

* [constructor](odpclient.md#constructor)

### Accessors

* [asset](odpclient.md#asset)
* [cognite](odpclient.md#cognite)
* [files](odpclient.md#files)
* [login](odpclient.md#login)
* [logout](odpclient.md#logout)
* [project](odpclient.md#project)
* [sequences](odpclient.md#sequences)
* [temperatures](odpclient.md#temperatures)
* [timeSeries](odpclient.md#timeseries)

### Methods

* [authenticate](odpclient.md#authenticate)
* [loginWithApiKey](odpclient.md#loginwithapikey)
* [loginWithOAuth](odpclient.md#loginwithoauth)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new ODPClient**(options: *[IClientOptions](../interfaces/iclientoptions.md)*): [ODPClient](odpclient.md)

*Defined in [ODPClient.ts:41](https://github.com/C4IROcean/ODP-sdk-js/blob/4911c12/source/ODPClient.ts#L41)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| options | [IClientOptions](../interfaces/iclientoptions.md) |

**Returns:** [ODPClient](odpclient.md)

___

## Accessors

<a id="asset"></a>

###  asset

**asset**: 

*Defined in [ODPClient.ts:85](https://github.com/C4IROcean/ODP-sdk-js/blob/4911c12/source/ODPClient.ts#L85)*

___
<a id="cognite"></a>

###  cognite

**cognite**: 

*Defined in [ODPClient.ts:59](https://github.com/C4IROcean/ODP-sdk-js/blob/4911c12/source/ODPClient.ts#L59)*

___
<a id="files"></a>

###  files

**files**: 

*Defined in [ODPClient.ts:82](https://github.com/C4IROcean/ODP-sdk-js/blob/4911c12/source/ODPClient.ts#L82)*

___
<a id="login"></a>

###  login

**login**: 

*Defined in [ODPClient.ts:50](https://github.com/C4IROcean/ODP-sdk-js/blob/4911c12/source/ODPClient.ts#L50)*

___
<a id="logout"></a>

###  logout

**logout**: 

*Defined in [ODPClient.ts:53](https://github.com/C4IROcean/ODP-sdk-js/blob/4911c12/source/ODPClient.ts#L53)*

___
<a id="project"></a>

###  project

**project**: 

*Defined in [ODPClient.ts:56](https://github.com/C4IROcean/ODP-sdk-js/blob/4911c12/source/ODPClient.ts#L56)*

___
<a id="sequences"></a>

###  sequences

**sequences**: 

*Defined in [ODPClient.ts:78](https://github.com/C4IROcean/ODP-sdk-js/blob/4911c12/source/ODPClient.ts#L78)*

___
<a id="temperatures"></a>

###  temperatures

**temperatures**: 

*Defined in [ODPClient.ts:47](https://github.com/C4IROcean/ODP-sdk-js/blob/4911c12/source/ODPClient.ts#L47)*

___
<a id="timeseries"></a>

###  timeSeries

**timeSeries**: 

*Defined in [ODPClient.ts:74](https://github.com/C4IROcean/ODP-sdk-js/blob/4911c12/source/ODPClient.ts#L74)*

___

## Methods

<a id="authenticate"></a>

###  authenticate

▸ **authenticate**(): `Promise`<`boolean`>

*Defined in [ODPClient.ts:70](https://github.com/C4IROcean/ODP-sdk-js/blob/4911c12/source/ODPClient.ts#L70)*

**Returns:** `Promise`<`boolean`>

___
<a id="loginwithapikey"></a>

###  loginWithApiKey

▸ **loginWithApiKey**(options: *[IApiKeyLoginOptions](../interfaces/iapikeyloginoptions.md)*): `void`

*Defined in [ODPClient.ts:62](https://github.com/C4IROcean/ODP-sdk-js/blob/4911c12/source/ODPClient.ts#L62)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| options | [IApiKeyLoginOptions](../interfaces/iapikeyloginoptions.md) |

**Returns:** `void`

___
<a id="loginwithoauth"></a>

###  loginWithOAuth

▸ **loginWithOAuth**(options: *`any`*): `void`

*Defined in [ODPClient.ts:66](https://github.com/C4IROcean/ODP-sdk-js/blob/4911c12/source/ODPClient.ts#L66)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| options | `any` |

**Returns:** `void`

___


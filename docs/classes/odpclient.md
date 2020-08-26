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

*Defined in [source/ODPClient.ts:39](https://github.com/C4IROcean/ODP-sdk-js/blob/4709765/source/ODPClient.ts#L39)*

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

*Defined in [source/ODPClient.ts:80](https://github.com/C4IROcean/ODP-sdk-js/blob/4709765/source/ODPClient.ts#L80)*

___
<a id="cognite"></a>

###  cognite

**cognite**: 

*Defined in [source/ODPClient.ts:57](https://github.com/C4IROcean/ODP-sdk-js/blob/4709765/source/ODPClient.ts#L57)*

___
<a id="login"></a>

###  login

**login**: 

*Defined in [source/ODPClient.ts:48](https://github.com/C4IROcean/ODP-sdk-js/blob/4709765/source/ODPClient.ts#L48)*

___
<a id="logout"></a>

###  logout

**logout**: 

*Defined in [source/ODPClient.ts:51](https://github.com/C4IROcean/ODP-sdk-js/blob/4709765/source/ODPClient.ts#L51)*

___
<a id="project"></a>

###  project

**project**: 

*Defined in [source/ODPClient.ts:54](https://github.com/C4IROcean/ODP-sdk-js/blob/4709765/source/ODPClient.ts#L54)*

___
<a id="sequences"></a>

###  sequences

**sequences**: 

*Defined in [source/ODPClient.ts:76](https://github.com/C4IROcean/ODP-sdk-js/blob/4709765/source/ODPClient.ts#L76)*

___
<a id="temperatures"></a>

###  temperatures

**temperatures**: 

*Defined in [source/ODPClient.ts:45](https://github.com/C4IROcean/ODP-sdk-js/blob/4709765/source/ODPClient.ts#L45)*

___
<a id="timeseries"></a>

###  timeSeries

**timeSeries**: 

*Defined in [source/ODPClient.ts:72](https://github.com/C4IROcean/ODP-sdk-js/blob/4709765/source/ODPClient.ts#L72)*

___

## Methods

<a id="authenticate"></a>

###  authenticate

▸ **authenticate**(): `Promise`<`boolean`>

*Defined in [source/ODPClient.ts:68](https://github.com/C4IROcean/ODP-sdk-js/blob/4709765/source/ODPClient.ts#L68)*

**Returns:** `Promise`<`boolean`>

___
<a id="loginwithapikey"></a>

###  loginWithApiKey

▸ **loginWithApiKey**(options: *[IApiKeyLoginOptions](../interfaces/iapikeyloginoptions.md)*): `void`

*Defined in [source/ODPClient.ts:60](https://github.com/C4IROcean/ODP-sdk-js/blob/4709765/source/ODPClient.ts#L60)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| options | [IApiKeyLoginOptions](../interfaces/iapikeyloginoptions.md) |

**Returns:** `void`

___
<a id="loginwithoauth"></a>

###  loginWithOAuth

▸ **loginWithOAuth**(options: *`any`*): `void`

*Defined in [source/ODPClient.ts:64](https://github.com/C4IROcean/ODP-sdk-js/blob/4709765/source/ODPClient.ts#L64)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| options | `any` |

**Returns:** `void`

___


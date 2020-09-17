[Ocean Data Platform JavaScript SDK](../README.md) > [ODPClient](../classes/odpclient.md)

# Class: ODPClient

## Hierarchy

**ODPClient**

## Index

### Constructors

* [constructor](odpclient.md#constructor)

### Accessors

* [asset](odpclient.md#asset)
* [casts](odpclient.md#casts)
* [cognite](odpclient.md#cognite)
* [files](odpclient.md#files)
* [login](odpclient.md#login)
* [logout](odpclient.md#logout)
* [marineRegions](odpclient.md#marineregions)
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

*Defined in [ODPClient.ts:45](https://github.com/C4IROcean/ODP-sdk-js/blob/493a038/source/ODPClient.ts#L45)*

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

*Defined in [ODPClient.ts:89](https://github.com/C4IROcean/ODP-sdk-js/blob/493a038/source/ODPClient.ts#L89)*

___
<a id="casts"></a>

###  casts

**casts**: 

*Defined in [ODPClient.ts:92](https://github.com/C4IROcean/ODP-sdk-js/blob/493a038/source/ODPClient.ts#L92)*

___
<a id="cognite"></a>

###  cognite

**cognite**: 

*Defined in [ODPClient.ts:63](https://github.com/C4IROcean/ODP-sdk-js/blob/493a038/source/ODPClient.ts#L63)*

___
<a id="files"></a>

###  files

**files**: 

*Defined in [ODPClient.ts:86](https://github.com/C4IROcean/ODP-sdk-js/blob/493a038/source/ODPClient.ts#L86)*

___
<a id="login"></a>

###  login

**login**: 

*Defined in [ODPClient.ts:54](https://github.com/C4IROcean/ODP-sdk-js/blob/493a038/source/ODPClient.ts#L54)*

___
<a id="logout"></a>

###  logout

**logout**: 

*Defined in [ODPClient.ts:57](https://github.com/C4IROcean/ODP-sdk-js/blob/493a038/source/ODPClient.ts#L57)*

___
<a id="marineregions"></a>

###  marineRegions

**marineRegions**: 

*Defined in [ODPClient.ts:95](https://github.com/C4IROcean/ODP-sdk-js/blob/493a038/source/ODPClient.ts#L95)*

___
<a id="project"></a>

###  project

**project**: 

*Defined in [ODPClient.ts:60](https://github.com/C4IROcean/ODP-sdk-js/blob/493a038/source/ODPClient.ts#L60)*

___
<a id="sequences"></a>

###  sequences

**sequences**: 

*Defined in [ODPClient.ts:82](https://github.com/C4IROcean/ODP-sdk-js/blob/493a038/source/ODPClient.ts#L82)*

___
<a id="temperatures"></a>

###  temperatures

**temperatures**: 

*Defined in [ODPClient.ts:51](https://github.com/C4IROcean/ODP-sdk-js/blob/493a038/source/ODPClient.ts#L51)*

___
<a id="timeseries"></a>

###  timeSeries

**timeSeries**: 

*Defined in [ODPClient.ts:78](https://github.com/C4IROcean/ODP-sdk-js/blob/493a038/source/ODPClient.ts#L78)*

___

## Methods

<a id="authenticate"></a>

###  authenticate

▸ **authenticate**(): `Promise`<`boolean`>

*Defined in [ODPClient.ts:74](https://github.com/C4IROcean/ODP-sdk-js/blob/493a038/source/ODPClient.ts#L74)*

**Returns:** `Promise`<`boolean`>

___
<a id="loginwithapikey"></a>

###  loginWithApiKey

▸ **loginWithApiKey**(options: *[IApiKeyLoginOptions](../interfaces/iapikeyloginoptions.md)*): `void`

*Defined in [ODPClient.ts:66](https://github.com/C4IROcean/ODP-sdk-js/blob/493a038/source/ODPClient.ts#L66)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| options | [IApiKeyLoginOptions](../interfaces/iapikeyloginoptions.md) |

**Returns:** `void`

___
<a id="loginwithoauth"></a>

###  loginWithOAuth

▸ **loginWithOAuth**(options: *`any`*): `void`

*Defined in [ODPClient.ts:70](https://github.com/C4IROcean/ODP-sdk-js/blob/493a038/source/ODPClient.ts#L70)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| options | `any` |

**Returns:** `void`

___


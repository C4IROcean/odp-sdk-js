**[Ocean Data Platform JavaScript SDK](../README.md)**

> [Globals](../README.md) / ODPClient

# Class: ODPClient

## Hierarchy

* **ODPClient**

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

### Methods

* [authenticate](odpclient.md#authenticate)
* [loginWithApiKey](odpclient.md#loginwithapikey)
* [loginWithOAuth](odpclient.md#loginwithoauth)

## Constructors

### constructor

\+ **new ODPClient**(`options`: [IClientOptions](../interfaces/iclientoptions.md)): [ODPClient](odpclient.md)

*Defined in [source/ODPClient.ts:45](https://github.com/C4IROcean/odp-sdk-js/blob/c6020fb/source/ODPClient.ts#L45)*

#### Parameters:

Name | Type |
------ | ------ |
`options` | [IClientOptions](../interfaces/iclientoptions.md) |

**Returns:** [ODPClient](odpclient.md)

## Accessors

### asset

• get **asset**(): Assets

*Defined in [source/ODPClient.ts:105](https://github.com/C4IROcean/odp-sdk-js/blob/c6020fb/source/ODPClient.ts#L105)*

**Returns:** Assets

___

### casts

• get **casts**(): [Casts](casts.md)

*Defined in [source/ODPClient.ts:108](https://github.com/C4IROcean/odp-sdk-js/blob/c6020fb/source/ODPClient.ts#L108)*

**Returns:** [Casts](casts.md)

___

### cognite

• get **cognite**(): CogniteClient

*Defined in [source/ODPClient.ts:70](https://github.com/C4IROcean/odp-sdk-js/blob/c6020fb/source/ODPClient.ts#L70)*

**Returns:** CogniteClient

___

### files

• get **files**(): Files

*Defined in [source/ODPClient.ts:102](https://github.com/C4IROcean/odp-sdk-js/blob/c6020fb/source/ODPClient.ts#L102)*

**Returns:** Files

___

### login

• get **login**(): LoginAPI

*Defined in [source/ODPClient.ts:61](https://github.com/C4IROcean/odp-sdk-js/blob/c6020fb/source/ODPClient.ts#L61)*

**Returns:** LoginAPI

___

### logout

• get **logout**(): LogoutApi

*Defined in [source/ODPClient.ts:64](https://github.com/C4IROcean/odp-sdk-js/blob/c6020fb/source/ODPClient.ts#L64)*

**Returns:** LogoutApi

___

### marineRegions

• get **marineRegions**(): [MarineRegions](marineregions.md)

*Defined in [source/ODPClient.ts:111](https://github.com/C4IROcean/odp-sdk-js/blob/c6020fb/source/ODPClient.ts#L111)*

**Returns:** [MarineRegions](marineregions.md)

___

### project

• get **project**(): string

*Defined in [source/ODPClient.ts:67](https://github.com/C4IROcean/odp-sdk-js/blob/c6020fb/source/ODPClient.ts#L67)*

**Returns:** string

___

### sequences

• get **sequences**(): Sequences

*Defined in [source/ODPClient.ts:98](https://github.com/C4IROcean/odp-sdk-js/blob/c6020fb/source/ODPClient.ts#L98)*

**Returns:** Sequences

___

### temperatures

• get **temperatures**(): any

*Defined in [source/ODPClient.ts:58](https://github.com/C4IROcean/odp-sdk-js/blob/c6020fb/source/ODPClient.ts#L58)*

**Returns:** any

## Methods

### authenticate

▸ **authenticate**(): Promise\<boolean>

*Defined in [source/ODPClient.ts:90](https://github.com/C4IROcean/odp-sdk-js/blob/c6020fb/source/ODPClient.ts#L90)*

**Returns:** Promise\<boolean>

___

### loginWithApiKey

▸ **loginWithApiKey**(`options`: [IApiKeyLoginOptions](../interfaces/iapikeyloginoptions.md)): void

*Defined in [source/ODPClient.ts:73](https://github.com/C4IROcean/odp-sdk-js/blob/c6020fb/source/ODPClient.ts#L73)*

#### Parameters:

Name | Type |
------ | ------ |
`options` | [IApiKeyLoginOptions](../interfaces/iapikeyloginoptions.md) |

**Returns:** void

___

### loginWithOAuth

▸ **loginWithOAuth**(`options?`: [IOAuthLoginOptions](../interfaces/ioauthloginoptions.md)): void

*Defined in [source/ODPClient.ts:80](https://github.com/C4IROcean/odp-sdk-js/blob/c6020fb/source/ODPClient.ts#L80)*

#### Parameters:

Name | Type |
------ | ------ |
`options?` | [IOAuthLoginOptions](../interfaces/ioauthloginoptions.md) |

**Returns:** void

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

*Defined in [source/ODPClient.ts:46](https://github.com/C4IROcean/odp-sdk-js/blob/0e2fd46/source/ODPClient.ts#L46)*

#### Parameters:

Name | Type |
------ | ------ |
`options` | [IClientOptions](../interfaces/iclientoptions.md) |

**Returns:** [ODPClient](odpclient.md)

## Accessors

### asset

• get **asset**(): Assets

*Defined in [source/ODPClient.ts:106](https://github.com/C4IROcean/odp-sdk-js/blob/0e2fd46/source/ODPClient.ts#L106)*

**Returns:** Assets

___

### casts

• get **casts**(): [Casts](casts.md)

*Defined in [source/ODPClient.ts:109](https://github.com/C4IROcean/odp-sdk-js/blob/0e2fd46/source/ODPClient.ts#L109)*

**Returns:** [Casts](casts.md)

___

### cognite

• get **cognite**(): CogniteClient

*Defined in [source/ODPClient.ts:71](https://github.com/C4IROcean/odp-sdk-js/blob/0e2fd46/source/ODPClient.ts#L71)*

**Returns:** CogniteClient

___

### files

• get **files**(): Files

*Defined in [source/ODPClient.ts:103](https://github.com/C4IROcean/odp-sdk-js/blob/0e2fd46/source/ODPClient.ts#L103)*

**Returns:** Files

___

### login

• get **login**(): LoginAPI

*Defined in [source/ODPClient.ts:62](https://github.com/C4IROcean/odp-sdk-js/blob/0e2fd46/source/ODPClient.ts#L62)*

**Returns:** LoginAPI

___

### logout

• get **logout**(): LogoutApi

*Defined in [source/ODPClient.ts:65](https://github.com/C4IROcean/odp-sdk-js/blob/0e2fd46/source/ODPClient.ts#L65)*

**Returns:** LogoutApi

___

### marineRegions

• get **marineRegions**(): [MarineRegions](marineregions.md)

*Defined in [source/ODPClient.ts:112](https://github.com/C4IROcean/odp-sdk-js/blob/0e2fd46/source/ODPClient.ts#L112)*

**Returns:** [MarineRegions](marineregions.md)

___

### project

• get **project**(): string

*Defined in [source/ODPClient.ts:68](https://github.com/C4IROcean/odp-sdk-js/blob/0e2fd46/source/ODPClient.ts#L68)*

**Returns:** string

___

### sequences

• get **sequences**(): Sequences

*Defined in [source/ODPClient.ts:99](https://github.com/C4IROcean/odp-sdk-js/blob/0e2fd46/source/ODPClient.ts#L99)*

**Returns:** Sequences

___

### temperatures

• get **temperatures**(): any

*Defined in [source/ODPClient.ts:59](https://github.com/C4IROcean/odp-sdk-js/blob/0e2fd46/source/ODPClient.ts#L59)*

**Returns:** any

## Methods

### authenticate

▸ **authenticate**(): Promise\<boolean>

*Defined in [source/ODPClient.ts:91](https://github.com/C4IROcean/odp-sdk-js/blob/0e2fd46/source/ODPClient.ts#L91)*

**Returns:** Promise\<boolean>

___

### loginWithApiKey

▸ **loginWithApiKey**(`options`: [IApiKeyLoginOptions](../interfaces/iapikeyloginoptions.md)): void

*Defined in [source/ODPClient.ts:74](https://github.com/C4IROcean/odp-sdk-js/blob/0e2fd46/source/ODPClient.ts#L74)*

#### Parameters:

Name | Type |
------ | ------ |
`options` | [IApiKeyLoginOptions](../interfaces/iapikeyloginoptions.md) |

**Returns:** void

___

### loginWithOAuth

▸ **loginWithOAuth**(`options?`: [IOAuthLoginOptions](../interfaces/ioauthloginoptions.md)): void

*Defined in [source/ODPClient.ts:81](https://github.com/C4IROcean/odp-sdk-js/blob/0e2fd46/source/ODPClient.ts#L81)*

#### Parameters:

Name | Type |
------ | ------ |
`options?` | [IOAuthLoginOptions](../interfaces/ioauthloginoptions.md) |

**Returns:** void

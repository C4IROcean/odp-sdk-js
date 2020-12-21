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

*Defined in [source/ODPClient.ts:45](https://github.com/C4IROcean/ODP-sdk-js/blob/4e3fa10/source/ODPClient.ts#L45)*

#### Parameters:

Name | Type |
------ | ------ |
`options` | [IClientOptions](../interfaces/iclientoptions.md) |

**Returns:** [ODPClient](odpclient.md)

## Accessors

### asset

• get **asset**(): Assets

*Defined in [source/ODPClient.ts:100](https://github.com/C4IROcean/ODP-sdk-js/blob/4e3fa10/source/ODPClient.ts#L100)*

**Returns:** Assets

___

### casts

• get **casts**(): [Casts](casts.md)

*Defined in [source/ODPClient.ts:103](https://github.com/C4IROcean/ODP-sdk-js/blob/4e3fa10/source/ODPClient.ts#L103)*

**Returns:** [Casts](casts.md)

___

### cognite

• get **cognite**(): CogniteClient

*Defined in [source/ODPClient.ts:63](https://github.com/C4IROcean/ODP-sdk-js/blob/4e3fa10/source/ODPClient.ts#L63)*

**Returns:** CogniteClient

___

### files

• get **files**(): Files

*Defined in [source/ODPClient.ts:97](https://github.com/C4IROcean/ODP-sdk-js/blob/4e3fa10/source/ODPClient.ts#L97)*

**Returns:** Files

___

### login

• get **login**(): LoginAPI

*Defined in [source/ODPClient.ts:54](https://github.com/C4IROcean/ODP-sdk-js/blob/4e3fa10/source/ODPClient.ts#L54)*

**Returns:** LoginAPI

___

### logout

• get **logout**(): LogoutApi

*Defined in [source/ODPClient.ts:57](https://github.com/C4IROcean/ODP-sdk-js/blob/4e3fa10/source/ODPClient.ts#L57)*

**Returns:** LogoutApi

___

### marineRegions

• get **marineRegions**(): [MarineRegions](marineregions.md)

*Defined in [source/ODPClient.ts:106](https://github.com/C4IROcean/ODP-sdk-js/blob/4e3fa10/source/ODPClient.ts#L106)*

**Returns:** [MarineRegions](marineregions.md)

___

### project

• get **project**(): string

*Defined in [source/ODPClient.ts:60](https://github.com/C4IROcean/ODP-sdk-js/blob/4e3fa10/source/ODPClient.ts#L60)*

**Returns:** string

___

### sequences

• get **sequences**(): Sequences

*Defined in [source/ODPClient.ts:93](https://github.com/C4IROcean/ODP-sdk-js/blob/4e3fa10/source/ODPClient.ts#L93)*

**Returns:** Sequences

___

### temperatures

• get **temperatures**(): any

*Defined in [source/ODPClient.ts:51](https://github.com/C4IROcean/ODP-sdk-js/blob/4e3fa10/source/ODPClient.ts#L51)*

**Returns:** any

## Methods

### authenticate

▸ **authenticate**(): Promise\<boolean>

*Defined in [source/ODPClient.ts:83](https://github.com/C4IROcean/ODP-sdk-js/blob/4e3fa10/source/ODPClient.ts#L83)*

**Returns:** Promise\<boolean>

___

### loginWithApiKey

▸ **loginWithApiKey**(`options`: [IApiKeyLoginOptions](../interfaces/iapikeyloginoptions.md)): void

*Defined in [source/ODPClient.ts:66](https://github.com/C4IROcean/ODP-sdk-js/blob/4e3fa10/source/ODPClient.ts#L66)*

#### Parameters:

Name | Type |
------ | ------ |
`options` | [IApiKeyLoginOptions](../interfaces/iapikeyloginoptions.md) |

**Returns:** void

___

### loginWithOAuth

▸ **loginWithOAuth**(`options?`: [IOAuthLoginOptions](../interfaces/ioauthloginoptions.md)): void

*Defined in [source/ODPClient.ts:73](https://github.com/C4IROcean/ODP-sdk-js/blob/4e3fa10/source/ODPClient.ts#L73)*

#### Parameters:

Name | Type |
------ | ------ |
`options?` | [IOAuthLoginOptions](../interfaces/ioauthloginoptions.md) |

**Returns:** void

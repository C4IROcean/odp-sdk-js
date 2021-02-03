**[Ocean Data Platform JavaScript SDK](../README.md)**

> [Globals](../README.md) / IOAuthLoginOptions

# Interface: IOAuthLoginOptions

## Hierarchy

* [IProject](iproject.md)

  ↳ **IOAuthLoginOptions**

## Index

### Properties

* [accessToken](ioauthloginoptions.md#accesstoken)
* [onAuthenticate](ioauthloginoptions.md#onauthenticate)
* [onTokens](ioauthloginoptions.md#ontokens)
* [project](ioauthloginoptions.md#project)

## Properties

### accessToken

• `Optional` **accessToken**: string

*Defined in [source/ODPClient.ts:36](https://github.com/C4IROcean/odp-sdk-js/blob/0e2fd46/source/ODPClient.ts#L36)*

Provide optional cached access token to skip the authentication flow
(client.authenticate will still override this).

___

### onAuthenticate

• `Optional` **onAuthenticate**: any \| \"REDIRECT\" \| \"POPUP\"

*Defined in [source/ODPClient.ts:30](https://github.com/C4IROcean/odp-sdk-js/blob/0e2fd46/source/ODPClient.ts#L30)*

___

### onTokens

• `Optional` **onTokens**: any

*Defined in [source/ODPClient.ts:31](https://github.com/C4IROcean/odp-sdk-js/blob/0e2fd46/source/ODPClient.ts#L31)*

___

### project

• `Optional` **project**: string

*Inherited from [IProject](iproject.md).[project](iproject.md#project)*

*Defined in [source/ODPClient.ts:19](https://github.com/C4IROcean/odp-sdk-js/blob/0e2fd46/source/ODPClient.ts#L19)*

Cognite project to login into

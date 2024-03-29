<a href="https://www.oceandata.earth/">
<img src="https://stdevloginsitecdnendpoint.azureedge.net/assets/images/odp-logo-symbol.svg" width="auto" height="46px" alt="Ocean Data Foundation Logo" title="Ocean Data Foundation"> </a>

# ODP Javascript SDK

[![Build Status](https://dev.azure.com/oceandatafoundation/ODP/_apis/build/status/ODP-JavaScript-SDK-CI?branchName=master)](https://dev.azure.com/oceandatafoundation/ODP/_build/latest?definitionId=10&branchName=master)

**This library is under active development, and the API is unstable until we publish v1.0.0** The ODP js library
provides convenient access to Ocean Data Platform from applications written in client- or server-side JavaScript.

The SDK supports authentication through api-keys (_for server-side applications_) and bearer tokens (for web
applications).

## Installation

Install the package with yarn or npm:

```sh
# Install with yarn:
yarn add odp-sdk

# Install with NPM:
npm install odp-sdk --save
```

## Usage

```js
const { ODPClient } = require("odp-sdk")
```

### Using ES modules

```js
import { ODPClient } from "odp-sdk"
```

### Using typescript

The SDK is written in native typescript, so no extra types needs to be defined.

## Quickstart

### Web

### Backend

## Documentation

- [SDK documentation](./docs/README.md)

## Development

Run all tests:

```sh
$ yarn
$ yarn test
```

We use `jest` to run tests, see [their documentation](https://github.com/facebook/jest) for more information.

## Versioning

The library follow [Semantic Versioning](https://semver.org/).

## Contributing

Contributions welcome! See [more details](./CONTRIBUTING.md) and the [code of conduct](./CODE_OF_CONDUCT.md).

## Release

We follow the git flow methodology and a release branch will automatically trigger a new version

## CHANGELOG

You can find it [here](./CHANGELOG.md).

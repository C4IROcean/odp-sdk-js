<a href="https://www.oceandata.earth/">
<img src="https://stdevloginsitecdnendpoint.azureedge.net/assets/images/odp-logo-symbol.svg" width="auto" height="46px" alt="Ocean Data Foundation Logo" title="Ocean Data Foundation"> </a>

# ODP Javascript SDK

[![Build Status](https://dev.azure.com/oceandatafoundation/ODP/_apis/build/status/ODP-JavaScript-SDK-CI?branchName=master)](https://dev.azure.com/oceandatafoundation/ODP/_build/latest?definitionId=10&branchName=master)

The ODP js library provides convenient access to Ocean Data Platform through the [Cognite API](https://doc.cognitedata.com/dev/) from
applications written in client- or server-side JavaScript.

The SDK supports authentication through api-keys (_for server-side applications_) and bearer tokens (for web applications).

## Installation

Install the package with yarn:

    $ yarn add odp-sdk

or npm

    $ npm install odp-sdk --save

## Usage

```js
const { ODPClient } = require("odp-sdk");
```

### Using ES modules

```js
import { ODPClient } from "odp-sdk";
```

### Using typescript

The SDK is written in native typescript, so no extra types needs to be defined.

## Quickstart

### Web

Get temperatures for a given provider

```js
import { ODPClient, ICastFilter } from "odp-sdk";

async function quickstart() {
	const odp = new ODPClient({ appId: "YOUR APPLICATION NAME" });
	odp.loginWithOAuth();
	const filter: ICastFilter = {
		year: 2018,
	};
	const casts = await odp.casts.getCastCount(filter);
}
quickstart();
```

### Backend

```js
const { ODPClient, ICastFilter } = require("odp-sdk");

async function quickstart() {
	const client = new ODPClient({ appId: "YOUR APPLICATION NAME" });
	client.loginWithApiKey({
		apiKey: "YOUR_SECRET_API_KEY",
	});

	const filter: ICastFilter = {
		year: 2018,
	};
	const casts = await odp.casts.getCastCount(filter);
}
quickstart();
```

## Documentation

-   [SDK documentation](./docs/README.md)
-   [API documentation](https://doc.cognitedata.com)
-   [API reference documentation](https://doc.cognitedata.com/api/v1)

## Samples

-   [Casts](./samples/casts.ts)
-   [Marine regions](./samples/marineRegions.ts)

## Development

Run all tests:

```bash
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

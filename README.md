<a href="https://www.oceandata.earth/">
<img src="https://images.ctfassets.net/5025ikbx2abh/65Do8Cm2Ri4hQcJvhxTXP4/5ba7a615fd9328ea7023b17a059982cd/odf-logo.svg" alt="Ocean Data Foundation Logo" title="Ocean Data Foundation"> </a>

# ODP Javascript SDK

[![Build Status](https://dev.azure.com/oceandatafoundation/ODP/_apis/build/status/ODP-JavaScript-SDK-CI?branchName=master)](https://dev.azure.com/oceandatafoundation/ODP/_build/latest?definitionId=10&branchName=master)

The ODP js library provides convenient access to Ocean Data Platform through the [Cognite API](https://doc.cognitedata.com/dev/) from
applications written in client- or server-side JavaScript.

The SDK supports authentication through api-keys (_for server-side applications_) and bearer tokens (for web applications).

## Installation

Install the package with yarn:

    $ yarn add @odp/sdk

or npm

    $ npm install @odp/sdk --save

## Usage

```js
const { ODPClient } = require("@odp/sdk");
```

### Using ES modules

```js
import { ODPClient } from "@odp/sdk";
```

### Using typescript

The SDK is written in native typescript, so no extra types needs to be defined.

## Quickstart

### Web

Get temperatures for a given provider

```js
import { ODPClient, UnitType, ITimeSeriesFilter } from "@odp/sdk";

async function quickstart() {
	const odp = new ODPClient({ appId: "YOUR APPLICATION NAME" });
	odp.loginWithOAuth({
		project: "odp",
	});
	const filter: ITimeSeriesFilter = {
		unit: UnitType.CELSIUS,
		provider: ["simulated"],
	};
	const temperatures = await odp.timeSeries.temperature.get(filter);
}
quickstart();
```

### Backend

```js
const { ODPClient, UnitType, ITimeSeriesFilter } = require("@odp/sdk");

async function quickstart() {
	const client = new ODPClient({ appId: "YOUR APPLICATION NAME" });
	client.loginWithApiKey({
		project: "odp",
		apiKey: "YOUR_SECRET_API_KEY",
	});

	const filter: ITimeSeriesFilter = {
		unit: UnitType.CELSIUS,
		provider: ["simulated"],
	};
	const temperatures = await odp.timeSeries.temperature.get(filter);
}
quickstart();
```

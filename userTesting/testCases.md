# Test cases for JS SDK

## Case 1: Project setup

### Description:

Have a look at the [documentation](../docs/README.md) and [getting started](../README.md)

Follow the [JS-SDK-preparation](testPreparation.md) to set up your environment.

### Purpose:

To make sure that the SDK is available and can be installed using the keys made available.

### Expected result

The command `npm install @odp/sdk --save` runs without errors

## Case 2: Initialise the SDK

### Description:

-   Create a file in the root of the project directory called `index.js`
-   Open the file in a text editor or a IDE
-   Paste the following code into the file and save it

```javascript
const { ODPClient } = require("@odp/sdk");

async function quickstart() {
	const odp = new ODPClient({ appId: "odp_test" });
	odp.loginWithOAuth({
		project: "odp",
	});
}
quickstart();
```

-   Open a command line and run `nodejs index.js`

## Purpose:

To make sure that we are able to initialise the SDK and get some content out from the platform

### Expected result

The command should run without errors

## Case 3: Get global cast count from the SDK

### Description

Extend the code to get global cast count using the method `getCastsCount`
Print out to console how many counts you get. Hint: use the documentation on how the function works.

### Purpose

Get some content from the platform

### Expected result

A number greater than 150.000

## Case 4: Find a cast that matches the following criteria

### Description

Get cast using the method `getCasts` that matches the following criterias:

-   From the year `2018`
-   Has the column `temperature`
-   Has the quality `ACCEPTED_VALUE`
-   Is within the polygon `(-1,59), (-1,61), (3,61), (3,59), (-1,59)`

### Purpose

Try out filter options and get casts that matches a given filter.

### Expected result

A list of casts that match the given filter.

## Case 5: Get cast rows for a given cast

### Description

Pick one of the casts from the previous test case and note the castId.
Use the method `getCastRows` to get all temperature measurements for that given cast.

### Purpose

Get the raw data of the cast.

### Expected result

View the cast temperature measurement

## Case 6: Download the source file for a given cast

### Description

Use the cast from the previous case to get the source file use the method `getCastSourceFileUrl`

### Purpose

Get the source file for a given cast

### Expected result

A url that can be used to download the source file

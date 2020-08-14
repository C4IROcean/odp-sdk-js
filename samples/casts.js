var source_1 = require("../source");
// tslint:disable: no-console
var apiKey = process.env.ODP_CREDENTIALS || "";
if (!apiKey) {
    throw Error("You must set the environment variable ODP_CREDENTIALS to your api-key to be able to run the example.");
}
var odp = new source_1.ODPClient({ appId: "ODP samples" });
odp.loginWithApiKey({
    project: "odp",
    apiKey: apiKey
});
async;
function getGlobalCastCount() {
    var result = await, odp, sequences, casts, getCastsCount = ();
    console.log("Found " + result.length + " global casts");
}
async;
function getCastsFromPolygon() {
    var result = await, odp, sequences, casts, getCastsFromPolygon = ([]);
    console.log("Found " + result.length + " global casts from 2018");
}
getGlobalCastCount().then(function () { return getCastsFromPolygon(); });

process.env.COGNITE_PROJECT = "odp";
process.env.COGNITE_KEY = "NWVhODFiNGUtNzgwMy00MjA1LWI2MDctYzExZjcxOTk2OWQ0";

module.exports = {
	testEnvironment: "node",
	globals: {
		logging_disabled: true,
		_testMode: true,
	},
	transform: {
		"^.+\\.tsx?$": "ts-jest",
	},
	testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.ts$",
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};

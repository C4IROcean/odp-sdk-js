import { CogniteClient } from "@cognite/sdk";

let _client: CogniteClient = null;

export const getClient = (): CogniteClient => {
	if (_client) {
		return _client;
	}
	_client = new CogniteClient({ appId: "ODPweb" });
	_client.loginWithApiKey({
		project: process.env.COGNITE_PROJECT,
		apiKey: process.env.COGNITE_KEY,
	});
	return _client;
};

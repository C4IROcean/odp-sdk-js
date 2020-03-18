import { Temperature } from "./temperature";
import { default as ODPClient } from "../ODPClient";

export class TimeSeries {
	private _client;
	private _temperature;
	constructor(client: ODPClient) {
		this._client = client;
		this.init();
	}

	private init = () => {
		this._temperature = new Temperature(this._client);
	};

	public get temperature() {
		return this._temperature;
	}
}

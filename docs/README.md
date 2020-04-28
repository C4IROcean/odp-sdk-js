
#  Ocean Data Platform JavaScript SDK

## Index

### Enumerations

* [TimeSeriesType](enums/timeseriestype.md)
* [UnitType](enums/unittype.md)
* [ZoomLevel](enums/zoomlevel.md)

### Classes

* [Assets](classes/assets.md)
* [ODPClient](classes/odpclient.md)
* [Temperature](classes/temperature.md)
* [TimeSeries](classes/timeseries.md)

### Interfaces

* [IAggregation](interfaces/iaggregation.md)
* [IApiKeyLoginOptions](interfaces/iapikeyloginoptions.md)
* [IAssetsFilter](interfaces/iassetsfilter.md)
* [IBoundingBox](interfaces/iboundingbox.md)
* [IClientOptions](interfaces/iclientoptions.md)
* [ICogniteGeo](interfaces/icognitegeo.md)
* [IDataPoints](interfaces/idatapoints.md)
* [IDatapointFilter](interfaces/idatapointfilter.md)
* [IGeoFilter](interfaces/igeofilter.md)
* [IGeoLocation](interfaces/igeolocation.md)
* [INumberFilter](interfaces/inumberfilter.md)
* [IOAuthLoginOptions](interfaces/ioauthloginoptions.md)
* [IProject](interfaces/iproject.md)
* [ITimeFilter](interfaces/itimefilter.md)
* [ITimeSeries](interfaces/itimeseries.md)
* [ITimeSeriesFilter](interfaces/itimeseriesfilter.md)

### Functions

* [getMRGIDBoundingBox](#getmrgidboundingbox)
* [throttleActions](#throttleactions)

---

## Functions

<a id="getmrgidboundingbox"></a>

### `<Const>` getMRGIDBoundingBox

▸ **getMRGIDBoundingBox**(mrgid: *`number`*): `Promise`<[IBoundingBox](interfaces/iboundingbox.md)>

*Defined in utils/index.ts:47*

**Parameters:**

| Name | Type |
| ------ | ------ |
| mrgid | `number` |

**Returns:** `Promise`<[IBoundingBox](interfaces/iboundingbox.md)>

___
<a id="throttleactions"></a>

### `<Const>` throttleActions

▸ **throttleActions**(listOfCallableActions: *`any`*, limit: *`any`*, stream?: *`any`*): `Promise`<`any`[]>

*Defined in utils/index.ts:4*

**Parameters:**

| Name | Type |
| ------ | ------ |
| listOfCallableActions | `any` |
| limit | `any` |
| `Optional` stream | `any` |

**Returns:** `Promise`<`any`[]>

___


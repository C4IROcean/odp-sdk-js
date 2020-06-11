
#  Ocean Data Platform JavaScript SDK

## Index

### Enumerations

* [SequenceType](enums/sequencetype.md)
* [TimeSeriesType](enums/timeseriestype.md)
* [UnitType](enums/unittype.md)
* [ZoomLevel](enums/zoomlevel.md)

### Classes

* [Assets](classes/assets.md)
* [Casts](classes/casts.md)
* [ODPClient](classes/odpclient.md)
* [Sequences](classes/sequences.md)
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
* [ISequence](interfaces/isequence.md)
* [ISequenceRow](interfaces/isequencerow.md)
* [ISequenceRowValue](interfaces/isequencerowvalue.md)
* [ITimeFilter](interfaces/itimefilter.md)
* [ITimeSeries](interfaces/itimeseries.md)
* [ITimeSeriesFilter](interfaces/itimeseriesfilter.md)

### Functions

* [cornerCoordinatesToAllCoordinates](#cornercoordinatestoallcoordinates)
* [getMRGIDBoundingBox](#getmrgidboundingbox)
* [gridCoordinateToIndex](#gridcoordinatetoindex)
* [indexToGridCoordinate](#indextogridcoordinate)
* [indexToMapCoordinate](#indextomapcoordinate)
* [mapCoordinateToIndex](#mapcoordinatetoindex)
* [throttleActions](#throttleactions)

---

## Functions

<a id="cornercoordinatestoallcoordinates"></a>

### `<Const>` cornerCoordinatesToAllCoordinates

▸ **cornerCoordinatesToAllCoordinates**(corners: *`any`*, resolution?: *`number`*): `any`[][]

*Defined in sequences/utils.ts:33*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| corners | `any` | - |
| `Default value` resolution | `number` | 1 |

**Returns:** `any`[][]

___
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
<a id="gridcoordinatetoindex"></a>

### `<Const>` gridCoordinateToIndex

▸ **gridCoordinateToIndex**(x: *`any`*, y: *`any`*, resolution?: *`number`*): `number`

*Defined in sequences/utils.ts:11*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| x | `any` | - |
| y | `any` | - |
| `Default value` resolution | `number` | 1 |

**Returns:** `number`

___
<a id="indextogridcoordinate"></a>

### `<Const>` indexToGridCoordinate

▸ **indexToGridCoordinate**(index: *`any`*, resolution?: *`number`*): `object`

*Defined in sequences/utils.ts:3*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| index | `any` | - |
| `Default value` resolution | `number` | 1 |

**Returns:** `object`

___
<a id="indextomapcoordinate"></a>

### `<Const>` indexToMapCoordinate

▸ **indexToMapCoordinate**(index: *`any`*, resolution?: *`number`*): [IGeoLocation](interfaces/igeolocation.md)

*Defined in sequences/utils.ts:25*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| index | `any` | - |
| `Default value` resolution | `number` | 1 |

**Returns:** [IGeoLocation](interfaces/igeolocation.md)

___
<a id="mapcoordinatetoindex"></a>

### `<Const>` mapCoordinateToIndex

▸ **mapCoordinateToIndex**(location: *[IGeoLocation](interfaces/igeolocation.md)*, resolution?: *`number`*): `number`

*Defined in sequences/utils.ts:16*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| location | [IGeoLocation](interfaces/igeolocation.md) | - |
| `Default value` resolution | `number` | 1 |

**Returns:** `number`

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


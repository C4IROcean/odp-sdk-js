
#  Ocean Data Platform JavaScript SDK

## Index

### Enumerations

* [CastColumnType](enums/castcolumntype.md)
* [CastType](enums/casttype.md)
* [ObservedLevelFlag](enums/observedlevelflag.md)
* [StandardLevelFlag](enums/standardlevelflag.md)
* [TimeSeriesType](enums/timeseriestype.md)
* [Unit](enums/unit.md)
* [UnitType](enums/unittype.md)
* [ZoomLevel](enums/zoomlevel.md)

### Classes

* [Casts](classes/casts.md)
* [MarineRegions](classes/marineregions.md)
* [ODPClient](classes/odpclient.md)

### Interfaces

* [IAggregation](interfaces/iaggregation.md)
* [IApiKeyLoginOptions](interfaces/iapikeyloginoptions.md)
* [IAssetsFilter](interfaces/iassetsfilter.md)
* [IBoundingBox](interfaces/iboundingbox.md)
* [ICast](interfaces/icast.md)
* [ICastFilter](interfaces/icastfilter.md)
* [ICastRow](interfaces/icastrow.md)
* [ICastRowValue](interfaces/icastrowvalue.md)
* [IClientOptions](interfaces/iclientoptions.md)
* [ICogniteGeo](interfaces/icognitegeo.md)
* [IDataPoints](interfaces/idatapoints.md)
* [IDatapointFilter](interfaces/idatapointfilter.md)
* [IGeoFilter](interfaces/igeofilter.md)
* [IGeoLocation](interfaces/igeolocation.md)
* [IMarineRegion](interfaces/imarineregion.md)
* [IMarineRegionType](interfaces/imarineregiontype.md)
* [INumberFilter](interfaces/inumberfilter.md)
* [INumberValue](interfaces/inumbervalue.md)
* [IOAuthLoginOptions](interfaces/ioauthloginoptions.md)
* [IProject](interfaces/iproject.md)
* [ITimeFilter](interfaces/itimefilter.md)
* [ITimeSeries](interfaces/itimeseries.md)
* [ITimeSeriesFilter](interfaces/itimeseriesfilter.md)

### Functions

* [getColumnsFromEnum](#getcolumnsfromenum)
* [gridCoordinateToIndex](#gridcoordinatetoindex)
* [indexToGridCoordinate](#indextogridcoordinate)
* [indexToMapCoordinate](#indextomapcoordinate)
* [mapCoordinateToIndex](#mapcoordinatetoindex)

---

## Functions

<a id="getcolumnsfromenum"></a>

### `<Const>` getColumnsFromEnum

▸ **getColumnsFromEnum**(cols: *`Array`<`CastColumnType`>*, available: *`any`*): `string`[]

*Defined in [casts/utils.ts:68](https://github.com/C4IROcean/ODP-sdk-js/blob/17df383/source/casts/utils.ts#L68)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| cols | `Array`<`CastColumnType`> |
| available | `any` |

**Returns:** `string`[]

___
<a id="gridcoordinatetoindex"></a>

### `<Const>` gridCoordinateToIndex

▸ **gridCoordinateToIndex**(x: *`any`*, y: *`any`*, resolution?: *`number`*): `number`

*Defined in [casts/utils.ts:13](https://github.com/C4IROcean/ODP-sdk-js/blob/17df383/source/casts/utils.ts#L13)*

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

*Defined in [casts/utils.ts:5](https://github.com/C4IROcean/ODP-sdk-js/blob/17df383/source/casts/utils.ts#L5)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| index | `any` | - |
| `Default value` resolution | `number` | 1 |

**Returns:** `object`

___
<a id="indextomapcoordinate"></a>

### `<Const>` indexToMapCoordinate

▸ **indexToMapCoordinate**(index: *`any`*, resolution?: *`number`*): `IGeoLocation`

*Defined in [casts/utils.ts:32](https://github.com/C4IROcean/ODP-sdk-js/blob/17df383/source/casts/utils.ts#L32)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| index | `any` | - |
| `Default value` resolution | `number` | 1 |

**Returns:** `IGeoLocation`

___
<a id="mapcoordinatetoindex"></a>

### `<Const>` mapCoordinateToIndex

▸ **mapCoordinateToIndex**(location: *`IGeoLocation`*, resolution?: *`number`*): `number`

*Defined in [casts/utils.ts:18](https://github.com/C4IROcean/ODP-sdk-js/blob/17df383/source/casts/utils.ts#L18)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| location | `IGeoLocation` | - |
| `Default value` resolution | `number` | 1 |

**Returns:** `number`

___


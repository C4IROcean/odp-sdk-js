
#  Ocean Data Platform JavaScript SDK

## Index

### Enumerations

* [CastColumnType](enums/castcolumntype.md)
* [ObservedLevelFlag](enums/observedlevelflag.md)
* [SequenceType](enums/sequencetype.md)
* [StandardLevelFlag](enums/standardlevelflag.md)
* [TimeSeriesType](enums/timeseriestype.md)
* [Unit](enums/unit.md)
* [UnitType](enums/unittype.md)
* [ZoomLevel](enums/zoomlevel.md)

### Classes

* [Assets](classes/assets.md)
* [Casts](classes/casts.md)
* [Files](classes/files.md)
* [MarineRegions](classes/marineregions.md)
* [ODPClient](classes/odpclient.md)
* [Sequences](classes/sequences.md)
* [Temperature](classes/temperature.md)
* [TimeSeries](classes/timeseries.md)

### Interfaces

* [IAggregation](interfaces/iaggregation.md)
* [IApiKeyLoginOptions](interfaces/iapikeyloginoptions.md)
* [IAssetsFilter](interfaces/iassetsfilter.md)
* [IBoundingBox](interfaces/iboundingbox.md)
* [ICastFilter](interfaces/icastfilter.md)
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
* [ISequence](interfaces/isequence.md)
* [ISequenceRow](interfaces/isequencerow.md)
* [ISequenceRowValue](interfaces/isequencerowvalue.md)
* [ITimeFilter](interfaces/itimefilter.md)
* [ITimeSeries](interfaces/itimeseries.md)
* [ITimeSeriesFilter](interfaces/itimeseriesfilter.md)

### Functions

* [boundingBoxToPolygon](#boundingboxtopolygon)
* [getColumnsFromEnum](#getcolumnsfromenum)
* [getMRGIDBoundingBox](#getmrgidboundingbox)
* [getMRGIDPolygon](#getmrgidpolygon)
* [gridCoordinateToIndex](#gridcoordinatetoindex)
* [indexToGridCoordinate](#indextogridcoordinate)
* [indexToMapCoordinate](#indextomapcoordinate)
* [mapCoordinateToIndex](#mapcoordinatetoindex)
* [throttleActions](#throttleactions)

---

## Functions

<a id="boundingboxtopolygon"></a>

### `<Const>` boundingBoxToPolygon

▸ **boundingBoxToPolygon**(bb: *[IBoundingBox](interfaces/iboundingbox.md)*): `Array`<[IGeoLocation](interfaces/igeolocation.md)>

*Defined in utils/geoUtils/index.ts:77*

**Parameters:**

| Name | Type |
| ------ | ------ |
| bb | [IBoundingBox](interfaces/iboundingbox.md) |

**Returns:** `Array`<[IGeoLocation](interfaces/igeolocation.md)>

___
<a id="getcolumnsfromenum"></a>

### `<Const>` getColumnsFromEnum

▸ **getColumnsFromEnum**(cols: *`Array`<[CastColumnType](enums/castcolumntype.md)>*, available: *`any`*): `string`[]

*Defined in utils/sequences/utils.ts:68*

**Parameters:**

| Name | Type |
| ------ | ------ |
| cols | `Array`<[CastColumnType](enums/castcolumntype.md)> |
| available | `any` |

**Returns:** `string`[]

___
<a id="getmrgidboundingbox"></a>

### `<Const>` getMRGIDBoundingBox

▸ **getMRGIDBoundingBox**(mrgid: *`number`*): `Promise`<[IBoundingBox](interfaces/iboundingbox.md)>

*Defined in utils/geoUtils/index.ts:47*

**Parameters:**

| Name | Type |
| ------ | ------ |
| mrgid | `number` |

**Returns:** `Promise`<[IBoundingBox](interfaces/iboundingbox.md)>

___
<a id="getmrgidpolygon"></a>

### `<Const>` getMRGIDPolygon

▸ **getMRGIDPolygon**(mrgid: *`number`*): `Promise`<`Array`<[IGeoLocation](interfaces/igeolocation.md)>>

*Defined in utils/geoUtils/index.ts:87*

**Parameters:**

| Name | Type |
| ------ | ------ |
| mrgid | `number` |

**Returns:** `Promise`<`Array`<[IGeoLocation](interfaces/igeolocation.md)>>

___
<a id="gridcoordinatetoindex"></a>

### `<Const>` gridCoordinateToIndex

▸ **gridCoordinateToIndex**(x: *`any`*, y: *`any`*, resolution?: *`number`*): `number`

*Defined in utils/sequences/utils.ts:13*

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

*Defined in utils/sequences/utils.ts:5*

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

*Defined in utils/sequences/utils.ts:32*

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

*Defined in utils/sequences/utils.ts:18*

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

*Defined in utils/geoUtils/index.ts:4*

**Parameters:**

| Name | Type |
| ------ | ------ |
| listOfCallableActions | `any` |
| limit | `any` |
| `Optional` stream | `any` |

**Returns:** `Promise`<`any`[]>

___


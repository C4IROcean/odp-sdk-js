
#  Ocean Data Platform JavaScript SDK

## Index

### Enumerations

* [ObservedLevelFlag](enums/observedlevelflag.md)
* [SequenceColumnType](enums/sequencecolumntype.md)
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

*Defined in [utils/index.ts:77](https://github.com/C4IROcean/ODP-sdk-js/blob/26e019a/source/utils/index.ts#L77)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| bb | [IBoundingBox](interfaces/iboundingbox.md) |

**Returns:** `Array`<[IGeoLocation](interfaces/igeolocation.md)>

___
<a id="getcolumnsfromenum"></a>

### `<Const>` getColumnsFromEnum

▸ **getColumnsFromEnum**(cols: *`Array`<[SequenceColumnType](enums/sequencecolumntype.md)>*, available: *`any`*): `string`[]

*Defined in [sequences/utils.ts:68](https://github.com/C4IROcean/ODP-sdk-js/blob/26e019a/source/sequences/utils.ts#L68)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| cols | `Array`<[SequenceColumnType](enums/sequencecolumntype.md)> |
| available | `any` |

**Returns:** `string`[]

___
<a id="getmrgidboundingbox"></a>

### `<Const>` getMRGIDBoundingBox

▸ **getMRGIDBoundingBox**(mrgid: *`number`*): `Promise`<[IBoundingBox](interfaces/iboundingbox.md)>

*Defined in [utils/index.ts:47](https://github.com/C4IROcean/ODP-sdk-js/blob/26e019a/source/utils/index.ts#L47)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| mrgid | `number` |

**Returns:** `Promise`<[IBoundingBox](interfaces/iboundingbox.md)>

___
<a id="getmrgidpolygon"></a>

### `<Const>` getMRGIDPolygon

▸ **getMRGIDPolygon**(mrgid: *`number`*): `Promise`<`Array`<[IGeoLocation](interfaces/igeolocation.md)>>

*Defined in [utils/index.ts:87](https://github.com/C4IROcean/ODP-sdk-js/blob/26e019a/source/utils/index.ts#L87)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| mrgid | `number` |

**Returns:** `Promise`<`Array`<[IGeoLocation](interfaces/igeolocation.md)>>

___
<a id="gridcoordinatetoindex"></a>

### `<Const>` gridCoordinateToIndex

▸ **gridCoordinateToIndex**(x: *`any`*, y: *`any`*, resolution?: *`number`*): `number`

*Defined in [sequences/utils.ts:13](https://github.com/C4IROcean/ODP-sdk-js/blob/26e019a/source/sequences/utils.ts#L13)*

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

*Defined in [sequences/utils.ts:5](https://github.com/C4IROcean/ODP-sdk-js/blob/26e019a/source/sequences/utils.ts#L5)*

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

*Defined in [sequences/utils.ts:32](https://github.com/C4IROcean/ODP-sdk-js/blob/26e019a/source/sequences/utils.ts#L32)*

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

*Defined in [sequences/utils.ts:18](https://github.com/C4IROcean/ODP-sdk-js/blob/26e019a/source/sequences/utils.ts#L18)*

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

*Defined in [utils/index.ts:4](https://github.com/C4IROcean/ODP-sdk-js/blob/26e019a/source/utils/index.ts#L4)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| listOfCallableActions | `any` |
| limit | `any` |
| `Optional` stream | `any` |

**Returns:** `Promise`<`any`[]>

___


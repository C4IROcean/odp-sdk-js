[Ocean Data Platform JavaScript SDK](../README.md) > [TimeSeries](../classes/timeseries.md)

# Class: TimeSeries

## Hierarchy

**TimeSeries**

## Index

### Constructors

* [constructor](timeseries.md#constructor)

### Accessors

* [client](timeseries.md#client)
* [temperature](timeseries.md#temperature)

### Methods

* [convert](timeseries.md#convert)
* [datapointFilter](timeseries.md#datapointfilter)
* [datapointLatestFilter](timeseries.md#datapointlatestfilter)
* [getSequenceColumns](timeseries.md#getsequencecolumns)
* [numberToIdInternal](timeseries.md#numbertoidinternal)
* [queryBuilder](timeseries.md#querybuilder)
* [sequenceConvert](timeseries.md#sequenceconvert)
* [sequenceQueryBuilder](timeseries.md#sequencequerybuilder)
* [stringToIdExternal](timeseries.md#stringtoidexternal)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new TimeSeries**(client: *[ODPClient](odpclient.md)*): [TimeSeries](timeseries.md)

*Defined in utils/timeSeries/index.ts:33*

**Parameters:**

| Name | Type |
| ------ | ------ |
| client | [ODPClient](odpclient.md) |

**Returns:** [TimeSeries](timeseries.md)

___

## Accessors

<a id="client"></a>

###  client

**client**: 

*Defined in utils/timeSeries/index.ts:40*

___
<a id="temperature"></a>

###  temperature

**temperature**: 

*Defined in utils/timeSeries/index.ts:44*

___

## Methods

<a id="convert"></a>

###  convert

▸ **convert**(timeseries: *`TimeSeriesList`*, dataPoints: *`Array`<`DatapointsGetAggregateDatapoint`> \| `Array`<`DatapointsGetDatapoint`>*, assets: *`AssetList`*): `Array`<[ITimeSeries](../interfaces/itimeseries.md)>

*Defined in utils/timeSeries/index.ts:51*

**Parameters:**

| Name | Type |
| ------ | ------ |
| timeseries | `TimeSeriesList` |
| dataPoints | `Array`<`DatapointsGetAggregateDatapoint`> \| `Array`<`DatapointsGetDatapoint`> |
| assets | `AssetList` |

**Returns:** `Array`<[ITimeSeries](../interfaces/itimeseries.md)>

___
<a id="datapointfilter"></a>

###  datapointFilter

▸ **datapointFilter**(filter: *[IDatapointFilter](../interfaces/idatapointfilter.md)*): `DatapointsMultiQueryBase`

*Defined in utils/timeSeries/index.ts:225*

**Parameters:**

| Name | Type |
| ------ | ------ |
| filter | [IDatapointFilter](../interfaces/idatapointfilter.md) |

**Returns:** `DatapointsMultiQueryBase`

___
<a id="datapointlatestfilter"></a>

###  datapointLatestFilter

▸ **datapointLatestFilter**(filter: *[IDatapointFilter](../interfaces/idatapointfilter.md)*): `LatestDataPropertyFilter`

*Defined in utils/timeSeries/index.ts:252*

**Parameters:**

| Name | Type |
| ------ | ------ |
| filter | [IDatapointFilter](../interfaces/idatapointfilter.md) |

**Returns:** `LatestDataPropertyFilter`

___
<a id="getsequencecolumns"></a>

###  getSequenceColumns

▸ **getSequenceColumns**(): `string`[]

*Defined in utils/timeSeries/index.ts:261*

**Returns:** `string`[]

___
<a id="numbertoidinternal"></a>

###  numberToIdInternal

▸ **numberToIdInternal**(ids: *`Array`<`number`>*): `Array`<`IdEither`>

*Defined in utils/timeSeries/index.ts:216*

**Parameters:**

| Name | Type |
| ------ | ------ |
| ids | `Array`<`number`> |

**Returns:** `Array`<`IdEither`>

___
<a id="querybuilder"></a>

###  queryBuilder

▸ **queryBuilder**(filter: *[ITimeSeriesFilter](../interfaces/itimeseriesfilter.md)*): `Promise`<`Array`<`TimeSeriesSearchDTO`>>

*Defined in utils/timeSeries/index.ts:130*

**Parameters:**

| Name | Type |
| ------ | ------ |
| filter | [ITimeSeriesFilter](../interfaces/itimeseriesfilter.md) |

**Returns:** `Promise`<`Array`<`TimeSeriesSearchDTO`>>

___
<a id="sequenceconvert"></a>

###  sequenceConvert

▸ **sequenceConvert**(sequences: *`Array`<`Sequence`>*, allRows: *`any`*, assets: *`AssetList`*, columns: *`Array`<`string`>*): `Array`<[ITimeSeries](../interfaces/itimeseries.md)>

*Defined in utils/timeSeries/index.ts:85*

**Parameters:**

| Name | Type |
| ------ | ------ |
| sequences | `Array`<`Sequence`> |
| allRows | `any` |
| assets | `AssetList` |
| columns | `Array`<`string`> |

**Returns:** `Array`<[ITimeSeries](../interfaces/itimeseries.md)>

___
<a id="sequencequerybuilder"></a>

###  sequenceQueryBuilder

▸ **sequenceQueryBuilder**(filter: *[ITimeSeriesFilter](../interfaces/itimeseriesfilter.md)*): `SequenceListScope`

*Defined in utils/timeSeries/index.ts:196*

**Parameters:**

| Name | Type |
| ------ | ------ |
| filter | [ITimeSeriesFilter](../interfaces/itimeseriesfilter.md) |

**Returns:** `SequenceListScope`

___
<a id="stringtoidexternal"></a>

###  stringToIdExternal

▸ **stringToIdExternal**(ids: *`Array`<`string`>*): `Array`<`IdEither`>

*Defined in utils/timeSeries/index.ts:210*

**Parameters:**

| Name | Type |
| ------ | ------ |
| ids | `Array`<`string`> |

**Returns:** `Array`<`IdEither`>

___


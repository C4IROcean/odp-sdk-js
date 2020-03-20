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
* [queryBuilder](timeseries.md#querybuilder)
* [stringToIdEither](timeseries.md#stringtoideither)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new TimeSeries**(client: *[ODPClient](odpclient.md)*): [TimeSeries](timeseries.md)

*Defined in timeSeries/index.ts:20*

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

*Defined in timeSeries/index.ts:27*

___
<a id="temperature"></a>

###  temperature

**temperature**: 

*Defined in timeSeries/index.ts:31*

___

## Methods

<a id="convert"></a>

###  convert

▸ **convert**(timeseries: *`TimeSeriesList`*, dataPoints: *`Array`<`DatapointsGetAggregateDatapoint`> \| `Array`<`DatapointsGetDatapoint`>*, assets: *`AssetList`*): `Array`<[ITimeSeries](../interfaces/itimeseries.md)>

*Defined in timeSeries/index.ts:38*

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

*Defined in timeSeries/index.ts:120*

**Parameters:**

| Name | Type |
| ------ | ------ |
| filter | [IDatapointFilter](../interfaces/idatapointfilter.md) |

**Returns:** `DatapointsMultiQueryBase`

___
<a id="datapointlatestfilter"></a>

###  datapointLatestFilter

▸ **datapointLatestFilter**(filter: *[ITimeSeriesFilter](../interfaces/itimeseriesfilter.md)*): `LatestDataPropertyFilter`

*Defined in timeSeries/index.ts:147*

**Parameters:**

| Name | Type |
| ------ | ------ |
| filter | [ITimeSeriesFilter](../interfaces/itimeseriesfilter.md) |

**Returns:** `LatestDataPropertyFilter`

___
<a id="querybuilder"></a>

###  queryBuilder

▸ **queryBuilder**(filter: *[ITimeSeriesFilter](../interfaces/itimeseriesfilter.md)*): `Array`<`TimeSeriesSearchDTO`>

*Defined in timeSeries/index.ts:71*

**Parameters:**

| Name | Type |
| ------ | ------ |
| filter | [ITimeSeriesFilter](../interfaces/itimeseriesfilter.md) |

**Returns:** `Array`<`TimeSeriesSearchDTO`>

___
<a id="stringtoideither"></a>

###  stringToIdEither

▸ **stringToIdEither**(ids: *`Array`<`string`>*): `Array`<`IdEither`>

*Defined in timeSeries/index.ts:111*

**Parameters:**

| Name | Type |
| ------ | ------ |
| ids | `Array`<`string`> |

**Returns:** `Array`<`IdEither`>

___


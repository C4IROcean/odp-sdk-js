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

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new TimeSeries**(client: *[ODPClient](odpclient.md)*): [TimeSeries](timeseries.md)

*Defined in timeSeries/index.ts:18*

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

*Defined in timeSeries/index.ts:25*

___
<a id="temperature"></a>

###  temperature

**temperature**: 

*Defined in timeSeries/index.ts:29*

___

## Methods

<a id="convert"></a>

###  convert

▸ **convert**(timeseries: *`TimeSeriesList`*, dataPoints: *`Array`<`DatapointsGetAggregateDatapoint`> \| `Array`<`DatapointsGetDatapoint`>*, assets: *`AssetList`*): `Array`<[ITimeSeries](../interfaces/itimeseries.md)>

*Defined in timeSeries/index.ts:36*

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

▸ **datapointFilter**(filter: *[ITimeSeriesFilter](../interfaces/itimeseriesfilter.md)*): `DatapointsMultiQueryBase`

*Defined in timeSeries/index.ts:113*

**Parameters:**

| Name | Type |
| ------ | ------ |
| filter | [ITimeSeriesFilter](../interfaces/itimeseriesfilter.md) |

**Returns:** `DatapointsMultiQueryBase`

___
<a id="datapointlatestfilter"></a>

###  datapointLatestFilter

▸ **datapointLatestFilter**(filter: *[ITimeSeriesFilter](../interfaces/itimeseriesfilter.md)*): `LatestDataPropertyFilter`

*Defined in timeSeries/index.ts:140*

**Parameters:**

| Name | Type |
| ------ | ------ |
| filter | [ITimeSeriesFilter](../interfaces/itimeseriesfilter.md) |

**Returns:** `LatestDataPropertyFilter`

___
<a id="querybuilder"></a>

###  queryBuilder

▸ **queryBuilder**(filter: *[ITimeSeriesFilter](../interfaces/itimeseriesfilter.md)*): `Array`<`TimeSeriesSearchDTO`>

*Defined in timeSeries/index.ts:69*

**Parameters:**

| Name | Type |
| ------ | ------ |
| filter | [ITimeSeriesFilter](../interfaces/itimeseriesfilter.md) |

**Returns:** `Array`<`TimeSeriesSearchDTO`>

___


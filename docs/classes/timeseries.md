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
* [queryBuilder](timeseries.md#querybuilder)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new TimeSeries**(client: *[ODPClient](odpclient.md)*): [TimeSeries](timeseries.md)

*Defined in timeSeries/index.ts:13*

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

*Defined in timeSeries/index.ts:20*

___
<a id="temperature"></a>

###  temperature

**temperature**: 

*Defined in timeSeries/index.ts:24*

___

## Methods

<a id="convert"></a>

###  convert

▸ **convert**(timeseries: *`TimeSeriesList`*, dataPoints: *`Array`<`DatapointsGetAggregateDatapoint`> \| `Array`<`DatapointsGetDatapoint`>*, assets: *`AssetList`*): `Array`<[ITimeSeries](../interfaces/itimeseries.md)>

*Defined in timeSeries/index.ts:31*

**Parameters:**

| Name | Type |
| ------ | ------ |
| timeseries | `TimeSeriesList` |
| dataPoints | `Array`<`DatapointsGetAggregateDatapoint`> \| `Array`<`DatapointsGetDatapoint`> |
| assets | `AssetList` |

**Returns:** `Array`<[ITimeSeries](../interfaces/itimeseries.md)>

___
<a id="querybuilder"></a>

###  queryBuilder

▸ **queryBuilder**(filter: *[ITimeSeriesFilter](../interfaces/itimeseriesfilter.md)*): `Array`<`TimeSeriesSearchDTO`>

*Defined in timeSeries/index.ts:64*

**Parameters:**

| Name | Type |
| ------ | ------ |
| filter | [ITimeSeriesFilter](../interfaces/itimeseriesfilter.md) |

**Returns:** `Array`<`TimeSeriesSearchDTO`>

___


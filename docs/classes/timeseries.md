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

*Defined in timeSeries/index.ts:14*

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

*Defined in timeSeries/index.ts:21*

___
<a id="temperature"></a>

###  temperature

**temperature**: 

*Defined in timeSeries/index.ts:25*

___

## Methods

<a id="convert"></a>

###  convert

▸ **convert**(timeseries: *`TimeSeriesList`*, dataPoints: *`Array`<`DatapointsGetAggregateDatapoint`> \| `Array`<`DatapointsGetDatapoint`>*, assets: *`AssetList`*): `Array`<`types.ITimeSeries`>

*Defined in timeSeries/index.ts:32*

**Parameters:**

| Name | Type |
| ------ | ------ |
| timeseries | `TimeSeriesList` |
| dataPoints | `Array`<`DatapointsGetAggregateDatapoint`> \| `Array`<`DatapointsGetDatapoint`> |
| assets | `AssetList` |

**Returns:** `Array`<`types.ITimeSeries`>

___
<a id="querybuilder"></a>

###  queryBuilder

▸ **queryBuilder**(filter: *`types.ITimeSeriesFilter`*): `Array`<`TimeSeriesSearchDTO`>

*Defined in timeSeries/index.ts:65*

**Parameters:**

| Name | Type |
| ------ | ------ |
| filter | `types.ITimeSeriesFilter` |

**Returns:** `Array`<`TimeSeriesSearchDTO`>

___


[Ocean Data Platform JavaScript SDK](../README.md) > [Temperature](../classes/temperature.md)

# Class: Temperature

## Hierarchy

**Temperature**

## Index

### Constructors

* [constructor](temperature.md#constructor)

### Methods

* [getAll](temperature.md#getall)
* [getLatest](temperature.md#getlatest)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Temperature**(timeSeries: *[TimeSeries](timeseries.md)*): [Temperature](temperature.md)

*Defined in timeSeries/temperature/index.ts:9*

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| timeSeries | [TimeSeries](timeseries.md) |   |

**Returns:** [Temperature](temperature.md)

___

## Methods

<a id="getall"></a>

###  getAll

▸ **getAll**(filter: *[ITimeSeriesFilter](../interfaces/itimeseriesfilter.md)*): `Promise`<`Array`<[ITimeSeries](../interfaces/itimeseries.md)>>

*Defined in timeSeries/temperature/index.ts:24*

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| filter | [ITimeSeriesFilter](../interfaces/itimeseriesfilter.md) |   |

**Returns:** `Promise`<`Array`<[ITimeSeries](../interfaces/itimeseries.md)>>

___
<a id="getlatest"></a>

###  getLatest

▸ **getLatest**(filter: *[ITimeSeriesFilter](../interfaces/itimeseriesfilter.md)*): `Promise`<`Array`<[ITimeSeries](../interfaces/itimeseries.md)>>

*Defined in timeSeries/temperature/index.ts:44*

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| filter | [ITimeSeriesFilter](../interfaces/itimeseriesfilter.md) |   |

**Returns:** `Promise`<`Array`<[ITimeSeries](../interfaces/itimeseries.md)>>

___


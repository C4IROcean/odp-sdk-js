[Ocean Data Platform JavaScript SDK](../README.md) > [Temperature](../classes/temperature.md)

# Class: Temperature

## Hierarchy

**Temperature**

## Index

### Constructors

* [constructor](temperature.md#constructor)

### Methods

* [get](temperature.md#get)
* [getLatest](temperature.md#getlatest)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Temperature**(timeSeries: *[TimeSeries](timeseries.md)*): [Temperature](temperature.md)

*Defined in timeSeries/temperature/index.ts:8*

**Parameters:**

| Name | Type |
| ------ | ------ |
| timeSeries | [TimeSeries](timeseries.md) |

**Returns:** [Temperature](temperature.md)

___

## Methods

<a id="get"></a>

###  get

▸ **get**(filter: *`types.ITimeSeriesFilter`*): `Promise`<`Array`<`types.ITimeSeries`>>

*Defined in timeSeries/temperature/index.ts:18*

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| filter | `types.ITimeSeriesFilter` |   |

**Returns:** `Promise`<`Array`<`types.ITimeSeries`>>

___
<a id="getlatest"></a>

###  getLatest

▸ **getLatest**(filter: *`types.ITimeSeriesFilter`*): `Promise`<`Array`<`types.ITimeSeries`>>

*Defined in timeSeries/temperature/index.ts:32*

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| filter | `types.ITimeSeriesFilter` |   |

**Returns:** `Promise`<`Array`<`types.ITimeSeries`>>

___


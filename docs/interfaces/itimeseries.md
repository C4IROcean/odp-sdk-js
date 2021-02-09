**[Ocean Data Platform JavaScript SDK](../README.md)**

> [Globals](../README.md) / ITimeSeries

# Interface: ITimeSeries

## Hierarchy

* **ITimeSeries**

## Index

### Properties

* [assetId](itimeseries.md#assetid)
* [dataPoints](itimeseries.md#datapoints)
* [externalId](itimeseries.md#externalid)
* [firstTimestamp](itimeseries.md#firsttimestamp)
* [id](itimeseries.md#id)
* [lastTimestamp](itimeseries.md#lasttimestamp)
* [location](itimeseries.md#location)
* [type](itimeseries.md#type)
* [unit](itimeseries.md#unit)

## Properties

### assetId

•  **assetId**: number

*Defined in [source/types/types.ts:16](https://github.com/C4IROcean/odp-sdk-js/blob/c6020fb/source/types/types.ts#L16)*

___

### dataPoints

•  **dataPoints**: Array\<GetAggregateDatapoint> \| Array\<GetStringDatapoint> \| Array\<GetDoubleDatapoint>

*Defined in [source/types/types.ts:25](https://github.com/C4IROcean/odp-sdk-js/blob/c6020fb/source/types/types.ts#L25)*

___

### externalId

•  **externalId**: string

*Defined in [source/types/types.ts:15](https://github.com/C4IROcean/odp-sdk-js/blob/c6020fb/source/types/types.ts#L15)*

___

### firstTimestamp

•  **firstTimestamp**: Date

*Defined in [source/types/types.ts:24](https://github.com/C4IROcean/odp-sdk-js/blob/c6020fb/source/types/types.ts#L24)*

___

### id

•  **id**: number

*Defined in [source/types/types.ts:14](https://github.com/C4IROcean/odp-sdk-js/blob/c6020fb/source/types/types.ts#L14)*

___

### lastTimestamp

•  **lastTimestamp**: Date

*Defined in [source/types/types.ts:23](https://github.com/C4IROcean/odp-sdk-js/blob/c6020fb/source/types/types.ts#L23)*

___

### location

•  **location**: { depth: number ; lat: number ; long: number ; zoomLevel: number  }

*Defined in [source/types/types.ts:17](https://github.com/C4IROcean/odp-sdk-js/blob/c6020fb/source/types/types.ts#L17)*

#### Type declaration:

Name | Type |
------ | ------ |
`depth` | number |
`lat` | number |
`long` | number |
`zoomLevel` | number |

___

### type

•  **type**: [TimeSeriesTypeEnum](../enums/timeseriestypeenum.md)

*Defined in [source/types/types.ts:12](https://github.com/C4IROcean/odp-sdk-js/blob/c6020fb/source/types/types.ts#L12)*

___

### unit

•  **unit**: [UnitTypeEnum](../enums/unittypeenum.md)

*Defined in [source/types/types.ts:13](https://github.com/C4IROcean/odp-sdk-js/blob/c6020fb/source/types/types.ts#L13)*

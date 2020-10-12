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

*Defined in [source/types/types.ts:10](https://github.com/C4IROcean/ODP-sdk-js/blob/4e3fa10/source/types/types.ts#L10)*

___

### dataPoints

•  **dataPoints**: Array\<GetAggregateDatapoint> \| Array\<GetStringDatapoint> \| Array\<GetDoubleDatapoint>

*Defined in [source/types/types.ts:19](https://github.com/C4IROcean/ODP-sdk-js/blob/4e3fa10/source/types/types.ts#L19)*

___

### externalId

•  **externalId**: string

*Defined in [source/types/types.ts:9](https://github.com/C4IROcean/ODP-sdk-js/blob/4e3fa10/source/types/types.ts#L9)*

___

### firstTimestamp

•  **firstTimestamp**: Date

*Defined in [source/types/types.ts:18](https://github.com/C4IROcean/ODP-sdk-js/blob/4e3fa10/source/types/types.ts#L18)*

___

### id

•  **id**: number

*Defined in [source/types/types.ts:8](https://github.com/C4IROcean/ODP-sdk-js/blob/4e3fa10/source/types/types.ts#L8)*

___

### lastTimestamp

•  **lastTimestamp**: Date

*Defined in [source/types/types.ts:17](https://github.com/C4IROcean/ODP-sdk-js/blob/4e3fa10/source/types/types.ts#L17)*

___

### location

•  **location**: { depth: number ; lat: number ; long: number ; zoomLevel: number  }

*Defined in [source/types/types.ts:11](https://github.com/C4IROcean/ODP-sdk-js/blob/4e3fa10/source/types/types.ts#L11)*

#### Type declaration:

Name | Type |
------ | ------ |
`depth` | number |
`lat` | number |
`long` | number |
`zoomLevel` | number |

___

### type

•  **type**: [TimeSeriesType](../enums/timeseriestype.md)

*Defined in [source/types/types.ts:6](https://github.com/C4IROcean/ODP-sdk-js/blob/4e3fa10/source/types/types.ts#L6)*

___

### unit

•  **unit**: [UnitType](../enums/unittype.md)

*Defined in [source/types/types.ts:7](https://github.com/C4IROcean/ODP-sdk-js/blob/4e3fa10/source/types/types.ts#L7)*

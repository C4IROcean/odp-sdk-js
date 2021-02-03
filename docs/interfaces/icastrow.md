**[Ocean Data Platform JavaScript SDK](../README.md)**

> [Globals](../README.md) / ICastRow

# Interface: ICastRow

## Hierarchy

* [ICast](icast.md)

  ↳ **ICastRow**

## Index

### Properties

* [cruise](icastrow.md#cruise)
* [externalId](icastrow.md#externalid)
* [id](icastrow.md#id)
* [location](icastrow.md#location)
* [metadata](icastrow.md#metadata)
* [rowNumber](icastrow.md#rownumber)
* [time](icastrow.md#time)
* [value](icastrow.md#value)

## Properties

### cruise

• `Optional` **cruise**: { country?: string ; id?: string ; vesselName?: string  }

*Inherited from [ICast](icast.md).[cruise](icast.md#cruise)*

*Defined in [source/types/types.ts:28](https://github.com/C4IROcean/odp-sdk-js/blob/0e2fd46/source/types/types.ts#L28)*

#### Type declaration:

Name | Type |
------ | ------ |
`country?` | string |
`id?` | string |
`vesselName?` | string |

___

### externalId

•  **externalId**: string

*Inherited from [ICast](icast.md).[externalId](icast.md#externalid)*

*Defined in [source/types/types.ts:34](https://github.com/C4IROcean/odp-sdk-js/blob/0e2fd46/source/types/types.ts#L34)*

___

### id

•  **id**: number

*Inherited from [ICast](icast.md).[id](icast.md#id)*

*Defined in [source/types/types.ts:33](https://github.com/C4IROcean/odp-sdk-js/blob/0e2fd46/source/types/types.ts#L33)*

___

### location

•  **location**: { depth?: number ; lat: number ; long: number  }

*Inherited from [ICast](icast.md).[location](icast.md#location)*

*Defined in [source/types/types.ts:23](https://github.com/C4IROcean/odp-sdk-js/blob/0e2fd46/source/types/types.ts#L23)*

#### Type declaration:

Name | Type |
------ | ------ |
`depth?` | number |
`lat` | number |
`long` | number |

___

### metadata

• `Optional` **metadata**: { Access_no?: string ; CDF_extIdFile?: string ; Conventions?: string ; GMT_time?: string ; Orig_Stat_Num?: string ; Platform?: string ; Recorder?: string ; Salinity_first?: string ; Salinity_last?: string ; Temperature_first?: string ; Temperature_last?: string ; WOD_cruise_identifier?: string ; WOD_cruise_name?: string ; castSize?: string ; castYear?: string ; cdm_data_type?: string ; country?: string ; creator_email?: string ; creator_name?: string ; creator_url?: string ; dataset?: string ; dataset_code?: string ; date?: string ; date_created?: string ; date_modified?: string ; dbase_orig?: string ; equipment?: string ; featureType?: string ; geo_index?: string ; geo_key?: string ; geo_lat?: string ; geo_long?: string ; id?: string ; institution?: string ; lat?: string ; level?: string ; lon?: string ; naming_authority?: string ; originators_cruise_identifier?: string ; parent_seq_name?: string ; prefix?: string ; project?: string ; publisher_email?: string ; publisher_name?: string ; publisher_url?: string ; real_time?: string ; references?: string ; source?: string ; standard_name_vocabulary?: string ; summary?: string ; time?: string ; title?: string ; wod_unique_cast?: string ; z_first?: string ; z_last?: string  }

*Inherited from [ICast](icast.md).[metadata](icast.md#metadata)*

*Defined in [source/types/types.ts:36](https://github.com/C4IROcean/odp-sdk-js/blob/0e2fd46/source/types/types.ts#L36)*

#### Type declaration:

Name | Type |
------ | ------ |
`Access\_no?` | string |
`CDF\_extIdFile?` | string |
`Conventions?` | string |
`GMT\_time?` | string |
`Orig\_Stat\_Num?` | string |
`Platform?` | string |
`Recorder?` | string |
`Salinity\_first?` | string |
`Salinity\_last?` | string |
`Temperature\_first?` | string |
`Temperature\_last?` | string |
`WOD\_cruise\_identifier?` | string |
`WOD\_cruise\_name?` | string |
`castSize?` | string |
`castYear?` | string |
`cdm\_data\_type?` | string |
`country?` | string |
`creator\_email?` | string |
`creator\_name?` | string |
`creator\_url?` | string |
`dataset?` | string |
`dataset\_code?` | string |
`date?` | string |
`date\_created?` | string |
`date\_modified?` | string |
`dbase\_orig?` | string |
`equipment?` | string |
`featureType?` | string |
`geo\_index?` | string |
`geo\_key?` | string |
`geo\_lat?` | string |
`geo\_long?` | string |
`id?` | string |
`institution?` | string |
`lat?` | string |
`level?` | string |
`lon?` | string |
`naming\_authority?` | string |
`originators\_cruise\_identifier?` | string |
`parent\_seq\_name?` | string |
`prefix?` | string |
`project?` | string |
`publisher\_email?` | string |
`publisher\_name?` | string |
`publisher\_url?` | string |
`real\_time?` | string |
`references?` | string |
`source?` | string |
`standard\_name\_vocabulary?` | string |
`summary?` | string |
`time?` | string |
`title?` | string |
`wod\_unique\_cast?` | string |
`z\_first?` | string |
`z\_last?` | string |

___

### rowNumber

•  **rowNumber**: number

*Defined in [source/types/types.ts:97](https://github.com/C4IROcean/odp-sdk-js/blob/0e2fd46/source/types/types.ts#L97)*

___

### time

• `Optional` **time**: Date

*Inherited from [ICast](icast.md).[time](icast.md#time)*

*Defined in [source/types/types.ts:35](https://github.com/C4IROcean/odp-sdk-js/blob/0e2fd46/source/types/types.ts#L35)*

___

### value

•  **value**: [ICastRowValue](icastrowvalue.md)

*Defined in [source/types/types.ts:96](https://github.com/C4IROcean/odp-sdk-js/blob/0e2fd46/source/types/types.ts#L96)*

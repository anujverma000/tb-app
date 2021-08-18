import { KeyValue } from './../LocationList/useLocations';
export interface LocationsStore {
  status: 'init' | 'loading' | 'loaded';
  data: Array<KeyValue>;
}

export type LOCATION_LOADING = { type: 'LOCATIONS_LOADING' }
export type SET_LOCATIONS = { type: 'LOCATIONS_LOADED'; data: Array<KeyValue> }

export type LocationStoreEvent = LOCATION_LOADING | SET_LOCATIONS
import { KeyValue } from './../LocationList/useLocations';

export const FETCH_LOCATIONS = 'FETCH_LOCATIONS'

export type FetchLocationAction = { 
  type: "FETCH_LOCATIONS"; 
  payload: Array<KeyValue> 
};
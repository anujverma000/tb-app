import { FETCH_LOCATIONS, FetchLocationAction } from './locationActions';
import { KeyValue } from './../LocationList/useLocations';

export interface LocationState {
  locations: Array<KeyValue>;
}

const initialState = {
  locations: [],
};



export const locationReducer = (
  action: FetchLocationAction,
  state: LocationState = initialState,
) => {
  if(!action) return state;
  switch (action.type) {
    case FETCH_LOCATIONS: {
      return { ...state, notes: [...state.locations, action.payload] };
    }
    default:
      return state;
  }
};
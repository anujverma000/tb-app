import { LocationStoreEvent, LocationsStore } from './locationActions';

const initial: LocationsStore = {
  status: 'init',
  data: []
}

const locationReducer = (
  event: LocationStoreEvent,
  state: LocationsStore = initial,
): LocationsStore => {
  if(!event) return state;
  switch (event.type) {
    case 'LOCATIONS_LOADING':
      return {
        ...state,
        status: 'loading'
      }
    case 'LOCATIONS_LOADED':
      return {
        ...state,
        status: 'loaded',
        data: event.data
      }
    default:
      return state
  }
}

export default locationReducer
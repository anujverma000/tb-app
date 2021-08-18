import { createStore, combineReducers } from 'redux'
import { useDispatch as _useDispatch } from 'react-redux'
import locationReducer from './locationReducer';
import {  LocationStoreEvent } from './locationActions'

type StoreEvent = LocationStoreEvent

export const useDispatch = () => {
  const dispatch = _useDispatch()
  return (event: StoreEvent) => {
    dispatch(event)
  }
}

export default createStore(
  combineReducers({
    locations: locationReducer,
  })
)
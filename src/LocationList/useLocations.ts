import axios from 'axios';
import { useState, useEffect } from "react";
import { useDispatch } from '../store/store'

const LOCATION_URL = 'https://randomuser.me/api/?results=20'

export type KeyValue = {
  [key: string] : string | number | KeyValue
}

type Results = {
  location: KeyValue
}
const useLocations = () => {
  const [locations, setLocations] = useState<Array<KeyValue>>([]);
  useDispatch()({ type: 'LOCATIONS_LOADING' })
  useEffect(() => {
    const fetchLocations = async () => {
      const { data: { results  } } = await axios.get(LOCATION_URL);
      const tempLocations: Array<KeyValue> = []
      results.forEach((r : Results) => tempLocations.push(r.location));
      setLocations(tempLocations)
    }
    fetchLocations();
  }, []);
  return locations;
}

export default useLocations;

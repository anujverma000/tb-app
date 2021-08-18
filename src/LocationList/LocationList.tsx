import React, { useEffect, useState } from 'react'
import useLocations, { KeyValue } from './useLocations'
import { Table, Form } from 'react-bootstrap'

const hasObjValue = (obj: KeyValue, value:string | number): boolean => {
  return JSON.stringify(Object.values(obj)).toLowerCase().indexOf(String(value).toLowerCase()) >= 0
}
type SortOrder = 'asc' | 'desc'

const LocationList = () => {
  const [searchText, setSearchText] = useState('')
  const [sortOrder, setSortOrder] = useState<SortOrder | undefined>()
  const locations = useLocations()
  const [filteredLocations, setFilteredLocations] = useState<Array<KeyValue>>(locations)
  useEffect(() => {
    setFilteredLocations(locations.filter(loc => hasObjValue(loc, searchText)))
  }, [locations, searchText])

  const sortLocation = (sortKey: string) => {
    const sortKeys = sortKey.split('.')
    var len = sortKeys.length;
    if(sortOrder === 'asc') { 
      setSortOrder('desc')
    } else {
      setSortOrder('asc')
    }
    const sortedLocation = [...filteredLocations].sort((a, b) => {
      var i = 0;
      while( i < len ) { 
        a = a[sortKeys[i]] as KeyValue; 
        b = b[sortKeys[i]] as KeyValue;
        i++; 
      }
      if (a < b) {
          return sortOrder === 'asc'? -1 : 1;
      } else if (a > b) {
        return sortOrder === 'asc'? 1 : -1;
      } else {
          return 0;
      }
    })
    setFilteredLocations(sortedLocation)
  }

  return (
    <div className="m-4">
      <SearchLocation searchText={searchText} setSearchText={setSearchText}/>
      <Table bordered hover>
        <thead>
          <LocationListHeader location={locations[0]} onSort={(key) => sortLocation(key)}/>
        </thead>
        <tbody>
          {filteredLocations.map((loc, index) => <LocationRow key={index} location={loc}/> )}
        </tbody>
      </Table>
    </div>
  )
}


const SearchLocation = ({searchText, setSearchText}: {searchText: string, setSearchText: (text: string) => void}) => {
  return  <div className="my-2">
    <Form.Control type="text" placeholder="Search Location"  value={searchText} onChange={ e => setSearchText(e.target.value)}/>
    </div>
}


const LocationListHeader = ({ location, onSort }: {location: KeyValue, onSort: (key:string) => void}) => {

  return <tr>
    {
      !!location && Object.keys(location).map((key) => {
        const value = location[key as keyof KeyValue]
        if(typeof value === 'string' || typeof value === 'number'){
          return <th role="button" key={key} onClick={() => onSort(key)}>{key}</th>
        }else{
          return Object.keys(location[key as keyof KeyValue]).map(nestedKey=> <th role="button" key={`${key}.${nestedKey}`} onClick={() => onSort(`${key}.${nestedKey}`)}>{nestedKey}</th>)
        }
    })
    }
  </tr>
}

const LocationRow = ({ location }: {location: KeyValue}) => {
  return <tr>
    {
      Object.keys(location).map((key) => {
        const value = location[key as keyof KeyValue]
        if(typeof value === 'string' || typeof value === 'number'){
          return <td key={value}>{value}</td>
        }else{
          const obj = location[key as keyof KeyValue] as KeyValue
          return Object.keys(obj).map(nestedKey=> {
            const nestedValue = obj[nestedKey as keyof (KeyValue)] as string
            return <td key={`${key}.${nestedKey}.${nestedValue}`}>{nestedValue}</td>
          })
        }
    })
    }
  </tr>
}

export default LocationList


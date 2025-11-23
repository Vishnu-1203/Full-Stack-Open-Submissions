import { useEffect, useState } from 'react'
import DisplayCountry from './DisplayCountry'
import axios from "axios"



const App = () => {

  const [search,setSearch]=useState(null)
  const [selection,setSelection]=useState([])
  const [countries,setCountries]=useState([])
  useEffect(
    ()=>{
      axios.get("https://studies.cs.helsinki.fi/restcountries/api/all").then(res=>{
      setCountries(res.data)
    }).catch(e=>{
      console.log("Error fetching countries ",e)
    })
    }
    
    ,[])

  const handleCountryChange=(e)=>{
    setSearch(e.target.value)
    setSelection(countries.filter(country =>
    country.name.common.toLowerCase().includes((e.target.value).toLowerCase())))
    
  }
  const viewCountry=(country)=>{
    console.log(country)
    setSelection([country])

  }
  
  
  return (
    <div>
      find countries:<input text={search} onChange={handleCountryChange}/>
      <DisplayCountry selected={selection} viewCountry={viewCountry}/>
    </div>

  )
}

export default App
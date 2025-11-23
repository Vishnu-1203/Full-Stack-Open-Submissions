import React,{useState,useEffect} from 'react'
import axios from "axios"

const Weather = ({lat,lon}) => {
  const [weather,setWeather]=useState(null)
  useEffect(() => {
  axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
  .then(res=>{
        setWeather(res.data)
        console.log(res.data)
  }).catch(e=>console.log("weather fetching error",e))

},
   [lat, lon])

  if(!weather)return null;
    const iconUrl = `https://openweathermap.org/img/wn/01d@2x.png`
    console.log(iconUrl,"url")
  return (
    <div>

        Temperature- {weather.current_weather.temperature} Celsius<br/>
        <img src={iconUrl}/><br/>
        Wind Speed- {weather.current_weather.windspeed} M/s
        
    </div>
  )
}

export default Weather
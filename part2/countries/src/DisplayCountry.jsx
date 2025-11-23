import Weather from "./weather"


const DisplayCountry = ({selected,viewCountry}) => {
  if(selected.length>10){
    return <><br/>Too many matches,specify another filter</>
  }
  else if(selected.length>1){  
    return (
        <div>
            {selected.map((country)=>{
                return <div key={country.cca3}>{country.name.common} <button onClick={()=>viewCountry(country)}>View</button><br/></div>
            })}
        </div>
    )
    }
  else if(selected.length==1){
    return (
        <div>
            {selected.map((country)=>{
                const imageUrl=country.flags.png
                const lat = country.latlng[0]
                const lon = country.latlng[1]
                console.log("coooords",lat,lon)
                return <div key={country.cca3}>
                    <h1>{country.name.common}</h1>
                    Capital {country.capital}<br/>
                    Area {country.area}

                    <h2>Languages</h2>
                    <ul>
                        {Object.values(country.languages).map(lang => 
                            <li key={lang}>{lang}</li>
                        )}
                    </ul>
                    <img src={imageUrl}/>
                    <h3>Weather in {country.capital}</h3>
                    <Weather lat={lat} lon={lon}/>
                </div>
            })}
        </div>
    )

  }
  else{
    return (<><br/>No Match!</>)
  }

}

export default DisplayCountry
import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import WeathersCard from './components/WeathersCard'

function App() {

  const [coords, setCoords]=useState()
  const [weather, setweather] = useState()
  const [temp, setTemp] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [showMessage, setShowMessage] = useState(false)


  useEffect(()=>{     
    
    setTimeout(()=>{
      setShowMessage(true)
    }, 3000)

    const success = pos=>{
      
      setCoords({
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      })

    }

    const error=() =>{
      setHasError(true)
      setIsLoading(false) 
    }
    navigator.geolocation.getCurrentPosition(success, error) 
                                                    
  },[])

  useEffect(()=>{
    if(coords){  // recien cuando se haya datos de coordenadas se ejecuta esto
      const API_KEY = 'dbeae5b7dcf2b3f39d4e83f3df7f339c'
      const url=`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`
      axios.get(url)  
       .then(res=>{
        setweather(res.data)
        const celsius = (res.data.main.temp -273.15).toFixed(1) 
        const fahrenheit = (celsius*9/5 +32).toFixed(1)
        setTemp({celsius: celsius, fahrenheit: fahrenheit})
      })
       .catch(err=> console.log(err))
       .finally( ()=>setIsLoading(false))
    }
  },[coords])

  return (
    <div className="app">
      {
        isLoading? 
        (
          <div>
             <div class="container">
               <div class="cargando">
                 <div class="pelotas"></div>
                 <div class="pelotas"></div>
                 <div class="pelotas"></div>
                 <span class="texto-cargando">Loading...</span>
                 {
                  showMessage && <p style={{color: '#ccc'}}>Pleace, activate the location</p>
                 }
                 
               </div>
             </div>
             
          </div>
        )
         :(hasError? <h1 style={{ color: 'white', textAlign: 'center' }}> ❌ To get the weather of your city, please allow the location </h1>
         :<WeathersCard weatherProp={weather} tempProp={temp}/>)
      }
      
    </div>
  )
}

export default App
import React, { useState } from 'react'
import './styles/WeatherCard.css'

const WeathersCard = ({weatherProp, tempProp}) => {

    const [isCelsius, setIsCelsius] = useState(true)

    const changeTemperature = ()=>{

        setIsCelsius(!isCelsius)
    }

  return (
    <article className='card'>

        <h1 className='card__title'>Weather App</h1>
        <h2 className='card__country'>{weatherProp?.name}, {weatherProp?.sys.country}</h2>
        <section className='card__body'>
            <div className='card__image-container'>
                <img className='card__image' src={weatherProp && `http://openweathermap.org/img/wn/${weatherProp.weather[0].icon}@4x.png`} alt="" />
            </div>
            <article className="info" > 
                <h3 className="info__title">{weatherProp?.weather[0].description}</h3>
                <ul className="info__list">
                    <li className="info__item">
                        <span className="info__label">Win speed </span>
                        <span className="info__value">{weatherProp?.wind.speed}m/s</span>
                    </li>
                    <li className="info__item">
                        <span className="info__label">Clouds </span>
                        <span className="info__value">{weatherProp?.clouds.all}%</span>
                    </li>
                    <li className="info__item">
                        <span className="info__label">Pressure </span>
                        <span className="info__value">{weatherProp?.main.pressure}hPa</span>
                    </li>

                    
                </ul>
            </article>
            
        </section>
        <h2 className="card__temp">{isCelsius? `${tempProp?.celsius}°C`: `${tempProp?.fahrenheit}°F`}</h2>
        <button className="card__btn" onClick={changeTemperature}>{isCelsius? "Change to °F": "Change to °C"}</button>

    </article>
  
  )
}

export default WeathersCard
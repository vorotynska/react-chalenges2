import React from "react"

export default function Weather(props){
    
    let icon 
    if (props.currentWeather.condition === "Sunny"){
      icon = "☀️"
    } else if (props.currentWeather.condition === "Rainy"){
      icon = "🌧️"
    } else {
      icon = "❄️"
    }
    
    return (
        <div className="weather-container">
        <div className="icon">{icon}</div>
        <div className="condition-text">{props.currentWeather.condition}</div>
        <div className="temp-range-container">
            <div className="low-temp-container">
              <p className="low-temp-data">{props.currentWeather.lowTemp}°</p>
              <p>Low</p>
            </div>
            <div className="high-temp-container">
              <p className="high-temp-data">{props.currentWeather.highTemp}°</p>
              <p>High</p>
            </div>
        </div>
        <div className="day">{props.currentWeather.day}</div>
      </div>
    )
}
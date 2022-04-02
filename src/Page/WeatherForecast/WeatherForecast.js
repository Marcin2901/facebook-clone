import React, {useEffect, useState} from "react";
import "./WeatherForecast.css";

function WeatherForecast() {
    const API_KEY = "82b8725a7a19404f8ee8ef52f88f69b7";
    const [currentForecast, setCurrentForecast] = useState();

    useEffect(() => {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${API_KEY}`)
                        .then(res => res.json())
                        .then(data => {
                            setCurrentForecast(data)
                            console.log(data)})
            }) } else {
                fetch(`http://api.openweathermap.org/geo/1.0/direct?q=Warsaw&appid=${API_KEY}`)
                .then(res => res.json())
                .then(data => console.log(data))
            }
        
         
    }, [])

    return (
        <div> 
            { currentForecast &&
            <div>
            <h1>{currentForecast.city.name}</h1>
            <h1>odczuwalna: {currentForecast.list[0].main.feels_like}</h1>
            <h1>temperatura: {currentForecast.list[0].main.temp}</h1>
            <h1>info: {currentForecast.list[0].weather[0].description}</h1>
            <h1>ikona: {currentForecast.list[0].weather[0].icon}</h1>
            </div>
            }
        </div>
    )
}
 {/* <h1>{currentForecast.list[0].dt_txt}</h1>
            <h1>odczuwalna: {currentForecast.list[0].main.feels_like}</h1>
            <h1>temperatura: {currentForecast.list[0].main.temp}</h1>
            <h1>info: {currentForecast.list[0].weather[0].description}</h1>
            <h1>ikona: {currentForecast.list[0].weather[0].icon}</h1> */}
// 5 13 21 29

export default WeatherForecast;
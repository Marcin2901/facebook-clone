import React, {useEffect, useState} from "react";
import FacebookItem from "../../Components/FacebookItem/FacebookItem";
import "./WeatherForecast.css";

function WeatherForecast() {
    const API_KEY = "82b8725a7a19404f8ee8ef52f88f69b7";
    const [currentForecast, setCurrentForecast] = useState();
    const [citys, setCitys] = useState();
    const [cityName, setCityName] = useState("");
    const date = new Date().getDay();

    useEffect(() => {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${API_KEY}&lang=pl`)
                        .then(res => res.json())
                        .then(data => {
                            setCurrentForecast(data);
                            setCitys([data]);
                        });
            }) } else {
                fetch(`http://api.openweathermap.org/geo/1.0/direct?q=Warsaw&appid=${API_KEY}`)
                .then(res => res.json())
                .then(data => console.log(data))
            }
    }, [])

    function getForecast() {
        fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric&lang=pl`)
        .then(res => res.json())
        .then(data => {
            setCurrentForecast(data);
            if(citys.filter(currentCity => currentCity.city.name === data.city.name).length === 0)
            setCitys(prevState => [...prevState, data]);
            setCityName("");
        })
        .catch((error) => console.log(error))
    }

    function handleChange(event) {
        console.log(event.target.value)
        setCityName(event.target.value)
    }

    function dayOfWeekAsInteger(day) {
        const days = ["Niedziela","Poniedziałek","Wtorek","Środa","Czwartek","Piątek","Sobota"]
        return days[day];
    }
    function getNextDayName(num) {
        return date + num === 7 ? num -7 : date + num
    }


    return (
        <div className="weather--forecast">
            <div className="weather--forecast__aside">
                <h2>Pogoda</h2>
                <input type="text" value={cityName} onChange={(e) => handleChange(e)} placeholder="Wyszukaj miejscowości"/>
                <button onClick={getForecast} >Szukaj</button>
                <h3>Miasta</h3>
                {citys &&
                citys.map((city, index) => <div key={index} onClick={() => setCurrentForecast(city)}><FacebookItem key={city.city.id} size="big"
                                         img={`http://openweathermap.org/img/wn/${city.list[0].weather[0].icon}@2x.png`}
                                         text={city.city.name}/></div>)
                }  
            </div> 
            <div className="weather--forecast__container">
            { currentForecast &&
                <div className="weather--forecast__box">
                    {currentForecast.cod !== "404" ?
                    <div className="weather--header">
                        <h1 className="weather-title">Pogoda w: {currentForecast.city.name}</h1>
                        <div className="weather-ditals">
                            <span className="temperature">{currentForecast.list[0].main.temp} &#8451;</span>
                            <div>
                                <p>odczuwalna: <span className="bold">{currentForecast.list[0].main.feels_like}</span></p>
                                <p>{currentForecast.list[0].weather[0].description}</p>
                            </div>
                        </div>
                        <div className="weather-houers--forecast">
                            <div className="weather-houer">
                                <img src={`http://openweathermap.org/img/wn/${currentForecast.list[0].weather[0].icon}@2x.png`} alt={"example"}/>
                                <span className="bold">{currentForecast.list[0].main.temp} &#8451;</span>
                                <span className="bold">00:00</span>
                            </div>
                            <div className="weather-houer">
                                <img src={`http://openweathermap.org/img/wn/${currentForecast.list[2].weather[0].icon}@2x.png`} alt={"example"}/>
                                <span className="bold">{currentForecast.list[2].main.temp} &#8451;</span>
                                <span className="bold">06:00</span>
                            </div>
                            <div className="weather-houer">
                                <img src={`http://openweathermap.org/img/wn/${currentForecast.list[3].weather[0].icon}@2x.png`} alt={"example"}/>
                                <span className="bold">{currentForecast.list[3].main.temp} &#8451;</span>
                                <span className="bold">12:00</span>
                            </div>
                            <div className="weather-houer">
                                <img src={`http://openweathermap.org/img/wn/${currentForecast.list[4].weather[0].icon}@2x.png`} alt={"example"}/>
                                <span className="bold">{currentForecast.list[4].main.temp} &#8451;</span>
                                <span className="bold">15:00</span>
                            </div>
                            <div className="weather-houer">
                                <img src={`http://openweathermap.org/img/wn/${currentForecast.list[5].weather[0].icon}@2x.png`} alt={"example"}/>
                                <span className="bold">{currentForecast.list[5].main.temp} &#8451;</span>
                                <span className="bold">18:00</span>
                            </div>
                            <div className="weather-houer">
                                <img src={`http://openweathermap.org/img/wn/${currentForecast.list[6].weather[0].icon}@2x.png`} alt={"example"}/>
                                <span className="bold">{currentForecast.list[6].main.temp} &#8451;</span>
                                <span className="bold">21:00</span>
                            </div>
                        </div>
                        <div className="weather-day--forecast">
                            <div className="weather-day--item">
                                <img className="weather-day--img"
                                     src={`http://openweathermap.org/img/wn/${currentForecast.list[7].weather[0].icon}@2x.png`} 
                                     alt={"example"}
                                />
                                <div className="weather-day--info">
                                    <div className="weather-day--header">
                                        <p className="bold">{dayOfWeekAsInteger(getNextDayName(1))}</p>
                                        <p>{currentForecast.list[7].weather[0].description}</p>
                                    </div>
                                    <span className="weather-day--temperature bold">{currentForecast.list[7].main.temp} &#8451;</span>
                                </div>
                            </div>
                            <div className="weather-day--item">
                                <img className="weather-day--img"
                                     src={`http://openweathermap.org/img/wn/${currentForecast.list[15].weather[0].icon}@2x.png`} 
                                     alt={"example"}
                                />
                                <div className="weather-day--info">
                                    <div className="weather-day--header">
                                        <p className="bold">{dayOfWeekAsInteger(getNextDayName(2))}</p>
                                        <p>{currentForecast.list[15].weather[0].description}</p>
                                    </div>
                                    <span className="weather-day--temperature bold">{currentForecast.list[15].main.temp} &#8451;</span>
                                </div>
                            </div>
                            <div className="weather-day--item">
                                <img className="weather-day--img"
                                     src={`http://openweathermap.org/img/wn/${currentForecast.list[23].weather[0].icon}@2x.png`} 
                                     alt={"example"}
                                />
                                <div className="weather-day--info">
                                    <div className="weather-day--header">
                                        <p className="bold">{dayOfWeekAsInteger(getNextDayName(3))}</p>
                                        <p>{currentForecast.list[23].weather[0].description}</p>
                                    </div>
                                    <span className="weather-day--temperature bold">{currentForecast.list[23].main.temp} &#8451;</span>
                                </div>
                            </div>
                            <div className="weather-day--item">
                                <img className="weather-day--img"
                                     src={`http://openweathermap.org/img/wn/${currentForecast.list[31].weather[0].icon}@2x.png`} 
                                     alt={"example"}
                                />
                                <div className="weather-day--info">
                                    <div className="weather-day--header">
                                        <p className="bold">{dayOfWeekAsInteger(getNextDayName(7))}</p>
                                        <p>{currentForecast.list[31].weather[0].description}</p>
                                    </div>
                                    <span className="weather-day--temperature bold">{currentForecast.list[31].main.temp} &#8451;</span>
                                </div>
                            </div>
                        </div>
                    </div> :
                    <h1 className="error">Nie znaleziono podanego miasta</h1>
                    }
                </div>
            }
            </div>
        </div>
    )
}

export default WeatherForecast;
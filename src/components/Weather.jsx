import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
// eslint-disable-next-line no-unused-vars
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
const Weather = () => {
  console.log(import.meta.env.VITE_APP_ID);
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);
  const allIcon = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "05d": rain_icon,
    "05n": rain_icon,
    "06d": rain_icon,
    "07n": rain_icon,
    "07d": rain_icon,
    "10d": snow_icon,
    "10dn": snow_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };
  const search = async (city) => {
    if (city === "") {
      alert("enter city name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        alert(data.message);
        return;
      }
      const icon = allIcon[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        localtion: data.name,
        icon: icon,
      });
    } catch (error) {
      console.log(error);
      setWeatherData(false);
    }
  };
  useEffect(() => {
    search("");
  }, []);
  return (
    <div className="weather">
      <div className="searchbar">
        <input
          ref={inputRef}
          type="text"
          placeholder="search"
          className="searchbar-input"
        />
        <img
          src={search_icon}
          alt=""
          onClick={() => {
            search(inputRef.current.value);
          }}
        />
      </div>
      {weatherData ? (
        <>
          <img src={weatherData.icon} alt="" className="weather-icon" />
          <p className="temperature">{weatherData.temperature}</p>
          <p className="location">{weatherData.localtion}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="" />
              <div>
                <p>{weatherData.humidity}</p>
                <span>Humidity</span>
              </div>
            </div>

            <div className="col">
              <img src={wind_icon} alt="" />
              <div>
                <p>{weatherData.windSpeed}</p>
                <span>windy</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Weather;

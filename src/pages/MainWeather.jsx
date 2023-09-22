import { useEffect, useState } from "react";
import { HourlyTempCard } from "../cmps/HourlyTempCard";

export const MainWeather = ({ weatherData, fetchCurrLocationData }) => {
  console.log(weatherData);
  const desiredHours = [6, 9, 12, 15, 18, 21];
  const icons = [
    { icon: "temp", title: "real feel", data: weatherData.current.feelslike_c },
    {
      icon: "wind",
      title: "wind",
      data: `${weatherData.current.wind_kph} Km/h`,
    },
    {
      icon: "rain",
      title: "Chance of rain",
      data: `${weatherData.forecast.forecastday[0].day.daily_chance_of_rain}%`,
    },
    {
      icon: "sun",
      title: "UV index",
      data: `${weatherData.current.uv}`,
    }
  ];


  return (
    <section className="main-weather-sec debug flex">
      <div className="flex column w100">
        <div className="city-sec flex  ">
          <div className="flex column w100 h100 space-between">
            <div className="flex column">
              <div className="location-heading flex ">
                <h1 className="city larger">
                  {weatherData ? weatherData.location.name : add.city},
                </h1>
                <h1 className="state smaller">
                  {weatherData ? weatherData.location.country : add.country}
                </h1>
              </div>
              <h3 className="humidity">
                Humidity stands at {weatherData.current.humidity}
              </h3>
            </div>
            <h1 className="degrees">{weatherData.current.temp_c}&deg;C</h1>
          </div>
          <div className="icon-sec flex alig-center justify-center">
            <img
              className="icon"
              src={weatherData.current.condition.icon}
              alt=""
            />
          </div>
        </div>
        <div className="hourly-forecast ">
          <h4 className="title">TODAYS FORECAST</h4>
          <div className="hourly-cards-layout flex">
            {weatherData.forecast.forecastday[0].hour.map((hourData, idx) => {
              if (desiredHours.includes(idx)) {
                return <HourlyTempCard key={idx} weatherData={hourData} />;
              }
              return null;
            })}
          </div>
        </div>

        <div className="forecast-details">
          <h1 className="title">AIR CONDITIONS</h1>
          <div className="air-condition-details-sec flex wrap space-between">
            {icons.map((icon) => {
              const iconSrc = `src\\assets\\icons\\weather-icons\\${icon.icon}.png`;
              return (
                <div className="detail-sec flex ">
                  <img className="s-icon" src={iconSrc} alt="" />
                  <div className="icon-title flex column">
                    <h5 className="icon-title">{icon.title}</h5>
                    <h5 className="icon-data">{icon.data}</h5>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="weekly-weather-sec flex column"></div>
    </section>
  );
};

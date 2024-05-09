import { useEffect, useState } from "react";
import { HourlyTempCard } from "../cmps/HourlyTempCard";
import { utilService } from "../services/util.service";

export const MainWeather = ({
  weatherData,
  fetchCurrLocationData,
  weeklyForecast,
}) => {
  const [isSeeMore, setIsSeeMore] = useState(false);
  console.log(weatherData.forecast.forecastday[0].hour[getCurrentHour()]);
  const desiredHours = [6, 9, 12, 15, 18, 21];
  const icons = [
    {
      icon: "temp",
      title: "real feel",
      data: weatherData.current.feelslike_c + "\u00B0",
    },
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
    },
  ];

  function getCurrentHour() {
    const date = new Date();
    const currentHour = date.getHours();
    return currentHour;
  }

  function getFilteredForecat() {
    let currentHour = getCurrentHour();
    const filteredForecast = [];
    for (var i = 0; i < 3; i++) {
      filteredForecast.push(
        weatherData.forecast.forecastday[0].hour[currentHour]
      );
      currentHour += 3;
      if (currentHour > 24) currentHour = currentHour - 24;
    }
    return filteredForecast;
  }

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
        {isSeeMore ? null : (
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
        )}

        <div className="forecast-details relative">
          <button
            className="see-more-btn"
            onClick={() => setIsSeeMore(!isSeeMore)}
          >
            {isSeeMore ? "Show less" : "Show more"}
          </button>
          <h1 className="title">AIR CONDITIONS</h1>
          <div className="air-condition-details-sec flex wrap space-between">
            {icons.map((icon, key) => {
              const iconSrc = `src\\assets\\icons\\weather-icons\\${icon.icon}.png`;
              return (
                <div className="detail-sec flex ">
                  <img className="s-icon" src={iconSrc} alt="" />
                  <div className="icon-title flex column">
                    <h5 className="icon-title">{icon.title}</h5>
                    <h5 className="icon-data bolder">{icon.data} </h5>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="weekly-forecast-container flex column">
        {!isSeeMore ? null : (
          <div className="todays-forecast-sec">
            <h3 className="title">Today's Forecast</h3>
            <div className="hourly-day-forecast flex">
              {getFilteredForecat().map((forecast, idx) => {
                return <HourlyTempCard key={idx} weatherData={forecast} />;
              })}
            </div>
          </div>
        )}

        <div className="weekly-weather-sec flex column">
          <h3 className="title">7 Day Forecast</h3>
          <div className="weekly-forcast-form">
            {weeklyForecast.map((info) => {
              const iconSrc = `http://openweathermap.org/img/w/${info.weather[0].icon}.png`;
              return (
                <div className="daily-forecast flex space-between">
                  <h5>{utilService.getDayOfWeek(info.dt)}</h5>
                  <div className="icon-sec flex align-center">
                    <img className="icon" src={iconSrc} alt="" />
                    <h3>{info.weather[0].main}</h3>
                  </div>
                  <h5>18/11</h5>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

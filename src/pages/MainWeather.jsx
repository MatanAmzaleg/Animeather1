import { useEffect, useState } from "react";
import { HourlyTempCard } from "../cmps/HourlyTempCard";

export const MainWeather = ({ weatherData, fetchCurrLocationData }) => {
  console.log(weatherData);
  const desiredHours = [6, 9, 12, 15, 18, 21];

  const [add, setAdd] = useState("");
  // `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      console.log(latitude, longitude);
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=en`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => setAdd(data.address));
    });
  }, []);

  return (
    <section className="main-weather-sec debug flex">
      <div className="flex column w100">
        <div className="city-sec flex debug ">
          <div className="flex column w100 h100">
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
        <div className="hourly-forecast debug">
          <h4 className="title">TODAYS FORECAST</h4>
          <div className="hourly-cards-layout flex">

          {weatherData.forecast.forecastday[0].hour.map((hourData, idx) => {
            if (desiredHours.includes(idx)) {
              return <HourlyTempCard key={idx} weatherData={hourData} />;
            }
            return null; // Return null for hours not in desiredHours
          })}
          </div>
        </div>
      </div>
      <div className="weekly-weather-sec flex column"></div>
    </section>
  );
};

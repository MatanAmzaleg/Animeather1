import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { MainWeather } from "./pages/MainWeather.jsx";
import { SearchBar } from "./cmps/SearchBar";
import { Sidebar } from "./cmps/Sidebar.jsx";
import "./assets/styles/main.scss";
import { weatherService } from "./services/weahter.service";
import Skeleton from "@mui/material/Skeleton";

function App() {
  const [weatherDetails, setWeatherDetails] = useState("");
  const [input, setInput] = useState("");

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        console.log("good");
        navigator.geolocation.getCurrentPosition(async (pos) => {
          try {
            const { latitude, longitude } = pos.coords;
            console.log(latitude, longitude);
            const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=en`;
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error(`Failed to fetch data: ${response.statusText}`);
            }
            const data = await response.json();
            setInput(data.address.city);
            console.log(input);
            const weatherData = await weatherService.getWeatherDetails(input);
            setWeatherDetails(weatherData);
          } catch (error) {
            console.log("Error fetching data:", error);
            setTimeout(() =>{
              fetchCurrLocationData({city:'barcelona'})
            },2500)
          }
        });
        console.log(input);
      } catch (err) {
        console.log("Error getting geolocation:", err);
      }
    };

    fetchLocationData();
  }, []);

  useEffect(() => {
    let debounceTimeout;
    if (!input) return;
    const fetchData = async () => {
      try {
        const weatherData = await weatherService.getWeatherDetails(input);
        setWeatherDetails(weatherData);
      } catch (err) {
        console.log("Error fetching weather data:", err);
      }
    };

    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(fetchData, 1500);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [input]);

  const fetchCurrLocationData = async (add) => {
    console.log(add);
    const weatherData = await weatherService.getWeatherDetails(add.city);
    setWeatherDetails(weatherData);
  };


  return (
    <>
      <section className="main-sec flex">
        {weatherDetails ? (
          <Sidebar></Sidebar>
        ) : (
          <Skeleton
            sx={{ bgcolor: "#2b3a50", borderRadius: "20px" }}
            variant="rounded"
            width={"17%"}
            height={"100%"}
          />
        )}
        <div className="info-sec flex column">
          {weatherDetails ? (
            <SearchBar setInput={setInput} input={input}></SearchBar>
          ) : (
            <Skeleton
              sx={{ bgcolor: "#2b3a50", borderRadius: "15px" }}
              variant="rounded"
              width={"70%"}
              height={"5vh"}
            />
          )}
          <Routes>
            <Route
              path="/"
              element={
                weatherDetails ? (
                  <MainWeather
                    fetchCurrLocationData={fetchCurrLocationData}
                    weatherData={weatherDetails}
                    setWeatherDetails={setWeatherDetails}
                  />
                ) : (
                  <Skeleton
                    sx={{
                      bgcolor: "#2b3a50",
                      borderRadius: "20px",
                      alignSelf: "flex-end",
                    }}
                    variant="rounded"
                    width={"40%"}
                    height={"100%"}
                  />
                )
              }
            ></Route>
          </Routes>
        </div>
      </section>
    </>
  );
}

export default App;

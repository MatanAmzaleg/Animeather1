


export const HourlyTempCard = (hourData) => {
    console.log(hourData);
    return(
        <div className="hourly-temp-card-sec flex column w100  align-center">
            <h1>{hourData.weatherData.time.split(" ")[1]}</h1>
            <img src={hourData.weatherData.condition.icon} alt="" />
            <h1>{hourData.weatherData.temp_c}&deg;C</h1>
        </div>
    )
}
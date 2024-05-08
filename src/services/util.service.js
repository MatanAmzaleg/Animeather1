export const utilService = {
  getDate,
  weatherDataFormat,
  getDayOfWeek,
};

function getDate() {
  const date = Date.now;
  console.log(date);
}

function weatherDataFormat(data) {
  const relevantData = data.data;
  let formattedData = {
    location: relevantData.location,
    tempC: relevantData.current.temp_c,
    tempF: relevantData.current.temp_f,
    uv: relevantData.current.uv,
    visKm: relevantData.current.vis_km,
    visMiles: relevantData.current.vis_miles,
    windKph: relevantData.current.wind_kph,
    windMph: relevantData.current.wind_mph,
    humidity: relevantData.current.humidity,
    feelsLikeC: relevantData.current.feelslike_c,
    feelsLikeF: relevantData.current.feelslike_f,
    condition: relevantData.current.condition.text,
  };
}

function getDayOfWeek(timestamp) {
  console.log(timestamp);
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var a = new Date(timestamp*1000);
  var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  return days[a.getDay()]
}

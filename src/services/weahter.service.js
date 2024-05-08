import axios from 'axios'
import { utilService } from './util.service'

const key = import.meta.env.VITE_WEATHER_KEY
const key2 = import.meta.env.VITE_OPENWEATHER_KEY
const date = utilService.getDate()

export const weatherService = {
  getWeatherDetails,
  getWeeklyForecast,
}


async function getWeatherDetails (query){
  try{
  console.log(`key is ${key}`);
  console.log(`http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${query}&days=7&dt=${date}&hour=18,21,00`);
   const data = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${query}&days=7&dt=${date}&hour=18,21,00`)
 console.log(data);
   return data.data
}
catch(err){
    throw err
}
}
async function getWeeklyForecast (query){
  try{
   const data = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=${key2}`)
 console.log(data);
   return data.data
}
catch(err){
    throw err
}
}
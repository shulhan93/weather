import Weather from './js/app';
import './sass/main.scss';

const apiKey = 'c79bb5030a0347ab8ec73629232007';
const city = 'belarus';
const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=4&aqi=no&alerts=no`;

const weather = new Weather(url);
console.log(weather);

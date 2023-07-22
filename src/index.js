// import Weather from './js/app';
import Weather from './js/app';
import getCoords from './js/helpers/getCoords';
import './sass/main.scss';

const init = async () => {
  const { coords } = await getCoords();

  const apiKey = 'c79bb5030a0347ab8ec73629232007';
  const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${coords.latitude},${coords.longitude}&days=4&aqi=no&alerts=no`;

  const weather = new Weather(url);
  console.log(weather);
};

init();

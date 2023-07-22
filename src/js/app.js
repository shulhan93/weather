import createElement from './helpers/createElement';
import getCurrentDate from './helpers/getCurrentDate';

export default class Weather {
  #data;

  constructor(url) {
    this.url = url;
    this.#data = this.fetchData(url);
  }

  async fetchData(url) {
    const response = await fetch(url);
    const dataWeather = await response.json();

    this.#data = await dataWeather;

    if (this.#data) {
      this.render();
    }
  }

  render() {
    const app = createElement('div', { className: 'app' });

    document.body.append(app);

    const appWrapper = createElement('div', { className: 'app__wrapper' });

    const city = createElement('div', {
      className: 'app__city',
      textContent: `${this.#data.location.name}`,
    });

    const date = createElement('div', {
      className: 'app__date',
      textContent: `${getCurrentDate('full', this.#data.location.localtime)}`,
    });

    const tempWrapper = createElement('div', {
      className: 'app__temp-wrapper',
    });

    const temp = createElement('div', {
      className: 'app__temp',
      textContent: `${this.#data.current.temp_c}`,
    });

    const tempInner = createElement('div', {
      className: 'app__temp-inner',
    });

    const image = new Image();
    image.src = `${this.#data.current.condition.icon}`;

    const weatherIcon = createElement('div', {
      className: 'app__weather-icon',
    });
    weatherIcon.append(image);

    const weatherText = createElement('div', {
      className: 'app__weather-text',
      textContent: `${this.#data.current.condition.text}`,
    });

    tempInner.append(weatherIcon, weatherText);
    tempWrapper.append(temp, tempInner);

    const appIndicators = createElement('div', {
      className: 'app__indicators',
    });

    const createIndicator = (title, data) => {
      const dataIndicators = {
        wind: {
          icon: '<i class="ri-windy-fill"></i>',
          unit: 'km/h',
        },
        humidity: {
          icon: ' <i class="ri-water-percent-line"></i>',
          unit: '%',
        },
        visibility: {
          icon: '<i class="ri-eye-line"></i>',
          unit: 'km',
        },
      };

      const indicator = createElement('div', {
        className: 'app__indicator',
      });

      const indicatorIcon = createElement('div', {
        className: 'app__indicator-icon',
        innerHTML: `${dataIndicators[title].icon}`,
      });

      const indicatorData = createElement('div', {
        className: 'app__indicator-data',
        textContent: `${data}${dataIndicators[title].unit}`,
      });

      const indicatorTitle = createElement('div', {
        className: 'app__indicator-title',
        textContent: `${title}`,
      });

      indicator.append(indicatorIcon, indicatorData, indicatorTitle);
      console.log(indicator);
      return indicator;
    };

    const wind = createIndicator('wind', this.#data.current.wind_kph);
    const humidity = createIndicator('humidity', this.#data.current.humidity);
    const visibility = createIndicator('visibility', this.#data.current.vis_km);

    appIndicators.append(wind, humidity, visibility);

    const forecastWrapper = createElement('div', {
      className: 'app__forecast-wrapper',
    });

    const forecastTitle = createElement('div', {
      className: 'app__forecast-title',
    });

    const forecast = createElement('div', {
      className: 'app__forecast',
    });

    const createForecastDay = (obj) => {
      const forecastDay = createElement('div', {
        className: 'app__forecast-day',
      });

      const forecastTemp = createElement('div', {
        className: 'app__forecast-temp',
        textContent: `${Math.ceil(obj.day.maxtemp_c)}`,
      });

      const forecastIcon = createElement('div', {
        className: 'app__forecast-icon',
      });

      const iconWeather = new Image();
      iconWeather.src = obj.day.condition.icon;

      forecastIcon.append(iconWeather);
      console.log(obj.date_epoch);
      const forecastDate = createElement('div', {
        className: 'app__forecast-date',
        textContent: getCurrentDate('sm', obj.date),
      });

      forecastDay.append(forecastTemp, forecastIcon, forecastDate);

      return forecastDay;
    };

    this.#data.forecast.forecastday.forEach((day) => {
      forecast.append(createForecastDay(day));
    });

    forecastWrapper.append(forecastTitle, forecast);

    appWrapper.append(city, date, tempWrapper, appIndicators, forecastWrapper);

    app.append(appWrapper);
  }
}

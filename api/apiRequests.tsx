import {
  WEATHER_APP_KEY,
  BASE_URL_CITY_WEATHER,
  BASE_URL_AUTOCOMPLETE,
  DATA_SERVICE_KEY,
  BASE_URL_FORECAST,
  BASE_URL_GEOLOCATION,
} from '@env';
import axios from 'axios';

export const getCurrentCityWeather = async (city: string) => {
  try {

    console.log(`${BASE_URL_CITY_WEATHER}?q=${city}&appid=${WEATHER_APP_KEY}`);
    const response = await axios.get(
      `${BASE_URL_CITY_WEATHER}?q=${city}&appid=${WEATHER_APP_KEY}`,
    );
    if (response.data && response.data !== null) {
      return response.data;
    } else {
      console.error('Unable to fetch data.');
      return null;
    }
  } catch (error) {
    console.error('Error in getCurrentCityWeather:', error);
    throw error;
  }
};

export const locationAutocomplete = async (city: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL_AUTOCOMPLETE}?apikey=${DATA_SERVICE_KEY}&q=${city}`,
    );
    if (response.data && response.data !== null) {
      return response.data;
    } else {
      console.error('Unable to fetch data.');
      return null;
    }
  } catch (error) {
    console.error('Error in locationAutocomplete:', error);
    throw error;
  }
};

export const getFiveDaysForecast = async (cityId: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL_FORECAST}/${cityId}?apikey=${DATA_SERVICE_KEY}`,
    );
    if (response.data && response.data !== null) {
      return response.data;
    } else {
      console.error('Unable to fetch data.');
      return null;
    }
  } catch (error) {
    console.error('Error in getFiveDaysForecast:', error);
    throw error;
  }
};

export const getUserLocation = async (lat, long) => {
  console.log(`${BASE_URL_GEOLOCATION}${DATA_SERVICE_KEY}&q=${lat},${long}`);
  try {
    const response = await axios.get(
      `${BASE_URL_GEOLOCATION}${DATA_SERVICE_KEY}&q=${lat},${long}`,
    );
    if (response.data && response.data !== null) {
      return response.data;
    } else {
      console.error('Unable to fetch data.');
      return null;
    }
  } catch (error) {
    console.error('Error in getUserLocation:', error);
    throw error;
  }
};

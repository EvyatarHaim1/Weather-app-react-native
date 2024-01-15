import store from '../store';
import {
  getCurrentCityWeather,
  getFiveDaysForecast,
  locationAutocomplete,
  getUserLocation,
} from '../../api/apiRequests';
import {
  GET_CURRENT_WEATHER,
  FETCH_LOCATION_AUTOCOMPLETE,
  GET_FIVE_DAYS_FORECAST,
} from '../reducers/weather';

export const get_city_weather = async (city: string) => {
  try {
    const currentCityWeather = await getCurrentCityWeather(city);
    store.dispatch({
      type: GET_CURRENT_WEATHER,
      payload: currentCityWeather,
    });
  } catch (err) {
    console.log('Cannot load weather', err);
    throw err;
  }
};

export const fetch_Location_Autocomplete = async (city: string) => {
  try {
    const autoCompleteList = await locationAutocomplete(city);
    store.dispatch({
      type: FETCH_LOCATION_AUTOCOMPLETE,
      payload: autoCompleteList,
    });
  } catch (err) {
    console.log('Cannot load weather', err);
    throw err;
  }
};

export const get_fiveDays_forecast = async (cityId: string) => {
  try {
    const fiveDaysForcast = await getFiveDaysForecast(cityId);
    store.dispatch({
      type: GET_FIVE_DAYS_FORECAST,
      payload: fiveDaysForcast?.DailyForecasts,
    });
  } catch (error) {
    console.error('Error in getFiveDaysForecast:', error);
    throw error;
  }
};

export const get_user_location = async (lat, long) => {
  try {
    const res = await getUserLocation(lat, long);
    console.log(res?.LocalizedName);
    get_city_weather(res?.LocalizedName);
  } catch (err) {
    console.log('Cannot load weather', err);
    throw err;
  }
};

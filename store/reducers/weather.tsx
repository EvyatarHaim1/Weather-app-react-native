export const GET_CURRENT_WEATHER = 'GET_CURRENT_WEATHER';
export const SET_WEATHER = 'SET_WEATHER';
export const FETCH_LOCATION_AUTOCOMPLETE = 'FETCH_LOCATION_AUTOCOMPLETE';
export const GET_FIVE_DAYS_FORECAST = 'GET_FIVE_DAYS_FORECAST';

const initialState = {
  city: 'tel aviv',
  cityId: '215854',
  locationKey: '215854',
  temperature: '',
  humidity: '',
  windSpeed: '',
  weatherStatus: '',
  cities: [],
  forecast: [],
};

const weatherReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_CURRENT_WEATHER:
      return {
        ...state,
        city: action.payload.name,
        temperature: parseFloat(
          (action?.payload?.main?.temp - 273.15)?.toFixed(3),
        )?.toString(), // Convert to Celsius, format to 3 decimal places, and convert to string
        humidity: action.payload.main.humidity,
        weatherStatus: action.payload.weather[0].description,
        windSpeed: action.payload.wind.speed,
        cityId: action.payload.id,
      };
    case SET_WEATHER:
      return {
        ...state,
        weather: action.payload,
      };

    case FETCH_LOCATION_AUTOCOMPLETE:
      return {
        ...state,
        cities: action.payload,
      };
    case GET_FIVE_DAYS_FORECAST:
      return {
        ...state,
        forecast: action.payload,
      };
    default:
      return state;
  }
};

export default weatherReducer;

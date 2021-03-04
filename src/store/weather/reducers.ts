import { FETCH_WEATHER, WeatherActionTypes, WeatherState } from "./types"

const initialState: WeatherState = {
  coord: {
    lat: 0,
    lon: 0,
  },
  weather: [
    {
      id: 0,
      main: '',
      description: '',
      icon: '',
    }
  ],
  main: {
    temp: 0,
    feels_like: 0,
    temp_min: 0,
    temp_max: 0,
    pressure: 0,
    humidity: 0,
  },
  visibility: 0,
  wind: {
    speed: 0,
    deg: 0,
  },
  clouds: {
    all: 0,
  },
  sys: {
    type: 0,
    id: 0,
    message: 0,
    country: '',
    sunrise: 0,
    sunset: 0,
  },
  name: '',
}

const reducer = (state = initialState, action: WeatherActionTypes) => {
  switch (action.type) {
    case FETCH_WEATHER:
      return { ...action.payload };
    default:
      return state;
  }
}

export default reducer;
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "..";
import { FETCH_WEATHER } from "./types";
import Constants from 'expo-constants';
import { setErrorMessage, toggleLoading } from "../app/actions";

export const fetchWeather = (
  lat: number,
  lon: number
): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
  try {
    dispatch(toggleLoading(true));
    const currentWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${Constants.manifest.extra.open_weather_api_key}`);
    const toJSON = await currentWeather.json();

    dispatch({ type: FETCH_WEATHER, payload: toJSON });
    dispatch(toggleLoading(false));
  } catch (error) {
    dispatch(toggleLoading(false));
    dispatch(setErrorMessage(error.message, 5));
  }
}

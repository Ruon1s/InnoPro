<<<<<<< HEAD
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

    dispatch(setErrorMessage(error.message));

    setTimeout(() => {
      dispatch(setErrorMessage(undefined));
    }, 3000);
  }
}
=======
import {Action} from "redux";
import {ThunkAction} from "redux-thunk";
import {RootState} from "..";
import {FETCH_WEATHER} from "./types";

export const fetchWeather = (
    lat?: number,
    lon?: number
): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
    try {
        const currentWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat ? lat : '60.205490'}&lon=${lon ? lon : '24.655899'}&units=metric&appid=8c77f2fc166c90f4464bc9df8e6b73cd`);
        const toJSON = await currentWeather.json();

        dispatch({type: FETCH_WEATHER, payload: toJSON});
    } catch (error) {
        console.log(`Fetch Weather error: ${error.message}`);
    }
};
>>>>>>> lauri

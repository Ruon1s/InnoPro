import {ThunkAction} from "redux-thunk";
import {RootState} from "../index";
import {Action} from "redux";
import {setErrorMessage, toggleLoading} from "../app/actions";
import {FETCH_EVENTS} from "./types";

export const fetchEvents = (
    lat: number,
    lon: number
): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
    try {
        dispatch(toggleLoading(true));
        const eventsToday = await fetch(`https://api.hel.fi/linkedevents/v1/event/?bbox=${lon - 0.002},${lat - 0.002},${lon + 0.002},${lat + 0.002}`);
        const toJSON = await eventsToday.json();
        dispatch({type: FETCH_EVENTS, payload: toJSON});
        dispatch(toggleLoading(false));
    } catch (error) {
        dispatch(toggleLoading(false));
        dispatch(setErrorMessage(error.message, 5));
    }
};

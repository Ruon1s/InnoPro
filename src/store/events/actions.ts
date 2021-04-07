import {ThunkAction} from "redux-thunk";
import {RootState} from "../index";
import {Action} from "redux";
import {setNotificationMessage, toggleLoading} from "../app/actions";
import {FETCH_EVENTS} from "./types";
import { NotificationTypes } from "../app/types";

export const fetchEvents = (
    lat: number,
    lon: number
): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
    try {
        dispatch(toggleLoading(true));
        const url = `https://api.hel.fi/linkedevents/v1/event/?bbox=${lon - 0.02},${lat - 0.02},${lon + 0.02},${lat + 0.02}`;
        const events = await fetch(url);
        console.log("URL  " + url);
        const toJSON = await events.json();
        dispatch({type: FETCH_EVENTS, payload: toJSON});
        dispatch(toggleLoading(false));
    } catch (error) {
        dispatch(toggleLoading(false));
        dispatch(setNotificationMessage(error.message, NotificationTypes.Error, 5));
    }
};

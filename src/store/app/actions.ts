import {Action} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {RootState} from '..';
import {AppStateActionTypes, TOGGLE_LOADING, SET_NOTIFICATION, NotificationTypes} from './types';

let timerId: NodeJS.Timeout;

export const toggleLoading = (isLoading: boolean): AppStateActionTypes => {
    return {
        type: TOGGLE_LOADING,
        payload: isLoading,
    }
}

export const setNotificationMessage = (
    message: string,
    type: NotificationTypes,
    seconds: number
): ThunkAction<void, RootState, unknown, Action<string>> => dispatch => {
    dispatch({type: SET_NOTIFICATION, payload: { message, type }});

    if (timerId !== undefined) {
        clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
        dispatch(dismissMessage());
    }, seconds * 1000);
}

export const dismissMessage = (): ThunkAction<void, RootState, unknown, Action<string>> => dispatch => {
    dispatch({type: SET_NOTIFICATION, payload: { message: undefined, type: undefined }});
}
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { AppStateActionTypes, TOGGLE_LOADING, SET_ERROR } from './types';

let timerId: NodeJS.Timeout;

export const toggleLoading = (isLoading: boolean): AppStateActionTypes => {
  return {
    type: TOGGLE_LOADING,
    payload: isLoading,
  }
}  

export const setErrorMessage = (
  message: string, 
  seconds: number
): ThunkAction<void, RootState, unknown, Action<string>> => dispatch => {
  dispatch({ type: SET_ERROR, payload: message });

  if (timerId !== undefined) {
    clearTimeout(timerId);
  }

  timerId = setTimeout(() => {
    dispatch({ type: SET_ERROR, payload: undefined });
  }, seconds * 1000);
}
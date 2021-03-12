import { AppStateActionTypes, TOGGLE_LOADING, SET_ERROR } from './types';

export const toggleLoading = (isLoading: boolean): AppStateActionTypes => {
  return {
    type: TOGGLE_LOADING,
    payload: isLoading,
  }
}  

export const setErrorMessage = (message: string | undefined): AppStateActionTypes => {
  return {
    type: SET_ERROR,
    payload: message,
  }
}
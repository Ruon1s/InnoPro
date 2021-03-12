import { AppState, AppStateActionTypes, SET_ERROR, TOGGLE_LOADING } from "./types";

const initialState: AppState = {
  loading: false,
  errorMessage: undefined,
}

const reducer = (state = initialState, action: AppStateActionTypes) => {
  switch (action.type) {
    case TOGGLE_LOADING: 
      return {
        ...state,
        loading: action.payload
      }
    case SET_ERROR: 
      return {
        ...state,
        errorMessage: action.payload,
      }
    default:
      return state;
  }
}

export default reducer;
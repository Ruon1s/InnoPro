import {AppState, AppStateActionTypes, SET_NOTIFICATION, TOGGLE_LOADING} from "./types";

const initialState: AppState = {
    loading: false,
    notification: {
        message: undefined,
        type: undefined,
    },
}

const reducer = (state = initialState, action: AppStateActionTypes) => {
    switch (action.type) {
        case TOGGLE_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case SET_NOTIFICATION:
            return {
                ...state,
                notification: action.payload,
            }
        default:
            return state;
    }
}

export default reducer;

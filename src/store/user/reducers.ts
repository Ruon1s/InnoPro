import {SET_USER, UPDATE_USER, UserActionTypes, UserState} from "./types";

const initialState: UserState = {
    email: '',
    fullName: '',
    createdAt: 0,
    notificationToken: '',
    avatarUrl: undefined,
}

const reducer = (state = initialState, action: UserActionTypes) => {
    switch (action.type) {
        case SET_USER:
            return action.payload;
        case UPDATE_USER:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

export default reducer;

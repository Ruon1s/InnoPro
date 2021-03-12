import { SET_USER, UserActionTypes, UserState } from "./types";

const initialState: UserState = {
  email: '',
  fullName: '',
  createdAt: 0,
}

const reducer = (state = initialState, action: UserActionTypes) => {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    default:
      return state;
  }
}

export default reducer;
export interface UserState {
  email: string;
  fullName: string;
  createdAt: number;
}

export const SET_USER = "SET_USER";

interface SetUserActionType {
  type: typeof SET_USER;
  payload: UserState;
}

export type UserActionTypes = SetUserActionType;
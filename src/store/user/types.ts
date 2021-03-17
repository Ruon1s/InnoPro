export interface UserState {
  email: string;
  fullName: string;
  createdAt: number;
  notificationToken: string;
  avatarUrl?: string | undefined;
}

export const SET_USER = "SET_USER";
export const UPDATE_USER = "UPDATE_USER";

interface SetUserActionType {
  type: typeof SET_USER;
  payload: UserState;
}

interface UpdateUserActionType {
  type: typeof UPDATE_USER;
  payload: Partial<UserState>;
}

export type UserActionTypes = SetUserActionType | UpdateUserActionType;
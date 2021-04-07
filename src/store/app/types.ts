export interface AppState {
    loading: boolean;
    notification: Notification;
}

export interface Notification {
    message: string | undefined;
    type: NotificationTypes | undefined;
}

export enum NotificationTypes {
    Success = 'success',
    Error = 'error',
}

export const TOGGLE_LOADING = 'TOGGLE_LOADING';
export const SET_NOTIFICATION = 'SET_NOTIFICATION';

interface ToggleLoadingAction {
    type: typeof TOGGLE_LOADING;
    payload: boolean;
}

interface SetNotificationAction {
    type: typeof SET_NOTIFICATION;
    payload: Notification;
}

export type AppStateActionTypes = ToggleLoadingAction | SetNotificationAction;

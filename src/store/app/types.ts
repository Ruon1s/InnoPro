export interface AppState {
    loading: boolean;
    errorMessage: string | undefined;
}

export const TOGGLE_LOADING = 'TOGGLE_LOADING';
export const SET_ERROR = 'SET_ERROR';

interface ToggleLoadingAction {
    type: typeof TOGGLE_LOADING;
    payload: boolean;
}

interface SetErrorAction {
    type: typeof SET_ERROR;
    payload: string | undefined;
}

export type AppStateActionTypes = ToggleLoadingAction | SetErrorAction;

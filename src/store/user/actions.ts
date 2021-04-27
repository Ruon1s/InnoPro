import {Action} from "redux";
import {ThunkAction} from "redux-thunk";
import {RootState} from "..";
import {SignInValues, SignUpValues} from "../../types";
import {setNotificationMessage, toggleLoading} from "../app/actions";
import {SET_USER, UPDATE_USER, UserState} from "./types";
import firebase from 'firebase';
import {db} from "../../utils/firebaseConfig";
import {StackNavigationProp} from "@react-navigation/stack";
import {StackParamList} from "../../navigators/StackNavigator";
import { NotificationTypes } from "../app/types";

export const fetchUser = (
    uid: string,
    navigation: StackNavigationProp<StackParamList, 'Initial'>
): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
    try {
        const userInfo = (await db.users.doc(uid).get()).data();

        if (userInfo !== undefined) {
            dispatch({type: SET_USER, payload: userInfo});
            navigation.replace('Main');
        }
    } catch (error) {
        navigation.replace('SignIn');
        dispatch(setNotificationMessage(error.message, NotificationTypes.Error, 5));
    }
}

export const signIn = (
    values: SignInValues,
    navigation: StackNavigationProp<StackParamList, 'SignIn'>
): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
    try {
        dispatch(toggleLoading(true));

        const {user} = await firebase.auth().signInWithEmailAndPassword(values.email, values.password);

        if (user) {
            const userInfo = (await db.users.doc(user.uid).get()).data();

            if (userInfo !== undefined) {
                dispatch(toggleLoading(false));
                dispatch({type: SET_USER, payload: userInfo});
                navigation.replace('Main');
            } else {
                dispatch(toggleLoading(false));
                dispatch(setNotificationMessage('User info not found', NotificationTypes.Error, 5));
            }
        } else {
            dispatch(toggleLoading(false));
            dispatch(setNotificationMessage('User not found', NotificationTypes.Error, 5));
        }
    } catch (error) {
        dispatch(toggleLoading(false));
        dispatch(setNotificationMessage(error.message, NotificationTypes.Error, 5));
    }
}

export const signUp = (
    values: SignUpValues,
    navigation: StackNavigationProp<StackParamList, 'SignUp'>
): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
    try {
        dispatch(toggleLoading(true));

        const {user} = await firebase.auth().createUserWithEmailAndPassword(values.email, values.password);

        if (user) {
            const createdAt = Date.now();

            await db.users.doc(user.uid).set({
                email: values.email,
                fullName: values.fullName,
                createdAt,
                notificationToken: '',
                admin: false,
                avatarUrl: ''
            });

            dispatch(toggleLoading(false));
            dispatch({type: SET_USER, payload: {...values, createdAt}});
            dispatch(setNotificationMessage('Sign Up successful!', NotificationTypes.Success, 5));
            navigation.reset({
                index: 0,
                routes: [{name: 'Permissions'}]
            });
        } else {
            dispatch(toggleLoading(false));
            dispatch(setNotificationMessage('Something went wrong, please try again', NotificationTypes.Error, 5));
        }
    } catch (error) {
        dispatch(toggleLoading(false));
        dispatch(setNotificationMessage(error.message, NotificationTypes.Error, 5));
    }
}

export const signOut = (
    navigation: StackNavigationProp<StackParamList, 'Main'>
): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
    try {
        dispatch(toggleLoading(true));

        await firebase.auth().signOut();
        dispatch({type: SET_USER, payload: {email: '', fullName: '', createdAt: 0}});

        dispatch(toggleLoading(false));

        navigation.reset({
            index: 0,
            routes: [{name: 'SignIn'}]
        });
        dispatch(setNotificationMessage('Signed out!', NotificationTypes.Success, 5));
    } catch (error) {
        dispatch(toggleLoading(false));
        dispatch(setNotificationMessage(error.message, NotificationTypes.Error, 5));
    }
}

export const updateUser = (
    newUserInfo: Partial<UserState>
): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
    try {

        const user = firebase.auth().currentUser;

        console.log(newUserInfo);

        if (user) {
            await db.users.doc(user.uid).set(newUserInfo, {merge: true});
            dispatch({type: UPDATE_USER, payload: newUserInfo});
            dispatch(setNotificationMessage('User info updated!', NotificationTypes.Success, 5));
        } else {
            dispatch(setNotificationMessage('User was not found', NotificationTypes.Error, 5));
        }
    } catch (error) {
        console.log(error);
        dispatch(setNotificationMessage(error.message, NotificationTypes.Error, 5));
    }
}

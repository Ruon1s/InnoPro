import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "..";
import { SignInValues, SignUpValues } from "../../types";
import { setErrorMessage, toggleLoading } from "../app/actions";
import { SET_USER, UserActionTypes, UserState } from "./types";
import firebase from 'firebase';
import { db } from "../../utils/firebaseConfig";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParamList } from "../../navigators/StackNavigator";

export const fetchUser = (
  uid: string,
  navigation: StackNavigationProp<StackParamList, 'Initial'>
): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
  try {
    const userInfo = (await db.users.doc(uid).get()).data();

    if (userInfo !== undefined) {
      dispatch({ type: SET_USER, payload: userInfo });
      navigation.replace('Main');
    }
  } catch (error) {
    navigation.replace('SignIn');
    dispatch(setErrorMessage(error.message));

    setTimeout(() => {
      dispatch(setErrorMessage(undefined));
    }, 3000);
  }
}

export const signIn = (
  values: SignInValues,
  navigation: StackNavigationProp<StackParamList, 'SignIn'>
): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
  try {
    dispatch(toggleLoading(true));

    const { user } = await firebase.auth().signInWithEmailAndPassword(values.email, values.password);

    if (user) {
      const userInfo = (await db.users.doc(user.uid).get()).data();

      if (userInfo !== undefined) {
        dispatch({ type: SET_USER, payload: userInfo });
        dispatch(toggleLoading(false));
        navigation.replace('Main');
      } else {
        dispatch(toggleLoading(false));
        dispatch(setErrorMessage('Could not find the user info'));
        setTimeout(() => {
          dispatch(setErrorMessage(undefined));
        }, 3000);
      }
    } else {
      dispatch(toggleLoading(false));
      dispatch(setErrorMessage('Could not find the user'));
      setTimeout(() => {
        dispatch(setErrorMessage(undefined));
      }, 3000);
    }
  } catch (error) {
    dispatch(toggleLoading(false));
    dispatch(setErrorMessage(error.message));

    setTimeout(() => {
      dispatch(setErrorMessage(undefined));
    }, 3000);
  }
}

export const signUp = (
  values: SignUpValues,
  navigation: StackNavigationProp<StackParamList, 'SignUp'>
): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
  try {
    dispatch(toggleLoading(true));

    const { user } = await firebase.auth().createUserWithEmailAndPassword(values.email, values.password);
    
    if (user) {
      await db.users.doc(user.uid).set({
        email: values.email,
        fullName: values.fullName,
        createdAt: Date.now(),
      });

       dispatch(toggleLoading(false));
       navigation.replace('Main');
    } else {
      dispatch(toggleLoading(false));
      dispatch(setErrorMessage('Something went wrong! Please try again'));
      setTimeout(() => {
        dispatch(setErrorMessage(undefined));
      }, 3000);
    }
  } catch (error) {
    dispatch(toggleLoading(false));
    dispatch(setErrorMessage(error.message));

    setTimeout(() => {
      dispatch(setErrorMessage(undefined));
    }, 3000);
  }
}

export const signOut = (
  navigation: StackNavigationProp<StackParamList, 'Main'>
): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
  try {
    dispatch(toggleLoading(true));

    await firebase.auth().signOut();
    dispatch({ type: SET_USER, payload: { email: '', fullName: '', createdAt: 0 }});

    dispatch(toggleLoading(false));

    navigation.reset({
      index: 0,
      routes: [{ name: 'SignIn' }]
    });
  } catch (error) {
    dispatch(toggleLoading(false));
    dispatch(setErrorMessage(error.message));

    setTimeout(() => {
      dispatch(setErrorMessage(undefined));
    }, 3000);
  }
} 
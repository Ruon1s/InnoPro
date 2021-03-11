import React, {useEffect} from 'react';
import TabNavigator from './src/navigators/TabNavigator';
import { Provider } from 'react-redux';
import { store } from './src/store';
import firebase from "firebase/app";
import "firebase/firestore"
import {firebaseConfig} from "./src/utils/firebaseConfig";
import {fetchWeather} from "./src/store/weather/actions";
import { useDispatch } from 'react-redux';
import {getLocation} from "./src/store/location/actions";

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
    console.log('firebase initialized')
}

const App = () => {
  return (
    <Provider store={store}>
      <TabNavigator />
    </Provider>
  );
};

export default App;

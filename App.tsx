import React, {useEffect} from 'react';
import TabNavigator from './src/navigators/TabNavigator';
import { Provider } from 'react-redux';
import { store } from './src/store';
import {fetchWeather} from "./src/store/weather/actions";
import { useDispatch } from 'react-redux';
import {getLocation} from "./src/store/location/actions";

const App = () => {

  return (
    <Provider store={store}>
      <TabNavigator />
    </Provider>
  );
};

export default App;

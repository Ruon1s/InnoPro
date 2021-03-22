import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store';
import "firebase/firestore"
import MainNavigator from './src/navigators/MainNavigator';
import { LogBox } from 'react-native';
import './src/i18n'

const App = () => {

  useEffect(() => {
    LogBox.ignoreLogs(['Setting a timer for a long period of time', 'Remote debugger']); //Ignore unnecessary warning during dev
  }, []);

  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
};

export default App;

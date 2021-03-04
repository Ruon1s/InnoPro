import React from 'react';
import TabNavigator from './src/navigators/TabNavigator';
import { Provider } from 'react-redux';
import { store } from './src/store';

const App = () => {
  return (
    <Provider store={store}>
      <TabNavigator />
    </Provider>
  );
}

export default App;

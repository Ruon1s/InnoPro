import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import weatherReducer from './weather/reducers';
import locationReducer from './location/reducers';
import appReducer from './app/reducers';
import userReducer from './user/reducers';

const rootReducer = combineReducers({
  weather: weatherReducer,
  location: locationReducer,
  app: appReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk),
);

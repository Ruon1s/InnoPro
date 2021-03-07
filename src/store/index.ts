import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import weatherReducer from './weather/reducers';
import locationReducer from './location/reducers';

const rootReducer = combineReducers({
  weather: weatherReducer,
  location: locationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk),
);

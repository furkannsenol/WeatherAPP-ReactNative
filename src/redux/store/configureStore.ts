// store.ts

import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import weatherQueryReducer from '../reducer/weatherQueryReducer';
import weatherLocationReducer from '../reducer/weatherLocationReducer';
import weatherForecastReducer from '../reducer/weatherForecastReducer';

// RootState tanımı


// Reducer'ları birleştirme
const rootReducer = combineReducers({
  weatherQueryReducer,
  weatherLocationReducer,
  weatherForecastReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof store.getState>;
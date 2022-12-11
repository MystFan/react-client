import {
  configureStore,
  createImmutableStateInvariantMiddleware,
} from '@reduxjs/toolkit'

import thunkMiddleware from 'redux-thunk';

import loggerMiddleware from './loggerMiddleware';
import rootReducer from './rootReducer';
import userMiddleware from './userMiddleware';

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunkMiddleware, userMiddleware, loggerMiddleware, createImmutableStateInvariantMiddleware()]
})

export default store

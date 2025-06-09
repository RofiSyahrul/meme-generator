import {configureStore} from '@reduxjs/toolkit';
import memeReducer from './meme/meme-slice';

export const store = configureStore({
  reducer: {
    meme: memeReducer,
  },
});

export type AppStore = typeof store;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

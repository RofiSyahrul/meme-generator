import {configureStore} from '@reduxjs/toolkit';

import memeSlice from './meme/meme-slice';

export const store = configureStore({
  reducer: {
    meme: memeSlice.reducer,
  },
});

export type AppStore = typeof store;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

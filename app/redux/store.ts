import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user-slice';

export const store = configureStore({
  reducer: {
    userReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from '@reduxjs/toolkit';
import customerSlice from './cutomerSlice';

export const store = configureStore({
  reducer: {
    customer: customerSlice,
  },
});

// Infer the `RootState` and `AppDispatch`
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

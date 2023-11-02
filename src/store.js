import { configureStore } from '@reduxjs/toolkit';
import vehicleReducer from './reducer/vehicle';

export const store = configureStore({
  reducer: {
    vehicle: vehicleReducer,
  },
})
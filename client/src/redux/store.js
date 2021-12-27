import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import areaReducer from './areaSlice';
import residentReducer from './residentSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    area: areaReducer,
    resident: residentReducer,
  },
});

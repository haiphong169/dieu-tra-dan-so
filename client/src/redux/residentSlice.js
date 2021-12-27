import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  residentList: null,
};

export const residentSlice = createSlice({
  name: 'resident',
  initialState,

  reducers: {
    getResidentList: (state, action) => {
      state.residentList = action.payload;
    },
  },
});

export const { getResidentList } = residentSlice.actions;

export default residentSlice.reducer;

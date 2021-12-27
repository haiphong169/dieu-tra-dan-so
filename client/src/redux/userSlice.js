import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  name: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    getUserData: (state, action) => {
      state.username = action.payload.username;
      state.name = action.payload.name;
    },
  },
});

export const { getUserData } = userSlice.actions;

export default userSlice.reducer;

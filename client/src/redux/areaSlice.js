import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tinh: [],
  quan: [],
  phuong: [],
  thon: [],
};

export const areaSlice = createSlice({
  name: 'area',
  initialState,

  reducers: {
    setTinh: (state, action) => {
      state.tinh = action.payload;
    },
    setQuan: (state, action) => {
      state.quan = action.payload;
    },
    setPhuong: (state, action) => {
      state.phuong = action.payload;
    },
    setThon: (state, action) => {
      state.thon = action.payload;
    },
  },
});

export const { setTinh, setQuan, setPhuong, setThon } = areaSlice.actions;

export default areaSlice.reducer;

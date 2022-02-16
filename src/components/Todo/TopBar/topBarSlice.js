import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchTxt: "",
};

export const topBarSlice = createSlice({
  name: "topBar",
  initialState,
  reducers: {
    setSearch(state, action) {
      state.searchTxt = action.payload;
    },
    resetSearch(state) {
      state.searchTxt = "";
    },
  },
});

export const {setSearch, resetSearch} = topBarSlice.actions;

export const selectSearch = (state) => state.topBar.searchTxt;

export default topBarSlice.reducer;

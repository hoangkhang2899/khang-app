import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    method: "",
    index: null,
    name: "",
    status: true,
    date: "",
  },
};

export const editTodoSlice = createSlice({
  name: "editTodo",
  initialState,
  reducers: {
    setMethod(state, action) {
      if (action.payload.index !== undefined) {
        state.value.method = action.payload.name;
        state.value.index = action.payload.index;
      } else {
        state.value.method = action.payload;
      }
    },
    resetValue(state) {
      state.value = { ...initialState.value };
    },
    setValue(state, action) {
      if (action.payload.status === false) {
        action.payload.date = "";
      }
      state.value = action.payload;
    },
    submitValue() {},
  },
});

export const { setMethod, resetValue, setValue, submitValue } =
  editTodoSlice.actions;

export const selectEdit = (state) => state.editTodo.value;

export default editTodoSlice.reducer;

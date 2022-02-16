import { createSlice } from "@reduxjs/toolkit";
import { submitValue } from "../EditTodo/editTodoSlice";

const initialState = {
  list: [],
};

export const todoListSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    getTodo(state, action) {
      state.list = action.payload;
    },
    removeTodo(state, action) {
      const arr = [...state.list];
      arr.splice(action.payload, 1);
      state.list = arr;
    },
    moveUpTodo(state, action) {
      const i = action.payload;
      if (state.list[i - 1]) {
        const arr = { ...state.list[i - 1] };
        state.list[i - 1] = state.list[i];
        state.list[i] = arr;
      }
    },
    moveDownTodo(state, action) {
      const i = action.payload;
      if (state.list[i + 1]) {
        const arr = { ...state.list[i + 1] };
        state.list[i + 1] = state.list[i];
        state.list[i] = arr;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(submitValue, (state, action) => {
      const { method, index, name, status, date } = action.payload;
      const obj = {
        name,
        status,
        date,
      };
      if (method === "add") {
        state.list = [...state.list, obj];
      } else {
        state.list[index] = obj;
      }
    });
  },
});

export const { getTodo, removeTodo, moveUpTodo, moveDownTodo } =
  todoListSlice.actions;

export const selectTodo = (state) => state.todoList.list;

export default todoListSlice.reducer;

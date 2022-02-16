import { configureStore } from "@reduxjs/toolkit";
import topBarSlice from "../components/Todo/TopBar/topBarSlice";
import todoListSlice from "../components/Todo/TodoList/todoListSlice";
import editTodoSlice from "../components/Todo/EditTodo/editTodoSlice";
import bookManagementSlice from "../components/BookManagement/bookManagementSlice";
import customerSlice from "../components/BookManagement/customerSlice";

export const store = configureStore({
  reducer: {
    topBar: topBarSlice,
    todoList: todoListSlice,
    editTodo: editTodoSlice,
    bookManagement: bookManagementSlice,
    customer: customerSlice,
  },
});

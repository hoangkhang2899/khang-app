import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  username: "",
  role: "",
  books: [],
  categories: [],
  orders: [],
  orderHistory: [],
};

export const bookManagementSlice = createSlice({
  name: "bookManagement",
  initialState,
  reducers: {
    setLogin(state, action) {
      state.isLogin = action.payload.isLogin;
      state.username = action.payload.username;
      state.role = action.payload.role;
    },
    setBook(state, action) {
      state.books = action.payload;
    },
    setCategory(state, action) {
      state.categories = action.payload;
    },
    addCategory(state, action) {
      state.categories = [...state.categories, action.payload];
    },
    setOrder(state, action) {
      state.orders = action.payload;
    },
    deleteOrder(state, action) {
      state.orders = state.orders.filter((e, i) => i !== action.payload);
    },
    addBook(state, action) {
      state.books = [...state.books, action.payload];
    },
    setOrderHistory(state, action) {
      state.orderHistory = action.payload;
    },
  },
});

export const {
  setLogin,
  setBook,
  setCategory,
  addBook,
  addCategory,
  setOrder,
  deleteOrder,
  setOrderHistory,
} = bookManagementSlice.actions;

export const selectBookManagement = (state) => state.bookManagement;

export default bookManagementSlice.reducer;

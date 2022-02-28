import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    addItem(state, action) {
      const { id, item, amount } = action.payload;
      for (let i of state.cart) {
        if (i.id === id) {
          i.amount++;
          return;
        }
      }
      state.cart = [...state.cart, { id, item, amount }];
    },
    increaseItem(state, action) {
      const i = action.payload;
      state.cart[i].amount++;
    },
    decreaseItem(state, action) {
      const i = action.payload;
      state.cart[i].amount--;
    },
    removeItem(state, action) {
      const arr = [...state.cart];
      arr.splice(action.payload, 1);
      state.cart = arr;
    },
    clearItem(state) {
      state.cart = [];
    },
  },
});

export const { addItem, increaseItem, decreaseItem, removeItem, clearItem } = customerSlice.actions;

export const selectCustomer = (state) => state.customer;

export default customerSlice.reducer;

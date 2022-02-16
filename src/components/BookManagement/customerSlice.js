import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    addItem(state, action) {
      const { item, amount } = action.payload;
      for (let i of state.cart) {
        if (i.item === item) {
          i.amount++;
          return;
        }
      }
      state.cart = [...state.cart, { item, amount }];
    },
  },
});

export const { addItem } = customerSlice.actions;

export const selectCustomer = (state) => state.customer;

export default customerSlice.reducer;

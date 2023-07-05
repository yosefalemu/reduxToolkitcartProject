import { createSlice } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";

const initialState = {
  cartItems: cartItems,
  amount: 1,
  total: 0,
  loading: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount += 1;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      if (cartItem.amount > 0) {
        cartItem.amount -= 1;
      }
    },
    // findTotal: (state) => {
    //   const totalPrice = state.cartItems
    //     .reduce((total, item) => total + item.price * item.amount, 0)
    //     .toFixed(2);
    //   state.total = totalPrice;
    // },
    // findAmount: (state) => {
    //   const totalAmount = state.cartItems.reduce(
    //     (total, item) => total + item.amount,
    //     0
    //   );
    //   state.amount = totalAmount;
    // },
    calculateTotal: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.price * item.amount;
      });
      state.amount = amount;
      state.total = total.toFixed(2);
    },
  },
});

// console.log(cartSlice);
export default cartSlice.reducer;
export const { clearCart, removeItem, increase, decrease, calculateTotal } =
  cartSlice.actions;

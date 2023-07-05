import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const url = "https://course-api.com/react-useReducer-cart-project";

const initialState = {
  cartItems: [],
  amount: 1,
  total: 0,
  isLoading: true,
  isError: false,
};
export const getCartItems = createAsyncThunk("cart/getCartItems", async () => {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
});

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
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      // console.log(action);
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getCartItems.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

// console.log(cartSlice);
export default cartSlice.reducer;
export const { clearCart, removeItem, increase, decrease, calculateTotal } =
  cartSlice.actions;

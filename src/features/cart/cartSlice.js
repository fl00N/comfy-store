import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const defaultState = {
  cartItems: [],
  cartTotal: 0,
  numItemsInCart: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
};

const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("cart")) || defaultState;
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: getCartFromLocalStorage(),
  reducers: {
    addItem: (state, action) => {
      const { product } = action.payload;
      const { cartId, amount } = product;

      const item = state.cartItems.find((item) => item.cartId === cartId);

      if (item) {
        if (item.amount + amount > 10) {
          toast.error("You can`t have amount more than 10 on this item");
          return;
        } else {
          item.amount += amount;
        }
      } else {
        state.cartItems.push(product);
      }

      cartSlice.caseReducers.calculateTotals(state);
      localStorage.setItem("cart", JSON.stringify(state));
      toast.success("Item added to cart!");
    },

    clearCart: () => {
      localStorage.setItem("cart", JSON.stringify(defaultState));
      return defaultState;
    },

    removeItem: (state, action) => {
      const cartId = action.payload;
      const filteredCart = state.cartItems.filter(
        (item) => item.cartId !== cartId,
      );

      state.cartItems = filteredCart;
      cartSlice.caseReducers.calculateTotals(state);
      localStorage.setItem("cart", JSON.stringify(state));
      toast.success("Item deleted!");
    },

    editItem: (state, action) => {
      const { cartId, amount } = action.payload;
      const item = state.cartItems.find((item) => item.cartId === cartId);

      item.amount = amount;

      cartSlice.caseReducers.calculateTotals(state);
      localStorage.setItem("cart", JSON.stringify(state));
      toast.success("Amount is changed!");
    },

    calculateTotals: (state) => {
      const { total, items } = state.cartItems.reduce(
        (acc, item) => {
          acc.total += item.amount * item.price;
          acc.items += item.amount;
          return acc;
        },
        { total: 0, items: 0 },
      );

      state.numItemsInCart = items;
      state.cartTotal = total;
      state.tax = 0.1 * total;
      state.orderTotal = total + state.shipping + state.tax;
    },
  },
});

export const { addItem, clearCart, removeItem, editItem } = cartSlice.actions;

export default cartSlice.reducer;

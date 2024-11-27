import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    cartItem: [],
    total: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const itemExist = state.cartItem.find(
        (item) => item.card.info.id === action.payload.card.info.id
      );
      if (itemExist) {
        toast.error("Item already exist");
        return;
      }
      state.cartItem.push(action.payload);
      toast.success("Item added successfully");
    },
    increaseQuantity: (state, action) => {
      const item = state.cartItem.find(
        (item) => item.card.info.id === action.payload
      );
      item.quantity = item.quantity + 1;
 
    },
    decreaseQuantity: (state, action) => {
      const item = state.cartItem.find(
        (item) => item.card.info.id === action.payload
      );
      if (item.quantity === 1) {
        state.cartItem = state.cartItem.filter(
          (item) => item.card.info.id !== action.payload
        );
        return;
      }
      item.quantity = item.quantity - 1;
     
    },
    removeItem: (state, action) => {
      state.cartItem = state.cartItem.filter(
        (item) => item.card.info.id !== action.payload
      );
    },
    calculateTotal: (state, action) => {
      state.total = state.cartItem.reduce(
        (accumlator, currentValue) =>
          accumlator +
            (currentValue.card.info.price * currentValue.quantity) / 100 ||
          (currentValue.card.info.defaultPrice * currentValue.quantity) / 100,
        0
      );
    },
    clearCartItem: (state) => {
      state.cartItem = [];
    },
  },
});

export const {
  addItem,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  calculateTotal,
  clearCartItem,
} = cartSlice.actions;
export default cartSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice"
import userReducer from "./slices/userAuthSlice"

const store = configureStore({
    reducer: {
        cart: cartReducer,
        user:userReducer
    }
})
export default store
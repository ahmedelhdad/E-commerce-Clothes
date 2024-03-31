import { configureStore } from "@reduxjs/toolkit";
import ModeSlice from './ModeSlice'
import cartSlice from './cartSlice'
import loginSlice from "./LoginSlice"
import OrderSlice from "./orderSlice"
import AdminSlice from "./AdminSlice"

const Store = configureStore({reducer:{
    MODE:ModeSlice,
    CART:cartSlice,
    LOGIN:loginSlice,
    orders:OrderSlice,
    Admin:AdminSlice
}})


export default Store




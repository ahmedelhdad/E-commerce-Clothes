import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const cartSlice = createSlice({
    name: 'CART',
    initialState: { 
        cartItems:Cookies.get('cartItems')?JSON.parse(Cookies.get('cartItems')) : [], totalPrice: 0, count: 0 ,
        shippingAddress:Cookies.get('shippingAddress')?JSON.parse(Cookies.get('shippingAddress')):{ },
        paymentMethod:Cookies.get('paymentMethod')?Cookies.get('paymentMethod'):'',
        order:Cookies.get('order')?JSON.parse(Cookies.get('order')):{ }
},
    reducers: {
        CART_ADD_ITEM: (state, action) => {
            const existingIndex = state.cartItems.findIndex(
                (item) => item.slug === action.payload.slug
            )
            if (existingIndex >= 0) {
                toast.info(` ${action.payload.name.substring(0,15)} added to cart `, {
                    position: "top-left",
                })
            } else {
                state.cartItems = [...state.cartItems, {...action.payload , amount:1}]
                Cookies.set('cartItems',JSON.stringify(state.cartItems))
                toast.success(` ${action.payload.name.substring(0,15)} added to cart `, {
                    position: "top-left",
                    
                })
            }

        },
        GET_CART_TOTAL: (state ) => {
            const { totalPrice, count } = state.cartItems.reduce((cart, items) => {
                const {amount , price} = items
                cart.totalPrice += amount * price
                cart.count += amount
                return cart
            },{
                totalPrice:0,
                count:0
            })
            state.count = count;
            state.totalPrice = Math.round(totalPrice);
        },
        DELETE_ITEM :(state,action) => {
            state.cartItems = state.cartItems.filter((item) => item.name !== action.payload.name)
            Cookies.set('cartItems',JSON.stringify(state.cartItems))
                toast.success(` ${action.payload.name.substring(0,15)} delete to cart `, {
                    position: "top-left",
                })
        },
        ON_CHANGE_MOUNT:(state,action) => {
            state.cartItems = state.cartItems.map((item) => item.name === action.payload.name ? {...item,amount:action.payload.amount} : item)
            Cookies.set('cartItems',JSON.stringify(state.cartItems))
                toast.success(` ${action.payload.name} Add to Amount `, {
                    position: "top-left",
                })
        },
        CLEAR_ALL:(state) => {
            state.cartItems = []
            Cookies.remove('cartItems')
        },
        SHIPPING_ADDRESS:(state,action) => {
            state.shippingAddress = action.payload
        },
        PAYMENT_METHOD:(state,action) => {
            state.paymentMethod = action.payload
        },
        GET_ORDER:(state,action) => 
        {
            state.order = action.payload
            Cookies.set('order',JSON.stringify(state.order))

        }
    }
})

export const { CART_ADD_ITEM ,GET_CART_TOTAL,DELETE_ITEM,ON_CHANGE_MOUNT,CLEAR_ALL,SHIPPING_ADDRESS, PAYMENT_METHOD,GET_ORDER} = cartSlice.actions
export default cartSlice.reducer
import { createSlice } from "@reduxjs/toolkit";



const OrderSlice = createSlice({
    name:'orders',
    initialState:{totalPrice:0,count:0,taxPrice:0,shippingPrice:0},
    reducers:{
        ORDER_ITEMS:(state,action) => {
            
            // state.cartItems = 
            const {totalPrice,count,taxPrice,shippingPrice} = action.payload.reduce((cart,item) => {
                const {itemsPrice,taxPrice,orderItems,shippingPrice} = item
                cart.count += orderItems.length
                cart.taxPrice += taxPrice
                cart.totalPrice +=itemsPrice
                cart.shippingPrice += shippingPrice
                return cart
            },{
                totalPrice:0,
                count:0,
                taxPrice:0,
                shippingPrice:0
            })
           
            state.totalPrice = totalPrice
            state.count = count
            state.taxPrice = taxPrice
            state.shippingPrice = shippingPrice
        }
    }
})








export const {ORDER_ITEMS} = OrderSlice.actions
export default OrderSlice.reducer
import { createSlice } from "@reduxjs/toolkit";







const AdminSlice = createSlice({
    name:'Admin',
    initialState:{
        // Admin order 
        productAdmin:[],
        // Admin Users 
        usersAdmin:null,
        userAdminId:null
    },
    reducers:({
        // Admin Product 
        GET_ORDER_ADMIN: (state,action) => 
        {
            state.productAdmin = action.payload
        },
        // Admin Users 
        GET_USERS_ADMIN:(state,action) => 
        {
            state.usersAdmin = action.payload
        },
        GET_USER_ID:(state,action) => 
        {
            state.userAdminId = action.payload
        }
    })
})









export const {GET_ORDER_ADMIN,GET_USERS_ADMIN,GET_USER_ID} = AdminSlice.actions
export default AdminSlice.reducer
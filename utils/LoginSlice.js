import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";




const loginSlice = createSlice({
    name:'LOGIN',
    initialState:{userInfo:Cookies.get('userInfo')?JSON.parse(Cookies.get('userInfo')) : null},
    reducers:{
       USER_LIGIN:(state,action) => {
         state.userInfo = action.payload
         Cookies.set('userInfo',JSON.stringify(state.userInfo))
        },
        USER_LOGOUT:(state) => {
            state.userInfo = null
            Cookies.remove('userInfo')
            
        }
    }
})



export const {USER_LIGIN,USER_LOGOUT} = loginSlice.actions
export default loginSlice.reducer
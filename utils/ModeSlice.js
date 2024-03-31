import { createSlice } from "@reduxjs/toolkit";




const ModeSlice = createSlice({
    name:'MODE',
    initialState:{value:false},
    reducers:{
        CHangeMode:(state) => {
            state.value = !state.value
            
        }
    }
})

export const {CHangeMode} = ModeSlice.actions
export default ModeSlice.reducer
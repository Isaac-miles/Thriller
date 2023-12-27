import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import toast from "react-hot-toast";
import { toastStyle } from "@/utils/styles";
const initialState = {
    modal:false
}

const modalSlice = createSlice({
    name: 'modal',
     initialState:initialState,

    reducers :{
        openCloseModal:(state, action:PayloadAction<{type:string, action:boolean}>)=>{
               if(action?.payload.type === 'open'){
                return  {...state, modal:action?.payload.action}

               }else if(action?.payload.type === 'close'){
                return  {...state, modal:action?.payload.action}
               }else{
                    toast("Action not specified",{
                        duration:5000,
                        style:toastStyle
                      })
               }
                
        }
    }
})


export const modalState = (state:RootState)=>state.modal.modal
export const {openCloseModal} = modalSlice.actions
export default modalSlice.reducer
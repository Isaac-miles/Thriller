import { configureStore } from "@reduxjs/toolkit";
import modalReducer from '@/features/modalSlice'
import movieReducer from '@/features/movieSlice'
import { useDispatch } from "react-redux";

const store = configureStore({
    reducer:{
    modal:modalReducer,
     movie:movieReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch:()=>AppDispatch = useDispatch
export default store;
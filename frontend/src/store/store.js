import { configureStore } from "@reduxjs/toolkit";
import { destinationsSlice } from "./slices/destinationsSlice";

export const store = configureStore({
   
    reducer:{
        destinations: destinationsSlice.reducer,
    }
})
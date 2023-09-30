import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';
import orderSlice from './slices/orderSlice';

const store= configureStore({
    reducer:{
        [apiSlice.reducerPath]: apiSlice.reducer,
        orders: orderSlice
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(apiSlice.middleware),
        devTools:true
})

export default store;
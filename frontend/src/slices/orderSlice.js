import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("orders") ? JSON.parse(localStorage.getItem("orders")) : {
    orders: [],
    sellerInfo: {},
    shippingDate: null,
    total: 0,
    department: "",
}


const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        setOrders: (state, action) => {
            state.orders = action.payload;
            let totalAmount = state.orders.reduce((total,currentOrder)=>{
                return total+=currentOrder.price
            },0)
            state.total= totalAmount
            localStorage.setItem('orders', JSON.stringify(state));
        },
        setSellerInfo: (state, action) => {
            state.sellerInfo = action.payload;
            localStorage.setItem('sellerInfo', JSON.stringify(state));
        },
        setShippingDate: (state, action) => {
            state.shippingDate = action.payload;
            localStorage.setItem('shippingDate', JSON.stringify(state));
        },
        setDepartment: (state, action) => {
            state.department = action.payload;
            localStorage.setItem('department', JSON.stringify(state));
        },
    }
})

export const {
    setOrders,
    setSellerInfo,
    setShippingDate,
    setTotal,
    setDepartment
}= orderSlice.actions;

export default orderSlice.reducer;
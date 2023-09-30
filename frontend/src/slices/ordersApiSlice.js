import { apiSlice } from "./apiSlice";
import { ORDERS_URL } from "../constants";

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints :(builder)=>({
        getOrders: builder.query({
            query: () => ({
                url : ORDERS_URL
            }),
            keepUnusedDataFor: 5,
        }),
        addItem:builder.mutation({
            query:(item)=>({
                url: ORDERS_URL,
                method:'POST',
                body:item
            })
        }),
        updateItem:builder.mutation({
            query:(item)=>({
                url: `${ORDERS_URL}/${item.id}`,
                method:'PUT',
                body:item
            })
        })
    })
})

export const {
    useGetOrdersQuery,useAddItemMutation, useUpdateItemMutation
} = orderApiSlice
import { apiSlice } from "./apiSlice.js";
import { PRODUCT_URL } from "../constants";

const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url: PRODUCT_URL,
            }),
            keepUnusedDataFor: 5
        }),
        getProductsDetails: builder.query({
            query: (id) => ({
                url:`${PRODUCT_URL}/${id}`,
            }),
            keepUnusedDataFor: 5
        }),
    })
})

export const { useGetProductsQuery , useGetProductsDetailsQuery} = productApiSlice;
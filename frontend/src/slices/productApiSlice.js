import { apiSlice } from "./apiSlice.js";
import { PRODUCT_URL } from "../constants";

const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({keyword, ctg}) => ({
                url: PRODUCT_URL,
                params: {keyword, ctg},
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Products'],
        }),
        getProductsDetails: builder.query({
            query: (id) => ({
                url:`${PRODUCT_URL}/${id}`,
            }),
            keepUnusedDataFor: 5
        }),
        createProduct: builder.mutation({
            query: () => ({
                url:PRODUCT_URL,
                method: 'POST',
            }),
            invalidatesTags: ['Product']
        }),
        updateProduct: builder.mutation({
            query: (data) => ({
              url: `${PRODUCT_URL}/${data.productId}`,
              method: 'PUT',
              body: data,
            }),
            invalidatesTags: ['Products'],
        }),
        uploadProductImage: builder.mutation({
            query: (data) => ({
              url: `api/upload`,
              method: 'POST',
              body: data,
            })
        }),
        deleteProduct: builder.mutation({
            query: (productId) => ({
              url: `${PRODUCT_URL}/${productId}`,
              method: 'DELETE',
            }),
            providesTags: ['Product'],
        }),
        createReview: builder.mutation({
            query: (data) => ({
              url: `${PRODUCT_URL}/${data.itemId}/reviews`,
              method: 'POST',
              body: data,
            }),
            invalidatesTags: ['Product'],
        }),

    })
})

export const { 
    useGetProductsQuery , 
    useGetProductsDetailsQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useUploadProductImageMutation,
    useDeleteProductMutation,
    useCreateReviewMutation,
    
} 
    = productApiSlice;
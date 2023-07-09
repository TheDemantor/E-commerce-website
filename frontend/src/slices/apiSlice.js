import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
                    //  ^this funtion allows us to make a request to our backend api   
import { BASE_URL } from '../constants.js'

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL } )

export const apiSlice = createApi({
    baseQuery, 
    tagTypes: ['Product', 'User', 'Order'],
    endpoints: (builder) => ({})

})
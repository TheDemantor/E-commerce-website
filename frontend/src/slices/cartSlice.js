import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {cartItems: [], shippingAdd: {}, paymentMethod: 'Paypal/UPI/COD'} ;

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action)=> {
            const item = action.payload;

            const existItem = state.cartItems.find((x)=> x._id === item._id );

            if(existItem){
                state.cartItems = state.cartItems.map((x)=> x._id === existItem._id ? item : x );
            } else {
                state.cartItems = [...state.cartItems, item]
            }

            return updateCart(state);
        },
        saveShippingAdd: (state, action)=>{
            state.shippingAdd = action.payload;
            return updateCart(state);
        },
        savePaymentMethod: (state, action)=>{
            state.paymentMethod = action.payload;
            return updateCart(state);
        },
        
        clearCart : (state, action)=>{
            state.cartItems = [];
            return updateCart(state);
        },
        deleteFromCart: (state, action)=> {
            state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
            
            return updateCart(state);
        },

    },
});

export const { addToCart, clearCart, deleteFromCart, saveShippingAdd, savePaymentMethod } = cartSlice.actions;

export default cartSlice.reducer 
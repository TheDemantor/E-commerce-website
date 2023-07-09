export const addDecimals = (num) => {
    return (Math.round(num*100) / 100).toFixed(2);
}

export const updateCart = (state) => {
    //Calculate item price
    state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.pricing*item.qty, 0));

    //Calculate shipping price
    state.shippingPrice = addDecimals(state.itemsPrice > 1000 ? 0 : 49);

    //Calculate tax price ( 12% )
    state.taxPrice = addDecimals(Number((0.12 * state.itemsPrice).toFixed(2)));

    //Calculate total price
    state.totalPrice = (
        Number(state.itemsPrice) + 
        Number(state.shippingPrice) + 
        Number(state.taxPrice) 
    ).toFixed(2);

    localStorage.setItem('cart', JSON.stringify(state));
    return state;
}
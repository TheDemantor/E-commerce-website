export const BASE_URL = process.env.NODE_ENV === 'development'? 'http://localhost:8000' : process.env.BASE_URL;
// export const BASE_URL = 'http://localhost:8000';
export const PRODUCT_URL = BASE_URL+'api/products';
export const USER_URL = BASE_URL+"api/users";
export const ORDERS_URL = BASE_URL+'api/orders';
export const PAYPAL_URL = BASE_URL+'api/config/paypal'


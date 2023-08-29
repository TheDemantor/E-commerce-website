export const BASE_URL = process.env.NODE_ENV === 'development'? 'http://localhost:8000' : 'https://royalsaravna.onrender.com/';
// // export const BASE_URL = 'http://localhost:8000';
// export const PRODUCT_URL = BASE_URL+'api/products';
// export const USER_URL = BASE_URL+"api/users";
// export const ORDERS_URL = BASE_URL+'api/orders';
// export const PAYPAL_URL = BASE_URL+'api/config/paypal'

// export const BASE_URL =
//   process.env.NODE_ENV === 'develeopment' ? 'http://localhost:5000' : '';
// export const BASE_URL = ''; // If using proxy
export const PRODUCT_URL = '/api/products';
export const USER_URL = '/api/users';
export const ORDERS_URL = '/api/orders';
export const PAYPAL_URL = '/api/config/paypal';

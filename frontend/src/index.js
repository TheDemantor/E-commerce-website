import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HelmetProvider } from 'react-helmet-async';
// import { AppProvider } from './context/productContext';
//from Udemy
import { Provider } from 'react-redux'
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // this app provider is written here so that the context can be accessed by any chidren of this index, and this will provide the data from the global storage=>Context API
  // <AppProvider>  //for context API
  <React.StrictMode>
    {/* same function as app protvider, but for redux */}
    <HelmetProvider>
      <Provider store={store}>
      <PayPalScriptProvider  deferLoading={true} >
          <App />
        </PayPalScriptProvider>
      </Provider>
      {/* this app component will be acting like a children to this provider */}
    </HelmetProvider>
  </React.StrictMode>
  // </AppProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

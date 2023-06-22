import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AppProvider } from './context/productContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // this app provider is written here so that the context can be accessed by any chidren of this index, and this will provide the data from the global storage=>Context API
  <AppProvider>  
    <React.StrictMode>
      <App />
      {/* this app component will be acting like a children to this provider */}
    </React.StrictMode>
  </AppProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

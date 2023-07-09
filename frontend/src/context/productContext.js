// create a Context 
// Provider  
// Consumer   => use context hook  
// use context hook is used to simplify consumer part of useContext react to make it simpler

// context API ios the global storage which is made accessible to all the childeren in our raect app
import { createContext, useContext, useEffect, useReducer, React } from "react";
import axios from "axios";
import reducer from '../reducers/productReducer'

const API = "http://localhost:8000/api/products/";

const initialState = {
    isLoading: false,
    isError: false,
    products: [],
    filteredProducts: []
};

const AppContext = createContext();
// this create context have two things: provider and consumer

const AppProvider = ({ children }) => { //here the children will the app conponent, as we have placed the app component under this
    // return <AppContext.Provider value={ {key : "69"}}>{children}</AppContext.Provider>// this lien is to demonstrate how we can give data to global, and can access form anywhere and at home(ex)
    
    const [state, dispatch] = useReducer(reducer, initialState);

    

    //useEffect hook is fired auto when the page is loaded
    const getProducts= async (url)=>{
        const res = (await axios.get(url));
        const products = await res.data;
        console.log(products);

        // const products = await res.data;

    }

    useEffect (()=>{
        getProducts(API);
    }, []);

    //"[]" -> this is called the array dependency, so that whenever the page loads, it will only fire this useEffect one time
    
    return <AppContext.Provider value={{ ...state }}>
        {children}
    </AppContext.Provider>

};


// Here we have to export two hooks so why not to eliminate this and make our won custom hook
// export {  AppContext};

//CUSTOM HOOK
const useProductContext = () =>{
    return useContext(AppContext);
};

export { AppProvider, useProductContext };//here we only have to import only one hook
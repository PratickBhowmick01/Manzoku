import { createStore, combineReducers, applyMiddleware, compose } from "redux";
//import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { deleteProductReducer, newProductReducer, productDetailsReducer, productReducer, updateProductReducer } from "./reducers/productReducer";
import {userReducer} from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";

const reducer = combineReducers({
    products : productReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    cart: cartReducer,
    newProduct: newProductReducer,
    deleteProduct: deleteProductReducer,
    updateProduct: updateProductReducer,
});

let initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems")
         ? JSON.parse(localStorage.getItem("cartItems"))
         : [],
    },
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))

);

export default store;
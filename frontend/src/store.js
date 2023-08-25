import { createStore, combineReducers, applyMiddleware, compose } from "redux";
//import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productDetailsReducer, productReducer } from "./reducers/productReducer";
import { userReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { newOrderReducer } from "./reducers/orderReducer";

const reducer = combineReducers({
    products : productReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    cart: cartReducer,
    newOrder: newOrderReducer
});

let initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems")
         ? JSON.parse(localStorage.getItem("cartItems"))
         : [],
         shippingInfo: localStorage.getItem("shippingInfo")
         ? JSON.parse(localStorage.getItem("shippingInfo"))
         : {},
    },
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))

);

export default store;
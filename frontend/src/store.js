import { createStore, combineReducers, applyMiddleware } from "redux";
//import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productDetailsReducer, productReducer } from "./reducers/productReducer";

const reducer = combineReducers({
    products : productReducer,
    productDetails: productDetailsReducer
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))

);

export default store;
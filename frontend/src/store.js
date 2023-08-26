import { createStore, combineReducers, applyMiddleware, compose } from "redux";
//import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { deleteProductReducer, newProductReducer, productDetailsReducer, productReducer, updateProductReducer } from "./reducers/productReducer";
import {allUsersReducer, profileReducer, userDetailsReducer, userReducer} from "./reducers/userReducer";

const reducer = combineReducers({
    products : productReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    cart: cartReducer,
    newProduct: newProductReducer,
    deleteProduct: deleteProductReducer,
    updateProduct: updateProductReducer,
    profile: profileReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))

);

export default store;
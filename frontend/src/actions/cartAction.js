import { ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO } from "../constants/cartConstant"; 
import axios from "axios";
import store from "../store.js";

//ADD TO CART
export const addItemsToCart = (id, quantity) => async (dispatch) => {


        const { data } = await axios.get(`/api/v1/product/${Object(id)}`);

        dispatch({
            type: ADD_TO_CART,
            payload: {
                product: data.product._id,
                name: data.product.name,
                price: data.product.price,
                image: data.product.images[0].url,
                stock: data.product.stock,
                quantity
            },
        });


        localStorage.setItem("cartItems", JSON.stringify(store.getState().cart.cartItems));
};


//REMOVE FROM CART
export const removeItemsFromCart = (id) => async (dispatch) => {
    dispatch({
        type: REMOVE_CART_ITEM,
        payload: id
    });

    localStorage.setItem("cartItems", JSON.stringify(store.getState().cart.cartItems));
};


//SAVE_SHIPPING_INFO
export const saveShippingInfo = (data) => async (dispatch) => {
    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data
    });

    localStorage.setItem("shippingInfo", JSON.stringify(data));
}

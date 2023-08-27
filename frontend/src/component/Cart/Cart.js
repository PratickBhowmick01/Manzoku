import React, { Fragment } from "react";
import Header from "../layout/Header/Header"; 
import "./Cart.css";
import CartItemCard from "./CartItemCard.js";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction.js";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'

const Cart = () => {


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);

    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (stock <= quantity) {
            return;
        }
        dispatch(addItemsToCart(id, newQty));
    };

    const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if (1 >= quantity) {
            return;
        }
        dispatch(addItemsToCart(id, newQty));
    };

    const deleteCartItems = (id) => {
        dispatch(removeItemsFromCart(id));
    };

    const checkoutHandler = () => {
        navigate("/login?redirect=shipping");
    };


    return (
    <Fragment>
        <Header />
        {cartItems.length === 0 ? (
            <div className="emptyCart">
                <RemoveShoppingCartIcon />

                <h1>No product in your cart</h1>
                <Link to="/products">View Products</Link>
            </div>
        ): (
        <Fragment>

        <div className="cartPage">
            <div className="cartHeader">
                <p>Product</p>
                <p>Quantity</p>
                <p>Subtotal</p>

            </div>

    {cartItems && cartItems.map((item)=>(
        <div className="cartContainer" key={item.product}>
        <CartItemCard item={item} deleteCartItems={deleteCartItems} />
        <div className="cartInput">
            <button onClick={()=>decreaseQuantity(item.product,item.quantity)}>-</button>
            <input type="number" value={item.quantity} readOnly/>
            <button onClick={()=>increaseQuantity(item.product,item.quantity,item.stock)}>+</button>

        </div>
        <p className="cartSubtotal">{`Tk.${item.price * item.quantity}`}</p>

    </div>
    ))}

            <div className="cartTotalProfit">
                <div></div>
                <div className="cartTotalProfitBox">
                    <p>Total Price</p>
                    <p>{`Tk.${cartItems.reduce(
                        (acc, item) => acc + item.quantity * item.price,
                        0
                    )}`}</p>
                </div>
                <div></div>
                <div className="checkOutBtn">
                    <button onClick={checkoutHandler}>Check Out</button>
                </div>
            </div>

        </div>

    </Fragment>)}
    </Fragment>
    
    );
};

export default Cart;
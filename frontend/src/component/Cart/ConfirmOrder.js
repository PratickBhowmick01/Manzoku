import React, { Fragment } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/Metadata/MetaData";
import "./ConfirmOrder.css";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import Header from "../layout/Header/Header";
import { useNavigate } from "react-router-dom";


const ConfirmOrder = () => {
    const navigate = useNavigate();
    const {shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
    );

    const shippingCharges = subtotal > 1000 ? 0 : 100;

    const totalPrice = subtotal + shippingCharges;
    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.pinCode}, ${shippingInfo.country} `;

    const proceedToPayment = () => {
        const data = {
            subtotal,
            shippingCharges,
            totalPrice
        };

        sessionStorage.setItem("orderInfo", JSON.stringify(data));
        navigate("/process/payment")
    };




    return (
        <Fragment>
            <MetaData title="Confirm Order" />
            <Header />
            <CheckoutSteps activeStep={1} />
             <div className="confirmOrderPage">
                <div>
                    <div className="confirmShippingArea">
                        <Typography>Shipping Info</Typography>
                        <div className="confirmShippingAreaBox">
                            <div>
                                <p>Name:</p>
                                <span>{user.name}</span>
                            </div>
                            <div>
                                <p>Phone:</p>
                                <span>{shippingInfo.phoneNo}</span>
                            </div>
                            <div>
                                <p>Address:</p>
                                <span>{address}</span>
                            </div>

                        </div>

                    </div>
                
                    <div className="confirmCartItems">
                        <Typography>Your Cart Items:</Typography>
                        <div className="confirmCartItemsContainer">
                            {cartItems &&
                            cartItems.map((item)=> (
                                <div key={item.product}>
                                    <img src={item.image} alt="Product"/>
                                    <Link to={`/product/${item.product}`}>
                                        {item.name}
                                    </Link>{" "}
                                    <span>
                                        {item.quantity} X Tk.{item.price} = {" "}
                                        <b>Tk.{item.price * item.quantity}</b>
                                    </span>

                                </div>

                            ))}
                        </div>
                    </div>

                </div>
                {/* */}
                <div>
                    <div className="orderSummary">
                        <Typography>Order Summary</Typography>
                        <div>
                            <div>
                                <p>Subtotal:</p>
                                <span>Tk.{subtotal}</span>
                            </div>
                            <div>
                                <p>Shipping Charges:</p>
                                <span>Tk.{shippingCharges}</span>
                            </div>
                        </div>
                        <div className="orderSummaryTotal">
                            <p>
                                <b>Total:</b>
                            </p>
                            <span>Tk.{totalPrice}</span>

                        </div>
                        <button onClick={proceedToPayment}>Proceed To Payment</button>

                    </div>
                </div>


            </div>
            

        </Fragment>
   
    );
};



export default ConfirmOrder;
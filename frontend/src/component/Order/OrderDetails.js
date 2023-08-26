import React, { Fragment, useEffect } from "react";
import Header from "../layout/Header/Header";
import MetaData from "../layout/Metadata/MetaData";
import "./OrderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { getOrderDetails, clearError } from "../../actions/orderAction";
import Loader from "../layout/Loader/loader";
import { useAlert } from "react-alert";


const OrderDetails = () => {

    const { order, error, loading } = useSelector((state) => state.orderDetails);
    const dispatch = useDispatch();
    const alert = useAlert();
    const { id } = useParams();


    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError());
        }

        dispatch(getOrderDetails(id));
    }, [dispatch, alert, error, id]);
    return (
        
        <Fragment>
            {loading ? 
            <Loader />
        : <Fragment>
            <MetaData title={"Order Details"} />
            <Header />
            <div className="orderDetailsPage">
                <div className="orderDetailsContainer">
                    <Typography component="h1">
                        Order #{order && order._id}

                    </Typography>
                    <Typography>Shipping Info-</Typography>
                    <div className="orderDetailsContainerBox">
                        <div>
                            <p>Name:</p>
                            <span>{order.user && order.user.name}</span>
                        </div>
                        <div>
                            <p>Phone:</p>
                            <span>{order.shippingInfo && order.shippingInfo.phoneNo}</span>

                        </div>
                        <div>
                            <p>Address:</p>
                            <span>{order.shippingInfo && `${order.shippingInfo.address},
                             ${order.shippingInfo.city}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country} `}</span>
                        </div>

                    </div>
                    <Typography>Payment-</Typography>
                    <div className="orderDetailsContainerBox">
                        <div>
                            <p className={
                                order.paymentInfo && order.paymentInfo.status === "succeeded"
                                ? "greenColor"
                                : "redColor"
                            }>
                                {order.paymentInfo && order.paymentInfo.status === "succeeded"
                                ? "Paid"
                                : "Not Paid"
                            }

                            </p>
                        </div>

                        <div>
                            <p>Amount:</p>
                            <span>Tk.{order.totalPrice && order.totalPrice}</span>
                        </div>

                    </div>
                    <Typography>Order Status-</Typography>
                    <div className="orderDetailsContainerBox">
                        <div>
                            <h2 className={order.orderStatus && order.orderStatus === "Delivered"
                                ? "deliveredColor"
                                : "processingColor"}>
                                    {order.orderStatus && order.orderStatus}

                            </h2>
                        </div>

                    </div>

                </div>

                <div className="orderDetailsCartItems">
                    <Typography>Ordered Items-</Typography>
                    <div className="orderDetailsCartItemsContainer">
                        {order.orderItems &&
                        order.orderItems.map((item) => (
                            <div key={item.product}>
                                <img src={item.image} alt="Product" />
                                <Link to={`/product/${item.product}`}>
                                    {item.name}
                                </Link>{" "}
                                <span>
                                    {item.quantity} X Tk.{item.price} ={" "}
                                    <b>Tk.{item.price * item.quantity}</b>
                                </span>

                            </div>
                        ))}

                    </div>
                </div>

            </div>
            </Fragment>}
            

        </Fragment>
    )
};

export default OrderDetails;
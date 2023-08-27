import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../../layout/Metadata/MetaData";
import { Link, useParams } from "react-router-dom";
import Header from "../../layout/Header/Header";
import { useNavigate } from "react-router-dom";
import SideBar from "../Sidebar/Sidebar";
import { useAlert } from "react-alert";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from "@material-ui/core";
import { getOrderDetails, clearError, updateOrder } from "../../../actions/orderAction";
import { UPDATE_ORDER_RESET } from "../../../constants/orderConstant";
import Loader from "../../layout/Loader/loader";
import "./ProcessOrder.css";


const ProcessOrder = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const { id } = useParams();
    const { order, error, loading } = useSelector((state) => state.orderDetails);
    const { error: updateError , isUpdated } = useSelector((state) => state.order);
    
    const [status, setStatus] = useState("");
    

    const updateOrderSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("status", status);

        dispatch(updateOrder(id, myForm));

    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError());
        }

        if (updateError) {
            alert.error(updateError);
            dispatch(clearError());
        }

        if (isUpdated) {
            alert.success("Order Updated Successfully");
            dispatch({type:UPDATE_ORDER_RESET});
        }

        dispatch(getOrderDetails(id));
    }, [dispatch, alert, error, id, isUpdated, updateError]);




    return (

        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
            <MetaData title="Process Order" />
            <div className="dashboard">
                <SideBar />
                <div className="newProductContainer">
                <div className="confirmOrderPage">
                <div>
                    <div className="confirmShippingArea">
                        <h1>Shipping Info</h1>
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
                        <h1 >Payment-</h1>
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
                    <h1 >Order Status-</h1>
                    <div className="orderDetailsContainerBox">
                        <div>
                            <h2 className={order.orderStatus && order.orderStatus === "Delivered"
                                ? "greyColor"
                                : "blackColor"}>
                                    {order.orderStatus && order.orderStatus}

                            </h2>
                        </div>

                    </div>

                    </div>
                
                    <div className="confirmCartItems">
                        <h1>Your Cart Items:</h1>
                        <div className="confirmCartItemsContainer">
                            {order.orderItems &&
                            order.orderItems.map((item)=> (
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
                <div
                    style={{display: order.orderStatus === "Delivered" ? "none" : "block",
                    }}>
                <form
                        className="createProductForm"
                        encType="multipart/form-data"
                        onSubmit={updateOrderSubmitHandler}
                    >
                        <h1>Process Order</h1>

                        <div>
                            <AccountTreeIcon />
                            <select
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="">Choose Category</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                                
                            </select>
                        </div>


                        <Button
                            id="createProductBtn"
                            type="submit"
                            disabled={loading ? true : false || status === "" ? true : false}
                        >
                            Update
                        </Button>
                    </form>
                </div>


            </div>
                </div>
            </div>
        </Fragment>

            )}
        </Fragment>
        
             
            

   
    );
};



export default ProcessOrder;
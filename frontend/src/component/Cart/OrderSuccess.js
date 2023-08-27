import React, { Fragment } from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./OrderSuccess.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import Header from "../layout/Header/Header";

const OrderSuccess = ( ) => {
    return (
        <Fragment>
            <Header />
            <div className="orderSuccess">
                <CheckCircleIcon />
                <h1>Your Order has been placed!</h1>
                <Link to="/orders">View Orders</Link>
            </div>
        </Fragment>
       
    );
};


export default OrderSuccess;
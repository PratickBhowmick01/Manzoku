import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./MyOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearError, myOrders } from "../../actions/orderAction";
import Loader from "../layout/Loader/loader.js";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Typography } from "@material-ui/core";
import MetaData from "../layout/Metadata/MetaData.jsx";
import LaunchIcon from "@material-ui/icons/Launch";
import Header from "../layout/Header/Header.js";


const MyOrders = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, error, order } = useSelector((state) => state.myOrder);
    const { user } = useSelector((state) => state.user);

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 1},

        { field: "status", 
        headerName: "Status",
        minWidth: 150,
        flex: 0.5,
        cellClassName: (params) => {
            return params.getValue(params.id, "status") === "Delivered"
            ? "deliveredColor"
            : "processingColor"
            
        }
        },

        { field: "quantity", 
        headerName: "Quantity",
        type: "number",
        minWidth: 150,
        flex: 0.3
        },

        { field: "amount", 
        headerName: "Amount",
        type: "number",
        minWidth: 270,
        flex: 0.5
        },

        { field: "actions", 
        headerName: "Actions",
        type: "number",
        minWidth: 150,
        flex: 0.3,
        sortable: false,
        renderCell: (params) => {
            return (
                <Link to={`/order/${params.getValue(params.id, "id")}`}>
                    <LaunchIcon />
                </Link>
                );
            },
        },
    ];

    const rows = [];

    order &&
        order.forEach((item) => {
            rows.push({
                quantity: item.orderItems.length,
                id: item._id,
                status: item.orderStatus,
                amount: item.totalPrice
            });
            
        });

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError());
        }

        dispatch(myOrders());
    }, [dispatch, alert, error]);

    return (<Fragment>
        <MetaData title={"Orders"} />
        

        {loading ? (
            <Loader />
        ) : (
            <Fragment>
                <Header />
                <div className="myOrdersPage">
                   <DataGrid
                   rows={rows}
                   columns={columns}
                   pageSize={10}
                   disableSelectionOnClick
                   className="myOrdersTable"
                   autoHeight/>

                   <Typography className="myOrdersHeading">{user.name}'s Orders</Typography>
                </div>

            </Fragment>

        )}

    </Fragment>)
};


export default MyOrders;

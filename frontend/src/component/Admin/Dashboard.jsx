import React, { useEffect } from 'react'
import Sidebar from "./Sidebar/Sidebar"
import "./Dashboard.css"
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProduct } from '../../actions/productAction';
import { getAllUsers } from '../../actions/userAction';
// import Options from '../layout/Header/Options';

const Dashboard = () => {

    const dispatch = useDispatch();

    const { products } = useSelector((state)=> state.products);
    // const { user } = useSelector((state)=> state.user)
    

     let outOfStock = 0;

     products && products.forEach(item => {
        if (item.stock === 0){
            outOfStock += 1;
        }
     });

    useEffect(()=>{
        dispatch(getAdminProduct());
        // dispatch(getAllUsers());
    }, [dispatch]);


    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
            {
                label: "TOTAL AMOUNT",
                backgroundColor: ["#F94C10"],
                hoverBackgroundColor: ["rgb(197, 72, 49)"],
                data: [0, 4000],
            },
        ],
    };
    const doughnutState = {
        labels: ["Out of Stock", "InStock"],
        datasets: [
            {
                backgroundColor: ["#7091F5", "#793FDF"],
                hoverBackgroundColor: ["#4B5000", "#35014F"],
                data: [outOfStock, products.length-outOfStock],
            },
        ],
    };
    return (
        <div className="dashboard">
            <Sidebar />
            {/* <Options/> */}
            <div className="dashboardContainer">
                <Typography component="h1">Dashboard</Typography>

                <div className="dashboardSummary">
                    <div>
                        <p>
                            Total Amount <br /> ৳100000
                        </p>
                    </div>
                    <div className="dashboardSummaryBox2">
                        <Link to="/admin/products">
                            <p>Product</p>
                            <p>{products && products.length}</p>
                        </Link>
                        <Link to="/admin/orders">
                            <p>Orders</p>
                            <p>4</p>
                        </Link>
                        <Link to="/admin/users">
                            <p>Users</p>
                            <p>40</p>
                        </Link>
                    </div>
                </div>
                <div className="lineChart">
                    <Line data={lineState} />
                </div>
                <div className="doughnutChart">
                    <Doughnut data={doughnutState} />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
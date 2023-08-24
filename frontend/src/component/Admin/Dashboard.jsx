import React from 'react'
import Sidebar from "./Sidebar/Sidebar"
import "./Dashboard.css"
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';

const Dashboard = () => {
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
                data: [100, 100],
            },
        ],
    };
    return (
        <div className="dashboard">
            <Sidebar />
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
                            <p>50</p>
                        </Link>
                        <Link to="/admin/orders">
                            <p>Orders</p>
                            <p>4</p>
                        </Link>
                        <Link to="/admin/users">
                            <p>Users</p>
                            <p>4</p>
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
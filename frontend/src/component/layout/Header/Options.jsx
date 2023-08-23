import React, { Fragment, useState } from "react";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
// import settings from '../../../images/options-icon.png';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../actions/userAction";
import { useDispatch } from "react-redux";
import Backdrop from "@material-ui/icons/Dashboard";
import "./Options.css"

const Options = ({ user }) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const options = [
        { icon: <ListAltIcon />, name: "Orders", func: orders },
        { icon: <PersonIcon />, name: "Profile", func: account },
        { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
    ];


    if (user.role === "admin") {
        options.unshift({
            icon: <DashboardIcon />,
            name: "Dashboard",
            func: dashboard,
        });
    }

    function dashboard() {
        navigate("/dashboard");
    }
    function orders() {
        navigate("/orders");
    }
    function account() {
        navigate("/account");
    }
    function logoutUser() {
        dispatch(logout());
        alert("Logout Successfully")
        navigate("/")
    }
    return (
        <Fragment>
            {/* <Backdrop open={open} style={{ zIndex: "10" }} /> */}
            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                style={{ zIndex: "11" }}
                direction="down"
                className="speedDial"
                icon={<TuneRoundedIcon />}
                FabProps={{ size: "medium", style: { backgroundColor: "black" } }}
            >
                {options.map((item) => (
                    <SpeedDialAction
                        key={item.name}
                        icon={item.icon}
                        tooltipTitle={item.name}
                        onClick={item.func}
                        tooltipOpen={window.innerWidth <= 600 ? true : false}
                    />
                ))}
            </SpeedDial>
        </Fragment>

    );
}

export default Options;
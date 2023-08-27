import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/all";
import Homepage from "../../images/Homepage.png";
import "./Home.css";
<<<<<<< HEAD
import ProductCard from "../Home/ProductCard";
=======
import ProductCard from "./ProductCard.js";
>>>>>>> c21e6462ac64378d4b001b2be28b3a6e9c353568
import Header from "../layout/Header/Header.js";
import Footer from "../layout/Footer/Footer.js";
import Options from "../layout/Header/Options";
import { getProduct } from "../../actions/productAction.js";
import { loadUser } from "../../actions/userAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/loader.js";
import {useAlert} from "react-alert";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/Metadata/MetaData.jsx";




const Home = () => {


    const alert = useAlert();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector(
        (state) => state.products
    );
    const {isAuthenticated} = useSelector((state)=>state.user);

    useEffect(() => {

        if (error) {
            return alert.error(error);
        }
        dispatch(getProduct());
        dispatch(loadUser());
    }, [dispatch,error]);

    return (
    <Fragment>
        {loading ? (
            <Loader />
        ) : (
            <Fragment>
                <MetaData title="Home" />
                <Header />
                
                <div className="banner">
                    <img src={Homepage} alt="Homepage" />
                    <div>
                        <h1>Welcome To <b>Manzoku</b></h1>
                        
        
                        <a href="#container">
                            <button>
                                Scroll <CgMouse />
        
                            </button>
        
                        </a>
        
                    </div>
                    
                </div>
                <h2 className="homeHeading">Our Featured Products </h2>
                <div className="container" id="container">
                    {products && products.map((product) => <ProductCard product={ product } />)}
                </div>
                <div className="buttons">
                {!isAuthenticated ? <button className="Sign-Up" onClick={() => navigate("/register")}>Sign Up </button>: "" }
                {!isAuthenticated ? <button className="Sign-Up" onClick={() => navigate("/login")}>Login </button>: "" }
                </div>
                <Footer />
            </Fragment>
        )}
        </Fragment>

        
       
    );

};

export default Home;
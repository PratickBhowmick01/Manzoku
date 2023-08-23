import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/all";
import Homepage from "../../images/Homepage.png";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import Header from "../layout/Header/Header.js";
import Footer from "../layout/Footer/Footer.js";

import { clearError, getProduct } from "../../actions/productAction.js";
import { loadUser } from "../../actions/userAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/loader.js";
import {useAlert} from "react-alert";
import { useNavigate } from "react-router-dom";




const Home = () => {


    const alert = useAlert();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error, products, productCount } = useSelector(
        (state) => state.products
    );
    const {isAuthenticated} = useSelector((state)=>state.user);

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearError());
        }
        dispatch(getProduct());
        dispatch(loadUser());
    }, [dispatch,error,alert]);

    return (
    <Fragment>
        {loading ? (
            <Loader />
        ) : (
            <Fragment>
                <Header />
                
                <div className="banner">
                    <img src={Homepage} alt="Homepage" />
                    <div>
                        <p>Welcome to <b>Manzoku</b></p>
                        
        
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
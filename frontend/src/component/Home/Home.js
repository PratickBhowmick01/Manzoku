import React, { Fragment } from "react";
import { CgMouse } from "react-icons/all";
import Homepage from "../../images/Homepage.png";
import "./Home.css";
import Product from "./Product.js";

const product = {
    name: "Gojo Satoru Action Figure",
    images: [{url: "https://shorturl.at/iuvBL"}],
    price: "Tk.9000",
    _id: "gsAction"

};


const Home = () => {
    return (
    <Fragment>
        <div className="banner">
            <img src={Homepage} alt="Homepage" />
            <div>
                <p>Welcome to <i>Manzoku</i></p>
                
                <h1>FIND UNIQUE ANIME MERCHANDISES BELOW</h1>

                <a href="#container">
                    <button>
                        Scroll <CgMouse />

                    </button>

                </a>

            </div>
            
        </div>
        <h2 className="homeHeading">Our Featured Products </h2>
        <div className="container" id="container">
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />

            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
        </div>
 

    </Fragment>
    );

};

export default Home;
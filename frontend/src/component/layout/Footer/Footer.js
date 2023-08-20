import React from "react";
import "./Footer.css";
import ios from "../../../images/ios.png";
import android from "../../../images/android.png";


const Footer = () => {
    return (
        <footer id="footer">
            <div className="leftFooter">
                <h1>Download Our App</h1>
                <div className="App">Download App for IOS & Android mobile phone</div>
                <img src={ios} alt="ios" />
                
                <img className="android" src={android} alt="android" />

            </div>
            <div className="rightFooter">
                <h1>Manzoku</h1>
                <p>High Quality is our First Priority</p>
                <p>Copyrights 2023 &copy; NoobCoders</p>

            </div>
        </footer>
    );
};

export default Footer;
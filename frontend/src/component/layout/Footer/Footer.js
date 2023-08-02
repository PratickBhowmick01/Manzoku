import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";


const Footer = () => {
    return (
        <footer id="footer">
            <div class="leftFooter">
                <h4>Download Our App</h4>
                <p>Download App for Android & IOS mobile phone</p>
                <img src={playStore} alt="playstore" />
                <img src={appStore} alt="Appstore" />

            </div>
            <div class="midFooter">
                <h1>Manzoku</h1>
                <p>High Quality is our First Priority</p>
                <p>Copyrights 2023 &copy; NoobCoders</p>

            </div>
        </footer>
    );
};

export default Footer;
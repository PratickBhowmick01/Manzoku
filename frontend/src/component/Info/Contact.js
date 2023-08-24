import React, { Fragment } from "react";
import Header from "../layout/Header/Header.js"
import "./Contact.css";
import contact from "../../images/contact.png";

const About = () => {
    return (
        <Fragment>
            <Header />
            <div className="ContactUs">
                <img src={contact} alt="contact" />
                <h1>Contact Us</h1>
                <div>
                    <p>Mohammed Sharraf Uddin: mohammed.sharraf.uddin@g.bracu.ac.bd</p>
                    <p>Mehnaz Ara Fazal: mehnaz.ara.fazal@g.bracu.ac.bd</p>

                </div>
                
            </div>

        </Fragment>
    )
    
};

export default About;
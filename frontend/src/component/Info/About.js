import React, { Fragment } from "react";
import Header from "../layout/Header/Header.js"
import "./About.css";
import about from "../../images/about.png";

const About = () => {
    return (
        <Fragment>
            <Header />
            <div className="AboutUs">
                <img src={about} alt="about" />
                <h1>NoobCoders</h1>
                <p className="mainPart">This is a project, done under the course CSE470 - 
                Software Engineering of BRAC University by 4th year students. Manzoku
                this website, acts as 
                an anime merchandise webiste where the most unique and high-quality 
                products are avaiable. This website may be refined even further in the future for international
                business as well. We, the NoobCoders, consist of Mohammed Sharraf Uddin & Mehnaz Ara Fazal</p>
            </div>

        </Fragment>
    )
    
};

export default About;
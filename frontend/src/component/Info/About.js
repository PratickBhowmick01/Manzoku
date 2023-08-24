import React, { Fragment } from "react";
import Header from "../layout/Header/Header.js"
import "./About.css";

const About = () => {
    return (
        <Fragment>
            <Header />
            <div className="AboutUs">
                <h1>NoobCoders</h1>
                <p className="mainPart">This is a project, done under the course CSE470 - 
                Software Engineering of BRAC University by 4th year students. Manzoku
                this website, acts as 
                an anime merchandise webiste where the most unique and high-quality 
                products are avaiable. This website may be refined even further in the future for international
                business as well.</p>
            </div>

        </Fragment>
    )
    
};

export default About;
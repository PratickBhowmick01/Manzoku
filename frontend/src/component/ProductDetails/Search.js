import React, { useState, Fragment } from "react";
import "./Search.css";

const Search = ({ history }) => {
    const [keyword, setKeyword] =useState("");

    const searchSubmitHandler = (e) =>{
        e.preventDefault();
        if(keyword.trim()) {
            history.push(`/products/ ${keyword}`);
        } else{
            history.push("/products");
        }
    };



    return (
     <Fragment>
        <from className ="searchBox" onSubmit={searchSubmitHandler}>
            <input
             type ="text"
             placeholder="Search a Product ..."
             onChange={(e) => setKeyword(e.target.value)}
             />
        </from>
     </Fragment>
    );
};

export default Search;
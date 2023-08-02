import './App.css';
import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginUser from './component/User/Login/LoginUser';
import './App.css';
import Header from "./component/layout/Header/Header.js";
import {BrowserRouter as Router} from "react-router-dom";
import React from "react";
import Footer from "./component/layout/Footer/Footer.js"

function App() {
    return (
        <Suspense>
            <Header />
            <Router>
                <Routes>
                    <Route exact path="/login" Component={LoginUser} />
                </Routes>
            </Router>
            <Footer />
        </Suspense>

)}
export default App;
import './App.css';
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import LoginUser from './component/User/Login/LoginUser.jsx';
import Register from './component/User/Register/Register';
// import Header from "./component/layout/Header/Header.js";
// import Footer from "./component/layout/Footer/Footer.js"

function App() {
    return (
        <Suspense>
            <Routes>
                <Route exact path="/login" Component={LoginUser} />
                <Route exact path="/register" Component={Register} />
            </Routes>
        </Suspense>

    )
}
export default App;
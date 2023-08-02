import './App.css';
import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginUser from './component/User/Login/LoginUser';

function App() {
    return (
        <Suspense>
            <Router>
                <Routes>
                    <Route exact path="/login" Component={LoginUser} />
                </Routes>
            </Router>
        </Suspense>

    );
}
export default App;
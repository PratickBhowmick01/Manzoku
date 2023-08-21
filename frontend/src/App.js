import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import React, { Suspense } from "react";
import Home from "./component/Home/Home.js";
import LoginUser from './component/User/Login/LoginUser.jsx';
import Register from './component/User/Register/Register.jsx';



function App() {
  return (
    <Suspense>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<LoginUser />} />
      </Routes>

      
    </Suspense>
   
  );
}
export default App;
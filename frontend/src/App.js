import './App.css';
import Header from "./component/layout/Header/Header.js";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import WebFont from "webfontloader";
import React, { Suspense } from "react";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import LoginUser from './component/User/Login/LoginUser.jsx';
import Register from './component/User/Register/Register.jsx';



function App() {
  
  
  React.useEffect(() => {
    WebFont.load({
      google:{
        families:["Book Antiqua","Droid Sans"]
      }
    });
  }, []);


  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<LoginUser />} />
      </Routes>

      <Footer />
    </Router>
   
  );
}
export default App;
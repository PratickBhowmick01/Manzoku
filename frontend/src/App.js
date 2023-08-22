import './App.css';
import {Routes,Route} from "react-router-dom";
import React, { Suspense, useEffect } from "react";
import Home from "./component/Home/Home.js";
import LoginUser from './component/User/Login/LoginUser.jsx';
import Register from './component/User/Register/Register.jsx';
import store from "./store"
import { loadUser } from './actions/userAction';
import Options from './component/layout/Header/Options';
import {  useSelector } from 'react-redux';
import OptionsButton from './component/layout/Header/OptionsButton';
import ProductDetails from './component/ProductDetails/ProductDetails.js';

function App() {
  
      useEffect(()=>{
        store.dispatch(loadUser());
      }, []);

      const {isAuthenticated, user} = useSelector((state)=> state.user)
  
      return (
        <Suspense>
          {isAuthenticated && <Options user={user}/>}

          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/product/:id" element={<ProductDetails />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<LoginUser />} />
          </Routes>
    
          
        </Suspense>
       
      );
    }
  
export default App;
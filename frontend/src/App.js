import './App.css';
import {Routes,Route} from "react-router-dom";
import React, { Suspense, useEffect } from "react";
import Home from "./component/Home/Home.js";
import LoginUser from './component/User/Login/LoginUser.jsx';
import Register from './component/User/Register/Register.jsx';
import store from "./store"
import { loadUser } from './actions/userAction';
import Options from './component/layout/Header/Options';
import { useSelector } from 'react-redux';
import ProductDetails from './component/ProductDetails/ProductDetails.js';
import products from './component/ProductDetails/Products.js';
import Search from "./component/ProductDetails/Search.js"

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
            <Route exact path="/products" element={<Products />} />
            <Route path="/products/:keyword" element={<Products />} />
            <Route exact path="/search" element={<Search />} />
          </Routes>
    
          
        </Suspense>
       
      );
    }
  
export default App;
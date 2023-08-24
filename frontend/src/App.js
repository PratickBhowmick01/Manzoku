import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import React, { Suspense, useEffect } from "react";
import Home from "./component/Home/Home.js";
import LoginUser from './component/User/Login/LoginUser.jsx';
import Register from './component/User/Register/Register.jsx';
import store from "./store"
import { loadUser } from './actions/userAction';
import Options from './component/layout/Header/Options';
import { useSelector } from 'react-redux';
import ProductDetails from './component/ProductDetails/ProductDetails.js';
import Cart from "./component/Cart/Cart.js";
import About from "./component/Info/About.js";
import Profile from './component/User/Profile/Profile.js';
import ProtectedRoute from './component/Route/ProtectedRoute.js';
import products from './component/ProductDetails/Products.js';
import Search from "./component/ProductDetails/Search.js";
import Products from "./component/Products/Products.js";

function App() {

  const { isAuthenticated, user } = useSelector((state) => state.user)
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  
      return (
        <Suspense>
          {isAuthenticated && <Options user={user}/>}

          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/product/:id" element={<ProductDetails />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<LoginUser />} />
            <Route exact path="/Cart" element={<Cart />} />
            <Route exact path="/Account" element={<Profile />} />
            <Route exact path="/product" element={<Products />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/products" element={<products />} />
            <Route path="/products/:keyword" element={<products />} />
            <Route exact path="/search" element={<Search />} />
          </Routes>
    
          
        </Suspense>
       
      );
    }
  
export default App;
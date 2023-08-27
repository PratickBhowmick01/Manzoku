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
import Profile from './component/User/Profile/Profile';
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateUser from "./component/Admin/UpdateUser/UpdateUser"
import ProductReviews from "./component/Admin/ProductReviews/ProductReviews";

function App() {

  const { isAuthenticated, user } = useSelector((state) => state.user)
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);


  return (
    <Suspense>
      {isAuthenticated && <Options user={user} />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<LoginUser />} />
        <Route exact path="/Account" element={<Profile />} />
        <Route  exact path="/admin/dashboard" element={<Dashboard />} />
        <Route  exact path="/admin/products" element={<ProductList />} />
        <Route exact path="/admin/product" element={<CreateProduct/>} />
        <Route exact path="/admin/product/:id" element={<UpdateProduct/>} />
        <Route exact path="/admin/users" element={<UsersList/>} />
        <Route exact path="/admin/user/:id" element={<UpdateUser/>} />
        <Route exact path="/admin/reviews" element={<ProductReviews/>} />
        
      </Routes>


    </Suspense>

  );
}

export default App;
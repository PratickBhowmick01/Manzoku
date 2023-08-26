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
import Profile from "./component/User/Profile/Profile.jsx";
import Products from './component/ProductDetails/Products.js';
import Contact from "./component/Info/Contact.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import Payment from "./component/Cart/Payment.js";
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import MyOrders from "./component/Order/MyOrders.js";
import Profile from './component/User/Profile/Profile';
import ProtectedRoute from './component/Route/ProtectedRoute';
import Dashboard from "./component/Admin/Dashboard.jsx"
import ProductList from "./component/Admin/ProductList/ProductList"
import CreateProduct from './component/Admin/CreateProduct/CreateProduct';  
import UpdateProduct from './component/Admin/UpdateProduct/UpdateProduct';
import UsersList from './component/Admin/UsersList/UsersList';


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
            <Route exact path="/about" element={<About />} />
            <Route exact path="/products" element={<Products />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/login/shipping" element={<Shipping />} />
            <Route exact path="/order/confirm" element={<ConfirmOrder />} />
            <Route exact path="/success" element={<OrderSuccess />} />
            <Route exact path="/orders" element={<MyOrders />} />
            <Route exact path="/order/:id" element={<OrderDetails />} />
            <Route  exact path="/admin/dashboard" element={<Dashboard />} />
            <Route  exact path="/admin/products" element={<ProductList />} />
            <Route exact path="/admin/product" element={<CreateProduct/>} />
            <Route exact path="/admin/product/:id" element={<UpdateProduct/>} />
            <Route exact path="/admin/users" element={<UsersList/>} />
            <Route exact path="/admin/user/:id" element={<UsersList/>} />
            
            
            
          </Routes>
          {stripeApiKey && (
            <Elements stripe={loadStripe(stripeApiKey)}>
              <Routes>
                <Route exact path="/process/payment" element={<Payment />} />
              </Routes>
              

            </Elements>
            )}
          
    
          
        </Suspense>
       
      );
    }
  
export default App;
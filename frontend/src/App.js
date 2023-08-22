import './App.css';
import {Routes,Route} from "react-router-dom";
import React, { Suspense } from "react";
import Home from "./component/Home/Home.js";
import LoginUser from './component/User/Login/LoginUser.jsx';
import Register from './component/User/Register/Register.jsx';
import store from "./store"
import { loadUser } from './actions/userAction';



function App() {
  React.useEffect(()=>{
    store.dispatch(loadUser());
  }, []);
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
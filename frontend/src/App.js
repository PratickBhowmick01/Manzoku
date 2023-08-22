import './App.css';
import {Routes,Route, BrowserRouter} from "react-router-dom";
import React, { Suspense } from "react";
import Home from "./component/Home/Home.js";
import LoginUser from './component/User/Login/LoginUser.jsx';
import Register from './component/User/Register/Register.jsx';
import store from "./store"
import { loadUser } from './actions/userAction';
import Options from './component/layout/Header/Options';
import {  useSelector } from 'react-redux';
import OptionsButton from './component/layout/Header/OptionsButton';


function App() {

  const {isAuthenticated, user} = useSelector((state)=> state.user)
  React.useEffect(()=>{
    store.dispatch(loadUser());
  }, []);

    return (
      <Suspense>
       {isAuthenticated && <Options user={user}/>}
        <BrowserRouter>
          <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<LoginUser />} />
          </Routes>
          {/* {isAuthenticated && <Options user={user}/>} */}
        </BrowserRouter>
       </Suspense>
    )
  }
export default App;
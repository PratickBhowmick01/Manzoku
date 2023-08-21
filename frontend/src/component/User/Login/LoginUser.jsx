import React, { Fragment, useState, useEffect} from 'react'
import './LoginUser.css'
import anime from "../../../img/pikachu.jpeg"
import Loader from '../../layout/Loader/Loader'; 
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, login } from '../../../actions/userAction';
// import { useAlert } from "react-alert";

const LoginUser = () => {

  const dispatch = useDispatch();
  // const alert = useAlert();

  const { error, loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if(isAuthenticated){
      
    }
  }, [dispatch, error, alert])


  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");


  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword))
  }

  const navigate = useNavigate()
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="login">
            <div className="inside-box">
              <div className="left-user">
                <img d-sm-inline-block-hidden src={anime} alt="anime pic" />
              </div>
              <div className="right">
                <h2 >Login</h2>
                <p>If you are already a member, please Log in</p>
                <form onSubmit={loginSubmit}>
                  <input className='email' type="text" name='email' placeholder='Email' required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                  <input className='pass' type="password" name='password' placeholder='Password' required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                  <button className='log-button'>Login </button>
                  <a className='register' href="" onClick={() => navigate("/register")}>Don't have an account? Sign In</a>
                </form>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default LoginUser
import React, { useState, useEffect, Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import anime from "../../../images/register.png"
import Loader from '../../layout/Loader/Loader'; 
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, register } from '../../../actions/userAction';
import './Register.css'

const Register = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { error, loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      // alert.error(error);
      dispatch(clearErrors());
    }
    if(isAuthenticated){
      navigate("/")
    }
  }, [dispatch, error])

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  })

  const { name, email, password } = user;

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    dispatch(register(myForm))

  }

  const registerDataChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="RegisterUser">
            <div className="box">
              <div className="left">
                <img d-sm-inline-block-hidden src={anime} alt="anime pic" />
              </div>
              <div className="right">
                <h2 >Register</h2>
                {/* <p>If you are already a member, please Log in</p> */}
                <form action="" onSubmit={registerSubmit}>
                  <input className='name' type="text" name='name' placeholder='Username' required value={name} onChange={registerDataChange} />
                  <input className='email' type="text" name='email' placeholder='Email' required value={email} onChange={registerDataChange} />
                  <input className='pass' type="password" name='password' placeholder='Password' required value={password} onChange={registerDataChange} />
                  <button className='log-button'>Register </button>
                  <a className='register' href="" onClick={() => navigate("/login")}>Already have an account? Log In</a>
                </form>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>

  )
}

export default Register
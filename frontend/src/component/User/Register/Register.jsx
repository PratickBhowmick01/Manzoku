import React from 'react'
import { useNavigate } from 'react-router-dom'
import anime from "../../../img/naruto.jpeg"
import './Register.css'

const Register = () => {
const navigate = useNavigate();
  return (
    <div className="RegisterUser">
        <div className="box">
        <div className="left">
          <img d-sm-inline-block-hidden src={anime} alt="anime pic" />
        </div>
        <div className="right">
          <h2 >Register</h2>
          {/* <p>If you are already a member, please Log in</p> */}
          <form action="">
            <input className='email' type="text" name='email' placeholder='Email' />
            <input className='pass' type="text" name='password' placeholder='Password' />
            <button className='log-button'>Register </button>
            <a className='register' href="" onClick={()=>navigate("/login")}>Already have an account? Log In</a>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
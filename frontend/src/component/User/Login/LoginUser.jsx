import React from 'react'
import './LoginUser.css'
import anime from "../../../img/pikachu.jpeg"

const LoginUser = () => {
  return (
      
        <div 
        className="login">
            <div className="inside-box">
              <div className="left">
                  <img d-sm-inline-block-hidden src={anime} alt="anime pic" />
              </div>
              <div className="right">
                  <h2 >Login</h2>
                  <p>If you are already a member, please Log in</p>
                  <form action="">
                    <input className='email' type="text" name='email' placeholder='Email'/>
                    <input className='pass' type="text" name='password' placeholder='Password'/>
                    <button className='log-button'>Login </button>
                    <a className='register' href="">Don't have an account? Sign In</a>
                  </form>
              </div>
            </div>
        </div>
        // <div style={{backgroundColor: 'black'}}
        // className="login">
        //     <div className="inside-box">
        //       <div className="left">
        //           <img d-sm-inline-block-hidden src={anime} alt="anime pic" />
        //       </div>
        //       <div className="right">
        //           <h2 >Login</h2>
        //           <p>If you are already a member, please Log in</p>
        //           <form action="">
        //             <input className='email' type="text" name='email' placeholder='Email'/>
        //             <input className='pass' type="text" name='password' placeholder='Password'/>
        //             <button className='log-button'>Login </button>
        //             <a className='register' href="">Don't have an account? Sign In</a>
        //           </form>
        //       </div>
        //     </div>
        // </div>
    
  )
}

export default LoginUser
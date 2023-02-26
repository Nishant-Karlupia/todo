import React from 'react'
import {
  Link
} from "react-router-dom";

const Login = () => {
  return (
    <div className='login-container' >
      <h2 style={{ textAlign: "center" }}>LOGIN</h2>
      <form >
        <div className="mb-3">
          <i className="fa-solid fa-envelope"></i> <span></span>
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='email@example.com' />
        </div>
        <div className="mb-3">
          <i className="fa-solid fa-key"></i> <span></span>
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder='Type password here' />
        </div>
        <button type="submit" className="btn ">Login</button>
      </form>
      <div style={{ fontFamily: "consolas" }}>
        <h5>Don't have an account? <Link to="/signup" style={{ color: "yellow" }}>Register</Link></h5>
      </div>
    </div>
  )
}

export default Login
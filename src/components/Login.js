import React from 'react'
import {
  Link
} from "react-router-dom";

import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  const host="http://localhost:5000";
  const [credentials, setCredentials] = useState({email:"",password:""});
  const navigate=useNavigate();

  useEffect(() => {
    if(localStorage.getItem("token"))
    {
      console.log("yes");
      navigate("/todo");
    }
  }, [Login])
  

  



  const handleSubmit=async(event)=>{
    event.preventDefault();
    const response = await fetch(`${host}/todo/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({email:credentials.email,password:credentials.password})
    });
    // console.log(credentials.email);
    // console.log(credentials.password);
    const json=await response.json();
    // console.log(response);
    setCredentials({email:"",password:""});
    if(json.success)
    {
      localStorage.setItem("token",json.authToken);
      props.showAlert(true,"Logged in Successfully")
      navigate("/todo");

    }
    else
    {
      props.showAlert(false,"Please login with right credentials");
      // console.log("error occurred");
    }
    
  }

  const onchange=(ev)=>{
    setCredentials({...credentials,[ev.target.name]:ev.target.value});
  }


  return (
    <div className='d-flex justify-content-center my-5 login-parent'>

      <div className='d-flex login-container flex-column w-70' >
        <h1 style={{ textAlign: "center",fontSize:"3.3rem" }}>LOGIN</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 my-4">
            <i className="fa-solid fa-envelope"></i> <span></span>
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" value={credentials.email} placeholder='email@example.com' onChange={onchange}/>
          </div>
          <div className="mb-5 my-5">
            <i className="fa-solid fa-key"></i> <span></span>
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name="password" value={credentials.password} placeholder='Type password here' onChange={onchange} />
          </div>
          <button type="submit" className="btn w-100">Login</button>
        </form>
        <div style={{ fontFamily: "consolas" }}>
          <h2>Don't have an account? <Link to="/signup" style={{ color: "yellow" }}>Register</Link></h2>
        </div>
      </div>
    </div>
  )
}

export default Login
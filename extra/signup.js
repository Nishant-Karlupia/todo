import React from 'react'
import {
    Link
  } from "react-router-dom";

const SignUp = () => {
    return (
        <div className='signup-container'>
            <h2 style={{textAlign:"center"}}>Register</h2>
            <form>
                <div className="form-group">
                    <div className="row">
                        <div className="col">
                            <i className="fa-solid fa-user"> </i> <span></span>
                            <label htmlFor="first_name" className="form-label" >First Name</label>
                            <input type="text" className="form-control "  name="first_name"  required="required" placeholder="First Name" />
                        </div>
                        <div className="col">
                            <i className="fa-solid fa-user"></i> <span></span>
                            <label htmlFor="last_name" className="form-label">Last Name</label>
                            <input type="text" className="form-control" name="last_name" placeholder="Last Name" required="required" />
                        </div>
                    </div>
                </div>
                <div className="mb-3">
                    <i className="fa-solid fa-envelope"></i> <span></span>
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="email@example.com"/>
                </div>
                <div className="mb-3">
                <i className="fa-solid fa-lock"></i> <span></span>
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Type password here"/>
                </div>
                <div className="mb-3">
                    <i className="fa-solid fa-key"></i> <span></span>
                    <label htmlFor="exampleInputPassword2" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword2"placeholder="Confirm Password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <div style={{fontFamily:"consolas"}}>
                <h5>Already have an account? <Link to="/login" style={{color:"yellow",margin:"auto"}}>Login</Link></h5>
            </div>
        </div>
    )
}

export default SignUp
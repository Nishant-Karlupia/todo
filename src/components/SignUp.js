import React from 'react'
import {
    Link
} from "react-router-dom";
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {
    const host="http://localhost:5000";
    const [credentials, setCredentials] = useState({first_name:"",last_name:"",email:"",password:"",confirm_password:""});
    const navigate=useNavigate();
    
    useEffect(() => {
        if(localStorage.getItem("token"))
        {
        //   console.log("yes");
          navigate("/todo");
        }
      }, [SignUp])


    const handleSubmit=async(ev)=>{
        ev.preventDefault();

        let full_name=credentials.first_name;
        if(credentials.last_name.length!==0)full_name=full_name+" "+credentials.last_name;
        if(credentials.password!==credentials.confirm_password)
        {
            console.log("Password mismatch");
            return;
        }

        const response = await fetch(`${host}/todo/api/auth/createUser`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body:JSON.stringify({name:full_name,email:credentials.email,password:credentials.password})
          });

        
        
        const json=await response.json();
        setCredentials({first_name:"",last_name:"",email:"",password:"",confirm_password:""});

        if(json.success)
        {
            localStorage.setItem("token",json.authToken);
            props.showAlert(true,"Your have registered successfully");
            navigate("/todo");
        }
        else
        {
            props.showAlert(false,"Please fill right information");
            // console.log("Error in signing");          
        }

    }

    const onchange=(ev)=>
    {
        // setCredentials({...credentials,[ev.target.name]:ev.target.value});
        setCredentials({...credentials,[ev.target.name]:ev.target.value});
    }


    return (
        <div className="d-flex justify-content-center ">

            <div className='signup-container'>
                {/* <h2 style={{ textAlign: "center" }} className="signup-heading">Register</h2> */}
                <div className="d-flex justify-content-around">
                    <div className="p-2 signup-heading-parent ">
                        <div><h1 className='signup-heading'>Register</h1></div>
                    </div>
                </div>
                <form className='d-flex flex-column' onSubmit={handleSubmit}>
                    <div className="form-group">
                        <div className="d-flex justify-content-between name-container">
                            <div className='mx-2  name-object' >
                                <i className="fa-solid fa-user"> </i> <span></span>
                                <label htmlFor="first_name" className="form-label" >First Name</label>
                                <input type="text" className="form-control " id="first_name" name="first_name" required="required" placeholder="First Name" value={credentials.first_name} onChange={onchange} />
                            </div>
                            <div className='mx-2  name-object' >
                                <i className="fa-solid fa-user"></i> <span></span>
                                <label htmlFor="last_name" className="form-label">Last Name</label>
                                <input type="text" className="form-control" name="last_name" id="last_name" placeholder="Last Name"  value={credentials.last_name} onChange={onchange} />
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <i className="fa-solid fa-envelope"></i> <span></span>
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" required="required" placeholder="email@example.com" value={credentials.email} onChange={onchange} />
                    </div>
                    <div className="mb-3">
                        <i className="fa-solid fa-lock"></i> <span></span>
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password" placeholder="Type password here" value={credentials.password} onChange={onchange} required="required" />
                    </div>
                    <div className="mb-3">
                        <i className="fa-solid fa-key"></i> <span></span>
                        <label htmlFor="exampleInputPassword2" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="confirm_password" name="confirm_password" placeholder="Confirm Password" value={credentials.confirm_password} onChange={onchange} required="required" />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Submit</button>
                </form>
                <div style={{ fontFamily: "consolas" }}>
                    <h2>Already have an account? <Link to="/login" style={{ color: "yellow", margin: "auto" }}>Login</Link></h2>
                </div>
            </div>
        </div>
    )
}

export default SignUp
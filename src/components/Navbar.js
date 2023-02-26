import React from 'react'
import { useNavigate } from 'react-router-dom';

import {
    Link
} from "react-router-dom";

const Navbar = (props) => {
    const navigate=useNavigate();

    const handleLogout=(ev)=>{
        ev.preventDefault();
        localStorage.removeItem("token");
        navigate("/");
        props.showAlert(true,"Logged out successfully");

    }

    const handleClicktodo_trash=(ev)=>
    {
        ev.preventDefault();
        if(!localStorage.getItem("token"))
        {
            props.showAlert(false,"You must be logged in to view page");
        }
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark" style={{"padding":"0px"}}>
            <div className="container-fluid " style={{"padding":"0.8rem"}}>
                <Link className="navbar-brand" to="/"><h2>NKTODO</h2></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-auto">
                        <li className="nav-item">
                            <Link className="nav-link mx-3" aria-current="page" to={`${localStorage.getItem("token")?"/todo":"/"}`} onClick={handleClicktodo_trash}><h1>Todo</h1></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link mx-3" to="/trash"><h1>Trash</h1></Link>
                        </li>

                    </ul>
                    {!localStorage.getItem("token")?<form className="d-flex" role="search">
                        <Link  to="/login" role="button"><i className="fa fa-light fa-arrow-right-to-bracket fa-3x navbar-login mx-3" title='LogIn'></i></Link>
                        <Link  to="/signup" role="button"><i className="fa fa-thin fa-user-plus mx-4 fa-3x navbar-signup" title='SignUp'></i></Link>
                    </form>:<Link role="button" onClick={handleLogout}><i className="fa-solid fa-right-from-bracket fa-3x navbar-logout" title='Logout'></i></Link>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
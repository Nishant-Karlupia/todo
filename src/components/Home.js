import React from 'react'

import {
    Link
} from "react-router-dom";

const Home = () => {
   
    return (
        <>
        <div className="d-flex home-container justify-content-center">

            <div  className="home-style d-flex flex-column w-70" >
                <div>You deserve this for your busy life</div>
                <div>A simple to use todo app for keeping task ready for everyday life</div>
                <div><Link to={`${localStorage.getItem("token")?"/todo":"/login"}`} className='home-btn-todo'>Start</Link></div>
            </div>
        </div>
        </>
    )
}

export default Home
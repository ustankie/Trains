import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import "../styles/Hero.css";
import "../styles/App.css";
import "../styles/Main.css";
import Form from '../components/Form';
import {isTokenExpired,setAuthToken} from '../util/Authentication';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';



export default function Hero() {
    const navigate=useNavigate();
    
    return (
        <>      
        {!isTokenExpired() ?
            <div className="login--link" onClick={()=>{setAuthToken("null", "null"); toast.success("Logout successful"); navigate("/")}}>LOG <span className="blue">OUT</span></div>
           : <div className="login--link"><Link to="/login">SIGN <span className="blue">IN</span></Link></div>
}
        <div className="hero--wrapper">
            <div className="background"></div>
            <div className="content">
                <div className="hero--text">
                    <p><span className="blue">Travel</span> is the only thing you <br /> buy that makes you <span className="blue">richer</span></p>
                </div>
                <Form />
            </div>
        </div>
    </>
    )
}

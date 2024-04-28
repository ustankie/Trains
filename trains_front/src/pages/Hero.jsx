import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import "../styles/Hero.css";
import "../styles/App.css";
import "../styles/Main.css";
import Form from '../components/Form';

export default function Hero() {
    return (
        <>      
        <div className="login--link"><Link to="/login">SIGN <span className="blue">IN</span></Link></div>
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

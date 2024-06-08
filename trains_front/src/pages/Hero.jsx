import React, { useEffect, useState } from 'react';
import "../styles/Hero.css";
import "../styles/App.css";
import "../styles/Main.css";
import "../styles/Navbar.css";
import Form from '../components/Form';
import Navbar from '../components/Navbar';




export default function Hero() {
    
    return (
        <>      
        {/* <div style={{backgroundColor: "red", width: "30px"}}> */}
        <Navbar/>

        {/* </div> */}
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

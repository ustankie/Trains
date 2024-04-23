import React, { useState } from 'react';
import { Link } from "react-router-dom"
import "../styles/Hero.css";

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
                <div className="hero--search--box">
                    <input type="text" className="hero--large--input" placeholder="ORIGIN" name="origin" />
                    <input type="text" className="hero--large--input" placeholder="DESTINATION" name="destination" />
                    <input type="date" className="hero--large--input" name="date" placeholder="DD/MM/yyyy" pattern="\d{2}/\d{2}/\d{4}" />
                    <button className="hero--search--btn">SEARCH</button>
                </div>
            </div>
        </div>
        </>
    )
}
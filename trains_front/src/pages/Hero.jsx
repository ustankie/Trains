import "../styles/Hero.css";
import "../styles/App.css";
import "../styles/Main.css";
import "../styles/Navbar.css";
import Form from '../components/Form';
import * as React from 'react';
import CustomDrawer from "../components/CustomDrawer";
import Navbar from "../components/Navbar";



export default function Hero() {
    
    return (
        <>      
        <div className="hero--wrapper">
            {/* <CustomDrawer /> */}
            <Navbar/>
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

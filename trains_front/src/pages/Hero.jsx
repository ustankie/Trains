import "../styles/Hero.css";
import "../styles/App.css";
import "../styles/Main.css";
import "../styles/Navbar.css";
import Form from '../components/Form';
import * as React from 'react';
import Navbar from "../components/Navbar";
import { useTextColor } from "../util/TextColorContext";
import { useEffect } from 'react'

export default function Hero() {
    const { setColor } = useTextColor();

    useEffect(() => {
        setColor('white');
    }, [setColor]);

    return (
        <>      
        <div className="hero--wrapper">
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
    );
}

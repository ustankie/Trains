import React from "react";
import '../styles/RoutesDisplay.css';
import '../styles/Login.css'
import '../styles/Main.css'
import { Link } from "react-router-dom"
import Form from "../components/Form";
import RouteCards from "../components/RouteCards"

export default function RoutesDisplay() {

    return (
        <>
            <div className='cardWrapper'>
                <div className="home--link"><Link to="/"><span className="black">TRAIN</span> 
                    <span className="blue">SERVICE</span></Link></div>
                <Form />
                <RouteCards/>
            </div>
        </>
    );
}

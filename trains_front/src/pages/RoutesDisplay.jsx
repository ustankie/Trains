import React from "react";
import '../styles/RoutesDisplay.css';
import '../styles/Login.css'
import '../styles/Main.css'
import { Link } from "react-router-dom"
import Form from "../components/Form";
import RouteCards from "../components/RouteCards"
import Navbar from "../components/Navbar";
import CustomDrawer from "../components/CustomDrawer";

export default function RoutesDisplay() {

    return (
        <>
        <Navbar color_mode="login--dark"/>
            <CustomDrawer />
            <div className='cardWrapper'>
                
                <Form />
                <RouteCards/>
            </div>
        </>
    );
}

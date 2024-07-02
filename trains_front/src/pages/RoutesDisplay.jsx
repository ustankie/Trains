import React from "react";
import '../styles/RoutesDisplay.css';
import '../styles/Login.css'
import '../styles/Main.css'
import Form from "../components/Form";
import RouteCards from "../components/RouteCards"
import Navbar from "../components/Navbar";
import { useTextColor } from "../util/TextColorContext";
import { useEffect } from 'react'

export default function RoutesDisplay() {
    const { setColor } = useTextColor();

    useEffect(() => {
        setColor('black');
    }, [setColor]);

    return (
        <>
            <Navbar />
            <div className='cardWrapper'>
                <Form />
                <RouteCards/>
            </div>
        </>
    );
}

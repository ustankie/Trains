import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Navbar.css";
import CustomDrawer from './CustomDrawer';
import { useTextColor } from "../util/TextColorContext";

export default function Navbar() {
    const { color } = useTextColor();

    return (
        <div className="navbar--wrapper">
            <CustomDrawer />
            <div className="home--link">
                <Link to="/">
                    <span style={{ color: color }}>TRAIN</span><span className="blue">SERVICE</span>
                </Link>
            </div>
        </div>
    );
}

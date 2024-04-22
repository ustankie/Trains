import React, { useState } from 'react';
import "../styles/Hero.css";

export default function Hero() {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'origin') setOrigin(value);
        if (name === 'destination') setDestination(value);
        if (name === 'date') setDate(value);
    };

    const searchRoutes = () => {
        fetch(`/api/find-routes?departureDate=${encodeURIComponent(date)}&startStation=${encodeURIComponent(origin)}&endStation=${encodeURIComponent(destination)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <>
        <div className="login">SIGN <span className="blue">IN</span></div>
        <div className="hero--wrapper">
            <div className="background"></div>
            <div className="content">
                <div className="hero--text">
                    <p><span className="blue">Travel</span> is the only thing you <br /> buy that makes you <span className="blue">richer</span></p>
                </div>
                <div className="hero--search--box">
                    <input type="text" className="hero--large--input" placeholder="ORIGIN" name="origin" value={origin} onChange={handleInputChange} />
                    <input type="text" className="hero--large--input" placeholder="DESTINATION" name="destination" value={destination} onChange={handleInputChange} />
                    <input type="date" className="hero--large--input" name="date" placeholder="DD/MM/yyyy" pattern="\d{2}/\d{2}/\d{4}" value={date} onChange={handleInputChange} />
                    <button className="hero--search--btn" onClick={searchRoutes}>SEARCH</button>
                </div>
            </div>
        </div>
        </>
    )
}
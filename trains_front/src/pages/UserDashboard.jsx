import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../styles/UserDashboard.css"
import { Card } from 'react-bootstrap';
import { request, getUserId } from '../util/Authentication.jsx';

export default function UserDashboard() {
    const [future, setFuture] = useState([]);
    const [past, setPast] = useState([]);
    const [activeTab, setActiveTab] = useState('future');
    const [currentData, setCurrentData] = useState([]);

    useEffect(() => {
        request("GET", "/api/future_trips", {}, { user_id: getUserId() })
            .then(response => {
                setFuture(response.data);
                if (activeTab === 'future') {
                    setCurrentData(response.data);
                }


                request("GET", "/api/past_trips", {}, { user_id: getUserId() })
                    .then(response => {
                        setPast(response.data);
                        if (activeTab === 'past') {
                            setCurrentData(response.data);
                        }
                    })
            })


    }, []);


    const handleTabClick = (tab) => {
        setActiveTab(tab);
        if (tab === 'future') {
            setCurrentData(future);
        } else if (tab === 'past') {
            setCurrentData(past);
        }
    };

    return (
        <div className="user--dashboard--container">
            <div className="home--link"><Link to="/"><span className="black">TRAIN</span><span className="blue">SERVICE</span></Link></div>
            <div className="user--greeting">
                <p className="greeting--text">
                    Welcome aboard <span className="blue">name!</span>
                </p>
                <p className="greeting--text--bottom">Life, much like a <span className="blue">train journey,</span> <br /> is best enjoyed
                    with good company by our side.</p>
            </div>

            <div className="tickets--box">
                <div className="tabs">
                    <div
                        className={`tab tab--left ${activeTab === 'future' ? 'active' : ''}`}
                        onClick={() => handleTabClick('future')}
                    >
                        FUTURE TRIPS
                    </div>
                    <div
                        className={`tab tab--right ${activeTab === 'past' ? 'active' : ''}`}
                        onClick={() => handleTabClick('past')}
                    >
                        PREVIOUS JOURNEYS
                    </div>
                </div>
                <div className="cards">
                    {currentData.map((route) => (
                        <Card key={route.routeId} className="routeCard">
                            <Card.Body className="routeCardBody">
                                <div className="routeCardBodyContent">
                                    <div className="routeDetails">
                                        <p className="routeCardHeaders">Start Station</p>
                                        <p className="routeCardDetails">{route.startStation}</p>
                                    </div>
                                    <div className="routeDetails">
                                        <p className="routeCardHeaders">End Station</p>
                                        <p className="routeCardDetails">{route.endStation}</p>
                                    </div>
                                    <div className="routeDetails">
                                        <p className="routeCardHeaders">Time</p>
                                        <p className="routeCardDetails">{route.departure}<span className="material-symbols-outlined arrow--small">arrow_forward</span> {route.arrival}</p>
                                    </div>
                                    <div className="routeDetails">
                                        <p className="routeCardHeaders">Departure Date</p>
                                        <p className="routeCardDetails">{route.departure}</p>
                                    </div>
                                    <div className="routeDetails">
                                        <p className="routeCardHeaders">Seat</p>
                                        <p className="routeCardDetails">{route.seatId}</p>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}
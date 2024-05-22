import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/UserDashboard.css"
import { Card } from 'react-bootstrap';
import data from '../data.js'

export default function UserDashboard() {
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
                    <div className="tab tab--left active">FUTURE TRIPS</div>
                    <div className="tab tab--right">PREVIOUS JOURNEYS</div>
                </div>
                <div className="cards">
                    {console.log(data)}
                    {data.map((route) => (
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
                                        <p className="routeCardDetails">13:15:22 <span className="material-symbols-outlined arrow--small">arrow_forward</span> 13:51:34</p>
                                    </div>
                                    <div className="routeDetails">
                                        <p className="routeCardHeaders">Departure Date</p>
                                        <p className="routeCardDetails">{route.departure}</p>
                                    </div>
                                    <div className="routeDetails">
                                        <p className="routeCardHeaders">Seat</p>
                                        <p className="routeCardDetails">{route.seat}</p>
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
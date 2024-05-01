import React from "react";
import '../styles/RoutesDisplay.css';
import '../styles/Login.css'
import '../styles/Main.css'
import tom from '../images/sad_tom.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

export default function RoutesDisplay() {
    const location = useLocation();
    const data = location.state?.data;
    const startStation = location.state?.startStation;
    const endStation = location.state?.endStation;
    const navigate = useNavigate();

    function addReservation() {
        navigate("/add-reservation");
    }

    return (
        <>
            
                {data && data.length > 0 ? (
                    <div>
                        <div className="route--info">
                            <p>{startStation.charAt(0).toUpperCase() + startStation.slice(1)} 
                            <span className="material-symbols-outlined">arrow_forward</span> {endStation.charAt(0).toUpperCase() + endStation.slice(1)}</p>
                        </div>  
                        <div className="cards">
                            {data.map((route) => (
                                <Card key={route.routeId} className="routeCard">
                                    <Card.Body className="routeCardBody">
                                        <div className="routeCardBodyContent">
                                            <div className="routeDetails">
                                                <p className="routeCardHeaders">Departure</p>
                                                <p className="routeCardDetails">{route.departureTime}</p>
                                            </div>
                                            <div className="routeDetails">
                                                <p className="routeCardHeaders">Arrival</p>
                                                <p className="routeCardDetails">{route.arrivalTime}</p>
                                            </div>
                                            <div className="routeDetails">
                                                <p className="routeCardHeaders">Total Price</p>
                                                <p className="routeCardDetails">{route.price} PLN</p>
                                            </div>
                                            <button className="blue--btn" onClick={addReservation}>Book</button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            ))}
                            </div>
                        </div>
                ) : (
                <div className="backgroundBottom">
                    <div className="noRouteFound">
                        <p id="noRoutesText">No routes found...</p>
                        <img src={tom} alt="Sad Tom" id="tom"/>
                    </div>
                </div>
                )}
        </>
    );
}

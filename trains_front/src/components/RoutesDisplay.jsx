import React from "react";
import '../styles/RoutesDisplay.css';
import '../styles/Login.css'
import tom from '../images/sad_tom.png';
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom"
import { Card, Button } from 'react-bootstrap';

export default function RoutesDisplay() {
    const location = useLocation();
    const data = location.state?.data;

    return (
        <>
            <div className="home--link"><Link to="/">TRAIN <span className="blue">SERVICE</span></Link></div>
            {data && data.length > 0 ? (
                
                <div className='cardWrapper'>
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
                                    <Button className="blue--btn">Book</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    ))}
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

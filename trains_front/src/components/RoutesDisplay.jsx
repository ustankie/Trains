import React from "react";
import '../styles/RoutesDisplay.css'
import { Card, Button, Image } from 'react-bootstrap'
import tom from '../images/sad_tom.png'


export default function RoutesDisplay({data}) {
    const len=(data ? data.length : 0);

    return (
        <>
            <div>
                {data && len>0 ? (
                    <div className='cardWrapper'>
                        {data.map((route, index) => (!len || index < len) ? (
                            <Card key={route.routeId} className= "routeCard"  >
                                <Card.Body className="routeCardBody">
                                    <div className="routeCardBodyContent">

                                        <div className="routeDetails">
                                            <a className="routeCardHeaders">Departure</a>
                                            <p className="routeCardDetails">{route.departureTime}</p>
                                        </div>
                                        <div className="routeDetails">
                                            <a className="routeCardHeaders" >Arrival</a>    
                                            <p className="routeCardDetails">{route.arrivalTime}</p>
                                        </div>
                                        <div className="routeDetails">
                                            <a className="routeCardHeaders" >Total Price</a>
                                            <p className="routeCardDetails">{route.price} PLN</p>
                                        </div>
                                        <Button className="blue--btn">Book</Button>

                                    </div>
                                </Card.Body>
                            </Card>
                        ):(null))}
                    </div>
                    
                ):data && len === 0 ? (
                    <div className="backgroundBottom">
                        <div className="noRouteFound">
                            <p id="noRoutesText">No routes found...</p>
                            <img src={tom} alt="Sad Tom" id="tom"/>
                        </div>
                    </div>
                ) : (
                    null
                )}
            </div>
        </>
    );

}
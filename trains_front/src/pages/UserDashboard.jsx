import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/UserDashboard.css"
import { Card } from 'react-bootstrap';
import { request } from '../util/Authentication.jsx';
import toast from 'react-hot-toast';
import { Modal, Button } from 'react-bootstrap';

export default function UserDashboard() {
    const [future, setFuture] = useState([]);
    const [past, setPast] = useState([]);
    const [activeTab, setActiveTab] = useState('future');
    const [currentData, setCurrentData] = useState([]);
    const [user, setUser] = useState([]);
    const [show, setShow] = useState(false);
    const [reservationId, setReservationId] = useState(0);
    const [log_type, setLogType] = useState([]);
    const [loading, setLoading] = useState(true);
    const [price, setPrice] = useState(0);
    const [showCancelled, setShowCancelled]=useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        request("GET", "/api/get_user", {}, {})
            .then(response1 => {
                setLoading(true);
                console.log(loading);
                setUser(response1.data)
                request("GET", "/api/future_trips", {}, { user_id: response1.data.userId })
                    .then(response => {
                        setFuture(response.data);
                        if (activeTab === 'future') {
                            setCurrentData(response.data);
                        }


                        request("GET", "/api/past_trips", {}, { user_id: response1.data.userId })
                            .then(response => {
                                setPast(response.data);
                                if (activeTab === 'past') {
                                    setCurrentData(response.data);
                                }
                            })
                    })
                    .catch(error => {
                        {
                            console.log("aaaa")
                        }
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            })
            .catch(error => {
                if (error === "authError") { 
                    toast.error("Your session expired!"); 
                    navigate("/"); }
            })



    }, [reservationId,show]);


    function reservationPrice() {
        request("GET", "/api/get_user", {}, {})
            .then(response1 => {
                setLoading(true);
                console.log(loading);
                setUser(response1.data)
                request("GET", "/api/reservations/price", {}, { reservationId: reservationId })
                    .then(response => {
                        setPrice(response.data);

                    })
                    .catch(error => {
                        console.error('Error fetching reservation price:', error);

                    })
                    .finally(() => {
                        setLoading(false);
                        console.log("Price2:", price, reservationId);
                    });
            })
            .catch(error => {
                console.error('Error fetching user:', error);
                toast.error("Your session expired!"); 
                navigate("/"); 
                setLoading(false);
            });

    }



    const handleTabClick = (tab) => {
        setActiveTab(tab);
        if (tab === 'future') {
            setCurrentData(future);
        } else if (tab === 'past') {
            setCurrentData(past);
        }
    };
    console.log(future);
    function change_status(status, reservationId) {
        request("GET", "/api/get_user", {}, {})
            .then(response1 => {
                setUser(response1.data);
                request("POST", 'api/reservations/change_status', {
                    reservationId: reservationId,
                    status: status
                }, {})
                    .then(response => {
                        if (status == "P") {
                            toast.success("Payed successfully!");
                        } else {
                            toast.success("Your reservation has been cancelled");
                        }
                        setShow(false);

                    })
                    .catch(error => {
                        console.error(error);
                        if (status == "P") {
                            toast.error("Failed to pay");
                        } else {
                            toast.error("Failed to cancel the reservation");
                        }
                        setShow(false);
                    })
            })            
            .catch(error => {
                console.error('Error fetching user:', error);
                toast.error("Your session expired!"); 
                navigate("/"); 
                setLoading(false);
            });
    }
    function handleClose() {
        setShow(false);
    }

    return (
        <div className="user--dashboard--container">
            {loading &&
                <div className="user_dashboard--overlay">
                    <div className="user_dashboard--spinner"></div>
                </div>
            }
            <div className="home--link"><Link to="/"><span className="black">TRAIN</span><span className="blue">SERVICE</span></Link></div>
            <div className="user--greeting">
                <p className="greeting--text">
                    Welcome aboard <span className="blue">{user.login}!</span>
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
                    <label>
                        <input type="checkbox" checked={showCancelled} onChange={()=>setShowCancelled(!showCancelled) }/>
                        Show cancelled
                    </label>
                </div>

                <div className="cards">
                    {currentData
                    .filter((route)=>{if(showCancelled) return true; return route.status!="C";} )
                    .map((route) => (
                        <Card key={route.reservationId} className="routeCard routeCard--user_dashboard">
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
                                        <p className="routeCardDetails">{route.departureDate}</p>
                                    </div>
                                    <div className="routeDetails">
                                        <p className="routeCardHeaders">Seat</p>
                                        <p className="routeCardDetails">{route.seatId}</p>
                                    </div>
                                    {/* <div className="routeDetails">
                                        <p className="routeCardHeaders">Price</p>
                                        <p className="routeCardDetails">{route.price}PLN</p>
                                    </div> */}
                                    <div className="routeDetails">
                                        <p className="routeCardHeaders">Status</p>
                                        <p className="routeCardDetails">{route.status === "N" ? "Not payed" : route.status === "C" ? "Cancelled" : "Payed"}</p>
                                    </div>
                                    {activeTab === 'future' && route.status === "P" ? <button className="blue--btn" onClick={() => { reservationPrice(); setReservationId(route.reservationId); setLogType("C"); setShow(true) }}>Cancel</button>
                                        : activeTab === 'future' && route.status === "N" ?
                                        <> 
                                            <button className="blue--btn" onClick={() => { 
                                                reservationPrice(); 
                                                setReservationId(route.reservationId); 
                                                setLogType("P"); 
                                                setShow(true); }}>Pay</button> 
                                            {/* <p className='routeCardHeaders'>Pay within {route.reservationDate}</p> */}
                                        </>
                                    : null}
                                </div>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {log_type === "P" ? "Payment" : "Cancel Payment"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {log_type === "P" ? "The price is " + price + "PLN. Are you sure you want to pay?"
                        : "Are you sure you want to cancel? You will be refunded " + price + "PLN."}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                    {log_type === "P" ? (
                        <Button variant="primary" onClick={() => change_status(log_type, reservationId)}>
                            Pay
                        </Button>
                    ) : (
                        <Button variant="danger" onClick={() => change_status(log_type,reservationId)}>
                            Cancel Payment
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>

        </div>
    )
}
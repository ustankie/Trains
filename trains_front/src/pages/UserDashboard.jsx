import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/UserDashboard.css"
import { Card } from 'react-bootstrap';
import { request } from '../util/Authentication.jsx';
import toast from 'react-hot-toast';
import { Modal, Button } from 'react-bootstrap';
import Navbar from '../components/Navbar.jsx';
import TrainIcon from '@mui/icons-material/Train';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useTextColor } from "../util/TextColorContext";
import { Pagination } from '@mui/material';


export default function UserDashboard() {
    const { setColor } = useTextColor();

    useEffect(() => {
        setColor('black');
    }, [setColor]);

    const [future, setFuture] = useState([]);
    const [past, setPast] = useState([]);
    const [activeTab, setActiveTab] = useState('future');
    const [currentData, setCurrentData] = useState([]);
    const [user, setUser] = useState([]);
    const [show, setShow] = useState(false);
    const [reservationId, setReservationId] = useState(0);
    const [log_type, setLogType] = useState([]);
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState(0);
    const [showCancelled, setShowCancelled] = useState(false);

    const [page, setPage] = useState(1);
    const ITEMS_PER_PAGE = 2; // Liczba elementów na stronę

    const navigate = useNavigate();
    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    useEffect(() => {
        // setLoading(true);
        request("GET", "/api/get_user", {}, {})
            .then(response1 => {
                
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
                        // sleep(1000);
                        // setLoading(false);
                    });
            })
            .catch(error => {
                if (error === "authError") { 
                    toast.error("Your session expired!"); 
                    navigate("/"); 
                }
            })
    }, [reservationId, show]);

    useEffect(() => {
        reservationPrice();
    }, [reservationId]);

    function reservationPrice() {
        request("GET", "/api/get_user", {}, {})
            .then(response1 => {
                // setLoading(true);
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
                        // setLoading(false);
                        console.log("Price2:", price, reservationId);
                    });
            })
            .catch(error => {
                console.error('Error fetching user:', error);
                toast.error("Your session expired!"); 
                navigate("/"); 
                // setLoading(false);
            });
    }

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        setPage(1); // Resetuje stronę do 1 przy zmianie zakładki
        if (tab === 'future') {
            setCurrentData(future);
        } else if (tab === 'past') {
            setCurrentData(past);
        }
    };

    const paginatedData = currentData.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    function change_status(status, reservationId) {
        request("GET", "/api/get_user", {}, {})
            .then(response1 => {
                // setLoading(true);
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
                // setLoading(false);
            });
    }

    function handleClose() {
        setShow(false);
    }

    function calculateDuration(departure, arrival) {
        let departureDate = new Date(`1970-01-01T${departure}Z`);
        let arrivalDate = new Date(`1970-01-01T${arrival}Z`);
        let differenceInMilliseconds = arrivalDate - departureDate;

        let differenceInMinutes = differenceInMilliseconds / (1000 * 60);
        let differenceInHours = Math.floor(differenceInMinutes / 60);
        differenceInMinutes = differenceInMinutes % 60;

        let formattedHours = differenceInHours.toString().padStart(2, '0');
        let formattedMinutes = differenceInMinutes.toString().padStart(2, '0');

        return `${formattedHours}:${formattedMinutes}`;
    }


    return (
        <>
            <Navbar />
            <div className="user--dashboard--container">
                <div className="user--dashboard--greeting">
                    <h1>Welcome aboard {user.login}!</h1>
                    <h2>Here are all your tickets:</h2>
                </div>
                <div className="tickets--container">
                    <div className="tabs">
                        <div
                            className={`tab ${activeTab === 'future' ? 'active' : ''}`}
                            onClick={() => handleTabClick('future')}>
                            FUTURE TRIPS
                        </div>
                        <div
                            className={`tab ${activeTab === 'past' ? 'active' : ''}`}
                            onClick={() => handleTabClick('past')}>
                            PREVIOUS JOURNEYS
                        </div>
                    </div>
                    {paginatedData.map((route) => (
                        <div className="ticket--wrapper" key={route.reservationId}>
                            <div className="ticket--places">
                                <div>{route.startStation}</div>
                                <div>{route.endStation}</div>
                            </div>
                            <div className="ticket--time--box">
                                <div className="ticket--time">{route.departure.slice(0, -3)}</div>
                                <div className="ticket--route">
                                    <TrainIcon className='ticket--route--icon'/>
                                    <div className="ticket--dashed"></div>
                                    <div className="ticket--duration">{calculateDuration(route.departure, route.arrival)}h</div>
                                    <div className="ticket--dashed"></div>
                                    <LocationOnIcon className='ticket--route--icon'/>
                                </div>
                                <div className="ticket--time">{route.arrival.slice(0, -3)}</div>
                            </div>
                            <div className="ticket--details">
                                <div className="ticket--seat">Seat: {route.seatId}</div>
                                <div className="ticket--departure--date">{route.departureDate}</div>
                                {activeTab === 'future' && route.status === 'P' ? 
                                <button className="ticket--btn" onClick={() => { reservationPrice(); setReservationId(route.reservationId); setLogType("C"); setShow(true) }}>Cancel</button> :
                                activeTab === 'future' && route.status === "N" ? 
                                <button className="ticket--btn" onClick={() => { reservationPrice(); setReservationId(route.reservationId); setLogType("P"); setShow(true) }}>Pay</button> : 
                                route.status === "P" ? 
                                <button className="ticket--btn ticket--not--active">Previous</button> :
                                <button className="ticket--btn ticket--not--active">Canceled</button> 
                                }
                            </div>
                        </div>
                    ))}
                    <Pagination className='user--dashboard--pagination'
                        count={Math.ceil(currentData.length / ITEMS_PER_PAGE)}
                        page={page}
                        onChange={(event, value) => setPage(value)}
                        
                    />
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
                        <Button variant="danger" onClick={() => change_status(log_type, reservationId)}>
                            Cancel Payment
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </>
    );
}

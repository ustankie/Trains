import "../styles/Schedule.css"
import { useState, useEffect } from "react"
import { Modal, Button } from 'react-bootstrap';
import Navbar from "../components/Navbar"
import axios from 'axios';
import Card from "../components/Card";
import { useTextColor } from "../util/TextColorContext";
import { Link, useNavigate } from 'react-router-dom';
import tom from '../images/sad_tom.png';

export default function Schedule() {
    const [show, setShow] = useState(true);
    const [showRedirect, setShowRedirect] = useState(false);
    const [stationNames, setStationNames] = useState([]);
    const [restStationNames, setRestStationNames] = useState([]);
    const [selectedStation, setSelectedStation] = useState('');
    const [selectedEndStation, setSelectedEndStation] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [schedule, setSchedule] = useState(null);
    const [selectedRoute, setSelectedRoute] = useState(null);

    const navigate = useNavigate();

    const handleClose = () => {
        setShow(false);
        setShowRedirect(false);
    };
    const handleShow = () => setShow(true);

    const handleStationChange = (e) => setSelectedStation(e.target.value);
    const handleEndStationChange = (e) => setSelectedEndStation(e.target.value);
    const handleDateChange = (e) => setSelectedDate(e.target.value);

    useEffect(() => {
        const fetchStations = async () => {
            if (selectedRoute && selectedStation) {
                try {
                    const response = await axios.get('api/stations/get_rest_stations', {
                        params: {
                            routeId: selectedRoute.routeId,
                            startStationName: selectedStation
                        }
                    });
                    setRestStationNames(response.data);
                } catch (error) {
                    console.error("Error fetching station names:", error);
                }
            }
        };

        fetchStations();
    }, [selectedRoute, selectedStation]);

    const handleBuyTicket = (route) => {
        setSelectedRoute(route);
        setShowRedirect(true);
    };
    useEffect(() => {
        const redirectToReservation = async () => {
            if (selectedEndStation && selectedRoute) {
                try {
                    const response = await axios.get("api/reservations/route_price", { 
                        params: { 
                          routeId: selectedRoute.routeId, 
                          startStation: selectedStation, 
                          endStation: selectedEndStation 
                        } 
                    });
                    

                    const price = response.data;
                    navigate("/add-reservation", { 
                        state: { 
                            routeId: selectedRoute.routeId, 
                            startStation: selectedStation, 
                            endStation: selectedEndStation, 
                            departureDate: selectedRoute.departureDate, 
                            departureTime: selectedRoute.departureTime, 
                            arrivalTime: selectedRoute.arrivalTime, 
                            price 
                        } 
                    });
                } catch (error) {
                    console.error("Error fetching the price:", error);
                }
            }
        };

        redirectToReservation();
    }, [selectedEndStation, selectedRoute, navigate, selectedStation]);

    const handleReset = () => {
        setSelectedStation('');
        setSelectedDate('');
        setSchedule(null);
        setShow(true);
    };

    const { setColor } = useTextColor();

    useEffect(() => {
        setColor('black');
    }, [setColor]);

    useEffect(() => {
        axios.get('api/stations').then(response => {
            const sortedStations = response.data.sort((a, b) => a.localeCompare(b));
            setStationNames(sortedStations);
        });
    }, []);

    useEffect(() => {
        const handleSelection = async () => {
            if (selectedStation && selectedDate) { 
                await sleep(300); 
                handleClose();
                searchSchedule();
            }
        };

        handleSelection();
    }, [selectedStation, selectedDate]);

    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    const searchSchedule = () => {
        axios.get('api/find_schedule', { params: { departure_date: selectedDate, start_station: selectedStation }})
        .then(response => {
            setSchedule(response.data);
            
        });
    };

    const routeDetails = (route) => {
        return (
            <div className="card--details">
                <div className="card--bottom--left"></div>
                <div className="card--bottom--center">{route.departureDate}</div>
                <button className="card--btn card--active" onClick={() => handleBuyTicket(route)}>Buy ticket</button> 
            </div>
        );
    };

    return (
        <>
            <div className="schedule--reset">
                <button className="card--btn card--active" onClick={handleReset}>Reset</button>
            </div>
            <div className="schedule--container">
                <Navbar />
                {schedule && 
                <>
                    <div className="schedule--header">
                        Routes from {selectedStation} departing {selectedDate}
                    </div>

                    {schedule.length !== 0 ? 
                    <div className="schedule--wrapper">
                        {schedule.map((route) => (
                            <Card 
                                key={route.routeId} 
                                route={{
                                    routeId: route.routeId,
                                    startStation: route.startStationName,
                                    endStation: route.endStationName,
                                    departure: route.departureTime,
                                    arrival: route.arrivalTime
                                }} 
                                cardDetails={routeDetails(route)}
                            />
                        ))}
                        </div>
                        :
                        <div className="backgroundBottom">
                            <div className="noRouteFound">
                                <p id="noRoutesText">No routes found...</p>
                                <img src={tom} alt="Sad Tom" id="tom" />
                            </div>
                        </div>
                    }
                    
                    
                </>}
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header>
                    <Modal.Title>
                        Choose start station and date
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal--schedule--wrapper">
                        <div>
                            <select 
                                id="station-select" 
                                value={selectedStation} 
                                onChange={handleStationChange}
                            >
                                <option value="">Choose a station</option>
                                {stationNames.map((station, index) => (
                                    <option key={index} value={station}>
                                        {station}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <input 
                                type="date" 
                                id="date-select" 
                                value={selectedDate} 
                                onChange={handleDateChange} 
                            />
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal
                show={showRedirect}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Choose end station
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal--schedule--wrapper">
                        <div className="select--box">
                            <select 
                                id="station-select" 
                                value={selectedEndStation} 
                                onChange={handleEndStationChange}
                            >
                                <option value="">Choose end station</option>
                                {restStationNames.map((station, index) => (
                                    <option key={index} value={station}>
                                        {station}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
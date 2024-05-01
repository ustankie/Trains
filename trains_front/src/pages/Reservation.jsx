import axios from "axios";
import React from "react"
import { useLocation } from 'react-router-dom';


export default function Reservation() {
    const { state } = useLocation();
    const { routeId, startStation, endStation, departureDate } = state || {};

    function addReservation() {
        axios.post('api/reservations/add', {
            userId: 12,
            discountId: 5,
            routeId: routeId,
            startStation: startStation,
            endStation: endStation,
            departureDate: departureDate,
            seatId: 40
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.error(error);
        });
    }

    return (
        <>
        <h1>Hello World! {routeId} {startStation} {endStation} {departureDate} </h1>
        <button className="blue--btn" onClick={addReservation}>ADD</button>
        </>
    )
}
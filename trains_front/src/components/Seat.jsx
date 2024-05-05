import React from "react";
import "../styles/Reservation.css"

export default function Seat(props) {

    const className = `seat ${props.isPicked ? 'picked' : ''}`;

    return (
        <>
        <div className="seat--below">
            <div className={className} onClick={() => props.pickSeat(props.seatNumber)}>
                {props.seatNumber}
            </div>
        </div>
        
        </>
    )
}
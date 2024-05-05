import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import "../styles/Reservation.css"
import takenData from "../data.js"
import Seat from "../components/Seat"

export default function Reservation() {
    const { state } = useLocation();
    const { routeId, startStation, endStation, departureDate, departureTime, arrivalTime, price } = state || {};

    const [userId, setUserId] = useState('');
    const [discountId, setDiscountId] = useState('');
    const [discounts, setDiscounts] = useState([]);
    const [finalPrice, setFinalPrice] = useState(price);
    const [currentSeat, setCurrentSeat] = useState('');
    const [seatsData, setSeatsData] = useState([]);


    function pickSeat(seatId, seatNumber) {
        const isTaken = taken.includes(seatId);
        if (!isTaken) {
            setCurrentSeat(seatNumber);
        } 
    }

    const taken = takenData.map(item => item.seat_id);

    useEffect(() => {
        axios.get('api/getAllSeats')
            .then(response => {
                if (response.data) {
                    const sortedSeats = response.data.sort((a, b) => a.seatNumber - b.seatNumber);
                    setSeatsData(sortedSeats);
                }
            })
            .catch(error => {
                console.error('Błąd podczas pobierania danych o miejscach:', error);
            });
    }, []);

    const seats = seatsData.map(seat => {
        const isTaken = taken.includes(seat.seatId);

        return (
            <Seat
                key={seat.seatId}
                seatId={seat.seatId}
                seatNumber={seat.seatNumber}
                pickSeat={pickSeat}
                isPicked={currentSeat === seat.seatNumber}
                isTaken={isTaken}
            />
        );
    });



    useEffect(() => {
        axios.get('api/getAllDiscounts')
             .then(response => {
                 if (response.data) {
                     setDiscounts(response.data);
                     const noDiscount = response.data.find(discount => discount.discountName === 'Brak zniżki');
                     if (noDiscount) {
                         setDiscountId(noDiscount.discountId.toString());
                     }
                 }
             })
             .catch(error => console.error("Failed to load discounts", error));
    }, []);

    useEffect(() => {
        const selectedDiscount = discounts.find(discount => discount.discountId.toString() === discountId);
        if (selectedDiscount) {
            const discountValue = selectedDiscount.percent;
            const discountedPrice = price - (price * discountValue / 100);
            setFinalPrice(discountedPrice.toFixed(2));
        }
    }, [discountId, discounts, price]);

    function addReservation() {
        axios.post('api/reservations/add', {
            userId: userId,
            discountId: discountId,
            routeId: routeId,
            startStation: startStation,
            endStation: endStation,
            departureDate: departureDate,
            seatId: currentSeat
        })
        .then(response => {
            alert("Reservation added successfully!");
        })
        .catch(error => {
            console.error(error);
            alert("Failed to add reservation.");
        });
    }

    return (
        <>
            <div className="reservation--container">
                <div className="home--link"><Link to="/"><span className="black">TRAIN</span><span className="blue">SERVICE</span></Link></div>
                <div className="route--info">
                    <p>{startStation + " " + departureTime.slice(0, -3)} 
                    <span className="material-symbols-outlined">arrow_forward</span> 
                    {endStation + " " + arrivalTime.slice(0, -3)}</p>
                </div>  
                <div className="reservation--box">
                    <div className="reservation--inner--box">
                        <p>UserID</p>
                        <input className="reservation--input" type="text" value={userId} onChange={e => setUserId(e.target.value)} placeholder="User ID" />
                    </div>
                    <div className="reservation--inner--box">
                        <p>Choose your discount</p>
                        <select className="reservation--input" value={discountId} onChange={e => setDiscountId(e.target.value)}>
                            {discounts.map((discount) => (
                                <option key={discount.discountId} value={discount.discountId}>{discount.discountName}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="reservation--seats--container">
                    <p>Choose your seat</p>
                    <div className="seats--grid">
                        {seats}
                    </div>
                    
                </div>

                <div className="reservation--summary">
                    {currentSeat && <p>Chosen seat: {currentSeat}</p>}
                    <p>Total Price: {finalPrice} zł</p>
                    <button className="blue--btn" onClick={addReservation}>Book</button>
                </div>
            </div>
        </>
    );
}

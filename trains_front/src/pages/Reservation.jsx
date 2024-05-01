import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import "../styles/Reservation.css"

export default function Reservation() {
    const { state } = useLocation();
    const { routeId, startStation, endStation, departureDate, departureTime, arrivalTime, price } = state || {};

    const [userId, setUserId] = useState('');
    const [discountId, setDiscountId] = useState('');
    const [seatId, setSeatId] = useState('');
    const [discounts, setDiscounts] = useState([]);
    const [finalPrice, setFinalPrice] = useState(price);

    useEffect(() => {
        axios.get('api/getAllDiscounts')
             .then(response => {
                 if (response.data) {
                     setDiscounts(response.data);
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
            seatId: seatId
        })
        .then(response => {
            console.log(response);
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
                    UserId
                    <input className="reservation--input" type="text" value={userId} onChange={e => setUserId(e.target.value)} placeholder="User ID" />
                    DiscountId
                    <select className="reservation--input" value={discountId} onChange={e => setDiscountId(e.target.value)}>
                        <option value="" disabled>Select a discount</option>
                        {discounts.map((discount) => (
                            <option key={discount.discountId} value={discount.discountId}>{discount.discountName}</option>
                        ))}
                    </select>
                    SeatId
                    <input className="reservation--input" type="text" value={seatId} onChange={e => setSeatId(e.target.value)} placeholder="Seat ID" />

                    Final Price 
                    <p className='reservation--price'>{finalPrice} zł</p>
                    <button className="blue--btn" onClick={addReservation}>Book</button>
                </div>
            </div>
        </>
    );
}

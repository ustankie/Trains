import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "../styles/Reservation.css"
import Seat from "../components/Seat"
import { toast } from 'react-hot-toast';
import { getAuthToken, getUserId, request } from '../util/Authentication';
import { useNavigate } from 'react-router-dom';

export default function Reservation() {
    const { state } = useLocation();
    const { routeId, startStation, endStation, departureDate, departureTime, arrivalTime, price } = state || {};

    const [discountId, setDiscountId] = useState('');
    const [discounts, setDiscounts] = useState([]);
    const [finalPrice, setFinalPrice] = useState(price);
    const [currentSeat, setCurrentSeat] = useState([]);
    const [seatsData, setSeatsData] = useState([]);
    const [taken, setTaken] = useState([]);
    const [newReservation, setNewReservation] = useState(false);

    const navigate = useNavigate();


    function pickSeat(seatId, seatNumber) {
        const isTaken = taken.includes(seatId);
        if (!isTaken) {
            setCurrentSeat([seatId, seatNumber]);
        }
    }
    useEffect(() => {
        request("GET", '/api/getOccupiedSeats', {}, {

            routeId: routeId,
            startStation: startStation,
            endStation: endStation,
            date: departureDate

        })
            .then(response => {
                const takenData = response.data;
                console.log(takenData);
                const takenSeats = takenData.map(item => item.seatId);
                setTaken(takenSeats);
            })
            .catch(error => {
                console.error('Error fetching occupied seats:', error);
            });
    }, [newReservation]);

    const seats = seatsData.map(seat => {
        const isTaken = taken.includes(seat.seatId);

        return (
            <Seat
                key={seat.seatId}
                seatId={seat.seatId}
                seatNumber={seat.seatNumber}
                pickSeat={pickSeat}
                isPicked={currentSeat[0] === seat.seatId}
                isTaken={isTaken}
            />
        );
    })


    useEffect(() => {
        if (getAuthToken() == null || getAuthToken() == "null") {
            navigate("/login");
            toast.error("First log in!");
        }
        request("GET", 'api/getAllSeats', {}, {})
            .then(response => {
                if (response.data) {
                    const sortedSeats = response.data.sort((a, b) => a.seatNumber - b.seatNumber);
                    setSeatsData(sortedSeats);
                }

            })
            .catch(error => {

                console.error('Błąd podczas pobierania danych o miejscach:', error);
            });
        request("GET", 'api/getAllDiscounts', {}, {})
            .then(response => {
                if (response.data) {
                    setDiscounts(response.data);
                    const noDiscount = response.data.find(discount => discount.discountName === 'Brak zniżki');
                    if (noDiscount) {
                        setDiscountId(noDiscount.discountId.toString());
                    }
                }
            })
            .catch(error =>console.error("Failed to load discounts", error));
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
        request("POST", 'api/reservations/add', {
            userId: getUserId(),
            discountId: discountId,
            routeId: routeId,
            startStation: startStation,
            endStation: endStation,
            departureDate: departureDate,
            seatId: currentSeat[0]
        }, {})
            .then(response => {
                alert("Reservation added successfully!");
                setCurrentSeat([]);
                setNewReservation(true);
            })
            .catch(error => {
                console.error(error);
                alert("Failed to add reservation.");
            });
        setNewReservation(false);
    }

    return (
        <>
            <div className="reservation--container">
                <div className="home--link"><Link to="/"><span className="black">TRAIN</span><span className="blue">SERVICE</span></Link></div>
                <div className="route--info">
                    <p>{startStation + " " + departureTime.slice(0, -3)}
                        <span className="material-symbols-outlined">arrow_forward</span>
                        {endStation + " " + arrivalTime.slice(0, -3)}</p>
                    <p>Departure Date <span className="material-symbols-outlined">arrow_forward</span>  {departureDate}</p>
                </div>
                <div className="reservation--box">
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
                    {currentSeat[1] && <p>Chosen seat: {currentSeat[1]}</p>}
                    <p>Total Price: {finalPrice} zł</p>
                    <button className="blue--btn" onClick={addReservation}>Book</button>
                </div>
            </div>
        </>
    );
}

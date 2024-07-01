import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "../styles/Payment.css"
import { toast } from 'react-hot-toast';
import { getAuthToken, isTokenExpired, request } from '../util/Authentication';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


export default function Payment() {
    const { state } = useLocation();
    const { reservationId,price } = state || {};
    console.log(reservationId);
    const [show, setShow] = useState(false);
    // const [reservationId,setReservationId]=useState([]);

    const navigate = useNavigate();
    function handleClose(){
        setShow(false);
    }



    function change_status(status){
        request("GET", "/api/get_user",{},{})
        .then(response1=>{
            request("POST", 'api/reservations/change_status', {
                reservationId: reservationId,
                status: status
            }, {})
                .then(response => {
                    if(status=="P"){
                        toast.success("Payed successfully!");
                        navigate("/");

                    }else{
                        toast.success("Your reservation has been cancelled");

                    }
                    

                })
                .catch(error => {
                    console.error(error);
                    if(status=="P"){
                        toast.error("Failed to pay");
                    }else{
                        toast.error("Failed to cancel the reservation");
                    }
                })
        });
    }

    return (
        <>
            <Navbar color_mode="login"/>

            <div className="hero--wrapper">
            <div className="payment--background"></div>
            <div className="content">
                <div className="hero--text">
                    <p><span className="blue">Complete</span> your payment</p>
                </div>
                <button className='blue--btn payment--pay_btn' onClick={()=>setShow(true)}>Pay</button>
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
          <Modal.Title>Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {"P"=== "P" ? "The price is " + price + "PLN. Are you sure you want to pay?"
                : "Are you sure you want to cancel? You will be refunded " + price + "PLN."}        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>change_status("P")}>Pay</Button>
        </Modal.Footer>
      </Modal>
        </>
    );
}
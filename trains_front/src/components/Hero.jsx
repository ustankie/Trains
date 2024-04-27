import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import "../styles/Hero.css";
import axios from 'axios'

export default function Hero() {
    const [routeData, setRouteData] = useState({
        date: '',
        start_station: '',
        end_station: ''
      });
      function searchRoute() { 
        const { date, start_station, end_station } = routeData;
        
        axios.get('/api/find_route', { params: { departure_date: date, start_station_id: start_station, end_station_id: end_station }})
            .then(response => {
                console.log(response.data); 
            })
            .catch(error => {
                console.error('Error finding route:', error);
            });
    }
    

    return (
        <>
        <div className="login--link"><Link to="/login">SIGN <span className="blue">IN</span></Link></div>
        <div className="hero--wrapper">
            <div className="background"></div>
            <div className="content">
                <div className="hero--text">
                    <p><span className="blue">Travel</span> is the only thing you <br /> buy that makes you <span className="blue">richer</span></p>
                </div>
                <div className="hero--search--box">
                    <input type="text" className="hero--large--input" placeholder="ORIGIN" name="origin" value={routeData.start_station} 
                        onChange={(e)=> setRouteData({...routeData, start_station: e.target.value})}/>
                    <input type="text" className="hero--large--input" placeholder="DESTINATION" name="destination" value={routeData.end_station}
                        onChange={(e)=> setRouteData({...routeData, end_station: e.target.value})}/>
                    <input type="date" className="hero--large--input" name="date" placeholder="DD/MM/yyyy" pattern="\d{2}/\d{2}/\d{4}" value={routeData.date}
                     onChange={(e)=> setRouteData({...routeData, date: e.target.value})}/>
                    <button className="hero--search--btn" onClick={()=>searchRoute()}>SEARCH</button>
                </div>
            </div>
        </div>
        </>
    )
}
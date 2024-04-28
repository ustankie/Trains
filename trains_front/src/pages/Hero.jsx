import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import "../styles/Hero.css";
import "../styles/App.css";
import "../styles/Main.css";
import axios from 'axios';
import RoutesDisplay from '../components/RoutesDisplay';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
    const [routeData, setRouteData] = useState({
        date: '',
        start_station: '',
        end_station: ''
    });
    const [stationNames, setStationNames] = useState([]);
    const [startSuggestions, setStartSuggestions] = useState([]);
    const [endSuggestions, setEndSuggestions] = useState([]);
    const [fetchedData, setFetchedData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedData = localStorage.getItem('fetchedData');
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setFetchedData(parsedData.data);
            if (parsedData.routeData) {
                setRouteData(parsedData.routeData);
            }
        }

        const url = 'http://localhost:8080/api/stations';
        axios.get(url).then(response => {
            setStationNames(response.data);
        }).catch(error => {
            console.error('There was an error!', error);
        });
    }, []);

    function searchRoute() {
        const { date, start_station, end_station } = routeData;
        
        axios.get('/api/find_route', { params: { departure_date: date, start_station: start_station, end_station: end_station }})
            .then(response => {
                console.log(response.data);
                setFetchedData(response.data); 
                localStorage.setItem('fetchedData', JSON.stringify({ data: response.data, routeData }));
                navigate('/routes-display', { state: { data: response.data } });
            })
            .catch(error => {
                console.error('Error finding route:', error);
            });
    }

    const onInputChange = (e, fieldName) => {
        const value = e.target.value;
        setRouteData(prev => ({ ...prev, [fieldName]: value }));

        if (value.length > 0) {
            const match = new RegExp(`^${value}`, 'i');
            const filteredSuggestions = stationNames.filter(name => match.test(name)).slice(0, 6);
            if (fieldName === 'start_station') {
                setStartSuggestions(filteredSuggestions);
            } else if (fieldName === 'end_station') {
                setEndSuggestions(filteredSuggestions);
            }
        } else {
            if (fieldName === 'start_station') {
                setStartSuggestions([]);
            } else if (fieldName === 'end_station') {
                setEndSuggestions([]);
            }
        }
    };

    const onSuggestionClicked = (name, fieldName) => {
        setRouteData(prev => ({ ...prev, [fieldName]: name }));
        if (fieldName === 'start_station') {
            setStartSuggestions([]);
        } else if (fieldName === 'end_station') {
            setEndSuggestions([]);
        }
    };

    const onBlurHandler = () => {
        setTimeout(() => {
            setStartSuggestions([]);
            setEndSuggestions([]);
        }, 150);
    };

    

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
                    <div className="autocomplete">
                        <input
                            type="text"
                            className="hero--large--input"
                            placeholder="ORIGIN"
                            name="origin"
                            value={routeData.start_station}
                            onChange={(e) => onInputChange(e, 'start_station')}
                            onBlur={onBlurHandler}
                            autoComplete="off"
                        />
                        {startSuggestions.length > 0 && (
                        <div className="hero--suggestions--box">
                            {startSuggestions.map((name, index) => (
                            <div 
                                className="hero--suggestion"
                                key={index}
                                onMouseDown={() => onSuggestionClicked(name, 'start_station')} >
                                {name}
                            </div>
                            ))}
                        </div>
                        )}
                    </div>
                    <div className="autocomplete">
                        <input
                            type="text"
                            className="hero--large--input"
                            placeholder="DESTINATION"
                            name="destination"
                            value={routeData.end_station}
                            onChange={(e) => onInputChange(e, 'end_station')}
                            onBlur={onBlurHandler}
                            autoComplete="off"
                        />
                        {endSuggestions.length > 0 && (
                        <div className="hero--suggestions--box">
                            {endSuggestions.map((name, index) => (
                            <div 
                                className="hero--suggestion"
                                key={index}
                                onMouseDown={() => onSuggestionClicked(name, 'end_station')} >
                                {name}
                            </div>
                            ))}
                        </div>
                        )}
                    </div>
                    <input type="date" className="hero--large--input" name="date" placeholder="DD/MM/yyyy" pattern="\d{2}/\d{2}/\d{4}" value={routeData.date}
                     onChange={(e)=> setRouteData({...routeData, date: e.target.value})}/>
                    <button className="hero--search--btn" onClick={searchRoute}>SEARCH</button>
                </div>
            </div>
        </div>
    </>
    )
}

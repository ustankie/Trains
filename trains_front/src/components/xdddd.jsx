import React, { useEffect, useState } from 'react';
import './xdddd.css';

function Xdddd() {
    const [routes, setRoutes] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/all_routes')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setRoutes(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div className="wrapper">
            <h1>mam nadzieje ze jestes dumna</h1>
            <table>
                <thead>
                    <tr>
                        <th>Route ID</th>
                        <th>Typ Pociągu</th>
                        <th>Dzień Tygodnia</th>
                        <th>Stacja Początkowa</th>
                        <th>Stacja Końcowa</th>
                    </tr>
                </thead>
                <tbody>
                    {routes.map(route => (
                        <tr key={route.routeId}>
                            <td>{route.routeId}</td>
                            <td>{route.type}</td>
                            <td>{route.day_of_week}</td>
                            <td>{route.start_station_name}</td>
                            <td>{route.end_station_name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Xdddd;
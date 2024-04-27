import React from "react";
import { useLocation } from 'react-router-dom'

export default function RoutesDisplay() {
    const location = useLocation();
     const data = location.state?.data; 

    return (
        <div>
        {data ? (
            <pre>{JSON.stringify(data, null, 2)}</pre> 
        ) : (
            <p>No data to display</p>
        )}
        </div>
    );
}
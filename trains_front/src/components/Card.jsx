import TrainIcon from '@mui/icons-material/Train';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import "../styles/Card.css"

function calculateDuration(departure, arrival) {
    let departureDate = new Date(`1970-01-01T${departure}Z`);
    let arrivalDate = new Date(`1970-01-01T${arrival}Z`);
    let differenceInMilliseconds = arrivalDate - departureDate;

    let differenceInMinutes = differenceInMilliseconds / (1000 * 60);
    let differenceInHours = Math.floor(differenceInMinutes / 60);
    differenceInMinutes = differenceInMinutes % 60;

    let formattedHours = differenceInHours.toString().padStart(2, '0');
    let formattedMinutes = differenceInMinutes.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}`;
}

export default function Card({ route, cardDetails }) {
    return (
        <div className="card--wrapper" key={route.reservationId}>
            <div className="card--places">
                <div>{route.startStation}</div>
                <div>{route.endStation}</div>
            </div>
            <div className="card--time--box">
                <div className="card--time">{route.departure.slice(0, -3)}</div>
                <div className="card--route">
                    <TrainIcon className='card--route--icon'/>
                    <div className="card--dashed"></div>
                    <div className="card--duration">{calculateDuration(route.departure, route.arrival)}h</div>
                    <div className="card--dashed"></div>
                    <LocationOnIcon className='card--route--icon'/>
                </div>
                <div className="card--time">{route.arrival.slice(0, -3)}</div>
            </div>
            {cardDetails}
        </div>
    )
}
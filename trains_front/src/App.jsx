import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Hero from './pages/Hero'
import Login from './pages/Login'
import Register from './pages/Register';
import axios from 'axios';
import RoutesDisplay from './pages/RoutesDisplay';
import "./styles/App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import Reservation from './pages/Reservation';

axios.defaults.baseURL = 'http://localhost:8080'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Hero />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/routes-display" element={<RoutesDisplay />} />
                <Route path="/add-reservation" element={<Reservation />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
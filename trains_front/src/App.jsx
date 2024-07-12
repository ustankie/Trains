import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Hero from './pages/Hero'
import Login from './pages/Login'
import Register from './pages/Register';
import axios from 'axios';
import RoutesDisplay from './pages/RoutesDisplay';
import "./styles/App.css";
import UserDashboard from './pages/UserDashboard';
import Payment from './pages/Payment';
import { Toaster } from 'react-hot-toast'
import { TextColorProvider } from '../src/util/TextColorContext'
import Schedule from "./pages/Schedule"

import "bootstrap/dist/css/bootstrap.min.css";
import Reservation from './pages/Reservation';

// axios.defaults.baseURL = 'https://trains-backend-demo-2gvfwmqjza-lm.a.run.app'
axios.defaults.baseURL = 'http://localhost:8080'

function App() {
    return (
        <TextColorProvider>
            <BrowserRouter>
                <Toaster position='bottom-right' toastOptions={{ duration: 2000 }} />
                <Routes>
                    <Route path="/" element={<Hero />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/routes-display" element={<RoutesDisplay />} />
                    <Route path="/add-reservation" element={<Reservation />} />
                    <Route path="/user-dashboard" element={<UserDashboard /> } />
                    <Route path="/payment" element={<Payment /> } />
                    <Route path="/schedule" element={<Schedule /> } />
                </Routes>
            </BrowserRouter>
        </TextColorProvider>
    );
}

export default App;
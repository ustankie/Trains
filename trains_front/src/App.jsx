import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero'
import Login from './components/Login'
import Register from './components/Register';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080'

function App() {
    return (
	    <BrowserRouter>
            <Routes>
                <Route path="/" element={<Hero />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
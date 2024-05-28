import '../styles/Login.css'
import { Link } from "react-router-dom"
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function Register() {
    const [data, setData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        login: '',
        password: '',

    });
    const navigate = useNavigate();


    function register() {
        const {firstname, lastname, email, phone, login, password}=data;
        axios.post("/api/auth/register",{
            firstname: firstname,
            lastname: lastname,
            email: email,
            phone: phone,
            login: login,
            password: password
        })  
        .then((response) => console.log(response.data))
        .then((error) => console.log(error));
        console.log("post");    
        navigate("/login")
    }


    return (
        <div className="register--container">
            <div className="home--link"><Link to="/">TRAIN <span className="blue">SERVICE</span></Link></div>
            <div className="login--bg"></div>
            <div className="register--wrapper">
                <div className="login--tabs">
                    <Link to="/login"><p className="sign--btn login--not--active">Sign in</p></Link>
                    <p className="sign--btn login--active">Sign up</p>

                </div>

                <form className="login--form">
                    <p className="login--text">First name</p>
                    <input type="text" className="login--input" id="firstname" placeholder="Your first name" autoComplete="off" name="firstname" 
                         value={data.firstname} onChange={(e) => setData({ ...data, firstname: e.target.value })}/>
                    <p className="login--text">Last name</p>
                    <input type="text" className="login--input" id="lastname" placeholder="Your last name" autoComplete="off" name="lastname" 
                         value={data.lastname} onChange={(e) => setData({ ...data, lastname: e.target.value })}/>
                    <p className="login--text">E-mail</p>
                    <input type="text" className="login--input" id="email" placeholder="Your email" autoComplete="off" name="email"
                         value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
                    <p className="login--text">Phone number</p>
                    <input type="text" className="login--input" id="phone" placeholder="Your phone number" autoComplete="off" name="phone" 
                         value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })}/>
                    <p className="login--text">Username</p>
                    <input type="text" className="login--input" id="username" placeholder="Your username" autoComplete="off" name="username" 
                        value={data.login} onChange={(e) => setData({ ...data, login: e.target.value })} />
                    <p className="login--text">Password</p>
                    <input type="password" className="login--input" id="password" placeholder="Your password" autoComplete="off" name="password" 
                         value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })}/>
                    <button className="login--btn" id="register" type="submit" onClick={register}>Sign up</button>
                </form>
            </div>
        </div>
    )
}
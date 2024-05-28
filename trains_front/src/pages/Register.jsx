import '../styles/Login.css'
import { Link } from "react-router-dom"
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { request } from '../util/Authentication';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';



export default function Register() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const registerUser = async (data) => {
        const { firstname, lastname, email, phone, login, password } = data;

        request("POST", "/api/auth/register", {
            firstname: firstname,
            lastname: lastname,
            email: email,
            phone: phone,
            login: login,
            password: password
        }, {})
            .then((response) => {
                console.log(response.data);
                toast.success("Registration succesfull")
                navigate("/login");
            })
            .catch((error) => {
                if (error.response.data.includes("login_unique")) {
                    toast.error("This username already exists!");
                }
                else if (error.response.data.includes("email_unique")) {
                    toast.error("There is an account connected to this email!");
                }
                else if (error.response.data.includes("phone_unique")) {
                    toast.error("There is an account connected to this phone!");
                }
                console.log(error.response.data);
            });
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

                <form className="login--form" onSubmit={handleSubmit(registerUser)}>
                    <p className="login--text">First name</p>
                    <input type="text" className="login--input" id="firstname" placeholder="Your first name" autoComplete="off" name="firstname"
                        {...register("firstname", { required: "Firstname is required" })} />
                    {errors.firstname && <span className='register--error-message'>{errors.firstname.message}</span>}

                    <p className="login--text">Last name</p>
                    <input type="text" className="login--input" id="lastname" placeholder="Your last name" autoComplete="off" name="lastname"
                        {...register("lastname", { required: "Lastname is required" })} />
                    {errors.lastname && <span className='register--error-message'>{errors.lastname.message}</span>}

                    <p className="login--text">E-mail</p>
                    <input type="email" className="login--input" id="email" placeholder="Your email" autoComplete="off" name="email"
                        {...register("email", { required: "Email is required" })} />
                    {errors.email && <span className='register--error-message'>{errors.email.message}</span>}

                    <p className="login--text">Phone number</p>
                    <input type="text" className="login--input" id="phone" placeholder="Your phone number" autoComplete="off" name="phone"
                        {...register("phone", {
                            required: "Phone is required",
                            pattern: {
                                value: /^\+[0-9]+$/,
                                message: "Invalid phone number"
                            }
                        })} />
                    {errors.phone && <span className='register--error-message'>{errors.phone.message}</span>}

                    <p className="login--text">Username</p>
                    <input type="text" className="login--input" id="username" placeholder="Your username" autoComplete="off" name="username"
                        {...register("login", { required: "Username is required" })} />

                    {errors.login && <span className='register--error-message'>{errors.login.message}</span>}

                    <p className="login--text">Password</p>
                    <input type="password" className="login--input" id="password" placeholder="Your password" autoComplete="off" name="password"
                        {...register("password", { required: "Password required" })} />
                    {errors.password && <span className='register--error-message'>{errors.password.message}</span>}

                    <button className="login--btn" id="register" type="submit" >Sign up</button>
                </form>
            </div>
        </div>
    )
}
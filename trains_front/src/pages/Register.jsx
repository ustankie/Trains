import '../styles/Login.css'
import { Link } from "react-router-dom"


export default function Register() {



    return (
        <div className="login--container">
            <div className="home--link"><Link to="/">TRAIN <span className="blue">SERVICE</span></Link></div>
            <div className="login--bg"></div>
            <div className="login--wrapper">
                <div className="login--tabs">
                    <Link to="/login"><p className="sign--btn login--not--active">Sign in</p></Link>
                    <p className="sign--btn login--active">Sign up</p>
                    
                </div>

                <form className="login--form">
                    <p className="login--text">E-mail</p>
                    <input type="text" className="login--input" id="email" placeholder="Your email" autoComplete="off" name="email" />
                    <p className="login--text">Username</p>
                    <input type="text" className="login--input" id="username" placeholder="Your username" autoComplete="off" name="username" />
                    <p className="login--text">Password</p>
                    <input type="password" className="login--input" id="password" placeholder="Your password" autoComplete="off" name="password"/>
                    <button className="login--btn" type="submit">Sign up</button>
                </form>
            </div>
        </div>
    )
}
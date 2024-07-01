
import {isTokenExpired,setAuthToken} from '../util/Authentication';
import { toast } from 'react-hot-toast';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import "../styles/Navbar.css";

import "../styles/Login.css";
import CustomDrawer from './CustomDrawer';

export default function Navbar(color_mode) {
    const navigate=useNavigate();

    return (
        <div className="navbar--wrapper">
            <CustomDrawer />
            <div className="home--link">
                <Link to="/">
                    <span className="white">TRAIN</span><span className="blue">SERVICE</span>
                </Link>
            </div>
        </div>
    ) 
    
    // <>
    // <div className='navbar--logged-in-wrapper'>
    //     {!isTokenExpired() ?
    //         <>
    //             <div className={`${color_mode.color_mode} login--link `} ><Link to="/user-dashboard"><p>YOUR <span className="blue">ROUTES</span></p></Link></div>
    //             <div className={`login--link ${color_mode.color_mode}`} onClick={() => { setAuthToken("null"); toast.success("Logout successful"); navigate("/") }}>LOG <span className="blue">OUT</span></div>
    //             </>
           
    //         : <div className={`login--link ${color_mode.color_mode}`}><Link to="/login"><p>SIGN <span className="blue">IN</span></p></Link></div>
    //     }
    //      </div>
    // </>
}
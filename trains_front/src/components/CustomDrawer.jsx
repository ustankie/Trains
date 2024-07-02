import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LoginIcon from '@mui/icons-material/Login';
import CreateIcon from '@mui/icons-material/Create';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import MenuIcon from '@mui/icons-material/Menu';
import RouteIcon from '@mui/icons-material/Route';
import LogoutIcon from '@mui/icons-material/Logout';

import {isTokenExpired,setAuthToken} from '../util/Authentication';
import { toast } from 'react-hot-toast';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useTextColor } from "../util/TextColorContext";

export default function CustomDrawer() {
    const { color } = useTextColor();
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const handleLogout = () => {
        setAuthToken("null");
        toast.success("Logout successful");
        navigate("/");
      };
    
    const menuItems = isTokenExpired()
    ? [
        { to: "/login", icon: <LoginIcon />, text: "Log in" },
        { to: "/register", icon: <CreateIcon />, text: "Sign up" },
        ]
    : [
        { onClick: handleLogout, icon: <LogoutIcon />, text: "Log out" },
        { to: "/user-dashboard", icon: <RouteIcon />, text: "Your routes" },
        ];

    const drawerContent = (
        <div className="drawer--content">
            <List className="horizontal">
                {menuItems.map((item, index) => (
                item.to ? (
                    <Link key={index} to={item.to} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItem disablePadding>
                        <ListItemButton sx={{ whiteSpace: 'nowrap' }}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                    </Link>
                ) : (
                    <ListItem key={index} disablePadding onClick={item.onClick}>
                    <ListItemButton sx={{ whiteSpace: 'nowrap' }}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItemButton>
                    </ListItem>
                )
                ))}
                <ListItem disablePadding>
                <ListItemButton sx={{ whiteSpace: 'nowrap' }}>
                    <ListItemIcon><DepartureBoardIcon /></ListItemIcon>
                    <ListItemText primary="Schedule" />
                </ListItemButton>
                </ListItem>
            </List>
        </div>
    )

    return (
        <div>
            <Button onClick={toggleDrawer(true)}>
            <MenuIcon
                sx={{
                fontSize: '3em', 
                color: { color },
                }}
            />
            </Button>
            <Drawer open={open} onClose={toggleDrawer(false)} anchor="bottom" >
                {drawerContent}
            </Drawer>
        </div>
    )

}


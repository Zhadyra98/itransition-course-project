import React, { useState, useEffect } from "react";
import {  AppBar, Avatar, Button, Typography, Toolbar } from '@mui/material'
import useStyles from '../../styles';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

const Navbar = () => {
    const classes = useStyles();
    const [ user, setUser ] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT'});
        navigate("/");
        setUser(null);
    }
    
    useEffect(() => {
        const token = user?.token;
        if(token) {
            const decodedToken = decode(token);
            if(decodedToken.exp * 1000 < new Date().getTime()) handleLogout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);
    return(
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div>
                <Typography className={classes.heading} component={Link} to="/" variant="h2" align="center">Memories</Typography>
            </div>
            <Toolbar>
                {user ? (
                    <div>
                        <Avatar 
                            alt={user.result.name} 
                            src={user.result.imageUrl}
                        >{user.result.name.charAt(0)}</Avatar>
                        <Typography variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" color="secondary" onClick={handleLogout}>Logout</Button>
                    </div>
                ):(
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import { FormattedMessage } from "react-intl";
import { LOGOUT } from '../constants/actionTypes';

export default function HeaderButton() {
    const [ user, setUser ] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = user?.token;
        if(token) {
            const decodedToken = decode(token);
            if(decodedToken.exp * 1000 < new Date().getTime()) handleLogout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
        // eslint-disable-next-line
    }, [location]);

    const handleLogout = () => {
        dispatch({ type: LOGOUT});
        navigate("/");
        setUser(null);
    }

    const handleLogin = () => {
        navigate("/auth");
    }

    return (
        <>
            {user ? (
                <div className="d-flex">
                    <h6>{user.result.name}</h6>
                    <button onClick={handleLogout} className="btn btn-outline-light">
                        <FormattedMessage id="logout.button" />
                    </button>
                </div>
                ):(
                    <button onClick={handleLogin} className="btn btn-outline-light" >
                        <FormattedMessage id="login.button" />
                    </button>
                )
            }
        </>
    )
}

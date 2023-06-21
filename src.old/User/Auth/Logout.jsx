import axios from "axios";
import React, { useEffect, useState } from "react";
import config from "../../config";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const [user, setUser] = useState(null);
    const [isLoggingOut, setLoggingOut] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (user === null) {
            setUser(JSON.parse(window.localStorage.getItem('user')));
        }
    }, [user])
    
    useEffect(() => {
        if (isLoggingOut && user !== null) {
            setLoggingOut(false);
            axios.post(`${config.baseUrl}/api/user/logout`, {
                token: user.token
            })
            .then(response => {
                console.log('loggedout');
                window.localStorage.removeItem('user');
                navigate('/');
            })
        }
    }, [isLoggingOut, user])

    return (
        <>
            <div className="absolute top-0 left-0 right-0 bottom-0 flex column item-center justify-center">
                <div className="text size-24">Logging out...</div>
            </div>
        </>
    )
}

export default Logout;
import axios from "axios";
import React, { useState } from "react";
import config from "../config";
import { useNavigate } from "react-router-dom";

const AffiliateLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const submit = e => {
        axios.post(`${config.baseUrl}/api/affiliate/login`, {
            email: email,
            password: password,
        })
        .then(response => {
            let res = response.data;
            if (res.status === 200) {
                window.localStorage.setItem('affiliator_data', JSON.stringify(res.affiliator));
                navigate('/affiliate/dashboard');
            } else {
                setErrorMessage(res.message);
            }
        })
        e.preventDefault();
    }

    return (
        <>
            <div className="fixed top-0 left-0 bottom-0 w-60 bg-secondary"></div>
            <div className="absolute top-0 right-0 w-40 bottom-0 flex column justify-center p-4">

                <h1 className="mt-0">Panel Affiliator</h1>
                <form action="#" onSubmit={submit}>
                    <div className="group">
                        <input type="text" id="email" value={email} onChange={e => {
                            setEmail(e.currentTarget.value);
                            setErrorMessage('');
                        }} required />
                        <label htmlFor="email">Email :</label>
                    </div>
                    <div className="group">
                        <input type="password" id="password" value={password} onChange={e => {
                            setPassword(e.currentTarget.value);
                            setErrorMessage('');
                        }} required />
                        <label htmlFor="password">Password :</label>
                    </div>

                    {
                        errorMessage !== "" &&
                        <div className="bg-red transparent p-15 rounded text small pl-2 pr-2 mt-1">
                            {errorMessage}
                        </div>
                    }

                    <button className="secondary w-100 mt-2">Login</button>
                </form>
            </div>
        </>
    )
}

export default AffiliateLogin;
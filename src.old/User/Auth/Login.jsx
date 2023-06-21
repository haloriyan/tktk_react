import React, { useEffect, useState } from "react";
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

import '../../styles/Auth.css';
import axios from "axios";
import config from "../../config";
import ErrorMessage from "./ErrorMessage";
import { useNavigate } from "react-router-dom";
import Script from "../../components/Script";
import { GoogleOAuthProvider, googleLogout, useGoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";

const Login = (e) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [googleReady, setGoogleReady] = useState(false);

    useEffect(() => {
        document.title = "Login - Agendakota"
    });

    const navigate = useNavigate();

    function base64urlDecode(str) {
        // return Buffer(base64urlUnescape(str), 'base64').toString();
        return Buffer.from(base64urlUnescape(str)).toString('base64');
    };
      
    function base64urlUnescape(str) {
        str += Array(5 - str.length % 4).join('=');
        return str.replace(/\-/g, '+').replace(/_/g, '/');
    }
    const decodeJwt = (token) => {
        console.log('jalan');
        var segments = token.split('.');
        console.log('jalan 2');
    
        if (segments.length !== 3) {
            console.log('jalan 2.1', segments);
            throw new Error('Not enough or too many segments');
        }

        console.log('jalan 3');
    
        // All segment should be base64
        var headerSeg = segments[0];
        var payloadSeg = segments[1];
        var signatureSeg = segments[2];
    
        // base64 decode and parse JSON
        var header = JSON.parse(base64urlDecode(headerSeg));
        var payload = JSON.parse(base64urlDecode(payloadSeg));
    
        return {
          header: header,
          payload: payload,
          signature: signatureSeg
        }
    
    }

    const gettingProfile = accessToken => {
        axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`)
        .then(response => {
            let res = response.data;
            login({
                email: res.email,
                name: res.name,
                g_sub: res.sub,
                with_google: 1,
            })
        })
    }
    const triggerGoogle = useGoogleLogin({
        onSuccess: (response) => {
            gettingProfile(response.access_token)
        },
        onError: err => console.log(err),
    })

    const login = (payload) => {
        axios.post(`${config.baseUrl}/api/user/login`, payload)
        .then(response => {
            let res = response.data;
            if (res.status === 200) {
                window.localStorage.setItem('user', JSON.stringify(res.user));
                // navigate('/');
            } else {
                setErrorMessage(res.message);
            }
        })
    }

    const submit = (e) => {
        if (email === "") {
            setErrorMessage('Bidang email tidak boleh kosong');
        } else if (password === "") {
            setErrorMessage('Bidang password tidak boleh kosong');
        } else {
            login({
                email: email,
                password: password,
            })
        }
        e.preventDefault();
    }

    return (
        <>
            <div className="LoginContent flex row item-center">
                <div className="flex column w-60" style={{height: '100%'}}>
                    <div className="flex column justify-end grow-1 p-4 bg-red" style={{
                        backgroundImage: `url('/images/auth.png')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center center'
                    }}>
                        <div className="text size-42 bold">Login untuk melihat berbagai event menarik</div>
                    </div>
                </div>
                <div className="flex column item-center grow-1 p-4">
                    <img src="/images/logo.png" alt="Logo Agendakota" className="h-50 mb-3" />

                    {
                        errorMessage !== "" && <ErrorMessage message={errorMessage} />
                    }

                    <form action="#" className="w-100 mt-1" onSubmit={e => submit(e)}>
                        <div className="group">
                            <input type="text" value={email} id="email" onInput={e => {
                                setEmail(e.currentTarget.value);
                                setErrorMessage('');
                            }} />
                            <label htmlFor="email">Email :</label>
                        </div>
                        <div className="group relative">
                            <input type={hidePassword ? 'password' : 'text'} value={password} id="password" className="pr-5" onInput={e => {
                                setPassword(e.currentTarget.value);
                                setErrorMessage('');
                            }} />
                            <label htmlFor="password">Password :</label>
                            <div className="absolute pointer" style={{top: '45%',right: '5%'}} onClick={() => setHidePassword(!hidePassword)}>
                                {
                                    hidePassword ? <MdVisibility /> : <MdVisibilityOff />
                                }
                            </div>
                        </div>

                        <div className="text right mt-2">
                            <a href="/forget-password" className="text primary small">
                                Lupa password?
                            </a>
                        </div>

                        <button className="mt-2 w-100 primary">Login</button>

                        <div className="text center small mt-2">
                            belum punya akun? <a href="/register" className="text primary">Register</a>
                        </div>

                        <div className="h-40"></div>

                        <div className="border primary text rounded pointer p-1 flex row item-center justify-center" onClick={triggerGoogle}>
                            <img 
                                src="/images/icon-google.png" 
                                alt="Google Login" 
                                className="h-20 rounded-max ratio-1-1 mr-1" 
                            />
                            Google
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;
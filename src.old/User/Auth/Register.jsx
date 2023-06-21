import React, { useState } from "react";
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import * as BaseStyle from '../../styles/base';
import '../../styles/Auth.css';
import axios from "axios";
import config from "../../config";
import ErrorMessage from "./ErrorMessage";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const submit = (e) => {
        if (name === "") {
            setErrorMessage('Bidang nama tidak boleh kosong');
        } else if (email === "") {
            setErrorMessage('Bidang email tidak boleh kosong');
        } else if (password === "") {
            setErrorMessage('Bidang password tidak boleh kosong');
        } else {
            axios.post(`${config.baseUrl}/api/user/register`, {
                name: name,
                email: email,
                password: password
            })
            .then(response => {
                let res = response.data;
                console.log(res);
                if (res.status === 200) {
                    // 
                } else {
                    setErrorMessage(res.message);
                }
            })
        }
        e.preventDefault();
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
                navigate('/');
            } else {
                setErrorMessage(res.message);
            }
        })
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
                        <div className="text size-42 bold">Daftar dan eksplor <br /> berbagai event menarik <br /> di sekitarmu</div>
                    </div>
                </div>
                <div className="flex column item-center grow-1 p-4">
                    <img src="/images/logo.png" alt="Logo Agendakota" className="h-50 mb-3" />

                    {
                        errorMessage !== "" && <ErrorMessage message={errorMessage} />
                    }

                    <form action="#" className="w-100 mt-1" onSubmit={e => submit(e)}>
                        <div className="group">
                            <input required type="text" value={name} id="name" onInput={e => {
                                setName(e.currentTarget.value);
                                setErrorMessage('');
                            }} />
                            <label htmlFor="name">Nama :</label>
                        </div>
                        <div className="group">
                            <input required type="text" value={email} id="email" onInput={e => {
                                setEmail(e.currentTarget.value);
                                setErrorMessage('');
                            }} />
                            <label htmlFor="email">Email :</label>
                        </div>
                        <div className="group relative">
                            <input required type={hidePassword ? 'password' : 'text'} value={password} id="password" className="pr-5" onInput={e => {
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

                        <button className="mt-2 w-100 primary">Register</button>

                        <div className="text center small mt-2">
                            sudah punya akun? <a href="/login" className="text primary">Login</a> saja
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

export default Register;
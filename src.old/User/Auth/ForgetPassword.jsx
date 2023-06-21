import React, { useState } from "react";
import ErrorMessage from "./ErrorMessage";
import axios from "axios";
import config from "../../config";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const submit = e => {
        axios.post(`${config.baseUrl}/api/`, {
            email: email
        })
        .then(response => {
            let res = response.data;
            if (res.status === 200) {
                navigate('/otp');
            } else {
                setErrorMessage(res.message);
            }
        })
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
                        <div className="text size-42 bold">Atur ulang kata sandi</div>
                    </div>
                </div>
                <div className="flex column item-center grow-1 p-4">
                    <img src="/images/logo.png" alt="Logo Agendakota" className="h-50 mb-3" />

                    {
                        errorMessage !== "" && <ErrorMessage message={errorMessage} />
                    }

                    <form action="#" className="w-100 mt-1" onSubmit={e => submit(e)}>
                        <div className="text">Kami akan mengirim langkah untuk mengatur ulang kata sandi Anda melalui email</div>
                        <div className="group">
                            <input type="email" id="email" value={email} onInput={e => setEmail(e.currentTarget.value)} required />
                            <label htmlFor="email">Email :</label>
                        </div>

                        <button className="primary w-100 mt-2">Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ForgetPassword;
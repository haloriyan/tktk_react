import axios from "axios";
import React, { useState } from "react";
import config from "../config";

const CustomerOtp = ({setCustomer, customer, username}) => {
    const [errorMessage, setErrorMessage] = useState('');

    const authenticate = code => {
        console.log('authenticating with token ', customer);
        axios.post(`${config.baseUrl}/api/otp/customer/auth`, {
            code: code,
            token: customer
        })
        .then(response => {
            let res = response.data;
            if (res.status === 200) {
                console.log(res);
                window.localStorage.setItem(`customer_data_${username}`, JSON.stringify(res.customer));
                setCustomer(null);
            } else {
                setErrorMessage(res.message);
            }
        })
    }
    return (
        <div className="inner_content">
            <div className="h-50"></div>
            <h2 className="m-0">Verifikasi OTP</h2>
            <div className="mt-1">Kami telah mengirim 4 digit kode OTP ke email Anda. Mohon masukkan kode tersebut pada bidang di bawah ini</div>

            <div className="h-40"></div>
            <input 
                type="text" 
                style={{
                    border: 'none',
                    borderRadius: 0,
                    padding: 0,
                    textAlign: 'center',
                    borderBottom: '4px solid #ddd',
                    fontSize: 20,
                    letterSpacing: 8,
                }}
                onInput={e => {
                    let value = e.currentTarget.value;
                    if (value.length === 4) {
                        authenticate(value)
                    }
                    setErrorMessage('');
                }}
            />

            {
                errorMessage !== "" &&
                <div className="mt-2 bg-red transparent p-1 rounded">
                    {errorMessage}
                </div>
            }
        </div>
    )
}

export default CustomerOtp;
import React, { useEffect, useState } from "react";
import BottomNav from "../Partials/BottomNav";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../config";

const CustomerLogin = ({username, setCustomer, user}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        document.body.style.backgroundColor = "#fff";
    }, [])

    const submit = (e) => {
        axios.post(`${config.baseUrl}/api/user/${username}/customer/register`, {
            name, email
        })
        .then(response => {
            let res = response.data;
            setCustomer(res.token);
        })

        e.preventDefault()
    }

    return (
        <div className="inner_content">
            <div className="h-50"></div>
            <h3 className="m-0">Halo...</h3>
            <div className="mt-1">Sebelum melanjutkan, kami ingin meminta beberapa informasi Anda untuk keperluan transaksi</div>
            <form action="#" className="mt-3" onSubmit={submit}>
                <div className="group">
                    <input type="text" id="name" onInput={e => setName(e.currentTarget.value)} />
                    <label htmlFor="name">Nama :</label>
                </div>
                <div className="group">
                    <input type="email" id="email" onInput={e => setEmail(e.currentTarget.value)} />
                    <label htmlFor="email">Email :</label>
                </div>

                <button className="w-100 mt-2 primary">Submit</button>
            </form>
        </div>
    )
}

export default CustomerLogin;
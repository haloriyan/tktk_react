import React, { useEffect, useState } from "react";
import Header from "../../Partials/Header";
import { MdWest } from "react-icons/md";
import BottomNav from "../../Partials/BottomNav";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../../config";

const CustomerPersonal = () => {
    const { username } = useParams();
    const [isLoading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [buttonText, setButtonText] = useState('Simpan Perubahan');

    useEffect(() => {
        if (isLoading) {
            setLoading(false);
            let u = JSON.parse(window.localStorage.getItem(`customer_data_${username}`));
            setName(u.name);
            setEmail(u.email);
            setToken(u.token);
        }
    }, [isLoading]);

    useEffect(() => {
        if (token !== null) {
            axios.post(`${config.baseUrl}/api/user/${username}/customer/auth`, {
                token: token
            })
            .then(response => {
                let res = response.data;
                setUser(res.user);
            })
        }
    }, [token]);

    const submit = () => {
        setButtonText('Menyimpan');
        axios.post(`${config.baseUrl}/api/user/${username}/customer/update`, {
            name, email, token
        })
        .then(response => {
            let res = response.data;
            setButtonText('Simpan Perubahan');
        })
        .catch(err => {
            setButtonText('Simpan Perubahan');
        })
    }

    return (
        <>
            <Header accent_color={user === null ? null : user.accent_color}>
                <a href={`/${username}/me`} className="text white">
                    <MdWest />
                </a>
                <div className="ml-2 text bold white">
                    Data Personal
                </div>
            </Header>

            <div className="content">
                <div className="h-80"></div>
                <div className="text small muted">Data ini digunakan untuk mempermudah proses pemesananmu</div>

                <div className="bg-white p-3 mt-2 pt-1 bordered" style={{borderBottomColor: '#ddd',borderBottomWidth: 8}}>
                <div className="group">
                    <input type="text" id="name" value={name} onInput={e => setName(e.currentTarget.value)} />
                    <label htmlFor="name">Nama :</label>
                </div>
                <div className="group">
                    <input type="text" id="email" value={email} onInput={e => setEmail(e.currentTarget.value)} />
                    <label htmlFor="email">Email :</label>
                </div>

                <button className="primary w-100 mt-2" style={{backgroundColor: user === null ? config.primaryColor : user.accent_color}} onClick={submit}>{buttonText}</button>
                </div>
            </div>

            <BottomNav active="me" accent_color={user === null ? null : user.accent_color} />
        </>
    )
}

export default CustomerPersonal;
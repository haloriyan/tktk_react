import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import config from "../config";
import { useNavigate } from "react-router-dom";

const OrganizerCreate = () => {
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [interest, setInterest] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if (user === null) {
            setUser(JSON.parse(window.localStorage.getItem('user')));
        }
    }, [user]);

    const submit = e => {
        axios.post(`${config.baseUrl}/api/organizer/create`, {
            token: user.token,
            name: name,
            description: description,
            type: type,
            interest: interest,
        })
        .then(response => {
            let res = response.data;
            navigate(`/organizer/${res.organizer.username}`);
        })
        e.preventDefault();
    }

    return (
        <>
            <Header user={user} />
            <Sidebar user={user} />
            <div className="content p-4">
                <h2 className="mt-0">Buat Organizer</h2>

                <form action="#" onSubmit={submit}>
                    <div className="group">
                        <input type="text" id="name" value={name} onInput={e => {
                            setName(e.currentTarget.value);
                        }} />
                        <label htmlFor="name">Nama Organizer :</label>
                    </div>
                    <div className="flex row">
                        <div className="flex column grow-1 mr-1">
                            <div className="group">
                                <select name="type" id="type" required onChange={e => {
                                    setType(e.currentTarget.value);
                                }}>
                                    <option value={''}>Pilih...</option>
                                    {
                                        config.organizer_types.map((type, t) => (
                                            <option key={t} value={type}>{type}</option>
                                        ))
                                    }
                                </select>
                                <label htmlFor="type" className="active">Tipe Organizer :</label>
                            </div>
                        </div>
                        <div className="flex column grow-1 ml-1">
                            <div className="group">
                                <select name="interest" id="interest" required onChange={e => {
                                    setInterest(e.currentTarget.value);
                                }}>
                                    <option value={''}>Pilih...</option>
                                    {
                                        config.organizer_interests.map((interest, t) => (
                                            <option key={t} value={interest}>{interest}</option>
                                        ))
                                    }
                                </select>
                                <label htmlFor="interest" className="active">Tertarik Mengadakan :</label>
                            </div>
                        </div>
                    </div>

                    <div className="group">
                        <textarea name="description" id="description" onInput={e => {
                            setDescription(e.currentTarget.value);
                        }}></textarea>
                        <label htmlFor="description">Tentang Organizer :</label>
                    </div>

                    <button className="mt-2 primary w-100">Buat Organizer</button>
                </form>
            </div>
        </>
    )
}

export default OrganizerCreate;
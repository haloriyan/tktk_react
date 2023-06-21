import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import OrganizerTab from "./Tab";
import axios from "axios";
import config from "../config";
import { useParams } from "react-router-dom";
import MXDropdown from "../components/MXDropdown";
import Popup from "../components/Popup";
import { BiCamera, BiCheck, BiImageAdd } from "react-icons/bi";
import Squarize from "../components/Squarize";
import InputFile from "../components/InputFile";
import SidebarOrganizer from "../components/SidebarOrganizer";

const OrganizerProfile = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const { org_username } = useParams();
    const [message, setMessage] = useState({
        body: '',
        status: 200
    });

    const [organizer, setOrganizer] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [interest, setInterest] = useState('');
    const [cover, setCover] = useState('');
    const [icon, setIcon] = useState('');

    const hideNotif = () => {
        setMessage({body: '', status: 200});
    }

    useEffect(() => {
        if (user === null) {
            setUser(JSON.parse(window.localStorage.getItem('user')));
        }
        Squarize();
    });

    useEffect(() => {
        if (message.body !== "") {
            let fadingOut = setTimeout(() => {
                setMessage({body: '', status: 200});
            }, 2000);

            return () => clearTimeout(fadingOut);
        }
    })

    useEffect(() => {
        if (isLoading && user !== null) {
            setLoading(false);
            axios.post(`${config.baseUrl}/api/organizer`, {
                username: org_username
            })
            .then(response => {
                let res = response.data;
                let org = res.organizer;
                setOrganizer(org);
                setName(org.name);
                setDescription(org.description);
                setType(org.type);
                setInterest(org.interest);
                setCover(org.cover);
                setIcon(org.icon);
            })
        }
    })

    const submit = e => {
        let formData = new FormData();
        formData.append('token', user.token);
        formData.append('id', organizer.id);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('type', type);
        formData.append('interest', interest);
        formData.append('cover', document.querySelector("input#cover").files[0]);
        formData.append('icon', document.querySelector("input#icon").files[0]);
        
        axios.post(`${config.baseUrl}/api/organizer/update`, formData)
        .then(response => {
            let res = response.data;
            setMessage({body: res.message, status: res.status});
        })
        e.preventDefault();
    }

    return (
        <>
            {/* <Sidebar user={user} /> */}
            <SidebarOrganizer user={user} active={'profile'} />
            <Header user={user} />
            <div className="content p-3">
                {
                    organizer !== null &&
                    <form className="p-5" onSubmit={submit}>
                        <div className="group">
                            <div id="prev_cover" className="w-100 ratio-5-2 bordered rounded flex column item-center justify-center" style={
                                cover != "" ? {
                                    background: `url('${config.baseUrl}/storage/organizer_covers/${cover}') no-repeat center center`,
                                    backgroundSize: 'cover'
                                }
                                : null
                            }>
                                {
                                    cover !== "" &&
                                    <img src={`${config.baseUrl}/storage/organizer_covers/${cover}`} className="w-100 ratio-5-2 rounded cover" />
                                }
                            </div>
                            <input type="file" id="cover" onChange={e => InputFile(e, "#prev_cover")} />

                            <div className="absolute top-0 right-0 m-1 bg-primary rounded h-40 ratio-1-1 flex row item-center justify-center">
                                <BiCamera />
                            </div>
                        </div>

                        <div className="flex column item-center mb-3" style={{marginTop: -90}}>
                            <div className="group relative">
                                <div id="prev_icon" className="h-150 ratio-1-1 rounded-max bg-grey" style={{
                                    backgroundImage: icon == null ? `url('/images/DefaultLogo.png')` : `url('${config.baseUrl}/storage/organizer_icons/${icon}')`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center center'
                                }}>
                                </div>
                                <input type="file" id="icon" onChange={e => InputFile(e, "#prev_icon")} />

                                <div className="absolute bottom-0 right-0 h-30 ratio-1-1 m-1 rounded-max bg-primary flex column item-center justify-center">
                                    <BiCamera />
                                </div>
                            </div>
                        </div>

                        <div className="group">
                            <input type="text" id="name" value={name} onInput={e => setName(e.currentTarget.value)} required />
                            <label htmlFor="name">Nama Organizer :</label>
                        </div>
                        <div className="group">
                            <textarea id="description" onInput={e => setDescription(e.currentTarget.value)} value={description} required></textarea>
                            <label htmlFor="description">Deskripsi :</label>
                        </div>

                        <div className="flex row item-center gap-20">
                            <MXDropdown options={config.organizer_types} value={type} setValue={setType} config={{label: 'Tipe Organizer'}} />
                            <MXDropdown options={config.organizer_interests} value={interest} setValue={setInterest} config={{label: 'Tertarik Mengadakan'}} />
                        </div>

                        <button className="mt-3 primary w-100">Simpan Perubahan</button>
                    </form>
                }
            </div>

            {
                message.body != "" &&
                <Popup onDismiss={() => hideNotif()} width="35%">
                    <div className="flex column item-center p-4">
                        <div className="h-100 rounded-max flex row item-center justify-center transparent bg-green squarize use-height">
                            <BiCheck size={46} />
                        </div>
                        <div className="text center size-16 mt-3">{message.body}</div>
                    </div>
                </Popup>
            }
        </>
    )
}

export default OrganizerProfile;
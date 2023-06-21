import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiEdit, BiImageAdd, BiTrash } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";
import { useParams } from "react-router-dom";

import FAB from "../../components/FAB";
import Header from "../../components/Header";
import InputFile from "../../components/InputFile";
import Popup from "../../components/Popup";
import SidebarEvent from "../../components/SidebarEvent";
import Squarize from "../../components/Squarize";
import config from "../../config";

const EventSpeaker = () => {
    const { slug } = useParams();
    const [user, setUser] = useState(null);
    const [event, setEvent] = useState(null);
    const [speakers, setSpeakers] = useState([]);
    const [speaker, setSpeaker] = useState(null);
    const [message, setMessage] = useState({
        status: 200,
        body: ''
    });

    const [name, setName] = useState('');
    const [job, setJob] = useState('');
    const [company, setCompany] = useState('');
    const [photo, setPhoto] = useState('');

    const [isLoading, setLoading] = useState(true);
    const [isAdding, setAdding] = useState(false);
    const [isDeleting, setDeleting] = useState(false);
    const [isEditing, setEditing] = useState(false);

    useEffect(() => {
        if (message.body !== "") {
            setTimeout(() => {
                setMessage({status: 200, body: ''});
            }, 2000);
        }
    })
    
    useEffect(() => {
        if (user === null) {
            setUser(JSON.parse(window.localStorage.getItem('user')));
        }
        Squarize();
    }, [user]);

    useEffect(() => {
        if (isLoading) {
            setLoading(false);
            axios.post(`${config.baseUrl}/api/organizer/event/${slug}/speaker`)
            .then(response => {
                let res = response.data;
                setSpeakers(res.speakers);
                setEvent(res.event);
            })
        }
    }, [user, slug])

    const submit = e => {
        let formData = new FormData();
        formData.append('event_id', event.id);
        formData.append('photo', document.querySelector("input#photo_add").files[0]);
        formData.append('name', name);
        formData.append('job', job);
        formData.append('company', company);

        axios.post(`${config.baseUrl}/api/organizer/event/${slug}/speaker/create`, formData)
        .then(response => {
            let res = response.data;
            setMessage({status: res.status, body: res.message});
            setLoading(true);
            setAdding(false);
        })
        e.preventDefault();
    }
    const edit = e => {
        let formData = new FormData();
        formData.append('event_id', event.id);
        formData.append('photo', document.querySelector("input#photo_edit").files[0]);
        formData.append('id', speaker.id);
        formData.append('name', name);
        formData.append('job', job);
        formData.append('company', company);

        axios.post(`${config.baseUrl}/api/organizer/event/${slug}/speaker/update`, formData)
        .then(response => {
            let res = response.data;
            setMessage({status: res.status, body: res.message});
            setLoading(true);
            setEditing(false);
        })
        e.preventDefault();
    }
    const del = () => {
        axios.post(`${config.baseUrl}/api/organizer/event/${slug}/speaker/delete`, {
            id: speaker.id
        })
        .then(response => {
            let res = response.data;
            setMessage({status: res.status, body: res.message});
            setLoading(true);
            setDeleting(false);
        })
    }
    
    return (
        <>
            <Header user={user} />
            <SidebarEvent active="speaker" />
            <div className="content p-4">
                <h2 className="text bigger mt-0">Speakers</h2>
                {
                    message.body !== "" &&
                    <div className={`${message.status === 200 ? 'bg-green' : 'bg-red'} transparent rounded p-2 mb-2`}>
                        {message.body}
                    </div>
                }

                <div className="flex row wrap gap-20 item-center">
                    {
                        speakers.map((speaker, s) => (
                            <div className="bordered rounded p-2 flex row card" key={s}>
                                <img 
                                    className="h-100 squarize use-height rounded-max bordered cover"
                                    src={`${config.baseUrl}/storage/event/${event.id}/speaker_photos/${speaker.photo}`} 
                                    alt={`Speaker - ${speaker.name}`}
                                />
                                <div className="flex ml-2 column grow-1">
                                    <div className="text bold big">{speaker.name}</div>
                                    <div className="text muted small">
                                        {speaker.job} - {speaker.company}
                                    </div>
                                    <div className="flex row item-center mt-1">
                                        <span className="pointer bg-green transparent rounded p-05 pl-2 pr-2" onClick={() => {
                                            setSpeaker(speaker);
                                            setName(speaker.name);
                                            setCompany(speaker.company);
                                            setJob(speaker.job);
                                            setPhoto(`${config.baseUrl}/storage/event/${event.id}/speaker_photos/${speaker.photo}`);
                                            setEditing(true);
                                        }}>
                                            <BiEdit color={config.colors.green} />
                                        </span>
                                        <span className="pointer bg-red transparent rounded p-05 pl-2 pr-2 ml-2" onClick={() => {
                                            setSpeaker(speaker);
                                            setDeleting(true);
                                        }}>
                                            <BiTrash color={config.colors.red} />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            <FAB icon={<FaPlus color="#fff" />} onClick={() => setAdding(true)} />
            {
                isDeleting &&
                <Popup>
                    <h3 className="mt-0 text big">Hapus Speaker</h3>
                    <div>
                        Yakin ingin menghapus speaker {speaker.name}? Tindakan ini tidak dapat dibatalkan
                    </div>
                    <div className="mt-2 pt-2 border-top flex row item-center justify-end">
                        <div className="text mr-2 pointer" onClick={() => setDeleting(false)}>Batal</div>
                        <div className="text bold red pointer" onClick={del}>Ya</div>
                    </div>
                </Popup>
            }
            {
                isEditing &&
                <Popup onDismiss={() => setEditing(false)}>
                    <h3 className="mt-0 text big">Edit Speaker</h3>
                    <form action="#" onSubmit={e => edit(e)}>
                        <div className="group flex column item-center mb-2">
                            <div className="bordered rounded-max h-100 pointer squarize use-height flex row item-center justify-center" id="preview_edit">
                                <img className="w-100 squarize rounded-max" src={photo} alt={name} />
                            </div>
                            <input type="file" name="photo" id="photo_edit" onChange={e => InputFile(e, "#preview_edit")} />
                        </div>
                        <div className="text muted small center pointer" onClick={() => document.querySelector("input#photo_edit").click()}>Klik untuk mengganti foto</div>

                        <div className="group">
                            <input type="text" id="name" value={name} onInput={e => setName(e.currentTarget.value)} />
                            <label htmlFor="name">Nama :</label>
                        </div>
                        <div className="flex row">
                            <div className="flex column grow-1 mr-1">
                                <div className="group">
                                    <input type="text" value={job} id="job" onInput={e => setJob(e.currentTarget.value)} />
                                    <label htmlFor="job">Pekerjaan :</label>
                                </div>
                            </div>
                            <div className="flex column grow-1 ml-1">
                                <div className="group">
                                    <input type="text" value={company} id="company" onInput={e => setCompany(e.currentTarget.value)} />
                                    <label htmlFor="company">Di Perusahaan :</label>
                                </div>
                            </div>
                        </div>

                        <button className="w-100 primary mt-3">Submit</button>
                    </form>
                </Popup>
            }
            {
                isAdding &&
                <Popup onDismiss={() => setAdding(false)}>
                    <h3 className="mt-0 text big">Tambah Speaker</h3>
                    <form action="#" onSubmit={e => submit(e)}>
                        <div className="group flex column item-center mb-2">
                            <div className="bordered rounded-max h-100 pointer squarize use-height flex row item-center justify-center" id="preview_add">
                                <BiImageAdd />
                            </div>
                            <input type="file" name="photo" id="photo_add" onChange={e => InputFile(e, "#preview_add")} />
                        </div>
                        <div className="group">
                            <input type="text" id="name" onInput={e => setName(e.currentTarget.value)} />
                            <label htmlFor="name">Nama :</label>
                        </div>
                        <div className="flex row">
                            <div className="flex column grow-1 mr-1">
                                <div className="group">
                                    <input type="text" id="job" onInput={e => setJob(e.currentTarget.value)} />
                                    <label htmlFor="job">Pekerjaan :</label>
                                </div>
                            </div>
                            <div className="flex column grow-1 ml-1">
                                <div className="group">
                                    <input type="text" id="company" onInput={e => setCompany(e.currentTarget.value)} />
                                    <label htmlFor="company">Di Perusahaan :</label>
                                </div>
                            </div>
                        </div>

                        <button className="w-100 primary mt-3">Submit</button>
                    </form>
                </Popup>
            }
        </>
    )
}

export default EventSpeaker;
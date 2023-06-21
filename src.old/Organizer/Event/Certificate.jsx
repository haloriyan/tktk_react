import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiEdit, BiImageAdd, BiTrash, BiX } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";
import { useParams } from "react-router-dom";
import FAB from "../../components/FAB";
import Header from "../../components/Header";
import InputFile from "../../components/InputFile";
import Popup from "../../components/Popup";
import SidebarEvent from "../../components/SidebarEvent";
import Squarize from "../../components/Squarize";
import config from "../../config";

const TypeToggler = ({type, setType, setSessionID, setRundownID, rundowns, sessions, rundownID = null, sessionID = null}) => {
    return (
        <div>
            <div className="flex row p-05 gap-10 border primary rounded-max">
                <div 
                    className={`flex row grow-1 justify-center item-center pointer h-40 rounded-max ${type === 'event' ? 'bg-primary' : ''}`}
                    onClick={e => {
                        setType('event');
                    }}
                >
                    Event
                </div>
                <div 
                    className={`flex row grow-1 justify-center item-center pointer h-40 rounded-max ${type === 'rundown' ? 'bg-primary' : ''}`}
                    onClick={e => {
                        setType('rundown');
                        setSessionID(null);
                    }}
                >
                    Rundown
                </div>
                <div 
                    className={`flex row grow-1 justify-center item-center pointer h-40 rounded-max ${type === 'session' ? 'bg-primary' : ''}`}
                    onClick={e => {
                        setType('session');
                        setRundownID(null);
                    }}
                >
                    Session
                </div>
            </div>
            {
                type === 'rundown' &&
                <div className="group">
                    <select id="rundownID" onChange={e => setRundownID(e.currentTarget.value)} required>
                        <option value="">Pilih Rundown ...</option>
                        {
                            rundowns.map((rundown, r) => (
                                <option selected={(rundownID !== null && rundownID === rundown.id) ? true : false} key={r} value={rundown.id}>{rundown.title}</option>
                            ))
                        }
                    </select>
                    <label htmlFor="rundownID" className="active">Rundown :</label>
                </div>
            }
            {
                type === 'session' &&
                <div className="group">
                    <select id="sessionID" onChange={e => setSessionID(e.currentTarget.value)} required>
                        <option value="">Pilih Session ...</option>
                        {
                            sessions.map((session, s) => (
                                <option selected={(sessionID !== null && sessionID === session.id) ? true : false} key={s} value={session.id}>{session.title}</option>
                            ))
                        }
                    </select>
                    <label htmlFor="sessionID" className="active">Session :</label>
                </div>
            }
        </div>
    )
}

const EventCertificate = () => {
    const { slug } = useParams();
    const [user, setUser] = useState(null);
    const [event, setEvent] = useState(null);
    const [rundowns, setRundowns] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [certificates, setCertificates] = useState([]);
    const [certificate, setCertificate] = useState(null);
    const [message, setMessage] = useState({
        status: 200,
        body: ''
    });

    const [rundownID, setRundownID] = useState(null);
    const [sessionID, setSessionID] = useState(null);
    const [type, setType] = useState('event');
    const [xPos, setXPos] = useState('0');
    const [yPos, setYPos] = useState('0');
    const [fontSize, setFontSize] = useState('20');
    const [fontWeight, setFontWeight] = useState('400');
    const [fontFamily, setFontFamily] = useState('inter');

    const families = ['inter', 'poppins', 'roboto'];

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
        if (isLoading && user !== null) {
            setLoading(false);
            axios.post(`${config.baseUrl}/api/organizer/event/${slug}/certificate`, {
                token: user.token
            })
            .then(response => {
                let res = response.data;
                setCertificates(res.certificates);
                setEvent(res.event);
                setRundowns(res.rundowns);
                setSessions(res.sessions);
            })
        }
    }, [isLoading, user, slug])

    const appendingForm = () => {
        let formData = new FormData();
        formData.append('event_id', event.id);
        formData.append('rundown_id', rundownID);
        formData.append('session_id', sessionID);
        formData.append('type', type);
        formData.append('font_size', fontSize);
        formData.append('font_family', fontFamily);
        formData.append('font_weight', fontWeight);
        formData.append('name_position', `${xPos}|${yPos}`);
        return formData;
    }
    const submit = e => {
        let formData = new FormData();
        formData.append('event_id', event.id);
        formData.append('rundown_id', rundownID);
        formData.append('session_id', sessionID);
        formData.append('type', type);
        formData.append('font_size', fontSize);
        formData.append('font_family', fontFamily);
        formData.append('font_weight', fontWeight);
        formData.append('name_position', `${xPos}|${yPos}`);
        formData.append('image', document.querySelector("input#image_add").files[0]);

        axios.post(`${config.baseUrl}/api/organizer/event/${slug}/certificate/create`, formData)
        .then(response => {
            let res = response.data;
            setMessage({status: res.status, body: res.message});
            setLoading(true);
            setAdding(false);
        })
        e.preventDefault();
    }
    const edit = e => {
        let formData = appendingForm();
        formData.append('id', certificate.id);
        formData.append('image', document.querySelector("input#image_edit").files[0]);
        axios.post(`${config.baseUrl}/api/organizer/event/${slug}/certificate/update`, formData)
        .then(response => {
            let res = response.data;
            setMessage({status: res.status, body: res.message});
            setLoading(true);
            setEditing(false);
        })

        e.preventDefault();
    }

    const del = () => {
        axios.post(`${config.baseUrl}/api/organizer/event/${slug}/certificate/delete`, {
            id: certificate.id
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
            <Header />
            <SidebarEvent active="certificate" />
            <div className="content p-4">
                <h2 className="text bigger mt-0">Sertifikat</h2>

                {
                    message.body !== "" &&
                    <div className={`${message.status === 200 ? 'bg-green' : 'bg-red'} transparent rounded p-2 mb-2`}>
                        {message.body}
                    </div>
                }

                <div className="flex row wrap gap-20">
                    {
                        certificates.map((cert, c) => (
                            <div key={c} className="bordered rounded flex column grow-1 basis-3">
                                <img 
                                    src={`${config.baseUrl}/storage/event/${event.id}/certificates/${cert.filename}`} 
                                    className="w-100 rounded-top-left rounded-top-right cover ratio-16-9"
                                    alt="Template Sertifikat"
                                />
                                <div className="p-2 flex row item-center">
                                    <div className="flex column grow-1">
                                        {
                                            (cert.session === null && cert.rundown === null) &&
                                            <div>
                                                <div className="text muted small">Event</div>
                                                {event.name}
                                            </div>
                                        }
                                        {
                                            cert.session !== null &&
                                            <div>
                                                <div className="text muted small">Session</div>
                                                {cert.session.title}
                                            </div>
                                        }
                                        {
                                            cert.rundown !== null &&
                                            <div>
                                                <div className="text muted small">Rundown</div>
                                                {cert.rundown.title}
                                            </div>
                                        }
                                    </div>
                                    <button className="green small ratio-1-1 rounded-max h-40 mr-1" style={{padding: 0}} onClick={() => {
                                        setCertificate(cert);
                                        setEditing(true);
                                        setRundownID(cert.rundown_id);
                                        setSessionID(cert.session_id);
                                        if (cert.rundown === null && cert.session === null) {
                                            setType('event');
                                        } else if (cert.rundown !== null) {
                                            setType('rundown');
                                        } else if (cert.session !== null) {
                                            setType('session');
                                        }
                                        let pos = cert.name_position.split('|');
                                        setXPos(pos[0]);
                                        setYPos(pos[1]);
                                        setFontSize(cert.font_size);
                                        setFontWeight(cert.font_weight);
                                        setFontFamily(cert.font_family);
                                    }}>
                                        <BiEdit />
                                    </button>
                                    <button className="red small ratio-1-1 rounded-max h-40" style={{padding: 0}} onClick={() => {
                                        setCertificate(cert);
                                        setDeleting(true);
                                    }}>
                                        <BiTrash />
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            <FAB icon={<FaPlus color="#fff" />} onClick={e => setAdding(true)} />

            {
                isDeleting &&
                <Popup onDismiss={() => setDeleting(false)}>
                    <h3 className="mt-0 text big">Hapus Sertifikat</h3>
                    <div>
                        Yakin ingin menghapus sertifikat ini?
                    </div>
                    <div className="mt-2 pt-2 border top flex row item-center justify-end">
                        <div className="text mr-2 pointer" onClick={() => setDeleting(false)}>Batal</div>
                        <div className="text bold red pointer" onClick={del}>Ya</div>
                    </div>
                </Popup>
            }
            
            {
                isEditing &&
                <Popup onDismiss={() => setEditing(false)}>
                    <div className="flex row item-center">
                        <h3 className="m-0 text big flex grow-1">Edit Sertifikat</h3>
                        <div className="bg-grey pointer h-50 squarize rounded-max use-height flex row item-center justify-center" onClick={() => setEditing(false)}>
                            <BiX />
                        </div>
                    </div>
                    <form action="#" onSubmit={edit} className="mt-2">
                        <TypeToggler 
                            type={type} setType={setType} 
                            setRundownID={setRundownID} setSessionID={setSessionID} 
                            rundowns={rundowns} sessions={sessions}
                            rundownID={rundownID} sessionID={sessionID}
                        />

                        <div className="h-20"></div>
                        <div className="group relative">
                            <div id="prev_edit" className="w-100 mt-1 rounded ratio-16-9 bg-grey flex column item-center justify-center">
                                <img 
                                    src={`${config.baseUrl}/storage/event/${event.id}/certificates/${certificate.filename}`} 
                                    alt="Template" 
                                    className="w-100 ratio-16-9 rounded cover"
                                />
                            </div>
                            <input type="file" id="image_edit" onChange={e => InputFile(e, "#prev_edit")} />
                        </div>
                        <div className="text center mt-1 muted">Klik gambar untuk mengganti template sertifikat</div>

                        <div className="text bold muted mt-2">Posisi Nama :</div>
                        <div className="flex row">
                            <div className="flex column grow-1 mr-1">
                                <div className="group">
                                    <input type="text" id="xAxis" value={xPos} onInput={e => setXPos(e.currentTarget.value)} />
                                    <label htmlFor="xAxis">X Axis :</label>
                                </div>
                            </div>
                            <div className="flex column grow-1 ml-1">
                                <div className="group">
                                    <input type="text" id="yAxis" value={yPos} onInput={e => setYPos(e.currentTarget.value)} />
                                    <label htmlFor="yAxis">Y Axis :</label>
                                </div>
                            </div>
                        </div>

                        <div className="text bold muted mt-2">Styling :</div>
                        <div className="flex row gap-20">
                            <div className="flex column grow-1">
                                <div className="group">
                                    <input type="number" id="fontSize" value={fontSize} onInput={e => setFontSize(e.currentTarget.value)} />
                                    <label htmlFor="fontSize">Font Size (px) :</label>
                                </div>
                            </div>
                            <div className="flex column grow-1">
                                <div className="group">
                                    <select id="fontWeight" value={fontWeight} onChange={e => setFontWeight(e.currentTarget.value)}>
                                        <option>400</option>
                                        <option>600</option>
                                        <option>700</option>
                                    </select>
                                    <label htmlFor="fontWeight" className="active">Font Weight :</label>
                                </div>
                            </div>
                            <div className="flex column grow-1">
                                <div className="group">
                                    <select id="fontFamily" value={fontFamily} onChange={e => setFontFamily(e.currentTarget.value)}>
                                        {
                                            families.map((family, f) => (
                                                <option key={f}>{family}</option>
                                            ))
                                        }
                                    </select>
                                    <label htmlFor="fontFamily" className="active">Family :</label>
                                </div>
                            </div>
                        </div>

                        <button className="w-100 mt-3 primary">Simpan Perubahan</button>
                    </form>
                </Popup>
            }
            {
                isAdding &&
                <Popup onDismiss={() => setAdding(false)}>
                    <div className="flex row item-center">
                        <h3 className="m-0 text big flex grow-1">Buat Sertifikat</h3>
                        <div className="bg-grey pointer h-50 squarize rounded-max use-height flex row item-center justify-center" onClick={() => setAdding(false)}>
                            <BiX />
                        </div>
                    </div>
                    <form action="#" onSubmit={submit} className="mt-2">
                        <div className="text mb-1 center">Buat sertifikat untuk :</div>
                        <TypeToggler 
                            type={type} setType={setType} 
                            setRundownID={setRundownID} setSessionID={setSessionID} 
                            rundowns={rundowns} sessions={sessions}
                        />

                        <div className="h-20"></div>
                        <div className="group relative">
                            <div id="prev_add" className="w-100 mt-1 rounded ratio-16-9 bg-grey flex column item-center justify-center">
                                <BiImageAdd size={32} />
                                <div className="text mt-1">Upload Template Sertifikat</div>
                                <div className="text mt-05 small muted">(PNG, JPG)</div>
                            </div>
                            <input type="file" id="image_add" onChange={e => InputFile(e, "#prev_add")} />
                        </div>

                        <div className="text bold muted mt-2">Posisi Nama :</div>
                        <div className="flex row">
                            <div className="flex column grow-1 mr-1">
                                <div className="group">
                                    <input type="text" id="xAxis" onInput={e => setXPos(e.currentTarget.value)} />
                                    <label htmlFor="xAxis">X Axis :</label>
                                </div>
                            </div>
                            <div className="flex column grow-1 ml-1">
                                <div className="group">
                                    <input type="text" id="yAxis" onInput={e => setYPos(e.currentTarget.value)} />
                                    <label htmlFor="yAxis">Y Axis :</label>
                                </div>
                            </div>
                        </div>
                        
                        <div className="text bold muted mt-2">Styling :</div>
                        <div className="flex row gap-20">
                            <div className="flex column grow-1">
                                <div className="group">
                                    <input type="number" id="fontSize" value={fontSize} onInput={e => setFontSize(e.currentTarget.value)} />
                                    <label htmlFor="fontSize">Font Size (px) :</label>
                                </div>
                            </div>
                            <div className="flex column grow-1">
                                <div className="group">
                                    <select id="fontWeight" onChange={e => setFontWeight(e.currentTarget.value)}>
                                        <option>400</option>
                                        <option>600</option>
                                        <option>700</option>
                                    </select>
                                    <label htmlFor="fontWeight" className="active">Font Weight :</label>
                                </div>
                            </div>
                            <div className="flex column grow-1">
                                <div className="group">
                                    <select id="fontFamily" onChange={e => setFontFamily(e.currentTarget.value)}>
                                        {
                                            families.map((family, f) => (
                                                <option key={f}>{family}</option>
                                            ))
                                        }
                                    </select>
                                    <label htmlFor="fontFamily" className="active">Family :</label>
                                </div>
                            </div>
                        </div>

                        <button className="w-100 mt-3 primary">Submit</button>
                    </form>
                </Popup>
            }
        </>
    )
}

export default EventCertificate;
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useParams, useSearchParams } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import 'flatpickr/dist/themes/material_red.css';

import FAB from "../../components/FAB";
import Header from "../../components/Header";
import Popup from "../../components/Popup";
import SidebarEvent from "../../components/SidebarEvent";
import Squarize from "../../components/Squarize";
import config from "../../config";
import moment from "moment";
import { useDebouncedCallback } from "use-debounce";
import { BiEdit, BiTime, BiTrash, BiX } from "react-icons/bi";
import InArray from "../../components/InArray";

const EventSession = () => {
    const { slug } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [user, setUser] = useState(null);
    const [event, setEvent] = useState(null);
    const [rundown, setRundown] = useState(null);
    const [sessions, setSessions] = useState([]);
    const [session, setSession] = useState(null);
    const [rundownID, setRundownID] = useState(searchParams.get('rid'));
    const [searchSpeaker, setSearchSpeaker] = useState('');
    const [speakerResult, setSpeakerResult] = useState([]);
    const [message, setMessage] = useState({
        status: 200,
        body: ''
    });

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [speakers, setSpeakers] = useState([]);

    const [isLoading, setLoading] = useState(true);
    const [isLoadingSpeaker, setLoadingSpeaker] = useState(false);
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
            axios.post(`${config.baseUrl}/api/organizer/event/${slug}/session`, {
                rundown_id: rundownID
            })
            .then(response => {
                let res = response.data;
                setEvent(res.event);
                setRundown(res.rundown);
                setSessions(res.sessions);
            })
        }
    }, [isLoading, slug, rundownID]);

    useEffect(() => {
        if (isLoadingSpeaker) {
            setLoadingSpeaker(false);
            axios.post(`${config.baseUrl}/api/organizer/event/${slug}/speaker/search`, {
                q: searchSpeaker
            })
            .then(response => {
                let res = response.data;
                setSpeakerResult(res.speakers);
            })
        }
    }, [isLoadingSpeaker, slug, searchSpeaker])

    const submit = e => {
        let rid = rundownID;
        if (rundownID == null) {
            rid = document.querySelector("select#rundown_id").value;
        }
        axios.post(`${config.baseUrl}/api/organizer/event/${slug}/session/create`, {
            rundown_id: rid,
            event_id: event.id,
            title: title,
            description: description,
            start_time: startTime,
            end_time: endTime,
            speakers: speakers
        })
        .then(response => {
            let res = response.data;
            setMessage({status: res.status, body: res.message});
            setLoading(true);
            setAdding(false);
        });

        e.preventDefault()
    }

    const del = () => {
        axios.post(`${config.baseUrl}/api/organizer/event/${slug}/session/delete`, {
            id: session.id
        })
        .then(response => {
            let res = response.data;
            setMessage({status: res.status, body: res.message});
            setLoading(true);
            setDeleting(false);
        })
    }

    const edit = e => {
        console.log('editing...');
        axios.post(`${config.baseUrl}/api/organizer/event/${slug}/session/update`, {
            id: session.id,
            title: title,
            description: description,
            start_time: startTime,
            end_time: endTime,
            speakers: speakers
        })
        .then(response => {
            let res = response.data;
            setMessage({status: res.status, body: res.message});
            setLoading(true);
            setEditing(false);
        })
        e.preventDefault();
    }

    const debounceSpeaker = useDebouncedCallback(() => {
        if (searchSpeaker.length > 2) {
            setLoadingSpeaker(true);
        }
    }, 1000)

    return (
        <>
            <Header />
            <SidebarEvent active="session" />
            <div className="content p-4">
                <h2 className="text bigger mt-0">Session</h2>
                {
                    message.body !== "" &&
                    <div className={`${message.status === 200 ? 'bg-green' : 'bg-red'} transparent rounded p-2 mb-2`}>
                        {message.body}
                    </div>
                }
                <table>
                    <thead>
                        <tr>
                            {
                                rundownID !== "" &&
                                <th>Rundown</th>
                            }
                            <th>Session</th>
                            <th><BiTime /></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sessions.map((sess, s) => (
                                <tr key={s}>
                                    {
                                        rundownID !== null ?
                                            <td>
                                                {rundown.title}
                                            </td>
                                        :
                                            <td>
                                                {sess.rundown.title}
                                            </td>
                                    }
                                    <td>{sess.title}</td>
                                    <td>
                                        {sess.start_time.split(":").slice(0, -1).join(":")} - 
                                        {sess.end_time.split(":").slice(0, -1).join(":")}
                                    </td>
                                    <td>
                                        <span className="pointer bg-green transparent p-05 pl-2 pr-2 rounded" onClick={e => {
                                            setSession(sess);
                                            setTitle(sess.title);
                                            setDescription(sess.description);
                                            setStartTime(sess.start_time);
                                            setEndTime(sess.end_time);
                                            setEditing(true);

                                            let spkr = [];
                                            sess.speakers.map(spk => {
                                                spkr.push(spk.speaker);
                                                return spk;
                                            })
                                            setSpeakers(spkr);
                                        }}>
                                            <BiEdit />
                                        </span>
                                        <span className="pointer bg-red transparent p-05 pl-2 pr-2 rounded ml-1" onClick={e => {
                                            setSession(sess);
                                            setDeleting(true);
                                        }}>
                                            <BiTrash />
                                        </span>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            <FAB icon={<FaPlus color="#fff" />} onClick={() => {
                setSpeakers([]);
                setAdding(true);
            }} />

            {
                isDeleting &&
                <Popup onDismiss={() => setDeleting(false)}>
                    <h3 className="mt-0 text big">Hapus Rundown</h3>
                    <div>
                        Yakin ingin menghapus session {session.title}? Tindakan ini tidak dapat dibatalkan
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
                    <h3 className="mt-0 text big flex grow-1">Ubah Session</h3>
                    <form action="#" onSubmit={e => edit(e)}>
                        <div className="group">
                            <input type="text" value={title} id="title" onInput={e => setTitle(e.currentTarget.value)} required />
                            <label htmlFor="title">Title :</label>
                        </div>
                        <div className="group">
                            <textarea id="description" onInput={e => setDescription(e.currentTarget.value)} required>{description}</textarea>
                            <label htmlFor="description">Deskripsi :</label>
                        </div>
                        <div className="flex row">
                            <div className="flex column grow-1 mr-1">
                                <div className="group">
                                    <Flatpickr
                                        value={startTime}
                                        options={{
                                            enableTime: true,
                                            noCalendar: true,
                                            dateFormat: 'H:i',
                                            time_24hr: true,
                                        }}
                                        onChange={([e]) => {
                                            setStartTime(moment(e).format("HH:mm"));
                                        }}
                                    />
                                    <label htmlFor="start_time" className="active">Mulai :</label>
                                </div>
                            </div>
                            <div className="flex column grow-1 ml-1">
                                <div className="group">
                                    <Flatpickr
                                        value={endTime}
                                        options={{
                                            enableTime: true,
                                            noCalendar: true,
                                            dateFormat: 'H:i',
                                            time_24hr: true,
                                            minDate: startTime === null ? moment().format('HH:mm') : startTime
                                        }}
                                        onChange={([e]) => {
                                            setEndTime(moment(e).format("HH:mm"));
                                        }}
                                    />
                                    <label htmlFor="start_time" className="active">Hingga :</label>
                                </div>
                            </div>
                        </div>

                        <div className="h-40"></div>
                        <div className="flex row">
                            <div className="flex column w-70 mr-2">
                                <div className="text bold spacing-2 mb-1">SPEAKER</div>
                                <div className="flex row wrap">
                                    {
                                        speakers.map((speak, s) => (
                                            <div className="flex row item-center bg-primary transparent rounded-max p-1 mr-1 mb-1">
                                                <img 
                                                    className="h-40 mr-1 squarize rounded-max use-height bg-grey"
                                                    src={`${config.baseUrl}/storage/event/${event.id}/speaker_photos/${speak.photo}`}  
                                                    alt={speak.name} 
                                                />
                                                <div className="mr-1">{speak.name}</div>
                                                <div className="text pointer red" onClick={e => {
                                                    let spk = [...speakers];
                                                    spk.splice(s, 1);
                                                    setSpeakers(spk);
                                                }}>
                                                    <BiX />
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="flex column w-30">
                                <div className="group" style={{marginTop: 0}}>
                                    <input type="text" id="searchSpeaker" value={searchSpeaker} onInput={e => {
                                        setSearchSpeaker(e.currentTarget.value);
                                        debounceSpeaker();
                                    }} />
                                    <label htmlFor="searchSpeaker">Cari speaker :</label>
                                </div>
                                {
                                    speakerResult.map((res, r) => {
                                        if (!InArray(
                                            {id: res.id},
                                            speakers,
                                            true
                                        )) {
                                            return (
                                                <div className="text small pointer border bottom pb-1 mb-1" onClick={() => {
                                                    let spk = [...speakers];
                                                    spk.push(res);
                                                    setSpeakers(spk);
                                                    setSearchSpeaker('');
                                                    setSpeakerResult([]);
                                                }}>
                                                    {res.name} ({res.job} - {res.company})
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </div>
                        </div>

                        <button className="primary w-100 mt-3">Simpan Perubahan</button>
                    </form>
                </Popup>
            }
            {
                isAdding &&
                <Popup onDismiss={() => setAdding(false)}>
                    <h3 className="mt-0 text big flex grow-1">Tambah Session</h3>
                    <form action="#" onSubmit={e => submit(e)}>
                        {
                            rundownID == null &&
                            <div className="group">
                                <select name="rundown_id" id="rundown_id" required>
                                    <option value="">Pilih Rundown...</option>
                                    {
                                        rundown.map((rund, r) => (
                                            <option key={r} value={rund.id}>{rund.title}</option>
                                        ))
                                    }
                                </select>
                                <label htmlFor="rundown_id" className="active">Rundown :</label>
                            </div>
                        }

                        <div className="group">
                            <input type="text" id="title" onInput={e => setTitle(e.currentTarget.value)} required />
                            <label htmlFor="title">Title :</label>
                        </div>
                        <div className="group">
                            <textarea id="description" onInput={e => setDescription(e.currentTarget.value)} required></textarea>
                            <label htmlFor="description">Deskripsi :</label>
                        </div>

                        <div className="flex row">
                            <div className="flex column grow-1 mr-1">
                                <div className="group">
                                    <Flatpickr
                                        options={{
                                            enableTime: true,
                                            noCalendar: true,
                                            dateFormat: 'H:i',
                                            time_24hr: true
                                        }}
                                        onChange={([e]) => {
                                            setStartTime(moment(e).format("HH:mm"));
                                        }}
                                    />
                                    <label htmlFor="start_time" className="active">Mulai :</label>
                                </div>
                            </div>
                            <div className="flex column grow-1 ml-1">
                                <div className="group">
                                    <Flatpickr
                                        options={{
                                            enableTime: true,
                                            noCalendar: true,
                                            dateFormat: 'H:i',
                                            time_24hr: true,
                                            minDate: startTime === null ? moment().format('HH:mm') : startTime
                                        }}
                                        onChange={([e]) => {
                                            setEndTime(moment(e).format("HH:mm"));
                                        }}
                                    />
                                    <label htmlFor="start_time" className="active">Hingga :</label>
                                </div>
                            </div>
                        </div>

                        <div className="h-40"></div>
                        <div className="flex row">
                            <div className="flex column w-70 mr-2">
                                <div className="text bold spacing-2 mb-1">SPEAKER</div>
                                <div className="flex row wrap">
                                    {
                                        speakers.map((speak, s) => (
                                            <div className="flex row item-center bg-primary transparent rounded-max p-1 pl-2 pr-2">
                                                <img 
                                                    className="h-40 mr-1 squarize rounded-max use-height bg-grey"
                                                    src={`${config.baseUrl}/storage/event/${event.id}/speaker_photos/${speak.photo}`}  
                                                    alt={speak.name} 
                                                />
                                                <div className="mr-1">{speak.name}</div>
                                                <div className="text pointer red" onClick={e => {
                                                    let spk = [...speakers];
                                                    spk.splice(s, 1);
                                                    setSpeakers(spk);
                                                }}>
                                                    <BiX />
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="flex column w-30">
                                <div className="group" style={{marginTop: 0}}>
                                    <input type="text" id="searchSpeaker" value={searchSpeaker} onInput={e => {
                                        setSearchSpeaker(e.currentTarget.value);
                                        debounceSpeaker();
                                    }} />
                                    <label htmlFor="searchSpeaker">Cari speaker :</label>
                                </div>
                                {
                                    speakerResult.map((res, r) => {
                                        if (!InArray(
                                            {id: res.id},
                                            speakers,
                                            true
                                        )) {
                                            return (
                                                <div className="text small pointer border-bottom pb-1 mb-1" onClick={() => {
                                                    let spk = [...speakers];
                                                    spk.push(res);
                                                    setSpeakers(spk);
                                                    setSearchSpeaker('');
                                                    setSpeakerResult([]);
                                                }}>
                                                    {res.name} ({res.job} - {res.company})
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </div>
                        </div>

                        <button className="primary w-100 mt-3">Submit</button>
                    </form>
                </Popup>
            }
        </>
    )
}

export default EventSession;
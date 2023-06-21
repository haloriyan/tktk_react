import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import 'flatpickr/dist/themes/material_red.css';

import FAB from "../../components/FAB";
import Header from "../../components/Header";
import Popup from "../../components/Popup";
import SidebarEvent from "../../components/SidebarEvent";
import config from "../../config";
import { BiCalendar, BiEdit, BiTime, BiTrash, BiX } from "react-icons/bi";
import moment from "moment";
import Squarize from "../../components/Squarize";

const EventRundown = () => {
    const { slug } = useParams();
    const [user, setUser] = useState(null);
    const [event, setEvent] = useState(null);
    const [rundowns, setRundowns] = useState([]);
    const [rundown, setRundown] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [message, setMessage] = useState({
        status: 200,
        body: ''
    });

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());

    const [isAdding, setAdding] = useState(false);
    const [isDeleting, setDeleting] = useState(false);
    const [isEditing, setEditing] = useState(false);

    useEffect(() => {
        if (user === null) {
            setUser(JSON.parse(window.localStorage.getItem('user')));
        }
        Squarize()
    });

    useEffect(() => {
        if (message.body !== "") {
            setTimeout(() => {
                setMessage({status: 200, body: ''});
            }, 2000);
        }
    })

    useEffect(() => {
        if (isLoading && user !== null) {
            setLoading(false);
            axios.post(`${config.baseUrl}/api/organizer/event/${slug}/rundown`)
            .then(response => {
                let res = response.data;
                setRundowns(res.rundowns);
                setEvent(res.event);
            })
        }
    })

    const submit = e => {
        axios.post(`${config.baseUrl}/api/organizer/event/${slug}/rundown/create`, {
            event_id: event.id,
            title: title,
            description: description,
            start_date: startDate,
            end_date: endDate
        })
        .then(response => {
            let res = response.data;
            setMessage({status: res.status, body: res.message});
            if (res.status == 200) {
                setLoading(true);
                setAdding(false);
            }
        })
        e.preventDefault();
    }
    const edit = e => {
        axios.post(`${config.baseUrl}/api/organizer/event/${slug}/rundown/update`, {
            id: rundown.id,
            title: title,
            description: description,
        })
        .then(response => {
            let res = response.data;
            setMessage({status: res.status, body: res.message});
            setEditing(false);
            setLoading(true);
        })
        e.preventDefault();
    }

    const del = () => {
        axios.post(`${config.baseUrl}/api/organizer/event/${slug}/rundown/delete`, {
            id: rundown.id,
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
            <SidebarEvent active="rundown" user={user} />
            <div className="content p-4">
                <h2 className="text bigger mt-0">Rundown</h2>
                {
                    message.body !== "" &&
                    <div className={`${message.status == 200 ? 'bg-green' : 'bg-red'} transparent rounded p-2 mb-2`}>
                        {message.body}
                    </div>
                }
                <table>
                    <thead>
                        <tr>
                            <th>Judul</th>
                            <th><BiCalendar /></th>
                            <th>
                                <BiTime />
                            </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            rundowns.map((rund, r) => (
                                <tr>
                                    <td>
                                        {rund.title}
                                        <div className="text small">{rund.description}</div>
                                    </td>
                                    <td>
                                        {moment(rund.start_date).format('DD')}
                                        {
                                            rund.start_date != rund.end_date &&
                                            <div>
                                                {moment(rund.end_date).format(' - DD')}
                                            </div>
                                        }
                                        {moment(rund.end_date).format(' MMM Y')}
                                    </td>
                                    <td>
                                        <a href={`session?rid=${rund.id}`} className="text primary underline">
                                            {rund.sessions.length} sesi
                                        </a>
                                    </td>
                                    <td>
                                        <span className="bg-green transparent rounded p-1 pl-2 pr-2 pointer mr-2" onClick={() => {
                                            setRundown(rund);
                                            setEditing(true);
                                            setTitle(rund.title);
                                            setDescription(rund.description);
                                        }}>
                                            <BiEdit />
                                        </span>
                                        <span className="bg-red transparent rounded p-1 pl-2 pr-2 pointer" onClick={() => {
                                            setRundown(rund);
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
            <FAB icon={<FaPlus color="#fff" />} onClick={() => setAdding(true)} />

            {
                isDeleting &&
                <Popup onDismiss={() => setDeleting(false)}>
                    <h3 className="mt-0 text big">Hapus Rundown</h3>
                    <div>
                        Yakin ingin menghapus rundown {rundown.title}? Tindakan ini akan menghapus seluruh sesi di dalamnya dan tidak dapat dibatalkan
                    </div>
                    <div className="mt-2 pt-2 border top flex row item-center justify-end">
                        <div className="text mr-2 pointer" onClick={() => setDeleting(false)}>Batal</div>
                        <div className="text bold red pointer" onClick={del}>Ya</div>
                    </div>
                </Popup>
            }
            {
                isEditing &&
                <Popup>
                    <div className="flex row item-center">
                        <h3 className="mt-0 text big flex grow-1">Ubah Rundown</h3>
                        <div className="h-40 bg-grey rounded-max flex row item-center justify-center squarize use-height pointer" onClick={() => setEditing(false)}>
                            <BiX />
                        </div>
                    </div>
                    <form action="#" onSubmit={e => edit(e)}>
                        <div className="group">
                            <input type="text" id="title" value={title} onInput={e => setTitle(e.currentTarget.value)} placeholder="cth: Day one, Roadshow" required />
                            <label htmlFor="title">Judul :</label>
                        </div>
                        <div className="group">
                            <textarea name="description" id="description" onInput={e => setDescription(e.currentTarget.value)} required>{title}</textarea>
                            <label htmlFor="description">Deskripsi :</label>
                        </div>

                        <button className="mt-2 w-100 primary">Submit</button>
                    </form>
                </Popup>
            }
            {
                isAdding &&
                <Popup onDismiss={() => setAdding(false)}>
                    <div className="flex row item-center">
                        <h3 className="mt-0 text big flex grow-1">Tambah Rundown</h3>
                        <div className="h-40 bg-grey rounded-max flex row item-center justify-center squarize use-height pointer" onClick={() => setAdding(false)}>
                            <BiX />
                        </div>
                    </div>
                    <form action="#" onSubmit={e => submit(e)}>
                        <div className="group">
                            <input type="text" id="title" onInput={e => setTitle(e.currentTarget.value)} placeholder="cth: Day one, Roadshow" required />
                            <label htmlFor="title">Judul :</label>
                        </div>
                        <div className="group">
                            <textarea name="description" id="description" onInput={e => setDescription(e.currentTarget.value)} required></textarea>
                            <label htmlFor="description">Deskripsi :</label>
                        </div>

                        <div className="flex row">
                            <div className="flex column grow-1 mr-1">
                                <div className="group">
                                    <Flatpickr
                                        options={{
                                            minDate: event.start_date,
                                            maxDate: event.end_date
                                        }}
                                        onChange={([date]) => {
                                            setStart(date);
                                            setStartDate(date.toLocaleString('en-CA', {
                                                dateStyle: 'short',
                                            }));
                                            setStartTime(date.toLocaleTimeString('en-CA', {
                                                timeStyle: 'short',
                                                hour12: false
                                            }))
                                        }}
                                    />
                                    <label htmlFor="start" className="active">Mulai :</label>
                                </div>
                            </div>
                            <div className="flex column grow-1 ml-1">
                                <div className="group">
                                    <Flatpickr
                                        options={{
                                            minDate: event.start_date,
                                            maxDate: event.end_date
                                        }}
                                        onChange={([date]) => {
                                            setEndDate(date.toLocaleDateString('en-CA', {dateStyle: 'short'}));
                                            setEndTime(date.toLocaleTimeString('en-CA', {timeStyle: 'short', hour12: false}));
                                        }}
                                    />
                                    <label htmlFor="end" className="active">Berakhir :</label>
                                </div>
                            </div>
                        </div>

                        <button className="mt-2 w-100 primary">Submit</button>
                    </form>
                </Popup>
            }
        </>
    )
}

export default EventRundown;
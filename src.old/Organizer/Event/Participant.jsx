import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import SidebarEvent from "../../components/SidebarEvent";
import Squarize from "../../components/Squarize";
import axios from "axios";
import config from "../../config";
import { useParams } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import Popup from "../../components/Popup";

const EventParticipant = () => {
    const { slug } = useParams();
    const [user, setUser] = useState(null);
    const [event, setEvent] = useState(null);
    const [participants, setParticipants] = useState([]);
    const [participant, setParticipant] = useState(null);
    const [message, setMessage] = useState({
        status: 200,
        body: ''
    });
    const [search, setSearch] = useState('');

    const [isLoading, setLoading] = useState(true);
    const [isDetail, setDetail] = useState(false);

    useEffect(() => {
        if (user === null) {
            setUser(JSON.parse(window.localStorage.getItem('user')));
        }
        Squarize();
    })

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

            axios.post(`${config.baseUrl}/api/organizer/event/${slug}/participant`, {
                token: user.token,
                search: search
            })
            .then(response => {
                let res = response.data;
                setEvent(res.event);
                setParticipants(res.participants);
            })
        }
    })

    const checkin = (data) => {
        axios.post(`${config.baseUrl}/api/organizer/event/${slug}/checkin-organizer`, {
            id: data.id,
            token: user.token,
        })
        .then(response => {
            let res = response.data;
            setMessage({status: res.status, body: res.message});
            setLoading(true);
        })
    }

    const debounce = useDebouncedCallback(() => {
        setLoading(true);
    }, 1000);

    return (
        <>
            <Header />
            <SidebarEvent active="participant" />
            <div className="content p-4">
                <div className="flex row item-center">
                    <h2 className="text bigger m-0 flex grow-1">Peserta Event</h2>
                    <div className="group flex row w-30">
                        <input type="text" id="search" onInput={e => {
                            setSearch(e.currentTarget.value);
                            debounce();
                        }} />
                        <label htmlFor="search">Cari peserta :</label>
                    </div>
                </div>
                <div className="h-30"></div>
                {
                    message.body !== "" &&
                    <div className={`${message.status == 200 ? 'bg-green' : 'bg-red'} transparent rounded p-2 mb-2`}>
                        {message.body}
                    </div>
                }

                <table>
                    <thead>
                        <tr>
                            <th>Nama</th>
                            <th>Email</th>
                            <th>Tiket</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            participants.map((part, p) => (
                                <tr key={p}>
                                    <td>{part.holder.name}</td>
                                    <td>{part.holder.email}</td>
                                    <td>{part.ticket.name}</td>
                                    <td className="flex row">
                                        <div className="pointer primary rounded p-05 pl-2 pr-2 text small border" onClick={e => {
                                            setParticipant(part);
                                            setDetail(true);
                                        }}>
                                            Detail
                                        </div>
                                        {
                                            part.has_checked_in !== 1 &&
                                            <div className="pointer bg-green rounded p-05 pl-2 pr-2 text small ml-1" onClick={e => {
                                                checkin(part);
                                            }}>
                                                Check-in
                                            </div>
                                        }
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            {
                isDetail &&
                <Popup onDismiss={() => setDetail(false)}>
                    <h3 className="m-0 mb-3 text size-24">Detail</h3>

                    <div className="flex row gap-20 wrap">
                        <div className="flex column mr-2">
                            <div className="h-100 bg-grey squarize use-height"></div>
                        </div>
                        <div className="flex column basis-3 grow-1">
                            <div className="text muted small">NAMA</div>
                            <div className="text bold mt-05">{participant.holder.name}</div>

                            <div className="text muted small mt-2">EMAIL</div>
                            <div className="text bold mt-05">{participant.holder.email}</div>
                        </div>
                        <div className="flex column basis-3 grow-1">
                            <div className="text muted small">TIKET</div>
                            <div className="text bold mt-05">{participant.ticket.name}</div>

                            {
                                participant.ticket.rundown_id !== null &&
                                <div className="mt-2">
                                    <div className="text muted small">RUNDOWN</div>
                                    <div className="text bold mt-05">{participant.ticket.rundown.title}</div>
                                </div>
                            }
                            {
                                participant.ticket.session_id !== null &&
                                <div className="mt-2">
                                    <div className="text muted small">SESSION</div>
                                    <div className="text bold mt-05">{participant.ticket.session.title}</div>
                                </div>
                            }
                            {
                                (participant.ticket.rundown_id === null && participant.ticket.session_id === null) &&
                                <div className="mt-2">
                                    <div className="text muted small">EVENT</div>
                                    <div className="text bold mt-05">{event.title}</div>
                                </div>
                            }
                        </div>
                    </div>

                    <div className="border top mt-3 pt-2 flex row justify-end">
                        <div className="pointer text primary" onClick={() => setDetail(false)}>
                            Tutup
                        </div>
                    </div>
                </Popup>
            }
        </>
    )
}

export default EventParticipant;
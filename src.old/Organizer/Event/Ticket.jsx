import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import 'flatpickr/dist/themes/material_red.css';

import FAB from "../../components/FAB";
import Header from "../../components/Header";
import Ticket from "../../components/Ticket";
import Popup from "../../components/Popup";
import SidebarEvent from "../../components/SidebarEvent";
import Squarize from "../../components/Squarize";
import config from "../../config";

const EventTicket = () => {
    const { slug } = useParams();
    const [user, setUser] = useState(null);
    const [viewing, setViewing] = useState('gratis');
    const [tickets, setTickets] = useState([]);
    const [ticket, setTicket] = useState(null);
    const [event, setEvent] = useState(null);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [start, setStart] = useState(moment().format('Y-m-d HH:mm'));
    const [end, setEnd] = useState(moment().format('Y-m-d HH:mm'));
    const [priceType, setPriceType] = useState(0);
    const [price, setPrice] = useState(0);
    const [ticketType, setTicketType] = useState('rundown');
    const [rundownID, setRundownID] = useState(null);
    const [sessionID, setSessionID] = useState(null);

    const [isLoading, setLoading] = useState(true);
    const [isAdding, setAdding] = useState(false);
    const [isDeleting, setDeleting] = useState(false);

    useEffect(() => {
        if (user === null) {
            setUser(JSON.parse(window.localStorage.getItem('user')));
        }
        Squarize();
    }, [user]);

    useEffect(() => {
        if (isLoading) {
            setLoading(false);
            axios.post(`${config.baseUrl}/api/organizer/event/${slug}/ticket`)
            .then(response => {
                let res = response.data;
                setTickets(res.tickets);
                setEvent(res.event);
            })
        }
    }, [isLoading, slug]);

    const submit = e => {
        axios.post(`${config.baseUrl}/api/organizer/event/${slug}/ticket/create`, {
            name: name,
            description: description,
            rundown_id: rundownID,
            session_id: sessionID,
            event_id: event.id,
            start_selling: moment(start).format('Y-MM-DD HH:mm'),
            end_selling: moment(end).format('Y-MM-DD HH:mm'),
            price: price,
            price_type: priceType,
            quantity: quantity
        })
        .then(response => {
            let res = response.data;
            setLoading(true);
            setAdding(false);
        })
        e.preventDefault();
    }

    const del = () => {
        axios.post(`${config.baseUrl}/api/organizer/event/${slug}/ticket/delete`, {
            id: ticket.id,
        })
        .then(response => {
            let res = response.data;
            setLoading(true);
            setDeleting(false);
        })
    }

    return (
        <>
            <Header />
            <SidebarEvent active="ticket" />
            <div className="content p-4">
                <h2 className="text bigger mt-0 mb-1">Ticket</h2>
                <div className="flex row item-center">
                    <div className={`h-50 pointer flex row item-center pl-2 pr-2 ${viewing === '' ? 'text bold border bottom-2 primary' : ''}`} onClick={e => {
                        setViewing('');
                    }}>
                        Semua
                    </div>
                    <div className={`h-50 pointer flex row item-center pl-2 pr-2 ${viewing === 'gratis' ? 'text bold border bottom-2 primary' : ''}`} onClick={e => {
                        setViewing('gratis');
                    }}>
                        Gratis
                    </div>
                    <div className={`h-50 pointer flex row item-center pl-2 pr-2 ${viewing === 'berbayar' ? 'text bold border bottom-2 primary' : ''}`} onClick={e => {
                        setViewing('berbayar');
                    }}>
                        Berbayar
                    </div>
                    <div className={`h-50 pointer flex row item-center pl-2 pr-2 ${viewing === 'suka-suka' ? 'text bold border bottom-2 primary' : ''}`} onClick={e => {
                        setViewing('suka-suka');
                    }}>
                        Suka-suka
                    </div>
                </div>

                <div className="flex row">
                    {
                        tickets.map((ticket, t) => (
                            <Ticket 
                                data={ticket} 
                                key={t} 
                                label={
                                    ticket.rundown_id !== null ? ticket.rundown.title : ticket.session_id !== null ? ticket.session.title : event.name
                                }
                                onDelete={data => {
                                    setTicket(data);
                                    setDeleting(true);
                                }}
                            />
                        ))
                    }
                </div>
            </div>

            <FAB icon={<FaPlus color="#fff" />} onClick={() => {
                setAdding(true);
            }} />

            {
                isDeleting &&
                <Popup onDismiss={() => setDeleting(false)}>
                    <h3 className="mt-0 text big">Hapus Tiket</h3>
                    <div>
                        Yakin ingin menghapus tiket {ticket.name}? Tindakan ini tidak dapat dibatalkan
                    </div>
                    <div className="mt-2 pt-2 border-top flex row item-center justify-end">
                        <div className="text mr-2 pointer" onClick={() => setDeleting(false)}>Batal</div>
                        <div className="text bold red pointer" onClick={del}>Ya</div>
                    </div>
                </Popup>
            }
            {
                isAdding &&
                <Popup onDismiss={() => setAdding(false)}>
                    <h3 className="mt-0 text big">Tambah Tiket</h3>
                    <form action="#" onSubmit={e => submit(e)}>
                        <div className="flex row item-center p-05 border primary rounded-max">
                            <div className={`flex row grow-1 justify-center item-center rounded-max pointer h-40 ${ticketType === 'event' ? 'bg-primary' : ''}`} onClick={e => {
                                setTicketType('event');
                                setRundownID(null);
                                setSessionID(null);
                            }}>
                                Event
                            </div>
                            <div className={`flex row grow-1 justify-center item-center rounded-max pointer h-40 ${ticketType === 'rundown' ? 'bg-primary' : ''}`} onClick={e => {
                                setTicketType('rundown');
                                setSessionID(null);
                            }}>
                                Rundown
                            </div>
                            <div className={`flex row grow-1 justify-center item-center rounded-max pointer h-40 ${ticketType === 'session' ? 'bg-primary' : ''}`} onClick={e => {
                                setTicketType('session');
                                setRundownID(null);
                            }}>
                                Session
                            </div>
                        </div>

                        {
                            ticketType == 'rundown' &&
                            <div className="group">
                                <select id="rundown_id" onChange={e => setRundownID(e.currentTarget.value)} required>
                                    <option value={null}>Pilih Rundown</option>
                                    {
                                        event.rundowns.map((rundown, r) => (
                                            <option key={r} value={rundown.id}>{rundown.title}</option>
                                        ))
                                    }
                                </select>
                                <label htmlFor="rundown_id" className="active">Rundown :</label>
                            </div>
                        }
                        {
                            ticketType == 'session' &&
                            <div className="group">
                                <select id="session_id" onChange={e => setSessionID(e.currentTarget.value)} required>
                                    <option value={null}>Pilih Session</option>
                                    {
                                        event.sessions.map((session, s) => (
                                            <option key={s} value={session.id}>{session.title}</option>
                                        ))
                                    }
                                </select>
                                <label htmlFor="session_id" className="active">Session :</label>
                            </div>
                        }

                        <div className="group">
                            <input type="text" id="name" onInput={e => setName(e.currentTarget.value)} required />
                            <label htmlFor="name">Nama Tiket :</label>
                        </div>
                        <div className="group">
                            <textarea id="description" onInput={e => setDescription(e.currentTarget.value)} required></textarea>
                            <label htmlFor="description" className="">Deskripsi :</label>
                        </div>
                        <div className="group">
                            <input type="number" value={quantity} onInput={e => setQuantity(e.currentTarget.value)} min={1} id="quantity" required />
                            <label htmlFor="quantity">Jumlah Tiket :</label>
                        </div>

                        <div className="flex row">
                            <div className="flex column w-30">
                                <div className="group">
                                    <select id="price_type" onChange={e => setPriceType(e.currentTarget.value)}>
                                        <option value={0}>Gratis</option>
                                        <option value={1}>Berbayar</option>
                                        <option value={2}>Bayar suka-suka</option>
                                    </select>
                                    <label htmlFor="price_type" className="active">Jenis Tiket :</label>
                                </div>
                            </div>
                            <div className="flex column grow-1 ml-1">
                                <div className="group">
                                    <input 
                                        type="text" id="price" 
                                        onInput={e => setPrice(e.currentTarget.value)} 
                                        required={priceType !== "1" ? true : false}
                                        readOnly={priceType === "0" ? true : false}
                                    />
                                    <label htmlFor="price">Harga :</label>
                                </div>
                            </div>
                        </div>

                        <div className="flex row">
                            <div className="flex column grow-1 mr-1">
                                <div className="group">
                                    <Flatpickr
                                        data-enable-time
                                        options={{
                                            maxDate: event.end_date,
                                            dateFormat: 'Y-m-d H:m'
                                        }}
                                        onChange={([date]) => {
                                            setStart(date);
                                        }}
                                    />
                                    <label htmlFor="start" className="active">Mulai Penjualan :</label>
                                </div>
                            </div>
                            <div className="flex column grow-1 ml-1">
                                <div className="group">
                                    <Flatpickr
                                        data-enable-time
                                        options={{
                                            minDate: start,
                                            maxDate: event.end_date,
                                            dateFormat: 'Y-m-d H:m'
                                        }}
                                        onChange={([date]) => {
                                            setEnd(date);
                                        }}
                                    />
                                    <label htmlFor="start" className="active">Penjualan Berakhir :</label>
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

export default EventTicket;
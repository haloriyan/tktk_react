import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { BiCalendar, BiMoney, BiUser } from "react-icons/bi";

import Currency from "../components/Currency";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import config from "../config";

const Card = ({order, user, withPrice = true}) => {
    let ticket = order.ticket;
    let invoice = order.invoice;
    let theDate = null;
    if (ticket.session_id !== null) {
        theDate = ticket.session;
    } else if (ticket.rundown_id !== null) {
        theDate = ticket.rundown;
    }

    return (
        <a href={`/ticket/${order.id}`} className="bordered rounded w-100 flex row text black mb-2">
            <div className="flex row item-center grow-1 mr-2 p-3">
                <div className="flex column grow-1">
                    <div className="text bold size-20">{order.ticket.name}</div>
                    
                    <div className="flex row item-center mt-1">
                        <BiUser size={20} color={'#999'} />
                        <div className="text muted small ml-2">{order.holder.name}</div>
                    </div>
                    {
                        withPrice &&
                        <div className="flex row item-center mt-1">
                            <BiMoney size={20} color={'#999'} />
                            <div className="text muted small ml-2">{Currency(order.ticket.price).encode()}</div>
                        </div>
                    }
                    <div className="flex row item-center mt-1">
                        <BiCalendar size={20} color={'#999'} />
                        <div className="text muted small ml-2">
                            {moment(theDate.start_date).format('DD')}
                            {
                                theDate.start_date !== theDate.end_date &&
                                moment(theDate.end_date).format(' - DD')
                            }
                            {moment(theDate.end_date).format(' MMM Y')}
                        </div>
                    </div>
                </div>
                {
                    (invoice.status === 0 && invoice.user_id === user.id) &&
                    <a href={invoice.payment_link} target={"_blank"} rel="noreferrer">
                        <button className="small primary ml-2">Bayar</button>
                    </a>
                }
            </div>
            <div className="bg-primary transparent p-2 rounded-top-right rounded-bottom-right w-30 flex column justify-center">
                <div className="text center bold size-20">{order.event.name}</div>
                <div className="text center small mt-1">
                    {order.event.organizer.name}
                </div>
            </div>
        </a>
    )
}

const Ticket = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [viewing, setViewing] = useState('semua');

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (user === null) {
            setUser(JSON.parse(window.localStorage.getItem('user')));
        }
    }, [user]);

    useEffect(() => {
        if (isLoading && user !== null) {
            setLoading(false);
            axios.post(`${config.baseUrl}/api/order`, {
                token: user.token
            })
            .then(response => {
                let res = response.data;
                setOrders(res.orders);
            })
        }
    }, [isLoading, user]);

    return (
        <>
            <Header user={user} />
            <Sidebar active="tickets" user={user} />
            <div className="content p-4">
                <h2 className="text bigger mt-0 mb-1">Tiket</h2>
                <div className="text muted">Temukan Semua Tiketmu</div>

                <div className="flex row wrap item-center mt-3 mb-2">
                    <div className={`pointer text primary rounded mr-2 p-1 pl-3 pr-3 ${viewing === 'semua' ? 'bg-primary transparent bold' : ''}`} onClick={() => setViewing('semua')}>
                        Semua
                    </div>
                    <div className={`pointer text primary rounded mr-2 p-1 pl-3 pr-3 ${viewing === 'free' ? 'bg-primary transparent bold' : ''}`} onClick={() => setViewing('free')}>
                        Gratis
                    </div>
                    <div className={`pointer text primary rounded mr-2 p-1 pl-3 pr-3 ${viewing === 'paid' ? 'bg-primary transparent bold' : ''}`} onClick={() => setViewing('paid')}>
                        Berbayar
                    </div>
                    <div className={`pointer text primary rounded mr-2 p-1 pl-3 pr-3 ${viewing === 'friend' ? 'bg-primary transparent bold' : ''}`} onClick={() => setViewing('friend')}>
                        Untuk Teman
                    </div>
                    <div className={`pointer text primary rounded mr-2 p-1 pl-3 pr-3 ${viewing === 'unpaid' ? 'bg-primary transparent bold' : ''}`} onClick={() => setViewing('unpaid')}>
                        Belum Terbayar
                    </div>
                </div>

                {
                    viewing === 'semua' &&
                    orders.map((order, o) => <Card order={order} user={user} key={o} />)
                }
                {
                    viewing === 'free' &&
                    orders.map((order, o) => {
                        if (order.ticket.price === 0) {
                            return <Card order={order} user={user} key={o} />
                        }
                        return null;
                    })
                }
                {
                    viewing === 'paid' &&
                    orders.map((order, o) => {
                        if (order.ticket.price > 0) {
                            return <Card order={order} user={user} key={o} />
                        }
                        return null;
                    })
                }

                {
                    viewing === 'friend' &&
                    orders.map((order, o) => {
                        if (order.user_holder_id !== user.id) {
                            return <Card order={order} user={user} key={o} />
                        }
                        return null;
                    })
                }
                {
                    viewing === 'unpaid' &&
                    orders.map((order, o) => {
                        if (order.invoice.status === 0) {
                            return <Card order={order} user={user} key={o} />
                        }
                        return null;
                    })
                }
            </div>
        </>
    )
}

export default Ticket;
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import QRCode from "qrcode";

import Header from "../components/Header";
import InvoiceStatus from "../components/InvoiceStatus";
import Sidebar from "../components/Sidebar";
import Squarize from "../components/Squarize";
import config from "../config";

const TicketDetail = () => {
    const { orderID } = useParams();
    const [order, setOrder] = useState(null);
    const [user, setUser] = useState(null);
    const [ticket, setTicket] = useState(null);
    const [invoice, setInvoice] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const qrArea = useRef(null);

    useEffect(() => {
        if (user === null) {
            setUser(JSON.parse(window.localStorage.getItem('user')));
        }
        Squarize();
    }, [user])

    useEffect(() => {
        if (isLoading && user !== null) {
            setLoading(false);
            axios.post(`${config.baseUrl}/api/order/detail`, {
                id: orderID,
                token: user.token
            })
            .then(response => {
                let order = response.data.order;
                setOrder(order);
                setTicket(order.ticket);
                setInvoice(order.invoice);
            })
        }
    }, [isLoading, user, orderID])

    useEffect(() => {
        if (qrArea.current !== null) {
            QRCode.toCanvas(qrArea.current, 'helloworld', {
                width: 200,
                margin: 0,
            });
        }
    })

    return (
        <>
            <Header user={user} />
            <Sidebar active="ticket" user={user} />
            <div className="content p-4">
                <h2 className="text bigger mt-0 mb-1">Detail Tiket</h2>

                {
                    order !== null &&
                    <div>
                        <div className="bordered rounded-more mt-4 p-4 relative">
                            <div className="flex row item-start">
                                <div className="flex column w-40 grow-1 item-center">
                                    <canvas className="bg-grey h-200 squarize use-height" id="myQR" ref={qrArea}></canvas>
                                    <div className="border text primary center small pointer rounded p-1 mt-2" style={{width: 200}}>
                                        Tampilkan Tiket
                                    </div>
                                </div>
                                <div className="flex column w-30">
                                    <div className="text muted small">Tiket</div>
                                    <div className="text size-18 mt-05">{ticket.name}</div>

                                    <div className="text muted small mt-2">Tanggal</div>
                                    {
                                        ticket.rundown !== null &&
                                        <div className="text size-18 mt-05">{moment(ticket.rundown.start_date).format('DD MMM Y')}</div>
                                    }
                                    {
                                        ticket.session !== null &&
                                        <div className="text size-18 mt-05">{moment(ticket.session.start_date).format('DD MMM Y')}</div>
                                    }

                                    <div className="text muted small mt-2">Metode Pembayaran</div>
                                    <div className="text size-18 mt-05">{ticket.name}</div>
                                </div>
                                <div className="flex column w-30">
                                    <div className="text muted small">Event</div>
                                    <div className="text size-18 mt-05">{order.event.name}</div>

                                    <div className="text muted small mt-2">Hosted by</div>
                                    <div className="text size-18 mt-05">{order.event.organizer.name}</div>

                                    <div className="text muted small mt-2">Status Pembayaran</div>
                                    <InvoiceStatus status={invoice.status} />
                                </div>
                            </div>

                            <div className="border top mt-2 pt-2">
                                {ticket.description}
                            </div>
                        </div>
                        <div className="bordered rounded-more mt-3 p-4 flex row">
                            <div className="flex column grow-1">
                                <div className="text muted small">Nama</div>
                                <div className="text bold">{order.holder.name}</div>
                            </div>
                            <div className="flex column grow-1">
                                <div className="text muted small">Email</div>
                                <div className="text bold">{order.holder.email}</div>
                            </div>
                            <div className="flex column grow-1">
                                <div className="text muted small">No. Telepon</div>
                                <div className="text bold">{order.holder.phone}</div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default TicketDetail;
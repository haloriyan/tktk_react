import React, { useEffect, useState } from "react";
import { BiLink, BiMedal, BiMoney, BiUser } from "react-icons/bi";
import { useParams } from "react-router-dom";
import axios from "axios";
import { HiOutlineTicket } from "react-icons/hi";
import { MdOutlineFestival } from "react-icons/md";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

import Header from "../../components/Header";
import SidebarEvent from "../../components/SidebarEvent";
import config from "../../config";
import Currency from "../../components/Currency";

const EventOverview = () => {
    const { slug } = useParams();
    const [isLoading, setLoading] = useState(true);
    const [event, setEvent] = useState(null);
    const [user, setUser] = useState(null);
    
    const [isPublic, setPublic] = useState(true);
    const [ticketSales, setTicketSales] = useState([]);
    const [registrant, setRegistrant] = useState(0);
    const [attendees, setAttendees] = useState(0);
    const [attendeesPercentage, setAttendeesPercentage] = useState(0);
    const [sponsorCount, setSponsorCount] = useState(0);
    
    useEffect(() => {
        if (user === null) {
            setUser(JSON.parse(window.localStorage.getItem('user')));
        }
    }, [user]);
    
    useEffect(() => {
        if (isLoading && user !== null) {
            setLoading(false);
            axios.post(`${config.baseUrl}/api/organizer/event/${slug}/dashboard`, {
                token: user.token,
            })
            .then(response => {
                let res = response.data;
                setEvent(res.event);
                setSponsorCount(res.sponsor_count);
                setAttendees(res.attendees);
                setAttendeesPercentage(res.attendees_percentage);
                setRegistrant(res.registrant);
                setTicketSales(res.ticket_sales);
            })
        }
    }, [isLoading, user])
    
    return (
        <>
            <Header />
            <SidebarEvent active="overview" />

            <div className="content">
                {
                    event !== null &&
                    <div className="h-60 flex row item-center border bottom pl-2 pr-2">
                        <div className="text primary bold flex grow-1">
                            {event.name}
                        </div>
                        <div className="border primary rounded w-20 text p-05 flex row item-center gap-10">
                            <div className={`flex row grow-1 justify-center text small pointer p-05 rounded ${isPublic ? 'b' : ''}`}>
                                Private
                            </div>
                            <div className={`flex row grow-1 justify-center text small pointer p-05 rounded ${isPublic ? 'bg-primary' : ''}`}>
                                Public
                            </div>
                        </div>

                        <div className="p-05 pl-2 pr-2 rounded bg-primary ml-2 text small">
                            Preview
                        </div>
                    </div>
                }
                <div className="flex row wrap gap-20 p-4">
                    <div className="bordered rounded flex grow-1 column basis-3 p-2">
                        <div className="flex row item-center">
                            <BiUser size={16} color={'#777'} />
                            <div className="text small muted ml-2">Attendees</div>
                        </div>
                        <h3 className="text size-42 primary m-0 mt-05">{attendees}</h3>
                        <div className="text muted small mt-1">
                            {attendeesPercentage}% dari {registrant} pendaftar
                        </div>
                    </div>
                    <div className="bordered rounded flex grow-1 column basis-3 p-2">
                        <div className="flex row item-center">
                            <BiMoney size={16} color={'#777'} />
                            <div className="text small muted ml-2">Penjualan</div>
                        </div>
                        <h3 className="text size-36 primary m-0 mt-05">Rp 35.340.440</h3>
                        <div className="text muted small mt-1">
                            22 dari 500 tiket
                        </div>
                    </div>
                    <div className="bordered rounded flex grow-1 column basis-3 p-2">
                        <div className="flex row item-center">
                            <BiMedal size={16} color={'#777'} />
                            <div className="text small muted ml-2">Sponsorship</div>
                        </div>
                        <h3 className="text size-42 primary m-0 mt-05">{sponsorCount}</h3>
                        <div className="text muted small mt-1">
                            {sponsorCount} sponsor di event
                        </div>
                    </div>
                </div>

                <div className="p-4 pt-1">
                    <div className="bordered rounded p-3">
                        <div className="flex row item-center">
                            <div className="h-40 ratio-1-1 rounded-max bg-primary flex row item-center justify-center">
                                <HiOutlineTicket />
                            </div>
                            <div className="ml-2">Penjualan Tiket</div>
                        </div>

                        <div className="flex row mt-3">
                            <div className="flex column wrap basis-6 grow-1">
                                <div className="text muted">Tiket</div>
                                {
                                    ticketSales.map((ticket, t) => (
                                        <div className="mt-2" key={t}>
                                            {JSON.stringify(ticket.name)}
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="flex column wrap basis-6 grow-1">
                                <div className="text muted">Terjual</div>
                                {
                                    ticketSales.map((ticket, t) => (
                                        <div className="mt-2" key={t}>
                                            {ticket.sales.length} Tiket
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="flex column wrap basis-6 grow-1">
                                <div className="text muted">Voucher Terpakai</div>
                                {
                                    ticketSales.map((ticket, t) => (
                                        <div className="mt-2" key={t}>
                                            {ticket.voucher_used} Voucher
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="flex column wrap basis-6 grow-1">
                                <div className="text muted">Gross Profit</div>
                                {
                                    ticketSales.map((ticket, t) => (
                                        <div className="mt-2" key={t}>
                                            {Currency(ticket.gross_profit).encode()}
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="flex column wrap basis-6 grow-1">
                                <div className="text muted">Potongan</div>
                                {
                                    ticketSales.map((ticket, t) => (
                                        <div className="mt-2" key={t}>
                                            {Currency(ticket.discount_amount).encode()}
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="flex column wrap basis-6 grow-1">
                                <div className="text muted">Net Profit</div>
                                {
                                    ticketSales.map((ticket, t) => (
                                        <div className="mt-2" key={t}>
                                            {Currency(ticket.net_profit).encode()}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>

                    <div className="flex row gap-20 mt-3">
                        <div className="bordered rounded p-2 flex column grow-1 w-30">
                            <div className="flex row item-center">
                                <div className="h-40 ratio-1-1 rounded-max bg-primary flex row item-center justify-center">
                                    <MdOutlineFestival />
                                </div>
                                <div className="ml-2">Exhibitor</div>
                            </div>
                        </div>
                        {
                            event !== null &&
                            <div className="bordered rounded p-2 flex column grow-1 w-70">
                                <div className="flex row item-center">
                                    <div className="h-40 ratio-1-1 rounded-max bg-primary flex row item-center justify-center">
                                        <BiLink />
                                    </div>
                                    <div className="ml-2">Event Link</div>
                                </div>

                                <div className="bordered rounded p-1 pl-2 pr-2 mt-2 flex row item-center">
                                    <div className="flex row grow-1">
                                        https://agendakota.id/event/{event.slug}
                                    </div>
                                    <div className="pointer bg-primary rounded pl-2 pr-2 p-05" onClick={e => {
                                        navigator.clipboard.writeText(`https://agendakota.id/event/${event.slug}`)
                                    }}>
                                        Salin
                                    </div>
                                </div>

                                <div className="flex row item-center mt-1 gap-10">
                                    <div className="flex grow-1 text muted small">
                                        Undang audience ke eventmu dengan link unik!
                                    </div>
                                    <div className="pointer text primary">
                                        <FaFacebook />
                                    </div>
                                    <div className="pointer text primary">
                                        <FaInstagram />
                                    </div>
                                    <div className="pointer text primary">
                                        <FaTwitter />
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default EventOverview;
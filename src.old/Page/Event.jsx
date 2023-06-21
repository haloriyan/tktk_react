import axios from "axios";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { BiCalendar, BiHistory, BiMap, BiShoppingBag } from "react-icons/bi";
import { redirect, useParams } from "react-router-dom";
import FAB from "../components/FAB";
import Header from "../components/Header";
import Squarize from "../components/Squarize";
import Tiket from "../components/Tiket";
import config from "../config";
import TicketCart from "./Event/TicketCart";
import Loading from "./Loading";
import Footer from "../components/Footer";
import Currency from "../components/Currency";

const EventPage = () => {
    const { slug } = useParams();
    const [event, setEvent] = useState(null);
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [viewing, setViewing] = useState('description');
    const [ticketCart, setTicketCart] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        Squarize();
        if (isLoading) {
            setLoading(false);
            axios.post(`${config.baseUrl}/api/page/event`, {
                slug: slug
            })
            .then(response => {
                let res = response.data;
                setEvent(res.event);
                let ticks = [...items];
                res.event.tickets.map((ticket, t) => {
                    ticks.push({
                        ticket_id: ticket.id,
                        event_id: res.event.id,
                        name: ticket.name,
                        quantity: 0,
                        price: ticket.price,
                        total_price: 0,
                    });
                })
                setItems(ticks);
            })
        }
    }, [isLoading, slug])

    useEffect(() => {
        if (user === null) {
            setUser(JSON.parse(window.localStorage.getItem('user')));
        }
    }, [user])

    const tabActiveClasses = 'border bottom-2 text bold primary';

    const getSponsorType = name => {
        let toReturn = null;
        config.sponsor_types.forEach(spons => {
            if (spons.name === name) {
                toReturn = spons;
            }
        });
        return toReturn;
    }

    return (
        <>
            <Header user={user} />
            {
                event === null ?
                    <Loading />
                :
                <div className="content page p-2">
                    <div className="flex row">
                        <img 
                            src={`${config.baseUrl}/storage/event/${event.id}/${event.cover}`} 
                            alt="Cover" 
                            className="w-70 cover rounded-more"
                            style={{aspectRatio: 5/2}}
                        />
                        <div className="bordered rounded ml-2 p-2 flex grow-1 column">
                            <h2 className="mt-0">{event.name}</h2>
                            <div className="flex column grow-1 mt-1">
                                <div className="flex row item-center">
                                    <BiCalendar size={18} color={config.primaryColor} />
                                    <div className="ml-1">
                                        {moment(event.start_date).format('DD')}
                                        {
                                            event.start_date !== event.end_date &&
                                            moment(event.end_date).format(' - DD')
                                        }
                                        {moment(event.end_date).format(' MMM Y')}
                                    </div>
                                </div>
                                <div className="flex row item-center mt-1">
                                    <BiMap size={18} color={config.primaryColor} />
                                    <div className="ml-1">{event.address}, {event.city}, {event.province}</div>
                                </div>
                            </div>
                            <div className="border-top pt-2 flex row item-center">
                                <button className="w-100 primary">Beli Tiket</button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 flex row">
                        <div className="w-75 flex column">
                            <div className="border bottom flex row mb-2">
                                <div className={`pointer h-40 pl-2 pr-2 ${viewing === 'description' ? tabActiveClasses : ''}`} onClick={() => setViewing('description')}>
                                    Deskripsi
                                </div>
                                <div className={`pointer h-40 pl-2 pr-2 ${viewing === 'rundown' ? tabActiveClasses : ''}`} onClick={() => setViewing('rundown')}>
                                    Rundown
                                </div>
                                <div className={`pointer h-40 pl-2 pr-2 ${viewing === 'ticket' ? tabActiveClasses : ''}`} onClick={() => setViewing('ticket')}>
                                    Tiket
                                </div>
                                {
                                    event.sponsors.length > 0 &&
                                    <div className={`pointer h-40 pl-2 pr-2 ${viewing === 'sponsor' ? tabActiveClasses : ''}`} onClick={() => setViewing('sponsor')}>
                                        Sponsor
                                    </div>
                                }
                            </div>

                            {
                                viewing === 'rundown' &&
                                <div>
                                    {
                                        event.rundowns.length === 0 ?
                                            <div className="bordered rounded p-2">
                                                <div className=" flex row item-center h-50">
                                                    <BiCalendar size={20} color={config.primaryColor} />
                                                    <div className="text ml-2">
                                                        {moment(event.start_date).format('DD')}
                                                        {
                                                            event.start_date != event.end_date &&
                                                            moment(event.end_date).format(' - DD')
                                                        }
                                                        {moment(event.end_date).format(' MMM Y')}
                                                    </div>
                                                </div>
                                                <div className=" flex row item-center h-50">
                                                    <BiHistory size={20} color={config.primaryColor} />
                                                    <div className="text ml-2">
                                                        {event.start_time} - {event.end_time} WIB
                                                    </div>
                                                </div>
                                            </div>
                                        :
                                        <div>coks</div>
                                    }
                                </div>
                            }
                            {
                                viewing === 'description' &&
                                <div dangerouslySetInnerHTML={{ __html: event.description }}></div>
                            }
                            {
                                viewing === 'ticket' &&
                                <div>
                                    <div className="flex row gap-20">
                                        {
                                            event.tickets.map((ticket, t) => (
                                                <Tiket ticket={ticket} key={t} cart={items} setCart={setItems} index={t} />
                                            ))
                                        }
                                    </div>
                                </div>
                            }
                            {
                                viewing === 'sponsor' &&
                                <div className="flex row wrap gap-20">
                                    {
                                        event.sponsors.map((sponsor, s) => (
                                            <div className="bordered rounded p-2 flex row item-center basis-3 grow-1 relative m-0" key={s}>
                                                <div className="absolute top-0 right-0 p-05 pl-1 pr-1 text small rounded-top-right rounded-bottom-left" style={{
                                                    backgroundColor: getSponsorType(sponsor.type).background,
                                                    color: getSponsorType(sponsor.type).color
                                                }}>
                                                    {sponsor.type.split("_")[1]}
                                                </div>
                                                <img 
                                                    src={`${config.baseUrl}/storage/event/${event.id}/sponsor_logos/${sponsor.logo}`} 
                                                    alt={`Logo ${sponsor.name}`} 
                                                    className="h-60 squarize use-height rounded cover"
                                                />
                                                <div className="ml-2 flex column grow-1">
                                                    <a href={sponsor.website} target="_blank">
                                                        <div className="text bold big black">{sponsor.name}</div>
                                                        <div className="mt-05 text small primary">{sponsor.website}</div>
                                                    </a>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            }
                        </div>
                        {
                            viewing !== 'ticket' ?
                                <div className="bordered rounded flex column grow-1 ml-2 p-2">
                                    <div className="flex row">
                                        <img src={
                                            event.organizer.icon === null ?
                                                '/images/DefaultLogo.png'
                                            :
                                                `${config.baseUrl}/storage/organizer_icons/${event.organizer.icon}`
                                        } alt={event.organizer.name} 
                                            className="h-80 squarize use-height rounded-max bg-grey"
                                        />
                                        <div className="ml-2">
                                            <div className="text muted small">Diselenggarakan Oleh</div>
                                            <div className="text bold mt-05">{event.organizer.name}</div>
                                        </div>
                                    </div>

                                    <div className="mt-2">{event.organizer.description}</div>
                                </div>
                            :
                                <div className="bordered rounded flex column justify-start ml-2 p-2 w-25">
                                    {
                                        items.reduce((partial, item) => partial + item.quantity, 0) > 0 ?
                                            <div>
                                                {
                                                    items.map((item, i) => {
                                                        if (item.quantity > 0) {
                                                            return (
                                                                <div className={`flex row item-center gap-20 pb-2 ${i !== items.length -1 ? 'border bottom mb-2' : ''}`}>
                                                                    <div className="flex column grow-1">
                                                                        <div className="text size-18 bold">{item.name}</div>
                                                                        <div className="text small mt-05 muted">{item.quantity} Tiket</div>
                                                                    </div>
                                                                    <div className="flex grow-1 justify-end w-40">
                                                                        {Currency(item.total_price).encode()}
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                        return null;
                                                    })
                                                }
                                                <div className="flex row item-center">
                                                    <div className="flex grow-1 text small muted">
                                                        Total :{items.reduce((partial, item) => partial + item.quantity, 0)} Tiket
                                                    </div>
                                                    <div className="flex grow-1 justify-end w-40 text bold primary">
                                                        {Currency(items.reduce((partial, item) => partial + item.total_price, 0)).encode()}
                                                    </div>
                                                </div>
                                                <button className="mt-2 w-100 rounded pointer primary small">
                                                    Checkout
                                                </button>
                                            </div>
                                        :
                                            <div>
                                                belum ada tiket
                                            </div>
                                    }
                                </div>
                        }
                    </div>
                    <div className="h-40"></div>
                    <Footer />
                </div>
            }

            {
                ticketCart ?
                    <TicketCart onDismiss={() => setTicketCart(false)} items={items} setItems={setItems} onOrder={() => {
                        window.localStorage.setItem('ticket_cart', JSON.stringify(items));
                        redirect("/cart");
                    }} />
                :
                    items.length > 0 &&
                    <FAB icon={<BiShoppingBag color="#fff" />} onClick={() => setTicketCart(true)} />
            }
        </>
    )
}

export default EventPage;
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Squarize from "../components/Squarize";
import axios from "axios";
import config from "../config";
import { useParams } from "react-router-dom";
import { BiCalendar, BiLike, BiMap, BiMoney } from "react-icons/bi";
import Currency from "../components/Currency";
import moment from "moment";
import Footer from "../components/Footer";
import Popup from "../components/Popup";

const OrganizerPage = () => {
    const { org_username } = useParams();
    const [user, setUser] = useState(null);
    const [organizer, setOrganizer] = useState(null);
    const [viewing, setViewing] = useState('events');
    const [events, setEvents] = useState([]);
    const [updates, setUpdates] = useState([]);
    const [image, setImage] = useState(null);

    const [isLoading, setLoading] = useState(true);
    const [isLoadingEvent, setLoadingEvent] = useState(true);
    const [isLoadingUpdate, setLoadingUpdate] = useState(false);

    useEffect(() => {
        if (user === null) {
            setUser(JSON.parse(window.localStorage.getItem('user')));
        }
        Squarize();
    }, [user]);

    useEffect(() => {
        if (isLoading) {
            setLoading(false);
            axios.post(`${config.baseUrl}/api/page/organizer/profile`, {
                username: org_username,
                with: 'creator'
            })
            .then(response => {
                let res = response.data;
                setOrganizer(res.organizer);
            })
        }
    }, [isLoading, org_username])

    useEffect(() => {
        if (isLoadingEvent) {
            setLoadingEvent(false);
            axios.post(`${config.baseUrl}/api/page/organizer/event`, {
                username: org_username
            })
            .then(response => {
                let res = response.data;
                setEvents(res.events);
            })
        }
    }, [isLoadingEvent, org_username])

    useEffect(() => {
        if (isLoadingUpdate && organizer !== null) {
            setLoadingUpdate(false);
            axios.post(`${config.baseUrl}/api/organizer/post`, {
                organizer_id: organizer.id
            })
            .then(response => {
                let res = response.data;
                setUpdates(res.posts.data);
            })
        }
    }, [isLoadingUpdate, organizer])

    return (
        <>
            <Header user={user} />
            {
                organizer !== null &&
                <div className="content page p-4 pt-0">
                    <img 
                        src={
                            organizer.icon === null ?
                                '/images/DefaultCover.png'
                            :
                                `${config.baseUrl}/storage/organizer_covers/${organizer.cover}`
                        }
                        alt={organizer.name}
                        className="CoverArea bg-grey w-100 ratio-5-2 cover"
                        style={{
                            borderBottomLeftRadius: 12,
                            borderBottomRightRadius: 12,
                        }}
                    />
                    <div className="flex row pl-5 pr-5 item-end border pb-4 bottom">
                        <img 
                            src={
                                organizer.icon === null ?
                                    '/images/default_organizer_logo.png'
                                :
                                    `${config.baseUrl}/storage/organizer_icons/${organizer.icon}`
                            }
                            alt={organizer.name}
                            style={{marginTop: -120}} className="bg-grey h-200 rounded-max squarize use-height"
                        />
                        <div className="flex column grow-1 ml-4 mb-1">
                            <div className="text bold size-24 mt-1">{organizer.name}</div>
                            <div className="text primary small mt-05">{organizer.type}</div>
                        </div>
                        <div className="pointer w-20 rounded text center p-1 bg-primary mb-2">
                            Action button
                        </div>
                    </div>

                    <div className="flex row item-center mt-2 border bottom">
                        <div className={`pointer pb-2 pl-2 pr-2 text ${viewing === 'events' ? 'primary bold border bottom-2' : ''}`} onClick={() => {
                            setViewing('events');
                            setLoadingEvent(true);
                        }}>
                            Event
                        </div>
                        <div className={`pointer pb-2 pl-2 pr-2 text ${viewing === 'update' ? 'primary bold border bottom-2' : ''}`} onClick={() => {
                            setViewing('update');
                            setLoadingUpdate(true);
                        }}>
                            Updates
                        </div>
                        <div className={`pointer pb-2 pl-2 pr-2 text ${viewing === 'about' ? 'primary bold border bottom-2' : ''}`} onClick={() => {
                            setViewing('about');
                        }}>
                            Tentang
                        </div>
                    </div>

                    {
                        viewing === 'about' &&
                        <div className="mt-2">
                            <p>{organizer.description}</p>
                            <div className="mt-2 text small muted">
                                Dibuat oleh {organizer.creator.name} pada {moment(organizer.created_at).format('DD MMMM Y')}
                            </div>
                        </div>
                    }
                    {
                        viewing === 'update' &&
                        <div className="mt-2 flex row justify-center">
                            <div className="flex column item-center gap-20 w-70">
                            {
                                updates.map((pos, p) => (
                                    <div className="bordered rounded w-100" key={p}>
                                        <div className="flex row item-center border bottom p-1 pl-2 pr-2">
                                            <div className="flex row item-center grow-1">
                                                <img
                                                    src={
                                                        organizer.icon === null ?
                                                            '/images/default_organizer_logo.png'
                                                        :
                                                            `${config.baseUrl}/storage/organizer_icons/${organizer.icon}`
                                                    }
                                                    alt={organizer.name}
                                                    className="h-30 rounded-max ratio-1-1"
                                                />
                                                <div className="ml-2 text small">{organizer.name}</div>
                                            </div>
                                        </div>
                                        <div className="p-2" dangerouslySetInnerHTML={{ __html: pos.body }}></div>
                                        {
                                            pos.images.length > 0 &&
                                            <div className="flex row gap-10 p-2 pt-0">
                                                {
                                                    pos.images.map((img, i) => (
                                                        <img 
                                                            src={`${config.baseUrl}/storage/organizer_post_images/${organizer.id}/${img.filename}`} alt={img.filename} 
                                                            className="h-150 pointer rounded-more ratio-1-1"
                                                            onClick={() => setImage(`${config.baseUrl}/storage/organizer_post_images/${organizer.id}/${img.filename}`)}
                                                        />
                                                    ))
                                                }
                                            </div>
                                        }
                                        <div className="flex row item-center mb-1">
                                            <div className="flex row grow-1 item-center justify-center h-30 text muted">
                                                <BiLike />
                                                <div className="ml-1 text small">250</div>
                                            </div>
                                            <div className="flex row grow-1 item-center justify-center h-30 text muted">
                                                <BiLike />
                                                <div className="ml-1 text small">250</div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                            </div>
                        </div>
                    }
                    {
                        viewing === 'events' &&
                        <div className="flex row wrap gap-20 mt-2">
                            {
                                events.map((event, e) => {
                                    return (
                                        <a href={`/event/${event.slug}`} key={e} className="flex column bg-white bordered rounded basis-4">
                                            <img 
                                                src={`${config.baseUrl}/storage/event/${event.id}/${event.cover}`}
                                                className="w-100 cover rounded-top-left rounded-top-right"
                                                style={{aspectRatio: 5/2}} 
                                                alt={event.name}
                                            />
                                            <div className="p-2">
                                                <div className="text bold">{event.name}</div>
                                                <div className="mt-2 flex row item-center">
                                                    <BiCalendar color="#888" />
                                                    <div className="ml-1 text muted small">{moment(event.start_date).format('DD MMM Y')}</div>
                                                </div>
                                                <div className="mt-1 flex row item-center">
                                                    <BiMoney color="#888" />
                                                    <div className="ml-1 text muted small">{Currency(event.tickets[0].price).encode()}</div>
                                                </div>
                                                <div className="mt-1 flex row item-center">
                                                    <BiMap color="#888" />
                                                    <div className="ml-1 text muted small">{event.city}, {event.province}</div>
                                                </div>
                                            </div>
                                        </a>
                                    )
                                })
                            }
                        </div>
                    }

                    <div className="h-40"></div>
                    <Footer />
                </div>
            }

            {
                image !== null &&
                <Popup onDismiss={() => setImage(null)}>
                    <img src={image} alt={image} className="w-100 rounded-more" />
                    <div className="mt-2 text center primary pointer" onClick={() => setImage(null)}>tutup</div>
                </Popup>
            }
        </>
    )
}

export default OrganizerPage;
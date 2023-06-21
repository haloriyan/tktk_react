import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import SidebarEvent from "../../components/SidebarEvent";
import Squarize from "../../components/Squarize";
import config from "../../config";

const EventQR = () => {
    const { slug } = useParams();
    const [user, setUser] = useState(null);
    const [event, setEvent] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (user === null) {
            setUser(JSON.parse(window.localStorage.getItem('user')));
        }
        Squarize();
    }, [user]);

    useEffect(() => {
        if (isLoading) {
            setLoading(false);
            axios.post(`${config.baseUrl}/api/organizer/event/${slug}`, {
                with: 'organizer'
            })
            .then(response => {
                let res = response.data;
                setEvent(res.event);
            })
        }
    }, [isLoading, slug])

    return (
        <>
            <Header />
            <SidebarEvent active="qr-event" />
            <div className="content p-4">
                {
                    event === null ?
                        <div>loading...</div>
                    :
                    <div>
                        <h3 className="mt-0 text center size-36">{event.name}</h3>
                        <div className="flex row item-center justify-center">
                            <div className="h-80 squarize use-height rounded-max bg-grey"></div>
                            <div className="ml-2 mt-0 text size-20">{event.organizer.name}</div>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default EventQR;
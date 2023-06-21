import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Event from "../components/Event";
import Header from "../components/Header";

import config from "../config";
import SidebarOrganizer from "../components/SidebarOrganizer";

const OrganizerHome = () => {
    const [user, setUser] = useState(null);
    const { org_username } = useParams();
    const [events, setEvents] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (user === null) {
            setUser(JSON.parse(window.localStorage.getItem('user')));
        }
    }, [user]);

    useEffect(() => {
        if (isLoading) {
            setLoading(false);
            axios.post(`${config.baseUrl}/api/organizer/event`, {
                username: org_username
            })
            .then(response => {
                let res = response.data;
                setEvents(res.events);
            })
        }
    }, [isLoading, org_username])

    return (
        <>
            <Header user={user} />
            <SidebarOrganizer user={user} active={'events'} />
            <div className="content p-3">
                <div className="mt-2">
                    <div className="flex row item-center">
                        <div className="flex column grow-1">
                            <h2 className="text bigger m-0 mb-1">Events</h2>
                            <div className="text muted small">
                                Temukan semua event yang diadakan oleh organizermu
                            </div>
                        </div>
                        <a href={`/organizer/${org_username}/create-event`}>
                            <button className="primary">Buat Event</button>
                        </a>
                    </div>

                    <div className="flex row wrap gap-20 mt-4">
                        {
                            events.map((event, n) => (
                                <Event data={event} key={n} org_username={org_username} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrganizerHome;
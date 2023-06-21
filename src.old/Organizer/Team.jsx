import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import * as BaseStyle from '../styles/base';
import OrganizerTab from "./Tab";
import SidebarOrganizer from "../components/SidebarOrganizer";
import axios from "axios";
import config from "../config";

const OrganizerTeam = () => {
    const [user, setUser] = useState(null);
    const [teams, setTeams] = useState([]);
    const [organizer, setOrganizer] = useState(null);

    const [isLoading, setLoading] = useState(true);
    const [isAdding, setAdding] = useState(false);
    const [isDeleting, setDeleting] = useState(false);

    useEffect(() => {
        if (user === null) {
            setUser(JSON.parse(window.localStorage.getItem('user')));
        }
    }, [user]);

    useEffect(() => {
        if (isLoading && organizer !== null) {
            setLoading(false);
            axios.post(`${config.baseUrl}/api/organizer/team`, {
                organizer_id: organizer.id
            })
            .then(response => {
                let res = response.data;
                setTeams(res.teams);
            })
        }
    }, [isLoading, organizer])

    return (
        <>
            <SidebarOrganizer user={user} active={'team'} setOrganizer={setOrganizer} />
            <Header user={user} />
            <div className="content p-3">
                {JSON.stringify(teams)}
            </div>
        </>
    )
}

export default OrganizerTeam;
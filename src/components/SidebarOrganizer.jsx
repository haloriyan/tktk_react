import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiEdit, BiGroup, BiMoney, BiStar, BiUser } from "react-icons/bi";

import config from "../config";
import { useParams } from "react-router-dom";
import Squarize from "./Squarize";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const SidebarOrganizer = ({active = null, user = null, setOrganizer = null}) => {
    const { org_username } = useParams();
    const [organizers, setOrganizers] = useState([]);
    const [organizer, setOrganizerChild] = useState(null);

    const [isActive, setActive] = useState(false);
    const [isLoadingOrganizer, setLoadingOrganizer] = useState(true);
    const [isGettingOrganizer, setGettingOrganizer] = useState(true);
    const [isSelectingOrganizer, setSelectingOrganizer] = useState(false);

    const handleClick = e => {
        let target = e.target;
        if (!target.classList.contains('OrganizerSwitcher')) {
            setSelectingOrganizer(false);
        }
    }

    useEffect(() => {
        Squarize();
    })

    useEffect(() => {
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    })

    useEffect(() => {
        if (isLoadingOrganizer && user !== null) {
            setLoadingOrganizer(false);
            axios.post(`${config.baseUrl}/api/user/organizer`, {
                token: user.token,
            })
            .then(response => {
                let res = response.data;
                setOrganizers(res.organizers);
            })
        }
    }, [isLoadingOrganizer, user])

    useEffect(() => {
        if (isGettingOrganizer && organizer === null && organizers.length > 0) {
            setGettingOrganizer(false);
            organizers.map((org, o) => {
                if (org.username === org_username) {
                    setOrganizerChild(org);
                    if (setOrganizer !== null) {
                        setOrganizer(org);
                    }
                }
                return org;
            })
        }
    }, [isGettingOrganizer, organizer, organizers, org_username, setOrganizer])

    return (
        <div className={`Sidebar flex column ${isActive ? 'active' : ''}`}>
            <div className="SidebarToggler mt-2" onClick={() => setActive(!isActive)}>
                <div className="inner"></div>
            </div>
            <div className="flex column grow-1 relative">
                {
                    isSelectingOrganizer &&
                    <div className="m-2 absolute top-0 left-0 right-0 p-1 bg-white bordered rounded OrganizerSwitcher" style={{marginTop: 90}}>
                        {
                            organizers.map((org, o) => (
                                <a href={`/organizer/${org.username}/events`} className="h-40 flex row item-center OrganizerSwitcher" key={o}>
                                    <img
                                    src={
                                        org.icon === null ?
                                            '/images/default_organizer_logo.png'
                                        :
                                            `${config.baseUrl}/storage/organizer_icons/${org.icon}`
                                    }
                                    alt={org.name}
                                    className="h-20 squarize use-height rounded-max bg-grey"
                                />
                                    <div className={`ml-1 text small ${org.username === org_username ? 'primary' : ''}`}>{org.name}</div>
                                </a>
                            ))
                        }
                    </div>
                }
                {
                    organizer !== null &&
                    <div className="m-2 mb-1">
                        <div className="bordered rounded p-1 mb-3 flex row item-center pointer OrganizerSwitcher" onClick={() => setSelectingOrganizer(!isSelectingOrganizer)}>
                            <img
                                src={
                                    organizer.icon === null ?
                                        '/images/default_organizer_logo.png'
                                    :
                                        `${config.baseUrl}/storage/organizer_icons/${organizer.icon}`
                                }
                                alt={organizer.name}
                                className="h-40 squarize use-height rounded-max bg-grey OrganizerSwitcher"
                            />
                            <div className="ml-1 text small flex grow-1 OrganizerSwitcher">{organizer.name}</div>
                            {
                                isSelectingOrganizer ? <FaAngleUp className="OrganizerSwitcher" /> : <FaAngleDown className="OrganizerSwitcher" />
                            }
                        </div>
                    </div>
                }
                <a href={`/organizer/${org_username}/events`}>
                    <li className={`MenuItem flex row item-center ${active === 'events' ? 'active' : ''}`}><BiStar size={18} className="icon" /> Events</li>
                </a>
                <a href={`/organizer/${org_username}/post`}>
                    <li className={`MenuItem flex row item-center ${active === 'post' ? 'active' : ''}`}><BiEdit size={18} className="icon" /> Post Updates</li>
                </a>
                <a href={`/organizer/${org_username}/profile`}>
                    <li className={`MenuItem flex row item-center ${active === 'profile' ? 'active' : ''}`}><BiUser size={18} className="icon" /> Profile</li>
                </a>
                <a href={`/organizer/${org_username}/team`}>
                    <li className={`MenuItem flex row item-center ${active === 'team' ? 'active' : ''}`}><BiGroup size={18} className="icon" /> Team</li>
                </a>
                <a href={`/organizer/${org_username}/billing`}>
                    <li className={`MenuItem flex row item-center ${active === 'billing' ? 'active' : ''}`}><BiMoney size={18} className="icon" /> Billing</li>
                </a>
            </div>
        </div>
    )
}

export default SidebarOrganizer;
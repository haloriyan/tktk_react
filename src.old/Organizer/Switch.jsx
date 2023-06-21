import axios from "axios";
import React, { useEffect, useState } from "react";
import config from "../config";
import Squarize from "../components/Squarize";
import { BiCalendar, BiMoney } from "react-icons/bi";
import Currency from "../components/Currency";

const SwitchOrganizer = () => {
    const [isLoading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [organizers, setOrganizers] = useState([]);

    useEffect(() => {
        if (user === null) {
            setUser(JSON.parse(window.localStorage.getItem('user')));
        }
        Squarize();
    }, [user])

    useEffect(() => {
        if (isLoading && user !== null) {
            setLoading(false);
            axios.post(`${config.baseUrl}/api/user/organizer`, {
                token: user.token,
            })
            .then(response => {
                let res = response.data;
                setOrganizers(res.organizers);
            })
        }
    }, [isLoading, user])

    return (
        <>
            <div className="absolute top-0 left-0 right-0 bottom-0 flex column item-center justify-center">
                <h2 className="text size-24">Pilih Organizer</h2>
                <div className="w-90">
                    <div className="flex row justify-center gap-20">
                        {
                            organizers.map((org, o) => (
                                <a href={`/organizer/${org.username}/events`} className="text black bordered rounded p-2 flex row grow-1 basis-3" key={o}>
                                    <img 
                                        src={
                                            org.icon === null ?
                                                '/images/default_organizer_logo.png'
                                            :
                                                `${config.baseUrl}/storage/organizer_icons/${org.icon}`
                                        }
                                        className="h-100 squarize use-height rounded-max bg-grey cover"
                                        alt={org.name} 
                                    />
                                    <div className="flex grow-1 column ml-2">
                                        <div className="text bold size-20">{org.name}</div>
                                        <div className="flex row item-center mt-15">
                                            <BiCalendar color="#999" size={20} />
                                            <div className="text muted small ml-1">9 events</div>
                                        </div>
                                        <div className="flex row item-center mt-1">
                                            <BiMoney color="#999" size={20} />
                                            <div className="text muted small ml-1">{Currency(org.revenue).encode()}</div>
                                        </div>
                                    </div>
                                </a>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default SwitchOrganizer;
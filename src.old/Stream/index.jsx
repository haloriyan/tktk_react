import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import HeaderStream from "../components/HeaderStream";
import config from "../config";
import Exhibitor from "./Exhibitor";
import Lounge from "./Lounge";
import StreamNavigation from "./Navigation";
import Sponsor from "./Sponsor";
import Stage from "./Stage";

const Stream = () => {
    const { slug } = useParams();
    const [event, setEvent] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [viewing, setViewing] = useState('stage'); // stage, exhibitor, sponsor

    useEffect(() => {
        if (user === null) {
            setUser(JSON.parse(window.localStorage.getItem('user')));
        }
    }, [user])

    useEffect(() => {
        if (isLoading && user !== null) {
            setLoading(false);
            axios.post(`${config.baseUrl}/api/stream`, {
                slug: slug,
                token: user.token,
            })
            .then(response => {
                let res = response.data;
                setEvent(res.event);
            })
        }
    }, [isLoading, user, slug])

    return (
        <>
            <HeaderStream title={''} />
            <StreamNavigation viewing={viewing} setViewing={setViewing} />
            <div className="content page">
                {
                    viewing === "stage" &&
                    <Stage event={event} />
                }
                {
                    viewing === "lounge" &&
                    <Lounge />
                }
                {
                    viewing === "exhibitor" &&
                    <Exhibitor event={event} user={user} />
                }
                {
                    viewing === "sponsor" &&
                    <Sponsor />
                }

                <div className="h-150"></div>
            </div>
        </>
    )
}

export default Stream;
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import config from "../config";

const Checkin = () => {
    const { encodedEventID } = useParams();
    const [event, setEvent] = useState(null);

    const [isLoadingEvent, setLoadingEvent] = useState(true);

    useEffect(() => {
        if (isLoadingEvent) {
            setLoadingEvent(false);

            axios.post(`${config.baseUrl}/api/`)
            .then(response => {
                let res = response.data;
                setEvent(res.event);
            })
        }
    }, [isLoadingEvent])

    return (
        <>
            {encodedEventID}
        </>
    )
}

export default Checkin;
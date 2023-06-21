import React, { useEffect, useState } from "react";

const Event = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (user === null) {
            setUser(JSON.parse(window.localStorage.getItem('user')));
        }
    });

    return (
        <>
            Event
        </>
    )
}

export default Event;
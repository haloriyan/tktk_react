import React, { useEffect, useState } from "react";
import Header from "../components/Header";

import SidebarOrganizer from "../components/SidebarOrganizer";

const OrganizerBilling = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (user === null) {
            setUser(JSON.parse(window.localStorage.getItem('user')));
        }
    }, [user]);

    return (
        <>
            <SidebarOrganizer user={user} />
            <Header user={user} color="bg-primary" />
            <div className="content p-3">
                tes
            </div>
        </>
    )
}

export default OrganizerBilling;
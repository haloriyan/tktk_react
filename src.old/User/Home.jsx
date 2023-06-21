import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Ticket from "../components/Ticket";

import '../styles/Content.css';

const Home = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (user === null) {
            setUser(JSON.parse(window.localStorage.getItem('user')));
        }
    });

    return (
        <>
            <Header title="Home" user={user} />
            <Sidebar user={user} />
            <div className="content p-4">
                <div className="flex row">
                    <Ticket />
                </div>
            </div>
        </>
    )
}

export default Home;
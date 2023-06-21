import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useParams } from "react-router-dom";
import FAB from "../../components/FAB";
import Header from "../../components/Header";
import Popup from "../../components/Popup";
import SidebarEvent from "../../components/SidebarEvent";
import Squarize from "../../components/Squarize";
import config from "../../config";

const EventHandout = () => {
    const { slug } = useParams();
    const [user, setUser] = useState(null);
    const [handouts, setHandouts] = useState([]);
    const [handout, setHandout] = useState(null);
    const [event, setEvent] = useState([]);
    
    const [isLoading, setLoading] = useState(true);
    const [isAdding, setAdding] = useState(false);
    const [isDeleting, setDeleting] = useState(false);
    const [isEditing, setEditing] = useState(false);
    
    useEffect(() => {
        if (user === null) {
            setUser(JSON.parse(window.localStorage.getItem('user')));
        }
        Squarize();
    });

    useEffect(() => {
        if (isLoading && user !== null) {
            setLoading(false);
            axios.post(`${config.baseUrl}/api/organizer/event/${slug}/handout`)
            .then(response => {
                let res = response.data;
                setHandouts(res.handouts);
                setEvent(res.event);
            })
        }
    });

    const submit = e => {
        let formData = new FormData();
        // formData.append('');
        axios.post(`${config.baseUrl}/api/organizer/event/${slug}/handout/create`, formData)
        .then(response => {
            let res = response.data;
            setLoading(true);
            setAdding(false);
        })
        e.preventDefault();
    }

    const del = () => {
        axios.post(`${config.baseUrl}/api/organizer/event/${slug}/handout/delete`, {
            id: handout.id
        })
        .then(response => {
            let res = response.data;
            setLoading(true);
            setDeleting(false);
        })
    }

    return (
        <>
            <Header />
            <SidebarEvent active="handout" />
            <div className="content p-4">
                tes
            </div>

            <FAB icon={<FaPlus color="#fff" />} onClick={() => setAdding(true)} />

            {
                isDeleting &&
                <Popup onDismiss={() => setDeleting(false)}>
                    <h3 className="mt-0 text big">Hapus Handout</h3>
                    <div>
                        Yakin ingin menghapus handout {handout.name}? Tindakan ini tidak dapat dibatalkan
                    </div>
                    <div className="mt-2 pt-2 border-top flex row item-center justify-end">
                        <div className="text mr-2 pointer" onClick={() => setDeleting(false)}>Batal</div>
                        <div className="text bold red pointer" onClick={del}>Ya</div>
                    </div>
                </Popup>
            }
            {
                isAdding &&
                <Popup onDismiss={() => setAdding(false)}>
                    sds
                </Popup>
            }
        </>
    )
}

export default EventHandout;
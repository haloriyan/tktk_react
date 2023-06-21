import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiSend } from "react-icons/bi";
import Squarize from "../components/Squarize";
import config from "../config";

const Stage = ({event = null}) => {
    const [pcBody, setPcBody] = useState('');
    const [user, setUser] = useState(null);
    const [isLoadingChat, setLoadingChat] = useState(false);
    const [chats, setChats] = useState([]);

    useEffect(() => {
        if (user === null) {
            setUser(JSON.parse(window.localStorage.getItem('user')));
        }
        Squarize();
    }, [user])

    useEffect(() => {
        const loadingChat = setInterval(() => {
            setLoadingChat(true);
        }, 1000);
        return () => clearInterval(loadingChat);
    })

    useEffect(() => {
        if (isLoadingChat && event !== null) {
            setLoadingChat(false);
            axios.post(`${config.baseUrl}/api/stream/chat`, {
                event_id: event.id,
                token: user.token,
            })
            .then(response => {
                let res = response.data;
                setChats(res.chats.reverse());
            })
        }
    }, [isLoadingChat, event, user]);

    const SendChat = (e = null) => {
        console.log('sending message');
        axios.post(`${config.baseUrl}/api/stream/chat/send`, {
            body: pcBody,
            event_id: event.id,
            user_id: user.id,
            token: user.token,
        })
        .then(response => {
            let res = response.data;
            console.log(res);
            setPcBody('');
        })
        if (e !== null) {
            e.preventDefault();
        }
    }

    return (
        <div className="p-4">
            <div className="flex row">
                <div className="StreamArea w-65 bg-black squarize rectangle"></div>
                <div className="ChatArea ml-2 flex column grow-1">
                    <div id="load" className="flex column grow-1">
                        {
                            chats.map((chat, c) => (
                                <div className="message flex row mb-2" key={c}>
                                    <div className="h-50 squarize use-height bg-grey rounded-max"></div>
                                    <div className="flex column grow-1 ml-1">
                                        <div className="text small">{chat.user.name}</div>
                                        <div className="body">{chat.body}</div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <form className="border top mt-1 pt-1 flex row item-center mr-1" onSubmit={SendChat}>
                        <input type="text" value={pcBody} className="m-0 mr-2 p-05 pl-1 pr-1 h-40 border none" placeholder="Ketik pesan" onInput={e => {
                            setPcBody(e.currentTarget.value);
                        }} />
                        <div className="h-40 squarize use-height bg-primary rounded-max pointer flex row item-center justify-center" onClick={SendChat}>
                            <BiSend />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Stage;
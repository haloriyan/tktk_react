import React, { useEffect, useState } from "react";

import styles from "../styles/Chat.module.css";
import Header from "../Partials/Header";
import config from "../config";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { MdWest } from "react-icons/md";
import { BiPaperPlane, BiSearch } from "react-icons/bi";
import Initial from "../components/Initial";
import GoogleFonts from "../components/GoogleFonts";

const Chat = () => {
    const { username } = useParams();
    const navigate = useNavigate();
    const [chats, setChats] = useState([]);
    const [customer, setCustomer] = useState(null);
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const [message, setMessage] = useState('');

    useEffect(() => {
        if (customer === null && user !== null) {
            let myData = JSON.parse(window.localStorage.getItem(`customer_data_${user.id}`));
            if (myData === null) {
                navigate(`/${username}/me`)
            } else {
                setCustomer(myData);
            }
        }
    }, [customer, user]);

    useEffect(() => {
        if (isLoading) {
            setLoading(false);
            axios.get(`${config.baseUrl}/api/user/${username}`)
            .then(response => {
                let res = response.data;
                console.log('user fetched', res.user);
                setUser(res.user);
            })
        }
    }, [isLoading, username]);

    useEffect(() => {
        if (customer !== null && user !== null) {
            let fetching = setInterval(() => {
                axios.post(`${config.baseUrl}/api/chat/customer`, {
                    token: customer.token,
                    user_id: user.id,
                })
                .then(response => {
                    let res = response.data
                    let chs = res.chats.reverse();
                    setChats(chs);
                })
            }, 1000);

            return () => clearInterval(fetching)
        }
    }, [customer, user]);

    const send = (e) => {
        setMessage('');
        axios.post(`${config.baseUrl}/api/chat/customer/send`, {
            body: message,
            token: customer.token,
            user_id: user.id,
        })
        .then(response => {
            let res = response.data;
        })
        e.preventDefault();
    }

    return (
        <>
            {
                user !== null &&
                <GoogleFonts family={user.font_family} />
            }
            <div className={`content mt-4 ${styles.content}`}>
                <div className="h-40"></div>
                {
                    chats.length > 0 &&
                    chats.map((chat, c) => {
                        let actions = JSON.parse(chat.actions);
                        
                        return (
                            <div key={c}>
                                <div className={`message ${chat.sender === 'customer' ? 'mine': ''}`} dangerouslySetInnerHTML={{__html: chat.body}}></div>
                                {
                                    actions !== null &&
                                    actions.map((act, a) => {
                                        if (act.type === "link") {
                                            return (
                                                <a className="bg-grey rounded p-15 text small bold primary w-60 mb-05 pointer flex" href={act.action} target="_blank">
                                                    {act.text}
                                                </a>
                                            )
                                        } else {
                                            return (
                                                <div className="bg-grey rounded p-15 text small bold primary w-60 mb-05 pointer flex">
                                                    {act.text}
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </div>
                        )
                    })
                }
                <div style={{height: 80}}></div>
            </div>

            {
                user !== null &&
                <Header accent_color={'#fff'} style={{
                    borderWidth: 1,
                    borderColor: '#ddd',
                    borderStyle: 'solid',
                    borderTopWidth: 0,
                    padding: 20,
                    height: 60,
                    borderBottomLeftRadius: 8,
                    borderBottomRightRadius: 8,
                }}>
                    <a href={`/${username}/`} className="flex pointer text black">
                        <MdWest size={22} />
                    </a>
                    <Initial name={user.name} style={{marginLeft: 20}} />
                    <div className="ml-2 text">{user.name}</div>
                </Header>
            }

            <div className="fixed bottom-0 left-0 right-0 flex row centerize" style={{zIndex: 5}}>
                <form className={`bg-white flex row item-center h-60 ${styles.TypingArea} pr-2`} onSubmit={send}>
                    <div className="flex grow-1">
                        <input type="text" className="border none m-0" placeholder="Ketik pesan" onInput={e => setMessage(e.currentTarget.value)} value={message} />
                    </div>
                    <button className="pointer h-40 ratio-1-1 rounded-max centerize bg-primary">
                        <BiPaperPlane />
                    </button>
                </form>
            </div>
            {/* <BottomNav active="chat" /> */}
        </>
    )
}

export default Chat;
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiTrash, BiX } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useParams } from "react-router-dom";
import FAB from "../components/FAB";
import Header from "../components/Header";
import Popup from "../components/Popup";
import SidebarBooth from "../components/SidebarBooth";
import Squarize from "../components/Squarize";
import config from "../config";

const BoothAgent = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [agents, setAgents] = useState([]);
    const [agent, setAgent] = useState(null);
    const [message, setMessage] = useState({
        status: 200,
        body: ''
    });

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [hidePassword, setHidePassword] = useState(true);
    
    const [isLoading, setLoading] = useState(true);
    const [isAdding, setAdding] = useState(false);
    const [isDeleting, setDeleting] = useState(false);

    useEffect(() => {
        if (user === null) {
            setUser(JSON.parse(window.localStorage.getItem('user')));
        }
        Squarize();
    }, [user])

    useEffect(() => {
        if (message.body !== "") {
            setTimeout(() => {
                setMessage({status: 200, body: ''});
            }, 2000);
        }
    })

    useEffect(() => {
        if (isLoading) {
            setLoading(false);
            axios.post(`${config.baseUrl}/api/booth/${id}/agent`, {
                booth_id: id,
            })
            .then(response => {
                let res = response.data;
                setAgents(res.agents);
            });
        }
    }, [isLoading, id]);

    const submit = e => {
        axios.post(`${config.baseUrl}/api/booth/${id}/agent/create`, {
            name: name,
            email: email,
            password: password,
            role: role,
            booth_id: id,
        })
        .then(response => {
            let res = response.data;
            setLoading(true);
            setAdding(false);
            setMessage({status: res.status, body: res.message});
        })
        e.preventDefault();
    }
    const del = () => {
        axios.post(`${config.baseUrl}/api/booth/agent/delete`, {
            id: agent.id,
        })
        .then(response => {
            let res = response.data;
            setMessage({status: res.status, body: res.message});
            setLoading(true);
            setDeleting(false);
        })
    }

    return (
        <>
            <Header />
            <SidebarBooth active="agent" />
            <div className="content p-4">
                <h2 className="text bigger mt-0">User Agent</h2>
                {
                    message.body !== "" &&
                    <div className={`${message.status === 200 ? 'bg-green' : 'bg-red'} transparent rounded p-2 mb-2`}>
                        {message.body}
                    </div>
                }
                <table>
                    <thead>
                        <tr>
                            <th>Nama</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            agents.map((agent, a) => (
                                <tr key={a}>
                                    <td>{agent.name}</td>
                                    <td>{agent.email}</td>
                                    <td>{agent.role}</td>
                                    <td>
                                        {
                                            agent.user_id !== user.id &&
                                            <span className="pointer bg-red transparent rounded p-05 pl-2 pr-2" onClick={e => {
                                                setAgent(agent);
                                                setDeleting(true);
                                            }}>
                                                <BiTrash />
                                            </span>
                                        }
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            {
                <FAB icon={<FaPlus color="#fff" />} onClick={e => setAdding(true)} />
            }

            {
                isDeleting &&
                <Popup onDismiss={() => setDeleting(false)}>
                    <h3 className="mt-0 text big">Hapus Agent</h3>
                    <div>
                        {agent.id}
                        Yakin ingin menghapus agent {agent.name}? Tindakan ini tidak dapat dibatalkan
                    </div>
                    <div className="mt-2 pt-2 border top flex row item-center justify-end">
                        <div className="text mr-2 pointer" onClick={() => setDeleting(false)}>Batal</div>
                        <div className="text bold red pointer" onClick={del}>Ya</div>
                    </div>
                </Popup>
            }
            {
                isAdding &&
                <Popup onDismiss={() => setAdding}>
                    <div className="flex row item-center">
                        <h3 className="mt-0 text big flex grow-1">Tambah Agent</h3>
                        <div className="h-40 bg-grey rounded-max flex row item-center justify-center squarize use-height pointer" onClick={() => setAdding(false)}>
                            <BiX />
                        </div>
                    </div>
                    <form action="#" onSubmit={submit}>
                        <div className="group">
                            <input type="text" id="name" value={name} onChange={e => setName(e.currentTarget.value)} />
                            <label htmlFor="name">Nama :</label>
                        </div>
                        <div className="group">
                            <input type="text" id="email" value={email} onChange={e => setEmail(e.currentTarget.value)} />
                            <label htmlFor="email">Email :</label>
                        </div>
                        <div className="group">
                            <input type={hidePassword ? 'password' : 'text'} id="password" value={password} onInput={e => setPassword(e.currentTarget.value)} />
                            <label htmlFor="password">Password :</label>
                            <div className="absolute pointer" style={{top: '45%',right: '5%'}} onClick={() => setHidePassword(!hidePassword)}>
                                {
                                    hidePassword ? <MdVisibility /> : <MdVisibilityOff />
                                }
                            </div>
                        </div>
                        <div className="group">
                            <select id="role" onChange={e => setRole(e.currentTarget.value)} required>
                                <option value="">Pilih Role...</option>
                                <option value="manager">Manager</option>
                                <option value="customer_service">Customer Service</option>
                            </select>
                            <label htmlFor="role" className="active">Role :</label>
                        </div>

                        <button className="w-100 mt-3 primary">Submit</button>
                    </form>
                </Popup>
            }
        </>
    )
}

export default BoothAgent;
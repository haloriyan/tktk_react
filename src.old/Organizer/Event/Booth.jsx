import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiImageAdd, BiTrash, BiX } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useParams } from "react-router-dom";
import FAB from "../../components/FAB";
import Header from "../../components/Header";
import InputFile from "../../components/InputFile";
import Popup from "../../components/Popup";
import SidebarEvent from "../../components/SidebarEvent";
import Squarize from "../../components/Squarize";
import config from "../../config";

const EventBooth = () => {
    const { slug } = useParams();
    const [user, setUser] = useState(null);
    const [event, setEvent] = useState(null);
    const [message, setMessage] = useState({
        status: 200,
        body: ''
    });
    const [booths, setBooths] = useState([]);
    const [booth, setBooth] = useState(null);
    const [categories, setCategories] = useState([]);

    const [name, setName] = useState('');
    const [categoryID, setCategoryID] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('Office Address');
    const [managerName, setManagerName] = useState('');
    const [managerEmail, setManagerEmail] = useState('');
    const [managerPassword, setManagerPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);

    const [isLoading, setLoading] = useState(true);
    const [isAdding, setAdding] = useState(false);
    const [isDeleting, setDeleting] = useState(false);

    useEffect(() => {
        if (user === null) {
            setUser(JSON.parse(window.localStorage.getItem('user')));
        }
        Squarize();
    }, [user]);

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
            axios.post(`${config.baseUrl}/api/organizer/event/${slug}/booth`)
            .then(response => {
                let res = response.data;
                setBooths(res.booths);
                setEvent(res.event);
                setCategories(res.categories);
            })
        }
    }, [isLoading, slug])

    const submit = e => {
        let formData = new FormData();
        formData.append('event_id', event.id);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('address', address);
        formData.append('manager_name', managerName);
        formData.append('manager_email', managerEmail);
        formData.append('manager_password', managerPassword);
        formData.append('logo', document.querySelector("input#logo_add").files[0]);
        formData.append('background', document.querySelector("input#background_add").files[0]);

        axios.post(`${config.baseUrl}/api/organizer/event/${slug}/booth/create`, formData)
        .then(response => {
            let res = response.data;
            setLoading(true);
            setAdding(false);
        })
        e.preventDefault();
    }

    const del = () => {
        axios.post(`${config.baseUrl}/api/organizer/event/${slug}/booth/delete`, {
            id: booth.id
        })
        .then(response => {
            // 
        })
    }

    return (
        <>
            <Header />
            <SidebarEvent active="booth" />
            <div className="content p-4">
                <h2 className="text bigger mt-0">Booth</h2>
                {
                    message.body !== "" &&
                    <div className={`${message.status === 200 ? 'bg-green' : 'bg-red'} transparent rounded p-2 mb-2`}>
                        {message.body}
                    </div>
                }

                <div className="flex row wrap gap-20">
                    {
                        booths.map((boo, b) => (
                            <div className="bordered rounded flex column basis-3 relative">
                                <div className="absolute top-0 right-0 hover-to-show">
                                    <div className="p-05 pl-2 pr-2 bg-red mt-05 mr-05 pointer rounded" onClick={() => {
                                        setBooth(boo);
                                        setDeleting(true);
                                    }}>
                                        <BiTrash />
                                    </div>
                                </div>
                                <img 
                                    src={`${config.baseUrl}/storage/event/${event.id}/booth_backgrounds/${boo.background}`} 
                                    alt={boo.name} 
                                    className="w-100 ratio-16-9 cover rounded-top-left rounded-top-right"
                                />
                                <div className="p-2 text center bold">
                                    <img 
                                        src={`${config.baseUrl}/storage/event/${event.id}/booth_logos/${boo.logo}`} 
                                        alt={boo.name}
                                        className={'h-100 squarize rounded-max use-height'}
                                        style={{marginTop: -75}}
                                    />
                                    <div className="mt-1">{boo.name}</div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            <FAB icon={<FaPlus color="#fff" />} onClick={e => setAdding(true)} />

            {
                isDeleting &&
                <Popup onDismiss={() => setDeleting(false)}>
                    <h3 className="mt-0 text big">Hapus Booth</h3>
                    <div>
                        Yakin ingin menghapus booth {booth.name}? Tindakan ini tidak dapat dibatalkan
                    </div>
                    <div className="mt-2 pt-2 border top flex row item-center justify-end">
                        <div className="text mr-2 pointer" onClick={() => setDeleting(false)}>Batal</div>
                        <div className="text bold red pointer" onClick={del}>Ya</div>
                    </div>
                </Popup>
            }
            {
                isAdding &&
                <Popup onDismiss={() => setAdding(false)}>
                    <div className="flex row item-center">
                        <h3 className="mt-0 text big flex grow-1">Tambah Booth</h3>
                        <div className="h-40 squarize rounded-max use-height bg-grey pointer flex row item-center justify-center" onClick={() => setAdding(false)}>
                            <BiX />
                        </div>
                    </div>
                    <form action="#" onSubmit={submit}>
                        <div className="group">
                            <div id="prev_bg_add" className="w-100 bg-grey rounded-more ratio-16-9 flex column item-center justify-center">
                                <BiImageAdd size={32} />
                                <div className="text mt-1">Upload Gambar Backdrop / Stage</div>
                            </div>
                            <input type="file" id="background_add" onChange={e => InputFile(e, "#prev_bg_add")} />
                        </div>

                        <div className="flex row mt-1">
                            <div className="group pt-1">
                                <div id="prev_logo_add" className="h-150 squarize use-height bordered rounded-max flex column item-center justify-center">
                                    <BiImageAdd size={24} />
                                    <div className="text small mt-1">Logo (1:1)</div>
                                </div>
                                <input type="file" id="logo_add" onChange={e => InputFile(e, "#prev_logo_add")} />
                            </div>
                            <div className="flex column grow-1 ml-4">
                                <div className="group">
                                    <select id="category" onChange={e => setCategoryID(e.currentTarget.value)}>
                                        <option value="">Tanpa Kategori</option>
                                        {
                                            categories.map((cat, c) => (
                                                <option key={c} value={cat.id}>{cat.name}</option>
                                            ))
                                        }
                                    </select>
                                    <label htmlFor="category" className="active">Kategori :</label>
                                </div>
                                <div className="group">
                                    <input type="text" id="name" value={name} onChange={e => setName(e.currentTarget.value)} required />
                                    <label htmlFor="name">Nama Booth :</label>
                                </div>
                                <div className="group">
                                    <textarea id="description" required onChange={e => setDescription(e.currentTarget.value)}></textarea>
                                    <label htmlFor="description">Deskripsi :</label>
                                </div>
                            </div>
                        </div>

                        <div className="border top mt-2 pt-2">
                            <div className="text bold">Buat Akun untuk Manager</div>
                            <div className="group">
                                <input type="text" id="name" value={managerName} onInput={e => setManagerName(e.currentTarget.value)} />
                                <label htmlFor="name">Name :</label>
                            </div>
                            <div className="group">
                                <input type="text" id="email" value={managerEmail} onInput={e => setManagerEmail(e.currentTarget.value)} />
                                <label htmlFor="email">Email :</label>
                            </div>
                            <div className="group relative">
                                <input type={hidePassword ? 'password' : 'text'} id="password" value={managerPassword} onInput={e => setManagerPassword(e.currentTarget.value)} />
                                <label htmlFor="password">Password :</label>
                                <div className="absolute pointer" style={{top: '45%',right: '5%'}} onClick={() => setHidePassword(!hidePassword)}>
                                    {
                                        hidePassword ? <MdVisibility /> : <MdVisibilityOff />
                                    }
                                </div>
                            </div>
                        </div>

                        <button className="w-100 primary mt-3">Submit</button>
                    </form>
                </Popup>
            }
        </>
    )
}

export default EventBooth;
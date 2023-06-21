import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiEdit, BiImage, BiImageAdd, BiTrash, BiX } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";
import { useParams } from "react-router-dom";
import FAB from "../../components/FAB";
import Header from "../../components/Header";
import InputFile from "../../components/InputFile";
import Popup from "../../components/Popup";
import SidebarEvent from "../../components/SidebarEvent";
import Squarize from "../../components/Squarize";
import config from "../../config";

const EventBoothCategory = () => {
    const { slug } = useParams();
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(null);
    const [user, setUser] = useState(null);
    const [event, setEvent] = useState(null);
    const [message, setMessage] = useState({
        status: 200,
        body: ''
    });

    const [name, setName] = useState('');

    const [isLoading, setLoading] = useState(true);
    const [isAdding, setAdding] = useState(false);
    const [isDeleting, setDeleting] = useState(false);
    const [isEditing, setEditing] = useState(false);

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
            axios.post(`${config.baseUrl}/api/organizer/event/${slug}/booth/category`)
            .then(response => {
                let res = response.data;
                setCategories(res.categories);
                setEvent(res.event);
            })
        }
    }, [isLoading, slug]);

    const submit = e => {
        let formData = new FormData();
        formData.append('token', user.token);
        formData.append('name', name);
        formData.append('event_id', event.id);
        formData.append('icon', document.querySelector("input#icon_add").files[0]);
        
        axios.post(`${config.baseUrl}/api/organizer/event/${slug}/booth/category/create`, formData)
        .then(response => {
            let res = response.data;
            setMessage({status: res.status, body: res.message});
            setLoading(true);
            setAdding(false);
        })
        e.preventDefault();
    }
    const edit = e => {
        let formData = new FormData();
        formData.append('token', user.token);
        formData.append('id', category.id);
        formData.append('name', name);
        formData.append('event_id', event.id);
        formData.append('icon', document.querySelector("input#icon_edit").files[0]);
        
        axios.post(`${config.baseUrl}/api/organizer/event/${slug}/booth/category/update`, formData)
        .then(response => {
            let res = response.data;
            setMessage({status: res.status, body: res.message});
            setLoading(true);
            setEditing(false);
        })
        e.preventDefault();
    }

    const del = () => {
        axios.post(`${config.baseUrl}/api/organizer/event/${slug}/booth/category/delete`, {
            id: category.id,
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
            <SidebarEvent active="booth-category" />
            <div className="content p-4">
                <h2 className="text bigger mt-0">Kategori Booth</h2>
                {
                    message.body !== "" &&
                    <div className={`${message.status === 200 ? 'bg-green' : 'bg-red'} transparent rounded p-2 mb-2`}>
                        {message.body}
                    </div>
                }

                <table>
                    <thead>
                        <tr>
                            <th><BiImage /></th>
                            <th>Kategori</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categories.map((cat, c) => (
                                <tr key={c}>
                                    <td className="w-25">
                                        <img src={`${config.baseUrl}/storage/event/${event.id}/booth_category_icons/${cat.icon}`} className="h-50 squarize use-height rounded" alt={cat.name} />
                                    </td>
                                    <td>{cat.name}</td>
                                    <td className="w-25">
                                        <span className="pointer bg-green transparent rounded p-05 pl-2 pr-2 mr-2" onClick={e => {
                                            setCategory(cat);
                                            setName(cat.name)
                                            setEditing(true);
                                        }}>
                                            <BiEdit />
                                        </span>
                                        <span className="pointer bg-red transparent rounded p-05 pl-2 pr-2" onClick={e => {
                                            setCategory(cat);
                                            setDeleting(true);
                                        }}>
                                            <BiTrash />
                                        </span>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            {
                <FAB icon={<FaPlus color="#fff" />} onClick={() => setAdding(true)} />
            }

            {
                isDeleting &&
                <Popup onDismiss={() => setDeleting(false)}>
                    <h3 className="mt-0 text big">Hapus Kategori</h3>
                    <div>
                        Yakin ingin menghapus kategori {category.name}? Tindakan ini tidak dapat dibatalkan
                    </div>
                    <div className="mt-2 pt-2 border top flex row item-center justify-end">
                        <div className="text mr-2 pointer" onClick={() => setDeleting(false)}>Batal</div>
                        <div className="text bold red pointer" onClick={del}>Ya</div>
                    </div>
                </Popup>
            }
            {
                isEditing &&
                <Popup onDismiss={() => setEditing(false)}>
                    <div className="flex row item-center">
                        <h3 className="mt-0 text big flex grow-1">Ubah Kategori</h3>
                        <div className="h-40 squarize rounded-max use-height bg-grey pointer flex row item-center justify-center" onClick={() => setEditing(false)}>
                            <BiX />
                        </div>
                    </div>
                    <form action="#" onSubmit={edit}>
                        <div className="flex row">
                            <div className="group relative">
                                <div id="preview_add" className="h-70 squarize use-height bordered rounded flex row item-center justify-center mt-1 relative">
                                    {
                                        category !== null &&
                                        <img src={`${config.baseUrl}/storage/event/${event.id}/booth_category_icons/${category.icon}`} className="w-100 rounded" alt="Icon" />
                                    }
                                    <div className="bg-primary transparent rounded absolute p-05 bottom-0 right-0 squarize use-height flex row item-center justify-center">
                                        <BiImageAdd size={12} />
                                    </div>
                                </div>
                                <input type="file" id="icon_add" onChange={e => InputFile(e, "#preview_add")} />
                            </div>
                            <div className="flex column grow-1 ml-2">
                                <div className="group">
                                    <input type="text" id="name" value={name} onChange={e => setName(e.currentTarget.value)} required />
                                    <label htmlFor="name">Nama Kategori :</label>
                                </div>
                            </div>
                        </div>

                        <button className="w-100 primary mt-3">Simpan Perubahan</button>
                    </form>
                </Popup>
            }
            {
                isAdding && 
                <Popup onDismiss={() => setAdding(false)}>
                    <div className="flex row item-center">
                        <h3 className="mt-0 text big flex grow-1">Tambah Kategori</h3>
                        <div className="h-40 squarize rounded-max use-height bg-grey pointer flex row item-center justify-center" onClick={() => setAdding(false)}>
                            <BiX />
                        </div>
                    </div>
                    <form action="#" onSubmit={submit}>
                        <div className="flex row">
                            <div className="group relative">
                                <div id="preview_add" className="h-70 squarize use-height bordered rounded flex row item-center justify-center mt-1">
                                    <BiImageAdd />
                                </div>
                                <input type="file" id="icon_add" onChange={e => InputFile(e, "#preview_add")} />
                            </div>
                            <div className="flex column grow-1 ml-2">
                                <div className="group">
                                    <input type="text" id="name" value={name} onChange={e => setName(e.currentTarget.value)} required />
                                    <label htmlFor="name">Nama Kategori :</label>
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

export default EventBoothCategory;
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiEdit, BiImageAdd, BiTrash, BiX } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";
import { useParams } from "react-router-dom";
import FAB from "../../components/FAB";
import Header from "../../components/Header";
import InputFile from "../../components/InputFile";
import Popup from "../../components/Popup";
import SidebarEvent from "../../components/SidebarEvent";
import Squarize from "../../components/Squarize";
import config from "../../config";

const EventSponsor = () => {
    const { slug } = useParams();
    const [user, setUser] = useState(null);
    const [event, setEvent] = useState(null);
    const [sponsors, setSponsors] = useState([]);
    const [sponsor, setSponsor] = useState(null);
    const [message, setMessage] = useState({
        status: 200,
        body: ''
    });

    const [name, setName] = useState('');
    const [website, setWebsite] = useState('');
    const [type, setType] = useState('');

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
        if (message.body !== "") {
            setTimeout(() => {
                setMessage({status: 200, body: ''});
            }, 2000);
        }
    })

    useEffect(() => {
        if (isLoading) {
            setLoading(false);
            axios.post(`${config.baseUrl}/api/organizer/event/${slug}/sponsor`)
            .then(response => {
                let res = response.data;
                setEvent(res.event);
                setSponsors(res.sponsors);
            })
        }
    })

    const getType = name => {
        let toReturn = null;
        config.sponsor_types.forEach(spons => {
            if (spons.name == name) {
                toReturn = spons;
            }
        });
        return toReturn;
    }
    const submit = e => {
        let formData = new FormData();
        formData.append('event_id', event.id);
        formData.append('name', name);
        formData.append('type', type);
        formData.append('website', website);
        formData.append('logo', document.querySelector("input#logo_add").files[0]);

        axios.post(`${config.baseUrl}/api/organizer/event/${slug}/sponsor/create`, formData)
        .then(response => {
            let res = response.data;
            setMessage({status: res.status, body: res.message});
            setLoading(true);
            setAdding(false);
        })
        
        e.preventDefault();
    }

    const edit = e => {
        console.log('editing');
        let formData = new FormData();
        formData.append('id', sponsor.id);
        formData.append('event_id', event.id);
        formData.append('type', type);
        formData.append('name', name);
        formData.append('website', website);
        formData.append('logo', document.querySelector("input#logo_edit").files[0]);

        axios.post(`${config.baseUrl}/api/organizer/event/${slug}/sponsor/update`, formData)
        .then(response => {
            let res = response.data;
            setMessage({status: res.status, body: res.message});
            setLoading(true);
            setEditing(false);
        })

        e.preventDefault();
    }
    const del = () => {
        axios.post(`${config.baseUrl}/api/organizer/event/${slug}/sponsor/delete`, {
            id: sponsor.id
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
            <SidebarEvent active="sponsor" />
            <div className="content p-4">
                <h2 className="text bigger mt-0">Sponsors</h2>
                {
                    message.body !== "" &&
                    <div className={`${message.status == 200 ? 'bg-green' : 'bg-red'} transparent rounded p-2 mb-2`}>
                        {message.body}
                    </div>
                }
                <div className="flex row wrap gap-20">
                    {
                        sponsors.map((spons, s) => (
                            <div className="bordered rounded p-2 flex row basis-2 relative">
                                <div className="absolute top-0 right-0 p-05 pl-1 pr-1 text small rounded-top-right rounded-bottom-left" style={{
                                    backgroundColor: getType(spons.type).background,
                                    color: getType(spons.type).color
                                }}>
                                    {spons.type.split("_")[1]}
                                </div>
                                <img 
                                    src={`${config.baseUrl}/storage/event/${event.id}/sponsor_logos/${spons.logo}`} 
                                    alt={`Logo ${spons.name}`} 
                                    className="h-100 squarize use-height rounded cover"
                                />
                                <div className="ml-2 flex column grow-1">
                                    <div className="text bold big">{spons.name}</div>
                                    <a href={spons.website} target={'_blank'}>
                                        <div className="text primary small mt-05 pointer">{spons.website}</div>
                                    </a>
                                    <div className="flex row mt-1">
                                        <div className="pointer p-05 pl-2 pr-2 bg-green transparent rounded" onClick={e => {
                                            setSponsor(spons);
                                            setName(spons.name);
                                            setWebsite(spons.website);
                                            setType(spons.type);
                                            setEditing(true);
                                        }}>
                                            <BiEdit />
                                        </div>
                                        <div className="pointer p-05 pl-2 pr-2 bg-red transparent rounded ml-1" onClick={e => {
                                            setSponsor(spons);
                                            setDeleting(true);
                                        }}>
                                            <BiTrash />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            <FAB icon={<FaPlus color="#fff" />} onClick={e => {
                setAdding(true);
            }} />

            {
                isDeleting &&
                <Popup>
                    <h3 className="mt-0 text big">Hapus Sponsor</h3>
                    <div>
                        Yakin ingin menghapus sponsor {sponsor.name}? Tindakan ini tidak dapat dibatalkan
                    </div>
                    <div className="mt-2 pt-2 border-top flex row item-center justify-end">
                        <div className="text mr-2 pointer" onClick={() => setDeleting(false)}>Batal</div>
                        <div className="text bold red pointer" onClick={del}>Ya</div>
                    </div>
                </Popup>
            }
            {
                isEditing &&
                <Popup onDismiss={() => setEditing(false)}>
                    <div className="flex row item-center">
                        <h3 className="m-0 text big flex grow-1">Edit Sponsor</h3>
                        <div className="bg-grey rounded-max pointer h-40 squarize use-height flex row item-center justify-center" onClick={() => setEditing(false)}>
                            <BiX size={22} />
                        </div>
                    </div>
                    <form action="#" onSubmit={e => edit(e)}>
                    <div className="flex row">
                            <div className="pt-1">
                                <div className="group">
                                    <div id="preview_edit" className="bordered rounded w-100 h-150 squarize use-height flex column item-center justify-center">
                                        <img src={`${config.baseUrl}/storage/event/${event.id}/sponsor_logos/${sponsor.logo}`}  alt="Logo" className="w-100 rounded h-150 squarize use-height cover" />
                                    </div>
                                    <input type="file" id="logo_edit" onChange={e => InputFile(e, "#preview_edit")} />
                                </div>
                                <div className="text muted small pointer" onClick={() => document.querySelector("input#logo_edit").click()}>Klik untuk <br /> mengganti logo</div>
                            </div>
                            <div className="ml-2 flex column grow-1">
                                <div className="group">
                                    <select id="type" onChange={e => setType(e.currentTarget.value)} required>
                                        <option value="">Pilih Tipe Sponsor...</option>
                                        {
                                            config.sponsor_types.map((tp, t) => (
                                                <option selected={sponsor.type == tp.name ? true : false} key={t} value={tp.name}>{tp.name.split('_')[1]}</option>
                                            ))
                                        }
                                    </select>
                                    <label htmlFor="type" className="active">Tipe Sponsor :</label>
                                </div>
                                <div className="group">
                                    <input type="text" id="name" value={name} onInput={e => setName(e.currentTarget.value)} required />
                                    <label htmlFor="name">Nama Institusi / Perusahaan :</label>
                                </div>
                                <div className="group">
                                    <input type="text" id="website" value={website} onInput={e => setWebsite(e.currentTarget.value)} required />
                                    <label htmlFor="website">URL Website :</label>
                                </div>
                            </div>
                        </div>

                        <button className="mt-3 w-100 primary">Simpan Perubahan</button>
                    </form>
                </Popup>
            }
            {
                isAdding &&
                <Popup onDismiss={() => setAdding(false)}>
                    <h3 className="mt-0 text big">Tambah Sponsor</h3>
                    <form action="#" onSubmit={submit}>
                        <div className="flex row">
                            <div className="group pt-1">
                                <div id="preview_add" className="bordered p-1 rounded w-100 h-150 squarize use-height flex column item-center justify-center">
                                    <BiImageAdd size={22} />
                                    <div className="text small-2 mt-05 muted w-100 center">Logo Perusahaan</div>
                                </div>
                                <input type="file" id="logo_add" onChange={e => InputFile(e, "#preview_add")} />
                            </div>
                            <div className="ml-2 flex column grow-1">
                                <div className="group">
                                    <select id="type" onChange={e => setType(e.currentTarget.value)} required>
                                        <option value="">Pilih Tipe Sponsor...</option>
                                        {
                                            config.sponsor_types.map((tp, t) => (
                                                <option key={t} value={tp.name}>{tp.name.split('_')[1]}</option>
                                            ))
                                        }
                                    </select>
                                    <label htmlFor="type" className="active">Tipe Sponsor :</label>
                                </div>
                                <div className="group">
                                    <input type="text" id="name" onInput={e => setName(e.currentTarget.value)} required />
                                    <label htmlFor="name">Nama Institusi / Perusahaan :</label>
                                </div>
                                <div className="group">
                                    <input type="text" id="website" onInput={e => setWebsite(e.currentTarget.value)} required />
                                    <label htmlFor="website">URL Website :</label>
                                </div>
                            </div>
                        </div>

                        <button className="mt-3 w-100 primary">Submit</button>
                    </form>
                </Popup>
            }
        </>
    )
}

export default EventSponsor;
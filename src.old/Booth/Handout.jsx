import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiFile, BiTrash, BiUpload, BiVideo, BiX } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";
import { useParams } from "react-router-dom";
import FAB from "../components/FAB";
import Header from "../components/Header";
import InputFile from "../components/InputFile";
import Popup from "../components/Popup";
import SidebarBooth from "../components/SidebarBooth";
import Squarize from "../components/Squarize";
import config from "../config";

const BoothHandout = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [handouts, setHandouts] = useState([]);
    const [handout, setHandout] = useState(null);
    const [message, setMessage] = useState({
        status: 200,
        body: ''
    });

    const [type, setType] = useState('file');
    const [url, setUrl] = useState('');
    const [title, setTitle] = useState('');

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
    });

    useEffect(() => {
        if (isLoading) {
            setLoading(false);
            axios.post(`${config.baseUrl}/api/booth/${id}/handout`)
            .then(response => {
                let res = response.data;
                setHandouts(res.handouts);
            })
        }
    }, [isLoading, id]);

    const submit = e => {
        let formData = new FormData();
        formData.append('type', type);
        formData.append('title', title);
        if (type === "file") {
            formData.append('file', document.querySelector("input#file_add").files[0]);
        } else {
            formData.append('file', url);
        }

        axios.post(`${config.baseUrl}/api/booth/${id}/handout/create`, formData)
        .then(response => {
            let res = response.data;
            setMessage({status: res.status, body: res.message});
            setLoading(true);
            setAdding(false);
        })
        e.preventDefault();
    }

    const del = () => {
        axios.post(`${config.baseUrl}/api/booth/${id}/handout/delete`, {
            id: handout.id,
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
            <SidebarBooth active="handout" />
            <div className="content p-4">
                <h2 className="text bigger mt-0">Handout</h2>
                {
                    message.body !== "" &&
                    <div className={`${message.status === 200 ? 'bg-green' : 'bg-red'} transparent rounded p-2 mb-2`}>
                        {message.body}
                    </div>
                }
                
                <div className="flex row wrap gap-10">
                    {
                        handouts.map((hand, h) => (
                            <div className="bordered rounded flex column basis-4 grow-1 relative" key={h}>
                                <div className="bg-primary rounded-top-left rounded-top-right w-100 ratio-5-2 flex row item-center justify-center">
                                    {
                                        hand.type === "file" ?
                                            <BiFile size={32} />
                                        :
                                            <BiVideo size={32} />
                                    }
                                </div>
                                <div className="p-2">
                                    {hand.title}
                                    <div className="text small muted mt-05">{hand.filename}</div>
                                </div>
                                <div className="absolute top-0 right-0 hover-to-show">
                                    <div className="bg-red p-05 pl-2 pr-2 rounded pointer mt-05 mr-05" onClick={() => {
                                        setHandout(hand);
                                        setDeleting(true);
                                    }}>
                                        <BiTrash />
                                    </div>
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
                    <h3 className="mt-0 text big">Hapus Handout</h3>
                    <div>
                        Yakin ingin menghapus handout {handout.filename}? Tindakan ini tidak dapat dibatalkan
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
                        <h3 className="mt-0 text big flex grow-1">Tambah Handout</h3>
                        <div className="h-40 bg-grey rounded-max flex row item-center justify-center squarize use-height pointer" onClick={() => setAdding(false)}>
                            <BiX />
                        </div>
                    </div>

                    <form action="#" onSubmit={submit}>
                        <div className="group">
                            <input type="text" id="title" onInput={e => setTitle(e.currentTarget.value)} />
                            <label htmlFor="title">Judul / nama lampiran :</label>
                        </div>
                        <div className="group">
                            <select id="type" onChange={e => setType(e.currentTarget.value)}>
                                <option value="file">Upload File</option>
                                <option value="video">Video Youtube</option>
                            </select>
                            <label className="active" htmlFor="type">Tipe :</label>
                        </div>

                        {
                            type === 'file' ?
                                <div className="group">
                                    <div id="prev_add" className="bg-grey rounded-more flex column wrap grow-1 item-center justify-center mt-2 ratio-5-2">
                                        <BiUpload size={32} />
                                        <div className="text mt-2">Upload File</div>
                                        <div className="text mt-05 small muted">(PNG, JPG, PDF, DOCX, PPTX)</div>
                                    </div>
                                    <input type="file" id="file_add" onChange={e => InputFile(e, "#prev_add")} />
                                </div>
                            :
                                <div className="group">
                                    <input type="text" name="filename" id="url" onInput={e => setUrl(e.currentTarget.value)} />
                                    <label htmlFor="url">URL Youtube :</label>
                                </div>
                        }

                        <button className="w-100 mt-3 primary">Upload</button>
                    </form>
                </Popup>
            }
        </>
    )
}

export default BoothHandout;
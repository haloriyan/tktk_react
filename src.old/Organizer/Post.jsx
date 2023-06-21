import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import Squarize from "../components/Squarize";
import Header from "../components/Header";
import SidebarOrganizer from "../components/SidebarOrganizer";
import axios from "axios";
import config from "../config";
import Popup from "../components/Popup";
import { BiEdit, BiImageAdd, BiLike, BiTrash, BiX } from "react-icons/bi";
import InputFile from "../components/InputFile";

const OrganizerPost = () => {
    const { org_username } = useParams();
    const [user, setUser] = useState(null);
    const [organizer, setOrganizer] = useState(null);
    const [posts, setPosts] = useState([]);
    const [post, setPost] = useState(null);
    const [raw, setRaw] = useState(null);
    const [message, setMessage] = useState({
        status: 200,
        body: ''
    });

    const [body, setBody] = useState('');
    const [inputCounter, setInputCounter] = useState(['input']);
    const inputsRef = useRef([]);

    const [isLoading, setLoading] = useState(true);
    const [isAdding, setAdding] = useState(false);
    const [isDeleting, setDeleting] = useState(false);

    useEffect(() => {
        if (!isAdding && inputCounter.length > 1) {
            setInputCounter(['input']);
        }
    })

    useEffect(() => {
        if (message.body !== "") {
            setTimeout(() => {
                setMessage({status: 200, body: ''});
            }, 2000);
        }
    })
    
    useEffect(() => {
        if (user === null) {
            setUser(JSON.parse(window.localStorage.getItem('user')));
        }
        Squarize()
    });

    useEffect(() => {
        if (isLoading && user !== null && organizer !== null) {
            setLoading(false);
            axios.post(`${config.baseUrl}/api/organizer/post`, {
                organizer_id: organizer.id,
            })
            .then(response => {
                let res = response.data;
                setRaw(res.posts);
                setPosts(res.posts.data);
            })
        }
    })

    const submit = e => {
        console.log('submitting');
        let formData = new FormData();
        formData.append('token', user.token);
        formData.append('organizer_id', organizer.id);
        formData.append('body', body);
        document.querySelectorAll("input.images_add").forEach(input => {
            if (input.files[0] !== undefined) {
                formData.append('images[]', input.files[0]);
            }
        });

        axios.post(`${config.baseUrl}/api/organizer/post/create`, formData)
        .then(response => {
            let res = response.data;
            console.log(res);
            setMessage({status: res.status, body: res.message});
            setLoading(true);
            setAdding(false);
        })
        e.preventDefault();
    }

    const del = () => {
        axios.post(`${config.baseUrl}/api/organizer/post/delete`, {
            id: post.id,
            token: user.token,
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
            <SidebarOrganizer active={'post'} user={user} setOrganizer={setOrganizer} />
            <div className="content p-4">
                <div className="flex row item-center">
                    <div className="flex column grow-1">
                        <h2 className="text bigger m-0 mb-1">Post Updates</h2>
                        <div className="text muted small">
                            Kirim informasi terupdate tentang organizer atau eventmu
                        </div>
                    </div>
                    <button className="primary" onClick={() => setAdding(true)}>Buat Postingan</button>
                </div>

                <div className="flex row gap-20 mt-2">
                    {
                        posts.map((pos, p) => (
                            <div className="bordered rounded flex column basis-3 grow-1" key={p}>
                                <div className="flex row item-center border bottom p-1 pl-2 pr-2">
                                    <div className="flex row item-center grow-1">
                                        <img
                                            src={
                                                organizer.icon === null ?
                                                    '/images/default_organizer_logo.png'
                                                :
                                                    `${config.baseUrl}/storage/organizer_icons/${organizer.icon}`
                                            }
                                            alt={organizer.name}
                                            className="h-30 rounded-max ratio-1-1"
                                        />
                                        <div className="ml-2 text small">{organizer.name}</div>
                                    </div>
                                    <div className="pointer text red ml-2" onClick={e => {
                                        setPost(pos);
                                        setDeleting(true);
                                    }}>
                                        <BiTrash />
                                    </div>
                                </div>
                                <div className="p-2 flex column grow-1" dangerouslySetInnerHTML={{ __html: pos.body }}></div>
                                {
                                    pos.images.length > 0 &&
                                    <div className="flex row gap-10 p-2 pt-0">
                                        {
                                            pos.images.map((img, i) => (
                                                <img 
                                                    src={`${config.baseUrl}/storage/organizer_post_images/${organizer.id}/${img.filename}`} alt={img.filename} 
                                                    className="h-80 rounded-more ratio-1-1"
                                                />
                                            ))
                                        }
                                    </div>
                                }
                                <div className="flex row item-center mb-1">
                                    <div className="flex row grow-1 item-center justify-center h-30 text muted">
                                        <BiLike />
                                        <div className="ml-1 text small">250</div>
                                    </div>
                                    <div className="flex row grow-1 item-center justify-center h-30 text muted">
                                        <BiLike />
                                        <div className="ml-1 text small">250</div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            {
                isAdding &&
                <Popup onDismiss={() => setAdding(false)}>
                    <div className="flex row item-center">
                        <h3 className="m-0 text big flex grow-1">Buat Postingan</h3>
                        <div className="bg-grey pointer h-50 squarize rounded-max use-height flex row item-center justify-center" onClick={() => setAdding(false)}>
                            <BiX />
                        </div>
                    </div>

                    <form onSubmit={submit} className="mt-2">
                        <CKEditor
                            editor={ClassicEditor}
                            onChange={(event, editor) => {
                                let value = editor.getData();
                                setBody(value);
                            }}
                        />

                        <div className="text small muted mt-2">Tambahkan Gambar</div>
                        <div className="flex row wrap gap-10 mt-05">
                            {
                                inputCounter.map((inp, i) => (
                                    <div className="group relative" key={i} ref={(el) => (inputsRef.current[i] = el)}>
                                        <div id={`preview_add_${i}`} className="h-100 rounded flex row item-center justify-center squarize use-height bordered">
                                            <BiImageAdd size={18} />
                                        </div>
                                        <input type="file" className="images_add" onChange={e => InputFile(e, `#preview_add_${i}`, () => {
                                            let inp = [...inputCounter];
                                            inp.push('input');

                                            setInputCounter(inp);
                                        })} />
                                        {
                                            i !== inputCounter.length - 1 &&
                                            <div className="pointer index-99 bg-red h-25 squarize use-height text center m-05 rounded absolute top-0 right-0" onClick={e => {
                                                inputsRef.current[i].remove();
                                            }}>
                                                <BiTrash size={11} />
                                            </div>
                                        }
                                    </div>
                                ))
                            }
                        </div>
                        
                        <button className="mt-2 primary w-100">Posting</button>
                    </form>
                </Popup>
            }
            {
                isDeleting &&
                <Popup onDismiss={() => setDeleting(false)}>
                    <h3 className="mt-0 text big">Hapus Postingan</h3>
                    <div>
                        Yakin ingin menghapus postingan ini? Tindakan ini tidak dapat dibatalkan
                    </div>
                    <div className="mt-2 pt-2 border top flex row item-center justify-end">
                        <div className="text mr-2 pointer" onClick={() => setDeleting(false)}>Batal</div>
                        <div className="text bold red pointer" onClick={del}>Ya</div>
                    </div>
                </Popup>
            }
        </>
    )
}

export default OrganizerPost;
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Flatpickr from "react-flatpickr";
import 'flatpickr/dist/themes/material_red.css';

import Header from "../../components/Header";
import InputFile from "../../components/InputFile";
import Sidebar from "../../components/Sidebar";
import config from "../../config";
import styles from "../../styles/Event/Create.module.css";

const EventCreate = () => {
    const { org_username } = useParams();
    const [user, setUser] = useState(null);
    const [organizer, setOrganizer] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [topic, setTopic] = useState('');
    const [category ,setCategory] = useState('');
    const [start, setStart] = useState(new Date())
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [province, setProvince] = useState('');
    const [provinceID, setProvinceID] = useState('');
    const [city, setCity] = useState('');
    const [cityID, setCityID] = useState('');
    const [address, setAddress] = useState('');

    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [isLoadingCities, setLoadingCities] = useState(false);

    useEffect(() => {
        if (provinces.length === 0) {
            axios.post(`${config.baseUrl}/api/rajaongkir/province`)
            .then(response => {
                let res = response.data;
                setProvinces(res);
            })
        }
    });
    useEffect(() => {
        if (provinceID !== "" && isLoadingCities) {
            setLoadingCities(false);
            axios.post(`${config.baseUrl}/api/rajaongkir/city`, {
                province_id: provinceID
            })
            .then(response => {
                let res = response.data;
                setCities(res);
            })
        }
    }, [isLoadingCities, provinceID])

    useEffect(() => {
        if (user === null) {
            setUser(JSON.parse(window.localStorage.getItem('user')));
        }
    }, [user]);

    useEffect(() => {
        if (organizer === null) {
            axios.post(`${config.baseUrl}/api/organizer`, {
                username: org_username
            })
            .then(response => {
                let res = response.data;
                setOrganizer(res.organizer);
            })
        }
    }, [organizer, org_username]);

    const submit = e => {
        let cover = document.querySelector("input#cover").files[0];
        let formData = new FormData();
        formData.append('organizer_id', organizer.id);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('cover', cover);
        formData.append('category', category);
        formData.append('topics', topic);

        formData.append('province', province);
        formData.append('city', city);
        formData.append('address', address);
        
        formData.append('start_date', startDate);
        formData.append('end_date', endDate);
        formData.append('start_time', startTime);
        formData.append('end_time', endTime);

        axios.post(`${config.baseUrl}/api/organizer/event/create`, formData)
        .then(response => {
            let res = response.data;
            if (res.status == 200) {
                alert('berhasil')
            }
        })
        e.preventDefault();
    }

    return (
        <>
            <Header user={user} />
            <Sidebar user={user} />
            <div className="content p-4">
                <h2 className="text bigger mt-0 mb-1">Buat Event</h2>
                {
                    organizer !== null &&
                    <div>
                        <div className="text muted">untuk {organizer.name}</div>

                        <form action="#" className="mt-4" onSubmit={e => submit(e)}>
                            <div className="group">
                                <div id="CoverPreview" className={`bordered rounded-more flex column item-center justify-center ${styles.event_cover}`}>
                                    <BiImageAdd size={48} />
                                    <div className="text big primary mt-3">
                                        Upload Event Cover
                                    </div>
                                    <div className="text muted small mt-1">Rekomendasi ukuran : 1000px x 400px (JPG, PNG)</div>
                                </div>
                                <input type="file" name="cover" id="cover" onChange={e => {
                                    InputFile(e, "#CoverPreview");
                                }} />
                            </div>

                            <div className="group">
                                <input type="text" name="name" id="name" onInput={e => setName(e.currentTarget.value)} required />
                                <label htmlFor="name" className="active">Judul Event :</label>
                            </div>
                            <div className="flex row">
                                <div className="flex column grow-1 mr-1">
                                    <div className="group">
                                        <select name="category" id="category" onChange={e => setCategory(e.currentTarget.value)} required>
                                            <option value="">Pilih Kategori...</option>
                                            {
                                                config.event_categories.map((cat, c) => (
                                                    <option key={c} value={cat.name}>{cat.name}</option>
                                                ))
                                            }
                                        </select>
                                        <label htmlFor="category" className="active">Kategori :</label>
                                    </div>
                                </div>
                                <div className="flex column grow-1 mr-1">
                                    <div className="group">
                                        <select name="topic" id="topic" onChange={e => setTopic(e.currentTarget.value)} required>
                                            <option value="">Pilih Topik...</option>
                                            {
                                                config.event_topics.map((top, t) => (
                                                    <option key={t} value={top}>{top}</option>
                                                ))
                                            }
                                        </select>
                                        <label htmlFor="topic" className="active">Topik :</label>
                                    </div>
                                </div>
                            </div>

                            <h3 className="mb-1 text big muted bold spacing-2 mt-4">DESKRIPSI</h3>
                            <CKEditor
                                editor={ClassicEditor}
                                data={description}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setDescription(data);
                                }}
                            />

                            <h3 className="mb-0 text big muted bold spacing-2 mt-4">WAKTU PELAKSANAAN</h3>
                            <div className="flex row">
                                <div className="flex column grow-1 mr-1">
                                    <div className="group">
                                        <Flatpickr
                                            data-enable-time
                                            value={start}
                                            options={{
                                                minDate: new Date(),
                                                dateFormat: 'Y-m-d H:i'
                                            }}
                                            onChange={([date]) => {
                                                let theDate = date.toLocaleString('en-CA', {
                                                    dateStyle: 'short',
                                                    timeStyle: 'short',
                                                    hour12: false
                                                });
                                                setStart(date);
                                                setStartDate(date.toLocaleString('en-CA', {
                                                    dateStyle: 'short',
                                                }));
                                                setStartTime(date.toLocaleTimeString('en-CA', {
                                                    timeStyle: 'short',
                                                    hour12: false
                                                }))
                                            }}
                                        />
                                        <label className="active">Tanggal & Waktu Mulai :</label>
                                    </div>
                                </div>
                                
                                <div className="flex column grow-1 ml-1">
                                    <div className="group">
                                        <Flatpickr
                                            data-enable-time
                                            value={start.toLocaleDateString('en-ID')}
                                            options={{
                                                minDate: start,
                                            }}
                                            onChange={([date]) => {
                                                setEndDate(date.toLocaleDateString('en-CA', {dateStyle: 'short'}));
                                                setEndTime(date.toLocaleTimeString('en-CA', {timeStyle: 'short', hour12: false}));
                                            }}
                                        />
                                        <label className="active">Tanggal & Waktu Berakhir :</label>
                                    </div>
                                </div>
                            </div>

                            <h3 className="mb-0 text big muted bold spacing-2 mt-4">LOKASI</h3>
                            <div className="flex row">
                                <div className="flex column grow-1 mr-1">
                                    <div className="group">
                                        <select name="province" id="province" onChange={e => {
                                            let val = e.currentTarget.value;
                                            setProvinceID(val);
                                            provinces.map(prov => {
                                                if (prov.province_id == val) {
                                                    setProvince(prov.province);
                                                }
                                            });
                                            setLoadingCities(true);
                                        }}>
                                            <option value="">Pilih Provinsi...</option>
                                            {
                                                provinces.length > 0 &&
                                                provinces.map((prov, p) => (
                                                    <option key={p} value={prov.province_id}>{prov.province}</option>
                                                ))
                                            }
                                        </select>
                                        <label htmlFor="province" className="active">Provinsi :</label>
                                    </div>
                                    <div className="group">
                                        <select name="city" id="city" onChange={e => {
                                            let val = e.currentTarget.value;
                                            setCityID(val);
                                            cities.map(cit => {
                                                if (cit.city_id == val) {
                                                    setCity(cit.city_name);
                                                }
                                            });
                                        }}>
                                            <option value="">Pilih Kota...</option>
                                            {
                                                cities.length > 0 &&
                                                cities.map((cit, c) => (
                                                    <option key={c} value={cit.city_id}>{cit.city_name}</option>
                                                ))
                                            }
                                        </select>
                                        <label htmlFor="province" className="active">Kota :</label>
                                    </div>
                                </div>
                                <div className="flex column grow-1 ml-1">
                                    <div className="group">
                                        <textarea name="address" id="address" onInput={e => setAddress(e.currentTarget.value)} className="h-150"></textarea>
                                        <label htmlFor="address">Alamat Lengkap :</label>
                                    </div>
                                </div>
                            </div>

                            <button className="w-100 mt-3 primary">Submit</button>
                        </form>
                    </div>
                }
            </div>
        </>
    )
}

export default EventCreate;
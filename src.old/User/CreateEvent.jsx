import axios from "axios";
import React, { useEffect, useState } from "react";
import config from "../config";
import theStyle from "../styles/CreateEvent.module.css";
import InArray from "../components/InArray";
import Popup from "../components/Popup";
import { BiCalendar, BiCameraMovie, BiChalkboard, BiError, BiIdCard, BiImageAdd, BiMap, BiTv, BiX } from "react-icons/bi";
import InputFile from "../components/InputFile";
import MXDropdown from "../components/MXDropdown";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const BottomNavigation = ({title, description, next = null, prev = null}) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 h-80 pl-2 pr-2 border top bg-white flex row item-center">
            <div className="flex column grow-1 mr-2">
                <div className="text bold">{title}</div>
                <div className="text muted small mt-05">{description}</div>
            </div>
            <div className="flex row item-center">
                <div className="pointer rounded p-1 pl-2 pr-2 text small bg-grey" onClick={() => {
                    if (prev !== null) {
                        prev();
                    }
                }}>
                    kembali
                </div>
                <div className="pointer rounded p-1 pl-2 pr-2 text small bg-primary ml-2" onClick={() => {
                    if (next !== null) {
                        next();
                    }
                }}>
                    Berikutnya
                </div>
            </div>
        </div>
    )
}

const CreateEvent = (props) => {
    const steps = [
        {
            name: "category",
            title: "Beda Tipe, Beda Kebutuhan",
            description: "Kami membantumu menyesuaikan apa yang eventmu butuhkan"
        },
        {
            name: "basic_info",
            title: "Ada Apa di Eventmu?",
            description: "Berikan informasi tentang eventmu dengan jelas"
        },
        {
            name: "ticket",
            title: "Beda Tipe, Beda Kebutuhan",
            description: "Kami membantumu menyesuaikan apa yang eventmu butuhkan"
        }
    ]

    const [user, setUser] = useState(null);
    const [basicInfoTab, setBasicInfoTab] = useState('settings');
    const [stepIndex, setStepIndex] = useState(1);
    const [categories, setCategories] = useState([]);
    const [organizers, setOrganizers] = useState([]);
    const [topics, setTopics] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    // FORM DATAS
    const [organizer, setOrganizer] = useState(null);
    const [topic, setTopic] = useState([]);
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [snk, setSnk] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [province, setProvince] = useState(null);
    const [provinceID, setProvinceID] = useState(null);
    const [city, setCity] = useState(null);
    const [cityID, setCityID] = useState(null);
    const [address, setAddress] = useState('');
    const [visibility, setVisibility] = useState('public');
    const [execution, setExecution] = useState('online');
    const [breakdowns, setBreakdowns] = useState([]);
    
    const [isLoadingCategories, setLoadingCategories] = useState(true);
    const [isLoadingTopics, setLoadingTopics] = useState(true);
    const [isLoadingOrganizer, setLoadingOrganizer] = useState(true);
    const [isLoadingProvince, setLoadingProvince] = useState(true);
    const [isLoadingCities, setLoadingCities] = useState(false);
    const [loginModalVisible, setLoginModalVisible] = useState(false);
    const [locationModalVisible, setLocationModalVisible] = useState(false);
    const [dateModalVisible, setDateModalVisible] = useState(false);
    const [organizerModalVisible, setOrganizerModalVisible] = useState(false);

    useEffect(() => {
        if (user === null) {
            let u = JSON.parse(window.localStorage.getItem('user'));
            if (u === null) {
                setLoginModalVisible(true);
            } else {
                setUser(u);
            }
        }
    }, [user]);

    useEffect(() => {
        if (isLoadingProvince) {
            setLoadingProvince(false);
            axios.post(`${config.baseUrl}/api/rajaongkir/province`)
            .then(response => {
                let res = response.data;
                setProvinces(res);
            })
        }
    }, [isLoadingProvince])
    useEffect(() => {
        if (isLoadingCities && provinceID !== null) {
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
        if (isLoadingCategories) {
            setLoadingCategories(false);
            axios.post(`${config.baseUrl}/api/master/category`)
            .then(response => {
                let res = response.data;
                setCategories(res.categories);
            })
        }
    }, [isLoadingCategories]);

    useEffect(() => {
        if (isLoadingTopics) {
            setLoadingTopics(false);
            axios.post(`${config.baseUrl}/api/master/topic`)
            .then(response => {
                let res = response.data;
                setTopics(res.topics);
            })
        }
    }, [isLoadingTopics]);

    useEffect(() => {
        if (isLoadingOrganizer && user !== null) {
            setLoadingOrganizer(false);
            axios.post(`${config.baseUrl}/api/user/organizer`, {
                token: user.token,
            })
            .then(response => {
                let res = response.data;
                setOrganizers(res.organizers);
            })
        }
    })

    const nexting = () => {
        if (stepIndex < steps.length - 1) {
            setStepIndex(stepIndex + 1);
        }
    }
    const nextStep = () => {
        if (stepIndex === 0) {
            if (category === "") {
                setErrorMessage('Kamu harus memilih kategori untuk eventmu');
                return false;
            }
            if (topic.length === 0) {
                setErrorMessage('Setidaknya kamu harus memilih 1 topik yang akan dibahas pada eventmu');
                return false;
            }

            setLoadingOrganizer(true);
        } else if (stepIndex === 1) {
            let coverInput = document.querySelector("input#cover");
            if (title === "") {
                setErrorMessage("Kamu belum memberi nama eventmu");
                return false;
            }
            if (description === "") {
                setErrorMessage("Kamu belum mengisi deskripsi event");
                return false;
            }
            if (coverInput.files.length === 0) {
                setErrorMessage("Kamu belum memilih gambar banner");
                return false;
            }
            if (snk === "") {
                setErrorMessage("Kamu belum mengisi syarat dan ketentuan untuk eventmu");
                return false;
            }
            if (address === "" || cityID === null || provinceID === null) {
                setErrorMessage("Kamu memilih lokasi di mana eventmu akan diselenggarakan");
                return false;
            }
        } else if (stepIndex === 2) {
            // 
        }
        nexting();
    }
    const prevStep = () => {
        if (stepIndex > 0) {
            setStepIndex(stepIndex - 1);
        }
    }

    const chooseTopic = top => {
        let theTopic = [...topic];
        if (InArray(top.name, theTopic)) {
            let i = theTopic.indexOf(top.name);
            theTopic.splice(i, 1);
        } else {
            if (theTopic.length < 3) {
                theTopic.push(top.name);
            } else {
                setErrorMessage('Kamu hanya bisa memilih maksimal 3 topik');
            }
        }
        setTopic(theTopic);
    }
    const chooseBreakdown = val => {
        let brk = [...breakdowns];
        if (InArray(val, brk)) {
            brk.splice(brk.indexOf(val), 1);
        } else {
            brk.push(val);
        }
        setBreakdowns(brk);
    }

    const closeError = () => setErrorMessage('');

    const typing = (e, setValue) => {
        setValue(e.currentTarget.value);
        setErrorMessage('');
    }

    const saveLocation = e => {
        if (provinceID === null && province === null) {
            setErrorMessage('Anda belum memilih provinsi');
        } else if (cityID === null && city === null) {
            setErrorMessage('Anda belum memilih kota');
        } else if (address === "") {
            setErrorMessage('Mohon berikan alamat lengkap dan jelas');
        } else {
            setLocationModalVisible(false);
            setErrorMessage('');
        }
        e.preventDefault();
    }

    return (
        <>
            {
                stepIndex === 0 &&
                <div className="absolute top-0 left-0 right-0 flex row p-3">
                    <div className="flex column basis-2 grow-1 mr-3 pr-3 border right primary">
                        <div className="text size-32">Pilih Kategori</div>
                        <div className="flex row wrap gap-20 mt-2">
                            {
                                categories.map((cat, c) => {
                                    let isActive = category === cat.name;
                                    return (
                                        <div className={`bordered rounded pointer p-2 flex row item-center basis-2 grow-1 ${isActive ? 'bg-primary' : ''}`} key={c} onClick={() => setCategory(cat.name)}>
                                            <img 
                                                src={
                                                    isActive ?
                                                        `${config.baseUrl}/storage/category_icon_active/${cat.icon_active}`
                                                    :
                                                        `${config.baseUrl}/storage/category_icons/${cat.icon}`
                                                }
                                                alt={cat.name} 
                                                className="h-50 ratio-1-1"
                                            />
                                            <div className="flex column grow-1 ml-2">
                                                <div className="text size-18">{cat.name}</div>
                                                <div className={`text small ${isActive ? 'white' : 'muted'} mt-05`}>{cat.synonim}</div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="flex column basis-2 grow-1">
                        <div className="text size-32">Pilih Topik</div>
                        <div className="flex row wrap gap-10 mt-2">
                            {
                                topics.map((top, t) => {
                                    if (top.name.toLowerCase() !== "lainnya") {
                                        return (
                                            <div className={`bordered rounded pointer p-1 pl-2 pr-2 ${InArray(top.name, topic) ? 'bg-primary transparent' : ''}`} key={t} onClick={() => {
                                                chooseTopic(top);
                                            }}>
                                                {top.name}
                                            </div>
                                        )
                                    }
                                    return null;
                                })
                            }
                            {
                                topics.map((top, t) => {
                                    if (top.name.toLowerCase() === "lainnya") {
                                        return (
                                            <div className={`bordered rounded pointer p-1 pl-2 pr-2 ${InArray(top.name, topic) ? 'bg-primary transparent' : ''}`} key={t} onClick={() => {
                                                chooseTopic(top);
                                            }}>
                                                {top.name}
                                            </div>
                                        )
                                    }
                                    return null;
                                })
                            }
                        </div>
                    </div>
                </div>
            }
            {
                stepIndex === 1 &&
                <div className="absolute top-0 left-0 right-0 p-3 flex column item-center">
                    <div id="BasicInfoArea" className="w-65">
                        <div className="group relative">
                            <div id="BannerArea" className="w-100 ratio-5-2 rounded-more bg-grey flex row item-center justify-center">
                                <BiImageAdd size={80} color={config.primaryColor} />
                                <div className="flex column ml-2">
                                    <div className="text bold size-20">Upload Event Banner</div>
                                    <div className="text small mt-05">Resolusi Gambar 881 x 352 pixel</div>
                                </div>
                            </div>
                            <input type="file" id="cover" onChange={e => InputFile(e, "#BannerArea", null, false)} />
                        </div>

                        <input type="text" className={`p-0 border none text size-24 bold ${theStyle.EventNameInput}`} placeholder="Nama Event" value={title} onInput={e => {
                            setTitle(e.currentTarget.value);
                        }} />

                        <div className="flex row gap-30 mt-1">
                            <div className="flex column grow-1 basis-3">
                                <div className="text muted small mb-1">Diselenggarakan Oleh</div>
                                {
                                    organizer === null ?
                                        <div className="flex row item-center">
                                            <div className="h-50 ratio-1-1 rounded-max bg-grey"></div>
                                            <div className="text small muted ml-2 mr-1 flex grow-1">Nama Organizer</div>
                                            <div className="text small primary pointer" onClick={() => setOrganizerModalVisible(true)}>
                                                Pilih
                                            </div>
                                        </div>
                                    :
                                        <div className="flex row item-center">
                                            <img
                                                src={
                                                    organizer.icon === null ?
                                                        '/images/default_organizer_logo.png'
                                                    :
                                                        `${config.baseUrl}/storage/organizer_icons/${organizer.icon}`
                                                }
                                                alt={organizer.name}
                                                className="h-50 ratio-1-1 rounded-max bg-grey"
                                            />
                                            <div className="text small muted ml-2 mr-1 flex grow-1">{organizer.name}</div>
                                            <div className="text small primary pointer" onClick={() => setOrganizerModalVisible(true)}>
                                                Ganti
                                            </div>
                                        </div>
                                }
                            </div>
                            <div className="flex column grow-1 basis-3">
                                <div className="text muted small mb-2">Tanggal dan Waktu</div>
                                        <div className="flex row pointer" onClick={() => setDateModalVisible(true)}>
                                            <BiCalendar color="#999" size={20} />
                                            <div className="text muted ml-2">Pilih Tanggal</div>
                                        </div>
                            </div>
                            <div className="flex column grow-1 basis-3">
                                <div className="text muted small mb-2">Lokasi</div>
                                {
                                    (province === null || city === null) ?
                                        <div className="flex row pointer" onClick={() => setLocationModalVisible(true)}>
                                            <BiMap color="#999" size={20} />
                                            <div className="text muted ml-2">Pilih Lokasi</div>
                                        </div>
                                    :
                                        <div className="flex row pointer" onClick={() => setLocationModalVisible(true)}>
                                            <BiMap color="#999" size={20} />
                                            <div className="text muted ml-2">{city.city_name}, {province.province}</div>
                                        </div>
                                }
                            </div>
                        </div>
                        <div className="mt-4 bordered rounded p-3">
                            <div className="flex row border bottom item-center justify-center">
                                <div className={`flex row grow-1 basis-2 text center size-18 pointer h-40 item-center justify-center ${basicInfoTab === 'description' ? 'border bottom primary bold' : ''}`} onClick={e => setBasicInfoTab('description')}>
                                    Deskripsi Event
                                </div>
                                <div className={`flex row grow-1 basis-2 text center size-18 pointer h-40 item-center justify-center ${basicInfoTab === 'settings' ? 'border bottom primary bold' : ''}`} onClick={e => setBasicInfoTab('settings')}>
                                    Pengaturan Lanjutan
                                </div>
                            </div>

                            {
                                basicInfoTab === 'description' &&
                                <div className="mt-2">
                                    <div className="border left-5 primary p-05 pl-2 mb-2">
                                        Deskripsi
                                    </div>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        onChange={(event, editor) => {
                                            let value = editor.getData();
                                            setDescription(value);
                                        }}
                                    />
                                    <div className="border left-5 primary p-05 pl-2 mb-2 mt-2">
                                        Syarat dan Ketentuan
                                    </div>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        onChange={(event, editor) => {
                                            let value = editor.getData();
                                            setSnk(value);
                                        }}
                                    />
                                </div>
                            }
                            {
                                basicInfoTab === 'settings' &&
                                <div className="mt-2">
                                    <div className="flex row item-center">
                                        <div className="flex column w-50">
                                            <div className="text bold">Visibilitas</div>
                                            <div className="text muted small">Bagaimana eventmu akan ditampilkan</div>
                                        </div>
                                        <div className="flex row w-50 border primary rounded p-05">
                                            <div className={`flex row item-center justify-center pointer rounded grow-1 h-40 ${visibility === 'public' ? 'bg-primary' : ''}`} onClick={e => setVisibility('public')}>
                                                Public
                                            </div>
                                            <div className={`flex row item-center justify-center pointer rounded grow-1 h-40 ${visibility === 'private' ? 'bg-primary' : ''}`} onClick={e => setVisibility('private')}>
                                                Private
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex row item-center mt-3">
                                        <div className="flex column w-50">
                                            <div className="text bold">Penyelenggaraan</div>
                                            <div className="text muted small">Bagaimana eventmu akan diselenggarakan</div>
                                        </div>
                                        <div className="flex row w-50 border primary rounded p-05">
                                            <div className={`flex row item-center justify-center pointer rounded grow-1 h-40 ${execution === 'offline' ? 'bg-primary' : ''}`} onClick={e => setExecution('offline')}>
                                                Offline
                                            </div>
                                            <div className={`flex row item-center justify-center pointer rounded grow-1 h-40 ${execution === 'hybrid' ? 'bg-primary' : ''}`} onClick={e => setExecution('hybrid')}>
                                                Hybrid
                                            </div>
                                            <div className={`flex row item-center justify-center pointer rounded grow-1 h-40 ${execution === 'online' ? 'bg-primary' : ''}`} onClick={e => setExecution('online')}>
                                                Online
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex row mt-3">
                                        <div className="flex column w-50">
                                            <div className="text bold">Breakdown</div>
                                            <div className="text muted small">Informasi tambahan yang sesuai dengan kebutuhanmu</div>
                                        </div>
                                        <div className="flex row wrap gap-20 w-50">
                                            <div className={`flex row item-center grow-1 basis-2 p-1 bordered rounded pointer transparent bg-primary`}>
                                                <BiCameraMovie size={30} />
                                                <div className="ml-2 text small">Stage & Sessions</div>
                                            </div>
                                            <div className={`flex row item-center grow-1 basis-2 p-1 bordered rounded pointer transparent ${InArray('sponsor', breakdowns) ? 'bg-primary': ''}`} onClick={e => chooseBreakdown('sponsor')}>
                                                <BiTv size={30} />
                                                <div className="ml-2 text small">Sponsor</div>
                                            </div>
                                            <div className={`flex row item-center grow-1 basis-2 p-1 bordered rounded pointer transparent ${InArray('exhibitor', breakdowns) ? 'bg-primary': ''}`} onClick={e => chooseBreakdown('exhibitor')}>
                                                <BiChalkboard size={30} />
                                                <div className="ml-2 text small">Exhibitor</div>
                                            </div>
                                            <div className={`flex row item-center grow-1 basis-2 p-1 bordered rounded pointer transparent ${InArray('media_partner', breakdowns) ? 'bg-primary': ''}`} onClick={e => chooseBreakdown('media_partner')}>
                                                <BiIdCard size={30} />
                                                <div className="ml-2 text small">Media Partner</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="h-100"></div>
                </div>
            }
            
            <BottomNavigation 
                title={steps[stepIndex].title} 
                description={steps[stepIndex].description} 
                next={nextStep} prev={prevStep}
            />

            {
                errorMessage !== "" &&
                <Popup onDismiss={() => closeError()} width="35%">
                    <div className="flex row justify-center">
                        <div className="h-100 ratio-1-1 flex row item-center justify-center rounded-max bg-red transparent">
                            <BiError size={46} />
                        </div>
                    </div>
                    <div className="w-100 text center mt-3">
                        {errorMessage}
                    </div>
                    <div className="w-100 text center small pointer primary mt-2" onClick={closeError}>
                        Tutup
                    </div>
                </Popup>
            }

            {
                locationModalVisible &&
                <Popup onDismiss={() => setLocationModalVisible(false)}>
                    <div className="flex row item-center">
                        <h3 className="flex grow-1 m-0">Pilih Lokasi</h3>
                        <div className="h-50 rounded-max ratio-1-1 bg-grey pointer flex row item-center justify-center" onClick={() => setLocationModalVisible(false)}>
                            <BiX />
                        </div>
                    </div>

                    <form onSubmit={e => saveLocation(e)}>
                        <div className="flex row item-center gap-20 mt-2">
                            <div className="flex column grow-1 basis-2">
                                {
                                    provinces.length > 0 ?
                                        <div className="group">
                                            <MXDropdown options={provinces} value={province} setValue={setProvinceID} onChange={value => {
                                                setProvince(value);
                                                setProvinceID(value.province_id);
                                                setLoadingCities(true);
                                                setErrorMessage('');
                                            }} config={{
                                                multiple: false,
                                                with_search: true,
                                                key: 'province',
                                                label: 'Provinsi',
                                                placeholder: "Pilih Provinsi"
                                            }} />
                                        </div>
                                    : 'Memuat data provinsi...'
                                }
                            </div>
                            {
                                provinceID !== null && cities.length === 0 ?
                                    <div className="text">Memuat data kota...</div>
                                :
                                cities.length > 0 &&
                                    <div className="flex column grow-1 basis-2">
                                        <div className="group">
                                            <MXDropdown options={cities} value={city} setValue={setCity} onChange={value => {
                                                    setCityID(value.city_id);
                                                    setErrorMessage('');
                                                }} 
                                                config={{
                                                    multiple: false,
                                                    with_search: true,
                                                    key: 'city',
                                                    label: 'Kota',
                                                    placeholder: "Pilih Provinsi"
                                                }}
                                            />
                                        </div>
                                    </div>
                            }
                        </div>

                        <div className="group">
                            <textarea id="address" onInput={e => typing(e, setAddress)} value={address}></textarea>
                            <label htmlFor="address">Alamat Lengkap :</label>
                        </div>

                        {
                            errorMessage !== "" &&
                            <div className="text small p-1 pl-2 pr-2 rounded bg-red transparent">
                                {errorMessage}
                            </div>
                        }
                        <button className="mt-3 w-100 primary">Simpan</button>
                    </form>
                </Popup>
            }
            {
                dateModalVisible &&
                <Popup onDismiss={() => setDateModalVisible(false)}>
                    <div className="flex row item-center">
                        <h3 className="flex grow-1 m-0">Pilih Tanggal dan Waktu</h3>
                        <div className="h-50 rounded-max ratio-1-1 bg-grey pointer flex row item-center justify-center" onClick={() => setDateModalVisible(false)}>
                            <BiX />
                        </div>
                    </div>
                </Popup>
            }
            {
                organizerModalVisible &&
                <Popup onDismiss={() => setOrganizerModalVisible(false)} width="40%">
                    <div className="flex row item-center">
                        <h3 className="flex grow-1 m-0">Pilih Organizer</h3>
                        <div className="h-50 rounded-max ratio-1-1 bg-grey pointer flex row item-center justify-center" onClick={() => setOrganizerModalVisible(false)}>
                            <BiX />
                        </div>
                    </div>

                    {
                        organizers.map((org, o) => (
                            <div className="mt-2 bordered rounded pointer p-1 flex row item-center" key={o} onClick={() => {
                                setOrganizer(org);
                                setOrganizerModalVisible(false);
                            }}>
                                <img
                                    src={
                                        org.icon === null ?
                                            '/images/default_organizer_logo.png'
                                        :
                                            `${config.baseUrl}/storage/organizer_icons/${org.icon}`
                                    }
                                    alt={org.name}
                                    className="h-50 ratio-1-1 rounded-max"
                                />
                                <div className="ml-2">
                                    {org.name}
                                </div>
                            </div>
                        ))
                    }
                </Popup>
            }
        </>
    )
}

export default CreateEvent;
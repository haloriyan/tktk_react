import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiEdit, BiTrash, BiX } from "react-icons/bi";
import { FaPlus, FaRandom } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import 'flatpickr/dist/themes/material_red.css';

import FAB from "../../components/FAB";
import Header from "../../components/Header";
import Popup from "../../components/Popup";
import SidebarEvent from "../../components/SidebarEvent";
import Squarize from "../../components/Squarize";
import config from "../../config";
import moment from "moment";
import Currency from "../../components/Currency";

const EventDiscount = () => {
    const { slug } = useParams();
    const [user, setUser] = useState(null);
    const [event, setEvent] = useState(null);
    const [discounts, setDiscounts] = useState([]);
    const [discount, setDiscount] = useState(null);

    const [message, setMessage] = useState({
        status: 200,
        body: ''
    });

    const [code, setCode] = useState('');
    const [type, setType] = useState('percentage');
    const [amount, setAmount] = useState('0');
    const [quantity, setQuantity] = useState('0');
    const [expiration, setExpiration] = useState(new Date());

    const [isLoading, setLoading] = useState(true);
    const [isAdding, setAdding] = useState(false);
    const [isDeleting, setDeleting] = useState(false);
    const [isEditing, setEditing] = useState(false);

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
        Squarize();
    }, [user]);

    useEffect(() => {
        if (isLoading) {
            setLoading(false);
            axios.post(`${config.baseUrl}/api/organizer/event/${slug}/discount`)
            .then(response => {
                let res = response.data;
                setDiscounts(res.discounts);
                setEvent(res.event);
            })
        }
    }, [isLoading, slug])

    const submit = e => {
        axios.post(`${config.baseUrl}/api/organizer/event/${slug}/discount/create`, {
            event_id: event.id,
            code: code,
            amount: amount,
            quantity: quantity,
            type: type,
            expiration: expiration
        })
        .then(response => {
            let res = response.data;
            setMessage({status: res.status, body: res.message});
            setLoading(true);
            setAdding(false);
            setCode('');
            setAmount('0');
            setQuantity('0');
            setType('percentage');
            setExpiration(new Date());
        })
        e.preventDefault();
    }
    const edit = e => {
        e.preventDefault();
        axios.post(`${config.baseUrl}/api/organizer/event/${slug}/discount/update`, {
            id: discount.id,
            code: code,
        })
        .then(response => {
            let res = response.data;
            setMessage({status: res.status, body: res.message});
            setCode('');
            setLoading(true);
            setEditing(false);
        })
    }
    const del = () => {
        axios.post(`${config.baseUrl}/api/organizer/event/${slug}/discount/delete`, {
            id: discount.id
        })
        .then(response => {
            let res = response.data;
            setMessage({status: res.status, body: res.message});
            setLoading(true);
            setDeleting(false);
        })
    }

    const generateRandomCode = (limit = 6) => {
        let generated = "";
        let templateLetter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let templateNumber = '0123456789';
        let letters = templateLetter.split('');
        let numbers = templateNumber.split('');
        for (let i = 0; i < (limit / 2); i++) {
            generated += letters[Math.floor(Math.random() * (letters.length - 1))]
        }
        for (let i = 0; i < (limit / 2); i++) {
            generated += numbers[Math.floor(Math.random() * (numbers.length - 1))]
        }
        setCode(generated);
        return generated;
    }

    return (
        <>
            <Header />
            <SidebarEvent active="discount" />
            <div className="content p-4">
                <h2 className="text bigger mt-0">Kode Promo</h2>

                {
                    message.body !== "" &&
                    <div className={`${message.status === 200 ? 'bg-green' : 'bg-red'} transparent rounded p-2 mb-2`}>
                        {message.body}
                    </div>
                }

                <table>
                    <thead>
                        <tr>
                            <th>Kode</th>
                            <th>Nominal</th>
                            <th>Ketersediaan</th>
                            <th>Berlaku Hingga</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            discounts.map((disc, d) => (
                                <tr key={d}>
                                    <td>{disc.code}</td>
                                    <td>
                                        {
                                            disc.discount_type === 'percentage' ?
                                                `${disc.amount}%`
                                            :
                                                Currency(disc.amount).encode()
                                        }
                                    </td>
                                    <td>
                                        {disc.quantity}
                                        <div className="text muted small">
                                            Digunakan {disc.start_quantity - disc.quantity}x
                                        </div>
                                    </td>
                                    <td>{moment(disc.expiration).format('DD MMM Y')}</td>
                                    <td>
                                        <span className="pointer bg-green transparent rounded p-05 pl-2 pr-2" onClick={e => {
                                            setDiscount(disc);
                                            setCode(disc.code);
                                            setEditing(true);
                                        }}>
                                            <BiEdit />
                                        </span>
                                        <span className="pointer bg-red transparent rounded p-05 pl-2 pr-2 ml-1" onClick={e => {
                                            setDiscount(disc);
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
                <FAB icon={<FaPlus color="#fff" />} onClick={e => setAdding(true)} />
            }

            {
                isDeleting &&
                <Popup onDismiss={() => setDeleting(false)}>
                    <h3 className="mt-0 text big">Hapus Kode Promo</h3>
                    <div>
                        Yakin ingin menghapus kode promo {discount.title}? Tindakan ini tidak dapat dibatalkan
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
                        <h3 className="m-0 text big flex grow-1">Ubah Kode Promo</h3>
                    </div>
                    <form action="#" onSubmit={edit}>
                        <div className="flex row">
                            <div className="group flex column grow-1">
                                <input type="text" id="code_add" value={code} />
                                <label htmlFor="code_add">Kode :</label>
                            </div>
                            <div className="border primary text rounded h-50 squarize use-height mt-2 ml-1 pointer flex row item-center justify-center" onClick={() => generateRandomCode()}>
                                <FaRandom />
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
                        <h3 className="m-0 text big flex grow-1">Buat Kode Promo</h3>
                        <div className="bg-grey pointer h-50 squarize rounded-max use-height flex row item-center justify-center" onClick={() => setAdding(false)}>
                            <BiX />
                        </div>
                    </div>
                    <form action="#" onSubmit={submit}>
                        <div className="flex row">
                            <div className="group flex column grow-1">
                                <input type="text" id="code_add" value={code} />
                                <label htmlFor="code_add">Kode :</label>
                            </div>
                            <div className="border primary text rounded h-50 squarize use-height mt-2 ml-1 pointer flex row item-center justify-center" onClick={() => generateRandomCode()}>
                                <FaRandom />
                            </div>
                        </div>

                        <div className="flex row">
                            <div className="flex column grow-1 mr-1">
                                <div className="group">
                                    <select id="type" onChange={e => setType(e.currentTarget.value)}>
                                        <option value="percentage">Persentase</option>
                                        <option value="nominal">Nominal</option>
                                    </select>
                                    <label htmlFor="type" className="active">Tipe Diskon :</label>
                                </div>
                            </div>
                            <div className="flex column grow-1 ml-1">
                                <div className="group">
                                    <input type="text" id="amount" onChange={e => setAmount(e.currentTarget.value)} />
                                    <label htmlFor="amount">Jumlah Potongan ({type === 'percentage' ? '%' : 'Rp'}) :</label>
                                </div>
                            </div>
                        </div>

                        <div className="group">
                            <Flatpickr
                                data-enable-time
                                options={{
                                    dateFormat: 'Y-m-d H:m',
                                    time_24hr: true,
                                    maxDate: event.end_date,
                                    enableTime: true,
                                }}
                                onChange={([date]) => {
                                    setExpiration(moment(date).format('Y-MM-DD HH:mm'));
                                }}
                            />
                            <label className="active">Berlaku hingga :</label>
                        </div>

                        <div className="group">
                            <input type="number" id="quantity" onChange={e => setQuantity(e.currentTarget.value)} />
                            <label htmlFor="quantity">Ketersediaan :</label>
                        </div>

                        <button className="w-100 mt-3 primary">Submit</button>
                    </form>
                </Popup>
            }
        </>
    )
}

export default EventDiscount;
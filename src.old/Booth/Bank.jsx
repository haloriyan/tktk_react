import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SidebarBooth from "../components/SidebarBooth";
import Squarize from "../components/Squarize";
import axios from "axios";

import config from "../config";
// import * as theBanks from "../components/Banks";
import { useParams } from "react-router-dom";
import FAB from "../components/FAB";
import { BiEdit, BiPlus, BiTrash, BiX } from "react-icons/bi";
import Popup from "../components/Popup";
import MXDropdown from "../components/MXDropdown";

const BoothBank = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState({
        status: 200,
        body: ''
    });
    const [banks, setBanks] = useState([]);
    const [bank, setBank] = useState(null);
    const [bankDropdown, setBankDropdown] = useState(null);

    const [bankName, setBankName] = useState('');
    const [bankCode, setBankCode] = useState('');
    const [accountName, setAccountName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');

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
        if (isLoading && user !== null) {
            setLoading(false);
            axios.post(`${config.baseUrl}/api/booth/${id}/bank`, {
                token: user.token,
            })
            .then(response => {
                let res = response.data;
                setBanks(res.banks);
            })
        }
    }, [isLoading, user, id])

    const getFromTheBank = code => {
        let toReturn = null;
        // theBanks.banks.map(thb => {
        //     if (thb.code === code) {
        //         toReturn = thb;
        //     }
        //     return null;
        // });
        return toReturn;
    }

    const submit = e => {
        axios.post(`${config.baseUrl}/api/booth/${id}/bank/create`, {
            token: user.token,
            bank_name: bankName,
            bank_code: bankCode,
            account_name: accountName,
            account_number: accountNumber
        })
        .then(response => {
            let res = response.data;
            setMessage({status: res.status, body: res.message});
            setLoading(true);
            setAdding(false);
            setAccountName('');
            setAccountNumber('');
            setBankName('');
            setBankCode('');
        })
        e.preventDefault();
    }

    const edit = e => {
        axios.post(`${config.baseUrl}/api/booth/${id}/bank/update`, {
            token: user.token,
            id: bank.id,
            account_name: accountName,
            account_number: accountNumber
        })
        .then(response => {
            let res = response.data;
            setMessage({status: res.status, body: res.message});
            setLoading(true);
            setEditing(false);
        })
        e.preventDefault();
    }

    const del = () => {
        axios.post(`${config.baseUrl}/api/booth/${id}/bank/delete`, {
            token: user.token,
            id: bank.id,
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
            <SidebarBooth active="bank-account" />
            <div className="content p-4">
                <div className="flex row wrap gap-20">
                    {
                        banks.map((ban, b) => (
                            <div className="flex column grow-1 basis-4 rounded bordered relative" key={b}>
                                <img src={getFromTheBank(ban.bank_code).image} alt={ban.bank_name} className="w-100 ratio-16-9 rounded" />
                                <div className="p-2">
                                    <div className="text bold">{ban.account_number}</div>
                                    <div className="text muted small">{ban.account_name}</div>
                                </div>

                                <div className="absolute top-0 right-0 m-1 hover-to-show flex row">
                                    <div className="bg-green p-05 pl-2 pr-2 rounded pointer mr-1" onClick={e => {
                                        setBank(ban);
                                        setAccountName(ban.account_name);
                                        setAccountNumber(ban.account_number);
                                        setEditing(true);
                                    }}>
                                        <BiEdit />
                                    </div>
                                    <div className="bg-red p-05 pl-2 pr-2 rounded pointer" onClick={e => {
                                        setBank(ban);
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

            <FAB icon={<BiPlus color="#fff" />} onClick={() => setAdding(true)} />

            {
                isDeleting &&
                <Popup onDismiss={() => setDeleting(false)}>
                    <h3 className="mt-0 text big">Hapus Produk</h3>
                    <div>
                        Yakin ingin menghapus rekening {bank.bank_name} atas nama {bank.account_name}? Tindakan ini tidak dapat dibatalkan
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
                        <h3 className="mt-0 text big flex grow-1">Ubah Data Rekening</h3>
                        <div className="h-40 bg-grey rounded-max flex row item-center justify-center squarize use-height pointer" onClick={() => setEditing(false)}>
                            <BiX />
                        </div>
                    </div>
                    <form action="#" onSubmit={edit}>
                        <div className="flex row gap-20">
                            <div className="group flex column grow-1">
                                <input type="text" id="account_name" value={accountName} onInput={e => setAccountName(e.currentTarget.value)} required />
                                <label htmlFor="account_name">Nama pemilik :</label>
                            </div>
                            <div className="group flex column grow-1">
                                <input type="text" id="account_number" value={accountNumber} onInput={e => setAccountNumber(e.currentTarget.value)} required />
                                <label htmlFor="account_number">Nomor Rekening :</label>
                            </div>
                        </div>

                        <button className="primary w-100 mt-3">Simpan Perubahan</button>
                    </form>
                </Popup>
            }
            {
                isAdding &&
                <Popup onDismiss={() => setAdding(false)}>
                    <div className="flex row item-center">
                        <h3 className="mt-0 text big flex grow-1">Tambah Rekening Bank</h3>
                        <div className="h-40 bg-grey rounded-max flex row item-center justify-center squarize use-height pointer" onClick={() => setAdding(false)}>
                            <BiX />
                        </div>
                    </div>

                    <form action="#" onSubmit={submit} className="mt-2">
                        {/* <MXDropdown options={theBanks.banks} value={bankDropdown} config={{with_search: true,key: 'name',label: 'Bank :'}} setValue={setBankDropdown} child={(item, choose, isActive) => (
                            <div className={`InDropdownArea h-40 pl-2 pr-2 flex row item-center pointer transparent ${isActive ? 'bg-primary' : ''}`} onClick={() => choose(item)}>
                                <img src={item.image} alt={item.code} className="ratio-16-9 rounded h-40" />
                                {item.name}
                            </div>
                        )} input={(value) => (
                            <div className="flex row item-center InDropdownArea">
                                <img src={value.image} alt={value.code} className="h-40 ratio-16-9" />
                                <div className="ml-1">{value.name}</div>
                            </div>
                        )} onChange={value => {
                            setBankName(value.name);
                            setBankCode(value.code);
                        }}
                        /> */}
                        <div className="flex row gap-20">
                            <div className="group flex column grow-1">
                                <input type="text" id="account_name" value={accountName} onInput={e => setAccountName(e.currentTarget.value)} required />
                                <label htmlFor="account_name">Nama pemilik :</label>
                            </div>
                            <div className="group flex column grow-1">
                                <input type="text" id="account_number" value={accountNumber} onInput={e => setAccountNumber(e.currentTarget.value)} required />
                                <label htmlFor="account_number">Nomor Rekening :</label>
                            </div>
                        </div>

                        <button className="primary w-100 mt-3">Submit</button>
                    </form>
                </Popup>
            }
        </>
    )
}

export default BoothBank;
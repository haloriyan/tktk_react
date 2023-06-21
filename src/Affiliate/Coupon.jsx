import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import config from "../config";
import LeftMenu from "./LeftMenu";
import Header from "./Header";
import FAB from "../components/FAB";
import { BiDice1, BiDice6, BiMinus, BiPlus } from "react-icons/bi";
import Popup from "../components/Popup";
import Currency from "../components/Currency";

const AffiliateCoupon = () => {
    const [isLoading, setLoading] = useState(true);
    const [affiliator, setAffiliator] = useState(null);
    const [coupons, setCoupons] = useState([]);
    const [packages, setPackages] = useState([]);
    const [coupon, setCoupon] = useState(null);
    const [estimation, setEstimation] = useState('0');
    const [afterDiscount, setAfterDiscount] = useState(null);

    const [code, setCode] = useState('');
    const [amount, setAmount] = useState(0);
    const [paket, setPaket] = useState('');

    const [isAdding, setAdding] = useState(false);
    const [isDeleting, setDeleting] = useState(false);

    useEffect(() => {
        if (affiliator === null) {
            let myData = JSON.parse(window.localStorage.getItem('affiliator_data'));
            setAffiliator(myData);
        }
    }, [affiliator]);

    useEffect(() => {
        if (isLoading && affiliator !== null) {
            setLoading(false);
            axios.post(`${config.baseUrl}/api/affiliate/coupon`, {
                token: affiliator.token,
            })
            .then(response => {
                let res = response.data;
                setPackages(res.packages);
                setCoupons(res.coupons);
            })
        }
    }, [isLoading, affiliator]);

    const submit = e => {
        axios.post(`${config.baseUrl}/api/affiliate/coupon/create`, {
            code, amount
        })
        .then(response => {
            let res = response.data;
            setAdding(false);
            setLoading(true);
        })
        e.preventDefault();
    }

    const doDelete = () => {
        axios.post(`${config.baseUrl}/api/affiliate/coupon/create`, {
            code, amount
        })
        .then(response => {
            let res = response.data;
            setCoupon(null);
            setLoading(true);
            setDeleting(false);
        })
    }

    useEffect(() => {
        let aD = paket.price_yearly - (amount / 100 * paket.price_yearly);
        let est = 20 / 100 * aD;
        setEstimation(est);
        setAfterDiscount(aD);
    }, [amount, paket]);

    const amountSetter = action => {
        if (action === 'increase') {
            if (amount < 20) {
                setAmount(amount + 1);
            }
        } else {
            if (amount > 1) {
                setAmount(amount - 1);
            }
        }
    }

    return (
        <>
            <LeftMenu active="coupon" user={affiliator} />
            <Header title="Kupon Saya" />
            <div className="absolute left-20 right-0 p-3" style={{top: 70}}>
                {JSON.stringify(packages)}
            </div>

            <FAB icon={<BiPlus color="#fff" />} color="#00355f" onClick={() => {
                setAdding(true);
            }} />

            {
                isAdding &&
                <Popup onDismiss={() => setAdding(false)} width="35%">
                    <div className="flex row item-center">
                        <h3 className="m-0 flex grow-1">Buat Kupon Baru</h3>
                        <div className="text secondary small pointer" onClick={() => setAdding(false)}>tutup</div>
                    </div>

                    <form onSubmit={submit} className="mt-3">
                        <div className="group">
                            <select id="package_id" onChange={e => {
                                setPaket(JSON.parse(e.currentTarget.value));
                            }} required>
                                <option value="">-- Pilih Paket --</option>
                                {
                                    packages.map((pack, p) => {
                                        if (pack.price_yearly > 0) return (
                                            <option value={JSON.stringify(pack)} key={p}>
                                                {pack.name} ({Currency(pack.price_yearly).encode()} / tahun)
                                            </option>
                                        )
                                    })
                                }
                            </select>
                            <label htmlFor="package_id" className="active">Untuk Paket :</label>
                        </div>
                        <div className="flex row item-center">
                            <div className="group flex column grow-1 mr-2">
                                <input type="text" id="code" value={code} onChange={e => setCode(e.currentTarget.value)} required />
                                <label htmlFor="code">Kode Promo :</label>
                            </div>
                            <div className="flex ml-2 bordered rounded pointer h-50 ratio-1-1 centerize mt-05">
                                <BiDice6 size={24} />
                            </div>
                        </div>
                        <div className="flex row item-center mt-2 gap-20">
                            <div className="bordered rounded pointer h-50 ratio-1-1 centerize" onClick={() => {
                                amountSetter('decrease');
                            }}>
                                <BiMinus size={24} />
                            </div>
                            <div className="flex column grow-1 centerize">
                                <div className="text small muted">Besaran Diskon :</div>
                                <div className="text size-24">{amount}%</div>
                            </div>
                            <div className="bordered rounded pointer h-50 ratio-1-1 centerize" onClick={() => {
                                amountSetter('increase');
                            }}>
                                <BiPlus size={24} />
                            </div>
                        </div>

                        {
                            estimation !== null &&
                            <div className="flex row item-center gap-20 text small mt-2">
                                <div className="flex grow-1">
                                    <div>Anda mendapatkan</div>
                                    <div className="text bold ml-05">{Currency(estimation).encode()}</div>
                                </div>
                                <div className="flex grow-1">
                                    <div>Klien membayar</div>
                                    <div className="text bold ml-05">{Currency(afterDiscount).encode()}</div>
                                </div>
                            </div>
                        }

                        <button className="mt-3 secondary w-100">Buat</button>
                    </form>
                </Popup>
            }
        </>
    )
}

export default AffiliateCoupon;
import React, { useEffect, useState } from "react";
import LeftMenu from "./LeftMenu";
import Header from "./Header";
import Currency from "../components/Currency";
import banks from "../components/Banks";
import { BiCreditCard, BiTime, BiX } from "react-icons/bi";
import axios from "axios";
import config from "../config";
import Popup from "../components/Popup";
import moment from "moment";

const Label = ({status}) => {
    return (
        <div className={`rounded p-1 pl-2 pr-2 text bold size-12 ${status === 'PENDING' ? 'bg-yellow black' : 'bg-green white'}`}>
            {status.toUpperCase()}
        </div>
    )
}

const AffiliateReport = () => {
    const [affiliator, setAffiliator] = useState(null);
    const [myBanks, setMyBanks] = useState([]);
    const [revenue, setRevenue] = useState(0);
    const [balance, setBalance] = useState(0);
    const [usages, setUsages] = useState([]);
    const [withdraws, setWithdraws] = useState([]);
    const [withdraw, setWithdraw] = useState(null);

    const [isLoading, setLoading] = useState(true);
    const [isWithdrawing, setWithdrawing] = useState(false);
    const [showWithdraw, setShowWithdraw] = useState(false);

    const [amount, setAmount] = useState(0);
    const [accountName, setAccountName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [bank, setBank] = useState(null);

    useEffect(() => {
        if (affiliator === null) {
            let myData = JSON.parse(window.localStorage.getItem('affiliator_data'));
            setAffiliator(myData);
        }
    }, [affiliator])

    useEffect(() => {
        if (isLoading && affiliator !== null) {
            setLoading(false);
            axios.post(`${config.baseUrl}/api/affiliate/report`, {
                token: affiliator.token,
            })
            .then(response => {
                let res = response.data;
                setRevenue(res.revenue);
                setUsages(res.usages);
                setBalance(res.balance);
                setWithdraws(res.withdraws);
            })
        }
    }, [isLoading, affiliator]);

    const doWithdraw = (e) => {
        if (balance < 100000) {
            return false;
        }
        axios.post(`${config.baseUrl}/api/affiliate/withdraw`, {
            token: affiliator.token,
            bank_code: bank.code,
            bank_name: bank.name,
            account_name: accountName,
            account_number: accountNumber,
        })
        .then(response => {
            let res = response.data;
            setLoading(true);
            setWithdrawing(false);
        })
        e.preventDefault();
    }

    return (
        <>
            <LeftMenu active="report" user={affiliator} />
            <Header title="Report" />
            <div className="absolute left-20 right-0 p-4" style={{top: 70}}>
                <div className="flex row item-center gap-20">
                    <div className="flex column grow-1">
                        <div className="text size-12">Saldo</div>
                        <div className="text size-32 bold mt-05">{Currency(balance).encode()}</div>
                    </div>
                    <button className="primary" style={{backgroundColor: '#00355f'}} onClick={() => setWithdrawing(true)}>Withdraw</button>
                </div>

                <div className="h-50"></div>

                <div className="flex row gap-40">
                    <div className="flex column w-50">
                        <div className="text size-14 mb-2">Penggunaan Kupon Saya</div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Kode Kupon</th>
                                    <th>User</th>
                                    <th>Pendapatan</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    usages.map((usage, u) => (
                                        <tr key={u}>
                                            <td>{usage.coupon.promo_code}</td>
                                            <td>{usage.user.name}</td>
                                            <td>{Currency(usage.revenue).encode()}</td>
                                        </tr>
                                    ))
                                }
                                <tr>
                                    <th colSpan={2}>Total</th>
                                    <th>{Currency(revenue).encode()}</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="flex column grow-1">
                        <div className="text size-14">Riwayat Withdraw</div>

                        <div className="flex column gap-20 mt-2">
                            {
                                withdraws.map((wd, w) => (
                                    <div className="flex row item-center gap-20 pointer" key={w} onClick={() => {
                                        setWithdraw(wd);
                                        setShowWithdraw(true);
                                    }}>
                                        {
                                            banks.va.map((item, i) => {
                                                if (item.code === wd.bank_code) {
                                                    return <img src={item.image} alt={item.code} className="h-60 rounded ratio-16-9" />
                                                }
                                            })
                                        }
                                        
                                        <div className="flex column grow-1">
                                            <div className="text bold size-16">{Currency(wd.amount).encode()}</div>
                                            <div className="text size-12 flex row item-center gap-5 mt-05">
                                                <BiCreditCard size={14} />
                                                {wd.account_name}
                                            </div>
                                            <div className="text size-12 flex row item-center gap-5 mt-05">
                                                <BiTime size={14} />
                                                {moment(wd.created_at).format('D MMM Y, HH:mm')}
                                            </div>
                                        </div>

                                        <Label status={wd.status} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>

            {
                isWithdrawing &&
                <Popup onDismiss={() => setWithdrawing(false)}>
                    <div className="flex row item-center gap-2">
                        <h3 className="flex grow-1 m-0">Tarik Dana</h3>
                        <div className="h-40 ratio-1-1 rounded-max flex centerize border pointer" onClick={() => setWithdrawing(false)}>
                            <BiX />
                        </div>
                    </div>

                    <div className="text center size-14 mt-4">Nominal yang akan ditarik</div>
                    <div className="text center size-24 mt-1 mb-1">{Currency(balance).encode()}</div>

                    <div className="w-100 bg-grey mt-2 mb-2" style={{height: 1}}></div>

                    <form action="#" onSubmit={doWithdraw}>
                        <div className="group">
                            <select name="bank" id="bank" required onChange={e => {
                                let val = JSON.parse(e.currentTarget.value);
                                setBank(val);
                            }}>
                                <option value="">-- PILIH BANK --</option>
                                {
                                    banks.va.map((item, i) => (
                                        <option key={i} value={JSON.stringify(item)}>{item.name}</option>
                                    ))
                                }
                            </select>
                            <label htmlFor="bank" className="active">Pilih Bank :</label>
                        </div>
                        <div className="flex row item-center gap-20">
                            <div className="flex column grow-1">
                                <div className="group">
                                    <input type="text" id="account_number" value={accountNumber} onInput={e => setAccountNumber(e.currentTarget.value)} />
                                    <label htmlFor="account_number">No. Rekening</label>
                                </div>
                            </div>
                            <div className="flex column grow-1">
                                <div className="group">
                                    <input type="text" id="account_name" value={accountName} onInput={e => setAccountName(e.currentTarget.value)} />
                                    <label htmlFor="account_name">Atas Nama</label>
                                </div>
                            </div>
                        </div>

                        <button className="w-100 mt-3 primary" type={balance >= 100000 ? 'submit' : 'button'} style={{
                            backgroundColor: '#00355f',
                            opacity: balance >= 100000 ? 1 : 0.3,
                        }}>Tarik Dana</button>
                    </form>

                    {
                        balance <= 100000 &&
                        <div className="bg-red p-1 pl-2 pr-2 rounded mt-2">
                            Anda dapat melakukan penarikan minimal {Currency(100000).encode()}
                        </div>
                    }
                </Popup>
            }

            {
                showWithdraw &&
                <Popup onDismiss={() => setShowWithdraw(false)}>
                    <div className="flex row item-center gap-2">
                        <h3 className="flex grow-1 m-0">Withdrawal #{moment(withdraw.created_at).format('DMMHHmm')}</h3>
                        <Label status={withdraw.status} />
                    </div>

                    <div className="text center size-14 mt-3">Nominal</div>
                    <div className="text center size-24 bold mt-1">{Currency(withdraw.amount).encode()}</div>

                    <div className="flex row item-center gap-20 mt-3">
                        <div className="flex column grow-1">
                            <div className="text size-12">Bank</div>
                            <div className="text size-18 bold mt-05">{withdraw.bank_name}</div>
                        </div>
                        {
                            banks.va.map((item, i) => {
                                if (item.code === withdraw.bank_code) {
                                    return <img src={item.image} alt={item.code} className="h-60 rounded ratio-16-9" />
                                }
                            })
                        }
                    </div>
                    <div className="flex row gap-20 mt-2">
                        <div className="flex column grow-1">
                            <div className="text size-12">No. Rekening</div>
                            <div className="text size-18 bold mt-05">{withdraw.account_number}</div>
                        </div>
                        <div className="flex column grow-1">
                            <div className="text size-12">Atas Nama</div>
                            <div className="text size-18 bold mt-05">{withdraw.account_name}</div>
                        </div>
                    </div>

                    {
                        withdraw.status === "PAID" ?
                        <a href="#" target="_blank">
                            <button className="w-100 primary mt-4">
                                Lihat Bukti Transaksi
                            </button>
                        </a>
                        :
                        <div className="mt-5"></div>
                    }
                    <div className="pointer text center size-14 mt-2" onClick={() => setShowWithdraw(false)}>
                        Tutup
                    </div>
                </Popup>
            }
        </>
    )
}

export default AffiliateReport;
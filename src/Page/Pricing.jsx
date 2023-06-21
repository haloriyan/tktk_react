import React, { useEffect, useState } from "react";
import styles from "../styles/Page/Pricing.module.css";
import Header from "./Partials/Header";
import Footer from "./Partials/Footer";
import axios from "axios";
import config, { colors } from "../config";
import Currency from "../components/Currency";
import { BiCheck, BiX } from "react-icons/bi";

const Mark = ({checked = true}) => {
    return (
        <div className={`h-20 rounded-max ratio-1-1 centerize ${checked ? 'bg-green' : 'bg-grey'}`}>
            {
                checked ? <BiCheck /> : <BiX color={colors.red} />
            }
        </div>
    )
}

const PricingPage =() => {
    const [packages, setPackages] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [paymentTerm, setPaymentTerm] = useState('monthly');

    useEffect(() => {
        if (isLoading) {
            setLoading(false);
            axios.get(`${config.baseUrl}/api/package`)
            .then(response => {
                let res = response.data;
                console.log(res);
                setPackages(res.packages);
            })
        }
    }, [isLoading]);

    return (
        <>
            <Header parent="pricing" />
            <div className="absolute left-0 right-0" style={{top: 70}}>
                <div className="bg-white flex row item-center h-650 pl-4 pr-4">
                    <div className="flex column grow-1 w-50">
                        <div className="text small primary">Solusi &gt; Bandingkan Harga</div>
                        <h2 className="text size-46 mt-1">Kamu bisa mulai berjualan Online secara Gratis</h2>

                        <div className="flex ro">
                            <button className="primary">Download App</button>
                        </div>
                    </div>
                    <img src="/images/customer-relation.png" alt="Customer Relation" className="w-50" />
                </div>

                {
                    packages !== null &&
                    <div className="p-4 flex column item-center">
                        <div className={`flex row item-center ${styles.Switcher}`}>
                            <div className={`flex row centerize ${paymentTerm === 'monthly' ? styles.SwitchItemActive : styles.SwitchItem}`} onClick={() => setPaymentTerm('monthly')}>
                                Bulanan
                            </div>
                            <div className={`flex row centerize ${paymentTerm === 'yearly' ? styles.SwitchItemActive : styles.SwitchItem}`} onClick={() => setPaymentTerm('yearly')}>
                                Tahunan
                            </div>
                        </div>
                        <div className="flex row gap-20 w-100">
                            {
                                packages.map((pack, p) => (
                                    <div key={p} className={`rounded p-3 flex column grow-1 bg-white basis-3 ${p === 1 ? 'border border-3 primary ' : 'bordered'}`}>
                                        <div className="flex row item-center">
                                            <div className="flex column grow-1">
                                                <div className="text bold size-24">{Currency(pack[`price_${paymentTerm}`]).encode()}</div>
                                                <div className="text muted mt-05 small">
                                                    {paymentTerm === 'monthly' ? '/ bulan' : '/ tahun'}
                                                </div>
                                            </div>
                                            <div className="text size-20 bold primary">{pack.name}</div>
                                        </div>

                                        <div className="mt-2 flex column grow-1">
                                            <div className="flex row item-center">
                                                <div className="h-20 rounded-max ratio-1-1 bg-green centerize">
                                                    <BiCheck />
                                                </div>
                                                <div className="text small ml-2">
                                                    Jual {pack.product_count > 500 ? 'Unlimited' : pack.product_count } Produk
                                                </div>
                                            </div>
                                            <div className="flex row item-center mt-15">
                                                <div className="h-20 rounded-max ratio-1-1 bg-green centerize">
                                                    <BiCheck />
                                                </div>
                                                <div className="text small ml-2">
                                                    {pack.transaction_fee}% Komisi Transaksi
                                                </div>
                                            </div>
                                            <div className="flex row item-center mt-15">
                                                <Mark checked={pack.accent_color} />
                                                <div className="text small ml-2">
                                                    Sesuaikan Aksen Warna
                                                </div>
                                            </div>
                                            <div className="flex row item-center mt-15">
                                                <Mark checked={pack.remove_logo} />
                                                <div className="text small ml-2">
                                                    Hilangkan Logo Takotoko
                                                </div>
                                            </div>
                                            <div className="flex row item-center mt-15">
                                                <Mark checked={pack.download_report} />
                                                <div className="text small ml-2">
                                                    Download Report Berbentuk Excel
                                                </div>
                                            </div>
                                            <div className="flex row item-center mt-15">
                                                <Mark checked={pack.google_ads} />
                                                <div className="text small ml-2">
                                                    Integrasi Google Ads
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-2 pt-2 border top grey">
                                            <button className="h-40 primary p-0 w-100">Dapatkan</button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                }

                <Footer />
            </div>
        </>
    )
}

export default PricingPage;
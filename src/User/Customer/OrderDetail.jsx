import React, { useEffect, useState } from "react";
import BottomNav from "../../Partials/BottomNav";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../../config";
import banks from "../../components/Banks.js";
import LoadingScreen from "../../Partials/LoadingScreen";
import { MdExpand, MdExpandMore, MdMore } from "react-icons/md";

const CustomerOrderDetail = () => {
    const { username, code } = useParams();
    const [isLoading, setLoading] = useState(true);
    const [isLoadingStatus, setLoadingStatus] = useState(false);
    const [order, setOrder] = useState(null);
    const [user, setUser] = useState(null);
    const [method, setMethod] = useState(null);
    const [channel, setChannel] = useState(null);
    const [channelProperties, setChannelProperties] = useState(null);

    useEffect(() => {
        if (isLoading) {
            setLoading(false);
            axios.post(`${config.baseUrl}/api/user/${username}/customer/order/${code}`)
            .then(response => {
                let res = response.data;
                setOrder(res.order);
                setUser(res.order.user);
                setLoadingStatus(true);
            })
        }
    }, [isLoading]);

    useEffect(() => {
        if (isLoadingStatus && order.payment_method !== null) {
            setLoadingStatus(false);
            if (order.payment_method.toLowerCase() === "va") {
                axios.get(`${config.baseUrl}/api/payment/va/${order.payment_id}`)
                .then(response => {
                    let res = response.data;
                    console.log(res);
                })
            }
        }
    })

    const placeOrder = () => {
        axios.post(`${config.baseUrl}/api/user/${username}/customer/order/${code}/place`, {
            payments: `${method}|${channel}`,
            channel_properties: channelProperties
        })
        .then(response => {
            let res = response.data;
            console.log(res);
        })
    }

    return order === null ?
        <LoadingScreen />
    :
        <>
            <div className="content">
                <div className="flex row item-center">
                    <div className="flex column grow-1 mr-2">
                        <h2 className="m-0 mt-4">Detail Pesanan</h2>
                        <div className="text small muted mt-1">Kode : {code}</div>
                    </div>
                </div>

                <div className="h-40"></div>

                {
                    order.payment_method === null &&
                    <div>
                        <div className="border bottom h-70 flex row item-center pointer" onClick={() => setMethod('va')}>
                            <h4 className="m-0 flex grow-1 mr-2">Virtual Account</h4>
                            <div className="border primary rounded-max" style={{padding: 3,borderColor: method === 'va' ? user.accent_color : '#ddd'}}>
                                {
                                    <div className="h-15 rounded-max ratio-1-1" style={{background: method === 'va' ? user.accent_color : '#fff'}}></div>
                                }
                            </div>
                        </div>
                        {
                            method === 'va' &&
                            <div className="flex row wrap mt-1">
                                {
                                    banks.va.map((va, v) => (
                                        <div key={v} className="flex column basis-3 grow-1 pointer border rounded" style={{borderColor: channel === va.code ? user.accent_color : '#ffffff00'}} onClick={() => {
                                            setChannel(va.code);
                                        }}>
                                            <img src={va.image} alt={va.name} />
                                        </div>
                                    ))
                                }
                            </div>
                        }

                        <div className="border bottom h-70 flex row item-center pointer" onClick={() => setMethod('ewallet')}>
                            <h4 className="m-0 flex grow-1 mr-2">E-Wallet</h4>
                            <div className="border primary rounded-max" style={{padding: 3,borderColor: method === 'ewallet' ? user.accent_color : '#ddd'}}>
                                {
                                    <div className="h-15 rounded-max ratio-1-1" style={{background: method === 'ewallet' ? user.accent_color : '#fff'}}></div>
                                }
                            </div>
                        </div>
                        {
                            method === 'ewallet' &&
                            <div className="flex row wrap mt-1 wrap">
                                {
                                    banks.ewallet.map((va, v) => (
                                        <div key={v} className="flex column basis-3 grow-1 pointer border rounded" style={{borderColor: channel === va.code ? user.accent_color : '#ffffff00'}} onClick={() => {
                                            setChannel(va.code);
                                            if (va.code === 'id_ovo') {
                                                setChannelProperties('+62');
                                            }
                                        }}>
                                            <img src={va.image} alt={va.name} />
                                        </div>
                                    ))
                                }

                                {
                                    (channel === 'id_ovo' || channel === 'id_jeniuspay') &&
                                    <div className="flex w-100 column grow-1 mt-2">
                                        <div className="group">
                                            <input type="text" id="channel_properties" value={channelProperties} onInput={e => setChannelProperties(e.currentTarget.value)} />
                                            <label htmlFor="channel_properties">
                                                {channel === 'id_ovo' && 'No. Telepon'}
                                                {channel === 'id_jeniuspay' && 'Cashtag'}
                                            </label>
                                        </div>
                                    </div>
                                }
                            </div>
                        }

                        {
                            channel !== null &&
                            <button className="w-100 text white h-40 p-0 bold mt-2" onClick={placeOrder} style={{
                                background: user === null ? config.primaryColor : user.accent_color
                            }}>Place Order</button>
                        }
                    </div>
                }
            </div>
            <BottomNav active="me" accent_color={user === null ? null : user.accent_color} />
        </>
}

export default CustomerOrderDetail;
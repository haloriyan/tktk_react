import React, { useEffect, useState } from "react";
import BottomNav from "../../Partials/BottomNav";
import axios from "axios";
import config from "../../config";
import { useParams } from "react-router-dom";
import LoadingScreen from "../../Partials/LoadingScreen";
import OrderItem from "./Partials/OrderItem";
import Currency from "../../components/Currency";
import ChooseShipping from "./Partials/ChooseShipping";

const CustomerOrderDetail = () => {
    const { username, code } = useParams();
    const [order, setOrder] = useState(null);
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [customer, setCustomer] = useState(null);
    const [hasPhysicalProduct, setHasPhysicalProduct] = useState(false);

    const [cost, setCost] = useState(null);
    const [courier, setCourier] = useState(null);
    
    const [showSummary, setShowSummary] = useState(true);
    const [showShipping, setShowShipping] = useState(false);

    useEffect(() => {
        document.body.style.backgroundColor = "#fff";
    })

    useEffect(() => {
        if (isLoading) {
            setLoading(false);
            axios.post(`${config.baseUrl}/api/user/${username}/customer/order/${code}`)
            .then(response => {
                let res = response.data;
                let ord = res.order;
                setOrder(res.order);
                setUser(ord.user);
                ord.items.map(item => {
                    if (!item.product.is_service && item.product.type !== "digital") {
                        setHasPhysicalProduct(true);
                    }
                    if (item.product.is_service) {
                        // setHasService(true);
                    }
                })
            });
        }
    }, [isLoading]);

    useEffect(() => {
        if (user !== null && customer === null) {
            setCustomer(
                JSON.parse(window.localStorage.getItem(`customer_data_${user.id}`))
            )
        }
    }, [user, customer]);

    const placeOrder = () => {
        axios.post(`${config.baseUrl}/api`, {
            // 
        })
        .then(response => {
            let res = response.data;
        })
    }

    if (order === null && customer === null) {
        return <LoadingScreen />
    } else {
        return (
            <>
                <div className="content">
                    <div className="inner_content">
                        <div className="flex row item-center">
                            <div className="flex column grow-1 mr-2">
                                <h2 className="m-0 mt-2">Detail Pesanan</h2>
                                <div className="text small muted mt-1">Kode : {code}</div>
                            </div>
                        </div>

                        <div className="h-40"></div>

                        {
                            showSummary ?
                            <>
                                <OrderItem order={order} />

                                <div className={`flex row item-center gap-20 pb-2`}>
                                    <div className="text flex grow-1">Total</div>
                                    <div className="text bold">
                                        {Currency(order.total_pay).encode()}
                                    </div>
                                </div>

                                <div className="h-40"></div>
                            </>
                            :
                            <>
                                <div className="text center pointer size-14" onClick={() => {
                                    setShowSummary(true);
                                    setShowShipping(false)
                                }} style={{color: user.accent_color}}>
                                    Lihat Ringkasan
                                </div>
                                <div className="h-40"></div>
                            </>
                        }

                        {
                            (hasPhysicalProduct && customer !== null) &&
                            <>
                                {
                                    showShipping ?
                                    <ChooseShipping order={order} customer={customer} user={user} />
                                    :
                                    <button className="w-100 text white h-40 p-0 bold mt-2" onClick={() => {
                                        setShowShipping(true);
                                        setShowSummary(false);
                                    }} style={{
                                        background:  user.accent_color
                                    }}>Pilih Pengiriman</button>
                                }
                            </>
                        }
                    </div>
                    {JSON.stringify(showShipping)}

                    <div className="h-80"></div>
    
                    <BottomNav active="me" accent_color={user === null ? null : user.accent_color} />
                </div>
            </>
        )
    }
}

export default CustomerOrderDetail;
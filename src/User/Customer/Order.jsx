import React, { useEffect, useState } from "react";
import BottomNav from "../../Partials/BottomNav";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import config from "../../config";
import Currency from "../../components/Currency";
import GoogleFonts from "../../components/GoogleFonts";

const CustomerOrder = () => {
    const { username } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [customer, setCustomer] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [isLoadingUser, setLoadingUser] = useState(true);

    useEffect(() => {
        if (isLoadingUser) {
            setLoadingUser(false);
            axios.get(`${config.baseUrl}/api/user/${username}`)
            .then(response => {
                let res = response.data;
                setUser(res.user);
            })
        }
    }, [isLoadingUser]);

    useEffect(() => {
        if (customer === null && user !== null) {
            let myData = JSON.parse(window.localStorage.getItem(`customer_data_${user.id}`));
            if (myData === null) {
                navigate('/me');
            } else {
                setCustomer(myData);
            }
        }
    }, [customer, user]);

    useEffect(() => {
        if (isLoading && customer !== null) {
            setLoading(false);
            axios.post(`${config.baseUrl}/api/user/${username}/customer/order`, {
                token: customer.token,
            })
            .then(response => {
                let res = response.data;
                console.log(res);
                setOrders(res.order);
                setUser(res.user);
            })
        }
    })

    return (
        <>
            {
                user !== null &&
                <GoogleFonts family={user.font_family} />
            }
            <div className="content">
                <div className="inner_content">
                    <h2 className="m-0 mt-4">Pesanan Saya</h2>
                    <div className="h-40"></div>
                    {
                        orders.length > 0 ?
                        orders.map((order, o) => (
                            <a href="#" href={`/${username}/order/${order.code}`} key={o} className="bg-white rounded-more p-2 flex row item-center gap-20 mb-2 border">
                                <div className="flex column grow-1">
                                    <div>Order #{order.code}</div>
                                    <div className="flex row gap-10 item-center mt-05">
                                        <div className="text small" style={{color: user?.accent_color}}>{Currency(order.total_pay).encode()}</div>
                                        <div className="text small muted">{order.items.length} item(s)</div>
                                    </div>
                                </div>
                                <div className="text bold" style={{
                                    color: order.payment_status === "PAID" ? config.colors.green : config.colors.yellow
                                }}>
                                    {order.payment_status}
                                </div>
                            </a>
                        ))
                        :
                        <div>
                            <div>Kamu belum memiliki pesanan apapun.</div>
                            <a href={`/${username}`}>
                                <button className="w-100 text white h-40 p-0 bold mt-2" style={{
                                    background: user === null ? config.primaryColor : user.accent_color
                                }}>Lihat Produk</button>
                            </a>
                        </div>
                    }
                </div>
            </div>

            <BottomNav active="me" username={username} accent_color={null} />
        </>
    )
}

export default CustomerOrder;
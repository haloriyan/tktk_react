import React, { useEffect, useState } from "react";
import BottomNav from "../../Partials/BottomNav";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import config from "../../config";
import Currency from "../../components/Currency";

const CustomerOrder = () => {
    const { username } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [customer, setCustomer] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (customer === null) {
            let myData = JSON.parse(window.localStorage.getItem(`customer_data_${username}`));
            if (myData === null) {
                navigate('/me');
            } else {
                setCustomer(myData);
            }
        }
    }, [customer]);

    useEffect(() => {
        if (isLoading && customer !== null) {
            setLoading(false);
            axios.post(`${config.baseUrl}/api/user/${username}/customer/order`, {
                token: customer.token,
            })
            .then(response => {
                let res = response.data;
                setOrders(res.order);
                setUser(res.user);
            })
        }
    })

    return (
        <>
            <div className="content">
                <h2 className="m-0 mt-4">Pesanan Saya</h2>
                <div className="h-40"></div>
                {
                    orders.map((order, o) => (
                        <a href={`/${username}/order/${order.code}`} key={o} className="border bottom pb-2 mt-2 flex row item-center text black">
                            <div className="flex column grow-1 mr-2">
                                <div className="text bold">#{order.code}</div>
                                <div className="text small muted mt-05">{order.items.length} item(s)</div>
                            </div>
                            <div style={{color: user === null ? null : user.accent_color}}>
                                {Currency(order.total_pay).encode()}
                            </div>
                        </a>
                    ))
                }
            </div>

            <BottomNav active="me" username={username} accent_color={null} />
        </>
    )
}

export default CustomerOrder;
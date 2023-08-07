import React, { useEffect, useState } from "react";
import BottomNav from "../Partials/BottomNav";
import { useParams } from "react-router-dom";
import CustomerLogin from "./CustomerLogin";
import CustomerOtp from "./CustomerOtp";
import { BiShoppingBag, BiUser } from "react-icons/bi";
import axios from "axios";
import config from "../config";
import { MdAbc } from "react-icons/md";

const Customer = () => {
    const { username } = useParams();
    const [customer, setCustomer] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (customer === null) {
            let myData = JSON.parse(window.localStorage.getItem(`customer_data_${username}`));
            if (myData === null) {
                setCustomer('unauthenticated');
            } else {
                setCustomer(myData);
                axios.post(`${config.baseUrl}/api/user/${username}/customer/auth`, {
                    token: myData.token,
                })
                .then(response => {
                    let res = response.data;
                    console.log(res);
                    if (res.status === 200) {
                        setCustomer(myData);
                        setUser(res.user);
                    } else {
                        setCustomer('unauthenticated');
                    }
                })
            }
        }
    });

    return (
        <>
            <div className="content">
                {
                    customer === 'unauthenticated' &&
                    <CustomerLogin username={username} setCustomer={setCustomer} />
                }
                {
                    (customer !== null && customer.length) === 32 &&
                    <CustomerOtp customer={customer} setCustomer={setCustomer} username={username} />
                }
                {
                    (customer !== null && customer !== 'unauthenticated' && customer.length !== 32) &&
                    <div className="mt-2 inner_content">
                        <div className="flex row item-center">
                            <div className="h-80 text white rounded-max ratio-1-1 flex row item-center justify-center" style={{
                                backgroundColor: user === null ? null : user.accent_color
                            }}>BW</div>
                            <div className="flex column grow-1 ml-2">
                                <h2 className="m-0">{customer.name}</h2>
                                <div className="mt-05 text small">{customer.email}</div>
                            </div>
                        </div>

                        <div className="h-50"></div>
                        <a href={`/${username}/personal`} className="border bottom h-70 flex row item-center text black">
                            <BiUser size={24} />
                            <div className="text ml-2">Data Saya</div>
                        </a>
                        <a href={`/${username}/order`} className="h-70 flex row item-center text black">
                            <BiShoppingBag size={24} />
                            <div className="text ml-2">Pesanan Saya</div>
                        </a>
                    </div>
                }
            </div>
            <BottomNav username={username} active="me" accent_color={user === null ? null : user.accent_color} />
        </>
    )
}

export default Customer;
import React, { useEffect, useState } from "react";
import BottomNav from "../Partials/BottomNav";
import { useParams } from "react-router-dom";
import CustomerLogin from "./CustomerLogin";
import CustomerOtp from "./CustomerOtp";
import { BiCopyright, BiShoppingBag, BiUser } from "react-icons/bi";
import axios from "axios";
import config from "../config";
import GoogleFonts from "../components/GoogleFonts";
import Initial from "../components/Initial";
import moment from "moment";

const Customer = () => {
    const { username } = useParams();
    const [customer, setCustomer] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (user === null) {
            axios.get(`${config.baseUrl}/api/user/${username}?with=premium.package`)
            .then(response => {
                let res = response.data;
                let usr = JSON.parse(JSON.stringify(res.user));
                setUser(usr);
            })
        }
    }, [customer, user, username]);

    useEffect(() => {
        if (customer === null && user !== null) {
            let myData = JSON.parse(window.localStorage.getItem(`customer_data_${user.id}`));
            if (myData === null) {
                setCustomer('unauthenticated');
            } else {
                setCustomer(myData);
                axios.post(`${config.baseUrl}/api/user/${username}/customer/auth`, {
                    token: myData.token,
                })
                .then(response => {
                    let res = response.data;
                    let cust = res.customer;
                    window.localStorage.setItem(`customer_data_${user.id}`, JSON.stringify(cust));
                    if (res.status === 200) {
                        setCustomer(cust);
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
                    user !== null &&
                    <GoogleFonts family={user.font_family} />
                }
                {
                    (customer === 'unauthenticated' && user !== null) &&
                    <CustomerLogin username={username} setCustomer={setCustomer} user={user} />
                }
                {
                    (customer !== null && customer.length) === 32 &&
                    <CustomerOtp customer={customer} setCustomer={setCustomer} username={username} user={user} />
                }
                {
                    (customer !== null && customer !== 'unauthenticated' && customer.length !== 32) &&
                    <div className="mt-2 inner_content">
                        <div className="flex row item-center">
                            <Initial name={customer.name} size={80} style={{
                                backgroundColor: user === null ? null : user.accent_color
                            }} />
                            <div className="flex column grow-1 ml-2">
                                <h2 className="m-0">{customer.name}</h2>
                                <div className="mt-05 text small">{customer.email}</div>
                            </div>
                        </div>

                        <div className="h-50"></div>
                        <a href={`/${username}/personal`} className="border bottom h-70 flex row item-center text black">
                            <BiUser size={24} />
                            <div className="text ml-2">Data Personal</div>
                        </a>
                        <a href={`/${username}/order`} className="h-70 flex row item-center text black">
                            <BiShoppingBag size={24} />
                            <div className="text ml-2">Pesanan</div>
                        </a>

                        {
                            user !== null &&
                            (user.premium[0].package.price_monthly > 0 && user.premium[0].payment_status === "PAID" && moment(user.premium[0].expiry).diff(moment(), 'days') >= 0) ?
                            ''
                            :
                            <div className="text small muted flex row item-center justify-center mt-2 gap-10">
                                <BiCopyright />
                                Copyright 2023 - Takotoko
                            </div>
                        }
                    </div>
                }
            </div>
            <BottomNav username={username} active="me" accent_color={user === null ? null : user.accent_color} />
        </>
    )
}

export default Customer;
import React, { useEffect, useState } from "react";
import BottomNav from "../Partials/BottomNav";
import { useActionData, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import config from "../config";
import Currency from "../components/Currency";
import LoadingScreen from "../Partials/LoadingScreen";
import { BiMinus, BiTrash } from "react-icons/bi";
import GoogleFonts from "../components/GoogleFonts";

const Cart = () => {
    const { username } = useParams();
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);
    const [isLoadingUser, setLoadingUser] = useState(true);
    const [items, setItems] = useState([]);
    const [hasItems, setHasItems] = useState(false);
    const [buttonText, setButtonText] = useState('Checkout');

    const [user, setUser] = useState(null);
    const [customer, setCustomer] = useState(null);
    const [grandTotal, setGrandTotal] = useState(0);

    useEffect(() => {
        if (isLoadingUser && user === null) {
            setLoadingUser(false);
            axios.get(`${config.baseUrl}/api/user/${username}`)
            .then(response => {
                let res = response.data;
                setUser(res.user);
            })
        }
    }, [isLoadingUser, user]);

    useEffect(() => {
        if (customer === null && user !== null) {
            let myData = JSON.parse(window.localStorage.getItem(`customer_data_${user.id}`));
            if (myData === null) {
                navigate(`/${username}/me`)
            } else {
                setCustomer(myData);
            }
        }
    }, [customer, user]);

    useEffect(() => {
        if (isLoading && customer !== null) {
            setLoading(false);
            axios.post(`${config.baseUrl}/api/user/${username}/customer/cart`, {
                token: customer.token
            })
            .then(response => {
                let res = response.data;
                setHasItems(res.items.length > 0 ? true : false);
                setItems(res.items);
                
                const gt = res.items.reduce((acm, obj) => {
                    return acm + obj.total_price;
                }, 0);
                setGrandTotal(gt);
            })
        }
    })

    const setQuantity = (action, product) => {
        axios.post(`${config.baseUrl}/api/user/${username}/customer/cart/${action}`, {
            product_id: product.id,
            token: customer.token,
        })
        .then(response => {
            let res = response.data;
            setLoading(true);
        })
    }

    const checkout = () => {
        setButtonText('Memproses...');
        axios.post(`${config.baseUrl}/api/user/${username}/customer/cart/checkout`, {
            token: customer.token,
        })
        .then(response => {
            setButtonText('Checkout');
            let res = response.data;
            navigate(`/${username}/order/${res.code}`);
        })
        .catch(e => {
            setButtonText('Checkout');
        })
    }

    useEffect(() => {
        if (user !== null) {
            document.title = `Keranjang Belanja - ${user.name}`
        }
    }, [user]);

    return (
        <>
            {
                user !== null &&
                <GoogleFonts family={user.font_family} />
            }
            <div className="content">
                <div className="inner_content">
                    <h2 className="m-0 mt-3">Keranjang</h2>
                    <div className="h-40"></div>
                    {
                        user === null ?
                            <LoadingScreen />
                        :
                        items.map((item, i) => {
                            let product = item.product;
                            return (
                                <div className="border bottom pb-2 mt-2 flex row item-center" key={i}>
                                    <img 
                                        src={`${config.baseUrl}/storage/u${product.user_id}/product_images/${product.images[0].filename}`} 
                                        alt={item.product.name} 
                                        className="h-70 ratio-1-1 rounded"
                                    />
                                    <div className="flex column grow-1 ml-2">
                                        <div className="text bold">{product.name}</div>
                                        <div className="text small mt-05" style={{color: user.accent_color}}>{Currency(item.total_price).encode()}</div>
                                    </div>
                                    <div className="flex row item-center justify-end ml-2">
                                        <div className="border h-30 ratio-1-1 rounded centerize pointer" onClick={() => setQuantity('decrease', product)}>
                                            {item.quantity === 1 ? <BiTrash color={config.colors.red} /> : <BiMinus />}
                                        </div>
                                        <div className="ml-2 mr-2">{item.quantity}</div>
                                        <div className="border h-30 ratio-1-1 rounded centerize pointer" onClick={() => setQuantity('increase', product)}>+</div>
                                    </div>
                                </div>
                            )
                        })
                    }

                    {
                        hasItems ?
                        <>
                            <div className="flex row item-center mt-2">
                                <div className="text small muted flex grow-1">Total Belanja :</div>
                                <div className="text bold" style={{color: user === null ? config.primaryColor : user.accent_color}}>
                                    {Currency(grandTotal).encode()}
                                </div>
                            </div>
                            <button className="w-100 text white h-40 p-0 bold mt-2" onClick={checkout} style={{
                                background: user === null ? config.primaryColor : user.accent_color
                            }}>{buttonText}</button>
                        </>
                        :
                        <div>
                            Tidak ada apapun di sini
                            <a href={`/${username}`}>
                                <button className="w-100 text white h-40 p-0 bold mt-2" style={{
                                    background: user === null ? config.primaryColor : user.accent_color
                                }}>Mulai Belanja</button>
                            </a>
                        </div>
                    }
                </div>
            </div>
            <BottomNav active="cart" username={username} accent_color={user === null ? null : user.accent_color} />
        </>
    )
}

export default Cart;
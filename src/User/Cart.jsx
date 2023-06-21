import React, { useEffect, useState } from "react";
import BottomNav from "../Partials/BottomNav";
import { useActionData, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import config from "../config";
import Currency from "../components/Currency";
import LoadingScreen from "../Partials/LoadingScreen";

const Cart = () => {
    const { username } = useParams();
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);
    const [items, setItems] = useState([]);

    const [user, setUser] = useState(null);
    const [customer, setCustomer] = useState(null);
    const [grandTotal, setGrandTotal] = useState(0);

    useEffect(() => {
        if (customer === null) {
            let myData = JSON.parse(window.localStorage.getItem(`customer_data_${username}`));
            if (myData === null) {
                navigate(`/${username}/me`)
            } else {
                setCustomer(myData);
            }
        }
    }, [customer]);

    useEffect(() => {
        if (isLoading && customer !== null) {
            setLoading(false);
            axios.post(`${config.baseUrl}/api/user/${username}/customer/cart`, {
                token: customer.token
            })
            .then(response => {
                let res = response.data;
                setItems(res.items);
                setUser(res.user);
                
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
        axios.post(`${config.baseUrl}/api/user/${username}/customer/cart/checkout`, {
            token: customer.token,
        })
        .then(response => {
            let res = response.data;
            console.log(res);
            navigate(`/${username}/order/${res.code}`);
        })
    }

    return (
        <>
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
                                        <div className="border h-30 ratio-1-1 rounded centerize pointer" onClick={() => setQuantity('decrease', product)}>-</div>
                                        <div className="ml-2 mr-2">{item.quantity}</div>
                                        <div className="border h-30 ratio-1-1 rounded centerize pointer" onClick={() => setQuantity('increase', product)}>+</div>
                                    </div>
                                </div>
                            )
                        })
                    }

                    <div className="flex row item-center mt-2">
                        <div className="text small muted flex grow-1">Total Belanja :</div>
                        <div className="text bold" style={{color: user === null ? config.primaryColor : user.accent_color}}>
                            {Currency(grandTotal).encode()}
                        </div>
                    </div>

                    <button className="w-100 text white h-40 p-0 bold mt-2" onClick={checkout} style={{
                        background: user === null ? config.primaryColor : user.accent_color
                    }}>Checkout</button>
                </div>
            </div>
            <BottomNav active="cart" username={username} accent_color={user === null ? null : user.accent_color} />
        </>
    )
}

export default Cart;
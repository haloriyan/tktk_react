import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import styles from "../styles/Product.module.css";
import BottomNav from "../Partials/BottomNav";
import axios from "axios";
import config from "../config";
import Header from "../Partials/Header";
import LoadingScreen from "../Partials/LoadingScreen";
import Currency from "../components/Currency";
import { BiLeftArrow } from "react-icons/bi";
import { MdWest } from "react-icons/md";
import Popup from "../components/Popup";
import Alert from "../components/Alert";

const Product = () => {
    const { username, slug } = useParams();
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);
    const [product, setProduct] = useState(null);
    const [imageIndex, setImageIndex] = useState(0);
    const [viewingImage, setViewingImage] = useState(null);
    const [user, setUser] = useState(null);
    const [customer, setCustomer] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (isLoading && customer !== null) {
            setLoading(false);
            console.log('loading');

            let payload = null;
            if (customer !== 'unauthorized') {
                payload = {token: customer.token};
            }
            axios.post(`${config.baseUrl}/api/product/${slug}`, payload)
            .then(response => {
                let res = response.data;
                setProduct(res.product);
                setUser(res.user);
            })
        }
    }, [isLoading, customer]);

    useEffect(() => {
        if (customer === null) {
            let customerData = JSON.parse(window.localStorage.getItem(`customer_data_${username}`));
            if (customerData === null) {
                setCustomer('unauthorized')
            } else {
                console.log('ada data');
                setCustomer(customerData)
            }
        }
    }, [customer]);

    const addToCart = () => {
        if (customer === "unauthorized") {
            navigate(`/${username}/me`);
        } else {
            axios.post(`${config.baseUrl}/api/user/${username}/customer/cart/increase`, {
                product_id: product.id,
                token: customer.token,
            })
            .then(response => {
                let res = response.data;
                setMessage(res.message);
            })
        }
    }

    return product === null ?
        <LoadingScreen />
    :
        <>
            <div className="content">
                <div className="h-55"></div>
                <img 
                    src={`${config.baseUrl}/storage/u${product.user_id}/product_images/${product.images[imageIndex].filename}`} 
                    alt={product.name} 
                    className={`${styles.CoverImage} cover pointer`}
                    onClick={() => {
                        setViewingImage(`${config.baseUrl}/storage/u${product.user_id}/product_images/${product.images[imageIndex].filename}`)
                    }}
                />

                {
                    product.images.length > 1 &&
                    <div className="pt-1 flex row item-center gap-10 inner_content">
                        {
                            product.images.map((img, i) => (
                                <img 
                                    key={i}
                                    src={`${config.baseUrl}/storage/u${product.user_id}/product_images/${img.filename}`} 
                                    alt={`${product.name} image ${i}`} 
                                    className={`${styles.ProductImages} cover pointer`}
                                    onClick={() => setImageIndex(i)}
                                    style={
                                        imageIndex === i ?
                                            {border: `2px solid ${user.accent_color}`}
                                        : null
                                    }
                                />
                            ))
                        }
                    </div>
                }
                
                <div className="p-2 border bottom flex row item-center">
                    <h4 className="m-0">{product.name}</h4>
                    <div className="flex column grow-1 ml-2 item-end">
                        <div className="text small muted">Mulai dari</div>
                        <div className="text bold" style={{
                            color: user.accent_color
                        }}>{Currency(product.price).encode()}</div>
                    </div>
                </div>
                
                <div className="inner_content">
                    <div className="text small muted mt-3">Deskripsi</div>
                    <div>{product.description}</div>
                </div>
            </div>
            <Header accent_color={user === null ? null : user.accent_color}>
                <a href={`/${username}`} className="text white pointer">
                    <MdWest />
                </a>
                <h2 className="text white m-0 size-16 ml-2">{product.name}</h2>
            </Header>
            <div className="fixed bottom-0 left-0 right-0 flex column item-center" style={{zIndex: 3}}>
                <div className={`bg-white flex row item-center h-70 FloatingBottom`}>
                    <div className="flex column grow-1 mr-2">
                        <div className="text small muted">Harga</div>
                        <div className="mt-05" style={{color: user === null ? config.primaryColor : user.accent_color}}>{Currency(product.price).encode()}</div>
                    </div>
                    <button 
                        className="h-40 text white p-0 small" 
                        style={{background: user === null ? config.primaryColor : user.accent_color}}
                        onClick={() => addToCart()}
                    >
                        Tambah ke Keranjang
                    </button>
                </div>
            </div>
            {/* <BottomNav active="home" accent_color={user === null ? null : user.accent_color} /> */}

            <Alert message={message} setMessage={setMessage} />
            {
                viewingImage !== null &&
                <Popup onDismiss={() => setViewingImage(null)}>
                    <img 
                        src={viewingImage} alt={`Image of ${product.name}`} 
                        className="w-100 ratio-16-9 rounded"
                    />

                    <div className="h-50 flex column justify-center pointer text center primary" onClick={() => setViewingImage(null)}>
                        tutup
                    </div>
                </Popup>
            }
        </>
}

export default Product;
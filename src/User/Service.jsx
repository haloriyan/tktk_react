import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";

import styles from "../styles/Product.module.css";
import BottomNav from "../Partials/BottomNav";
import axios from "axios";
import config from "../config";
import Header from "../Partials/Header";
import LoadingScreen from "../Partials/LoadingScreen";
import Currency from "../components/Currency";
import { MdWest } from "react-icons/md";

const Product = () => {
    const { username, slug } = useParams();
    const [isLoading, setLoading] = useState(true);
    const [product, setProduct] = useState(null);
    const [user, setUser] = useState(null);
    const [disabledDates, setDisabledDates] = useState(null);
    const [imageIndex, setImageIndex] = useState(0);
    const [viewingImage, setViewingImage] = useState(null);

    useEffect(() => {
        if (isLoading) {
            setLoading(false);

            axios.post(`${config.baseUrl}/api/product/${slug}`)
            .then(response => {
                let res = response.data;
                setProduct(res.product);
                setUser(res.user);
            })
        }
    }, [isLoading]);

    const addToCart = () => {
        axios.get(`${config.baseUrl}/api/product/${product.id}/schedule`)
        .then(response => {
            let res = response.data;
            setDisabledDates(res.disabled_dates);
            console.log(res);
        })
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
                        <div className="text primary bold">{Currency(product.price).encode()}</div>
                    </div>
                </div>
                
                <div className="text small muted mt-3">Deskripsi</div>
                <div>{product.description}</div>

                {
                    disabledDates !== null &&
                    <div>
                        <Flatpickr
                            options={{
                                minDate: 'today',
                                disable: disabledDates
                            }}
                        />
                        <div>{JSON.stringify(disabledDates)}</div>
                    </div>
                }
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
                        Dapatkan
                    </button>
                </div>
            </div>
        </>
}

export default Product;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineShop } from "react-icons/ai";

import BottomNav from "../Partials/BottomNav";
import styles from "../styles/Home.module.css";
import config from "../config";
import { useParams } from "react-router-dom";
import LoadingScreen from "../Partials/LoadingScreen";
import InArray from "../components/InArray";
import PageRouter from "../Page";

const Home = () => {
    const pages = ['pricing','about','faq','terms','contact'];
    const { username } = useParams();
    const [isLoading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [isLoadingProduct, setLoadingProduct] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (isLoading && user === null) {
            setLoading(false);
            axios.get(`${config.baseUrl}/api/user/${username}`)
            .then(response => {
                let res = response.data;
                setUser(res.user);
                setLoadingProduct(true);
            })
        }
    }, [isLoading, user]);

    useEffect(() => {
        if (isLoadingProduct && user !== null) {
            setLoadingProduct(false);
            axios.get(`${config.baseUrl}/api/user/${username}/products`)
            .then(response => {
                let res = response.data;
                // setUser(res.user);
                setProducts(res.products);
            })
        }
    })

    if (InArray(username, pages)) {
        return PageRouter
    } else {
        return user === null ?
            <LoadingScreen />
        :
            <>
                <div className="content">
                    {
                        user.cover === "default" ?
                            <div className={`${styles.CoverImage} centerize`}>
                                <div className="text spacing-10 bold size-28" style={{opacity: 0.2}}>{user.name.toUpperCase()}</div>
                            </div>
                        :
                        <img className={styles.CoverImage} src={`${config.baseUrl}/storage/user_covers/${user.cover}`} />
                    }
                    <div className={styles.ProfileArea}>
                        {
                            user.photo === "default" ?
                                <div className={`${styles.ProfileIcon} centerize`} style={{backgroundColor: user.accent_color}}>
                                    <AiOutlineShop size={36} color={'#fff'} />
                                </div>
                            :
                            <img alt="Riyan" className={styles.ProfileIcon} src={`${config.baseUrl}/storage/user_photos/${user.photo}`} />
                        }
                        <h2>{user.name}</h2>
                        <div className="text center small">{user.bio}</div>
                    </div>

                    <div className="flex row wrap gap-20 mt-3 inner_content">
                        {
                            products.map((product, p) => {
                                if (!product.is_service) return (
                                    <a href={`/${username}/product/${product.slug}`} key={p} className={`${styles.ProductBox} rounded flex column basis-2 grow-1 text black`} style={{
                                        borderBottomColor: `${user.accent_color}30`
                                    }}>
                                        <img 
                                            src={`${config.baseUrl}/storage/u${user.id}/product_images/${product.images[0].filename}`} 
                                            alt={product.name} 
                                            className={`${styles.ProductImage} cover`}
                                        />
                                        <div className="p-2">
                                            <div className="text bold small">{product.name}</div>
                                        </div>
                                    </a>
                                )
                            })
                        }
                    </div>

                    <div className="flex column gap-20 inner_content">
                    {
                            products.map((product, p) => {
                                if (product.is_service) return (
                                    <a href={`/${username}/service/${product.slug}`} className="bg-white p-2 bordered rounded mt-2 flex row item-center" style={{
                                        borderBottom: `8px solid ${user.accent_color}30`
                                    }} key={p}>
                                        <img 
                                            src={`${config.baseUrl}/storage/u${user.id}/product_images/${product.images[0].filename}`} 
                                            alt={product.name} 
                                            className={`${styles.ServiceImage} cover`}
                                        />
                                        <div className="flex column grow-1 ml-2">
                                            <div className="text bold">{product.name}</div>
                                        </div>
                                    </a>
                                )
                            })
                        }
                    </div>

                    <div className="h-100"></div>
                </div>
                <BottomNav username={username} accent_color={user === null ? null : user.accent_color} />
            </>
    }
}

export default Home;
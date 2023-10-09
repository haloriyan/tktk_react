import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { AiOutlineShop } from "react-icons/ai";

import BottomNav from "../Partials/BottomNav";
import styles from "../styles/Home.module.css";
import config from "../config";
import { useNavigate, useParams } from "react-router-dom";
import LoadingScreen from "../Partials/LoadingScreen";
import InArray from "../components/InArray";
import PageRouter from "../Page";
import Currency from "../components/Currency";
import { BiCartAdd, BiPlug, BiPlus, BiShow } from "react-icons/bi";
import GoogleFonts from "../components/GoogleFonts";

const Home = () => {
    const pages = ['pricing','about','faq','terms','contact','privacy'];
    const navigate = useNavigate();
    const { username } = useParams();
    const [pageTitle, setPageTitle] = useState('Takotoko');
    const [isLoading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [isLoadingProduct, setLoadingProduct] = useState(false);
    const [products, setProducts] = useState([]);
    const [links, setLinks] = useState([]);
    const [customer, setCustomer] = useState(null);
    const [message, setMessage] = useState(null);
    const [headerMargin, setHeaderMargin] = useState(-100);
    const [viewing, setViewing] = useState('product');
    const [hasProduct, setHasProduct] = useState(false);
    const [hasService, setHasService] = useState(false);
    const [hasLink, setHasLink] = useState(false);

    useEffect(() => {
        document.title = pageTitle;
    }, [pageTitle]);

    useEffect(() => {
        if (isLoading && user === null) {
            setLoading(false);
            axios.get(`${config.baseUrl}/api/user/${username}`)
            .then(response => {
                let res = response.data;
                let theLinks = res.links;
                setUser(res.user);
                setPageTitle(`${res.user.name} - Takotoko`)

                if (theLinks.length > 0) {
                    setHasLink(true);
                    setLinks(theLinks);
                }

                setLoadingProduct(true);
            })
        }
    }, [isLoading, user]);

    useEffect(() => {
        // document.body.style.backgroundColor = "#fff";
    })

    useEffect(() => {
        if (isLoadingProduct && user !== null) {
            setLoadingProduct(false);
            axios.get(`${config.baseUrl}/api/user/${username}/products`)
            .then(response => {
                let res = response.data;
                let prods = res.products;
                // setUser(res.user);
                setProducts(prods);
                prods.map(prod => {
                    if (prod.is_service) {
                        setHasService(true);
                    } else {
                        setHasProduct(true);
                    }
                })
            })
        }
    })

    const addToCart = (productID, index) => {
        if (customer === "unauthorized") {
            navigate(`/${username}/me`);
        } else {
            axios.post(`${config.baseUrl}/api/user/${username}/customer/cart/increase`, {
                product_id: productID,
                token: customer.token,
            })
            .then(response => {
                let res = response.data;
                setMessage({
                    body: res.message,
                    index: index
                });
            })
        }
    }

    useEffect(() => {
        if (customer === null && user !== null) {
            let customerData = JSON.parse(window.localStorage.getItem(`customer_data_${user.id}`));
            if (customerData === null) {
                setCustomer('unauthorized')
            } else {
                setCustomer(customerData)
            }
        }
    }, [customer, user]);

    useEffect(() => {
        GoogleFonts();
    }, [])

    const handleScroll = e => {
        let pos = window.scrollY;
        setHeaderMargin(pos > 220 ? 0 : -100);
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll)
    })

    useEffect(() => {
        if (message !== null) {
            let toId = setTimeout(() => {
                setMessage(null);
            }, 4500);

            return () => clearTimeout(toId);
        }
    }, [message]);

    if (InArray(username, pages)) {
        return PageRouter
    } else {
        return user === null ?
            <LoadingScreen />
        :
            <>
                {
                    user.hasOwnProperty('font_family') &&
                    <GoogleFonts family={user.font_family} />
                }
                <div className="content">
                    <div className={`${styles.Header} flex row item-center bg-white gap-20`} style={{borderBottomColor: `${user.accent_color}30`,marginTop: headerMargin}}>
                        {
                            user.photo === "default" ?
                                <div className={`${styles.ProfileIcon} centerize`} style={{backgroundColor: user.accent_color}}>
                                    <AiOutlineShop size={36} color={'#fff'} />
                                </div>
                            :
                            <img 
                                src={`${config.baseUrl}/storage/user_photos/${user.photo}`} alt={user.name} 
                                className="h-40 ratio-1-1 rounded-max bg-grey"
                            />
                        }
                        <div className="flex grow-1 text bold size-14">{user.name}</div>
                    </div>
                    
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

                    {
                        hasLink &&
                        <div className="flex column gap-10 mt-3">
                            {
                                links.map((lnk, l) => (
                                    <a href="#" key={l} className="flex row item-center gap-20 bg-white p-15 rounded border">
                                        {
                                            lnk.image !== null &&
                                            <img 
                                                src={`${config.baseUrl}/storage/link_images/${lnk.image}`} alt={lnk.title} 
                                                className="h-60 ratio-1-1 rounded bg-grey cover"
                                            />
                                        }
                                        <div className="flex grow-1 text bold" style={{color: user.accent_color}}>{lnk.title}</div>
                                    </a>
                                ))
                            }
                        </div>
                    }
                    
                    <div className="flex row item-center gap-10 mt-2 justify-end">
                        {
                            hasProduct &&
                            <div className="flex row p-1 pl-3 pr-3 rounded-max pointer text size-12" onClick={() => setViewing('product')} style={{
                                backgroundColor: viewing === 'product' ? user.accent_color : `${user.accent_color}30`,
                                color: viewing === 'product' ? '#fff' : user.accent_color
                            }}>
                                Produk
                            </div>
                        }
                        {
                            hasService &&
                            <div className="flex row p-1 pl-3 pr-3 rounded-max pointer text size-12" onClick={() => setViewing('service')} style={{
                                backgroundColor: viewing === 'service' ? user.accent_color : `${user.accent_color}30`,
                                color: viewing === 'service' ? '#fff' : user.accent_color
                            }}>
                                Jasa
                            </div>
                        }
                    </div>

                    <div className="flex row wrap gap-20 mt-3 inner_content">
                        {
                            viewing === 'product' &&
                            products.map((product, p) => {
                                if (!product.is_service) return (
                                    <div key={p} className={`${styles.ProductBox} bg-white rounded flex column basis-2 grow-1 text black relative`} style={{
                                        borderBottomColor: `${user.accent_color}30`
                                    }}>
                                        <a href={`/${username}/product/${product.slug}`}>
                                            <img 
                                                src={`${config.baseUrl}/storage/u${user.id}/product_images/${product.images[0].filename}`} 
                                                alt={product.name} 
                                                className={`${styles.ProductImage} cover`}
                                            />
                                        </a>
                                        <div className="p-2 flex row item-center gap-10">
                                            <a href={`/${username}/product/${product.slug}`} className="flex column grow-1">
                                                <div className="text bold small black">{product.name}</div>
                                                <div className="text small mt-05" style={{color: user !== null ? user.accent_color : config.primaryColor}}>
                                                    {Currency(product.price).encode()}
                                                </div>
                                            </a>
                                            <div className="h-40 ratio-1-1 rounded-max flex centerize pointer" style={{backgroundColor: user !== null ? user.accent_color : config.primaryColor}} onClick={() => addToCart(product.id, p)}>
                                                <BiCartAdd color="#fff" />
                                            </div>
                                        </div>

                                        {
                                            (message !== null && message.index === p) &&
                                            <div className="bg-green rounded p-1 pl-2 pr-2 m-1 mt-2 text size-12 absolute">
                                                {message.body}
                                            </div>
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div className="flex column gap-20 inner_content">
                    {
                        viewing === 'service' &&
                            products.map((product, p) => {
                                if (product.is_service) return (
                                    <a href={`/${username}/service/${product.slug}`} className="mb-2 flex row item-center" style={{
                                        borderBottom: `8px solid ${user.accent_color}30`
                                    }} key={p}>
                                        <img 
                                            src={`${config.baseUrl}/storage/u${user.id}/product_images/${product.images[0].filename}`} 
                                            alt={product.name} 
                                            className={`${styles.ServiceImage} cover`}
                                        />
                                        <div className="flex column grow-1 ml-2">
                                            <div className="text bold">{product.name}</div>
                                            <div className="text small">{product.description}</div>
                                            <div className="flex row item-center gap-10 mt-2">
                                                <div className="flex grow-1 text small" style={{color: user !== null ? user.accent_color : config.primaryColor}}>{Currency(product.price).encode()}</div>
                                                <button className="small text white flex row item-center" style={{backgroundColor: user !== null ? user.accent_color : config.primaryColor}}>
                                                    <BiShow color="#fff" />
                                                    <div className="ml-1">Detail</div>
                                                </button>
                                            </div>
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
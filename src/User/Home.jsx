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
import ShowAll from "./HomeLayout/ShowAll";
import LinkOnly from "./HomeLayout/LinkOnly";
import TabProduct from "./HomeLayout/TabProduct";
import TabLink from "./HomeLayout/TabLink";

const Home = () => {
    const pages = ['pricing','about','faq','terms','contact','privacy'];
    const navigate = useNavigate();
    const { username } = useParams();
    const [pageTitle, setPageTitle] = useState('Takotoko');
    const [isLoading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [isLoadingProduct, setLoadingProduct] = useState(false);
    const [categories, setCategories] = useState([]);
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
                setCategories(res.categories);
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

    const clickLink = link => {
        axios.post(`${config.baseUrl}/api/user/link/hit`, {
            token: customer.token,
            link_id: link.id
        })
        .then(response => {
            let res = response.data;
            window.open(link.url, '_blank');
        })
    }

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
                        user.home_layout === 'show_all' &&
                        <ShowAll links={links} actions={{clickLink, addToCart}} user={user} products={products}  message={message} categories={categories} />
                    }
                    {
                        user.home_layout === 'link_only' &&
                        <LinkOnly links={links} actions={{clickLink, addToCart}} user={user} products={products}  message={message} categories={categories} />
                    }
                    {
                        user.home_layout === 'tab-product_first' &&
                        <TabProduct user={user} products={products} actions={{addToCart, clickLink}} message={message} links={links} categories={categories} />
                    }
                    {
                        user.home_layout === 'tab-link_first' &&
                        <TabLink user={user} products={products} actions={{addToCart, clickLink}} message={message} links={links} categories={categories} />
                    }

                    <div className="h-100"></div>
                </div>

                <BottomNav username={username} accent_color={user === null ? null : user.accent_color} />
            </>
    }
}

export default Home;
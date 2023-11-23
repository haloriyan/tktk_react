import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import Popup from "../components/Popup";
import moment from "moment";
import 'moment/locale/id';

const Product = () => {
    const { username, slug } = useParams();
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);
    const [isLoadingSchedules, setLoadingSchedules] = useState(false);
    const [product, setProduct] = useState(null);
    const [user, setUser] = useState(null);
    const [disabledDates, setDisabledDates] = useState(null);
    const [imageIndex, setImageIndex] = useState(0);
    const [viewingImage, setViewingImage] = useState(null);
    const [customer, setCustomer] = useState(null);
    const [message, setMessage] = useState(null);
    const [bookingButton, setBookingButton] = useState('Booking Sekarang');

    const [bookingDate, setBookingDate] = useState('');
    const [bookingTime, setBookingTime] = useState('');

    const [isOrdering, setOrdering] = useState(false);
    const [timeVisible, setTimeVisible] = useState(false);
    const [minTime, setMinTime] = useState('00:00');
    const [maxTime, setMaxTime] = useState('23:59');

    useEffect(() => {
        if (isLoading) {
            setLoading(false);

            axios.post(`${config.baseUrl}/api/product/${slug}`)
            .then(response => {
                let res = response.data;
                setProduct(res.product);
                document.title = `${res.product.name} - ${res.user.name}`
                setUser(res.user);
                setLoadingSchedules(true);
            })
        }
    }, [isLoading]);

    useEffect(() => {
        if ((customer === null && customer !== 'loading') && user !== null) {
            let customerData = JSON.parse(window.localStorage.getItem(`customer_data_${user.id}`));
            if (customerData === null) {
                setCustomer('unauthorized')
            } else {
                setCustomer(customerData)
            }
        }
    }, [customer, user]);

    useEffect(() => {
        if (product !== null && isLoadingSchedules) {
            setLoadingSchedules(false);
            getDisabledDates()
        }
    }, [isLoadingSchedules, product]);

    const getDisabledDates = () => {
        axios.get(`${config.baseUrl}/api/product/${product.id}/schedule`)
        .then(response => {
            let res = response.data;
            setDisabledDates(res.disabled_dates);
        })
    }

    const getTimes = (day, date) => {
        return axios.post(`${config.baseUrl}/api/product/${product.id}/schedule/times`, {
            token: customer.token,
            day: day,
            date: date
        })
    }

    const addToCart = () => {
        setBookingButton('Memproses...');
        if (customer === "unauthorized") {
            navigate(`/${username}/me`);
        } else {
            axios.post(`${config.baseUrl}/api/user/${username}/customer/cart/increase`, {
                product_id: product.id,
                token: customer.token,
                booking_date: `${bookingDate} ${bookingTime}:00`,
                product_type: 'service'
            })
            .then(response => {
                let res = response.data;
                console.log(res);
                setMessage(res.message);
                if (res.status === 200) {
                    navigate(`/${username}/cart`)
                }
                setBookingButton('Booking Sekarang');
            })
            .catch(e => {
                setBookingButton('Booking Sekarang');
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
                    {
                        disabledDates !== null &&
                        <button 
                            className="h-40 text white p-0 small" 
                            style={{background: user === null ? config.primaryColor : user.accent_color}}
                            onClick={() => setOrdering(true)}
                        >
                            Dapatkan
                        </button>
                    }
                </div>
            </div>

            {
                isOrdering &&
                <Popup onDismiss={() => setOrdering(false)} width="35%" style={{borderBottomLeftRadius: 0,borderBottomRightRadius: 0}} containerStyle={{
                    alignItems: 'flex-end',
                    alignContent: 'flex-end',
                }}>
                    <div>
                        <h3 style={{margin: 0,marginBottom: 10}}>Booking {product.name}</h3>
                        <div className="group">
                            <Flatpickr
                                onChange={(selectedDates, dateStr) => {
                                    let day = moment(dateStr).format('dddd');
                                    setBookingDate(dateStr);
                                    setTimeVisible(false);
                                    getTimes(day, dateStr).then(response => {
                                        let res = response.data;
                                        setMinTime(res.schedule.start_hour);
                                        setMaxTime(res.schedule.end_hour);
                                        setTimeVisible(true);
                                    })
                                }}
                                options={{
                                    minDate: 'today',
                                    maxDate: moment().add(30, 'days').format('Y-MM-DD HH:mm:00'),
                                    disable: disabledDates
                                }}
                            />
                            <label className="active">Pilih Tanggal Booking</label>
                        </div>

                        {
                            timeVisible &&
                            <div className="group">
                                <Flatpickr
                                    onChange={(a, b) => {
                                        setBookingTime(b);
                                    }}
                                    options={{
                                        enableTime: true,
                                        noCalendar: true,
                                        dateFormat: 'H:i',
                                        time_24hr: true,
                                        minTime: minTime,
                                        maxTime: maxTime
                                    }}
                                />
                                <label className="active">Pilih Jam</label>
                            </div>
                        }
                    </div>

                    <button className="w-100 mt-2" onClick={addToCart} style={{backgroundColor: user.accent_color,color: '#fff'}}>{bookingButton}</button>
                </Popup>
            }
        </>
}

export default Product;
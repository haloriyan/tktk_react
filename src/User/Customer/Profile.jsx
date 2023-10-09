import React, { useEffect, useState } from "react";
import Header from "../../Partials/Header";
import { MdWest } from "react-icons/md";
import BottomNav from "../../Partials/BottomNav";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../../config";

const CustomerPersonal = () => {
    const { username } = useParams();
    const [isLoading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [customer, setCustomer] = useState(null);
    const [province, setProvince] = useState('');
    const [provinceID, setProvinceID] = useState(null);
    const [city, setCity] = useState('');
    const [cityID, setCityID] = useState(null);
    const [district, setDistrict] = useState('');
    const [districtID, setDistrictID] = useState(null);
    const [buttonText, setButtonText] = useState('Simpan Perubahan');
    const [message, setMessage] = useState('');

    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [isLoadingProvinces, setLoadingProvinces] = useState(true);
    const [isLoadingCities, setLoadingCities] = useState(false);
    const [isLoadingDistrict, setLoadingDistrict] = useState(false);

    useEffect(() => {
        if (isLoading) {
            setLoading(false);
            axios.get(`${config.baseUrl}/api/user/${username}`)
            .then(response => {
                let res = response.data;
                setUser(res.user);
            });
        }
    }, []);

    useEffect(() => {
        if (isLoadingProvinces) {
            setLoadingProvinces(false);
            axios.get(`${config.baseUrl}/api/ongkir/province`)
            .then(response => {
                let res = response.data;
                setProvinces(res);
                setLoadingCities(true);
            })
        }
    }, [])
    useEffect(() => {
        if (isLoadingCities && provinceID !== null) {
            setLoadingCities(false);
            axios.get(`${config.baseUrl}/api/ongkir/province/${provinceID}/city`)
            .then(response => {
                let res = response.data;
                setCities(res);
                setLoadingDistrict(true);
            })
        }
    })
    useEffect(() => {
        if (isLoadingDistrict && cityID !== null) {
            setLoadingDistrict(false);
            axios.get(`${config.baseUrl}/api/ongkir/province/${provinceID}/city/${cityID}/district`)
            .then(response => {
                let res = response.data;
                setDistricts(res);
                console.log(res);
            })
        }
    }, [isLoadingDistrict, cityID]);

    useEffect(() => {
        if (user !== null && customer === null) {
            let c = JSON.parse(window.localStorage.getItem(`customer_data_${user.id}`));
            setCustomer(c);
            setName(c.name);
            setEmail(c.email);
            setAddress(c.address);
            setToken(c.token);
            setProvince(c.province);
            setProvinceID(c.province_id);
            setCity(c.city);
            setCityID(c.city_id);
            setDistrict(c.subdistrict);
            setDistrictID(c.subdistrict_id);
        }
    }, [user, customer])

    useEffect(() => {
        if (message !== "") {
            setTimeout(() => {
                setMessage('');
            }, 4400);
        }
    }, [message]);

    const submit = (e) => {
        setButtonText('Menyimpan');
        axios.post(`${config.baseUrl}/api/user/${username}/customer/${customer.id}/update`, {
            name, email, 
            province, city, district, address,
            city_id: cityID,
            province_id: provinceID,
            district_id: districtID,
            token
        })
        .then(response => {
            let res = response.data;
            window.localStorage.setItem(`customer_data_${user.id}`, JSON.stringify(res.customer));
            setButtonText('Simpan Perubahan');
            setMessage(res.message);
        })
        .catch(err => {
            setButtonText('Simpan Perubahan');
        })
        e.preventDefault();
    }

    return (
        <>
            <Header accent_color={user === null ? null : user.accent_color}>
                <a href={`/${username}/me`} className="text white">
                    <MdWest />
                </a>
                <div className="ml-2 text bold white">
                    Data Personal
                </div>
            </Header>

            <form className="content" onSubmit={submit}>
                <div className="h-80"></div>
                <div className="inner_content">
                    <div className="text small muted">Data ini digunakan untuk mempermudah proses pemesananmu</div>
                </div>

                <div className="bg-white p-3 pt-1 bordered" style={{borderBottomColor: '#ddd',borderBottomWidth: 8}}>
                    <div className="group">
                        <input type="text" id="name" value={name} onInput={e => setName(e.currentTarget.value)} />
                        <label htmlFor="name">Nama :</label>
                    </div>
                    <div className="group">
                        <input type="text" id="email" value={email} onInput={e => setEmail(e.currentTarget.value)} />
                        <label htmlFor="email">Email :</label>
                    </div>

                    <div className="w-100 mt-4 mb-3" style={{height: 1,backgroundColor: '#ddd'}}></div>

                    <div className="text size-20">Informasi Pengiriman</div>
                    <div className="text size-14 mt-05">Dimana pesanan produk fisikmu akan diantar</div>

                    <div className="h-10"></div>

                    <div className="group">
                        <textarea id="address" onInput={e => setAddress(e.currentTarget.value)}></textarea>
                        <label htmlFor="address">Alamat Lengkap :</label>
                    </div>

                    {
                        provinces.length > 0 &&
                        <div className="group">
                            <select name="province" id="province" required onChange={e => {
                                let val = JSON.parse(e.currentTarget.value);
                                setProvince(val.province);
                                setProvinceID(val.province_id);
                            }}>
                                {
                                    provinceID === null &&
                                    <option value="">-- Pilih Provinsi --</option>
                                }
                                {
                                    provinces.map((prov, p) => (
                                        <option value={JSON.stringify(prov)} key={p} selected={provinceID === prov.province_id}>{prov.province}</option>
                                    ))
                                }
                            </select>
                            <label htmlFor="prov" className="active">Provinsi :</label>
                        </div>
                    }
                    {
                        cities.length > 0 &&
                        <div className="group">
                            <select name="city" id="city" required onChange={e => {
                                let val = JSON.parse(e.currentTarget.value);
                                setCity(`${val.type} ${val.city_name}`);
                                setCityID(val.city_id);
                            }}>
                                {
                                    cityID === null &&
                                    <option value="">-- Pilih Kota --</option>
                                }
                                {
                                    cities.map((cit, c) => (
                                        <option value={JSON.stringify(cit)} key={c} selected={cityID === cit.city_id}>{cit.type} {cit.city_name}</option>
                                    ))
                                }
                            </select>
                            <label htmlFor="city" className="active">Kota :</label>
                        </div>
                    }
                    {
                        districts.length > 0 &&
                        <div className="group">
                            <select name="district" id="district" required onChange={e => {
                                let val = JSON.parse(e.currentTarget.value);
                                setDistrict(val.subdistrict_name);
                                setDistrictID(val.subdistrict_id);
                            }}>
                                {
                                    districtID === null &&
                                    <option value="">-- Pilih Kecamatan --</option>
                                }
                                {
                                    districts.map((dist, d) => (
                                        <option value={JSON.stringify(dist)} key={d} selected={districtID === dist.subdistrict_id}>{dist.subdistrict_name}</option>
                                    ))
                                }
                            </select>
                            <label htmlFor="district" className="active">Kecamatan :</label>
                        </div>
                    }

                    {
                        message !== "" &&
                        <div className="bg-green p-1 rounded mt-1 pl-2 pr-2">
                            {message}
                        </div>
                    }

                    <button className="primary w-100 mt-2" style={{backgroundColor: user === null ? config.primaryColor : user.accent_color}}>{buttonText}</button>
                    <div className="h-70"></div>
                </div>
            </form>

            <BottomNav active="me" accent_color={user === null ? null : user.accent_color} />
        </>
    )
}

export default CustomerPersonal;
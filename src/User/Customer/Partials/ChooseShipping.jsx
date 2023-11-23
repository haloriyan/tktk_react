import axios from "axios";
import React, { useEffect, useState } from "react";
import config from "../../../config";
import couriers from "../../../components/Couriers";
import Currency from "../../../components/Currency";

const ChooseShipping = ({order, customer, user}) => {
    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [costs, setCosts] = useState([]);
    const [cost, setCost] = useState(null);
    
    const [isLoadingProvinces, setLoadingProvinces] = useState(true);
    const [isLoadingCities, setLoadingCities] = useState(false);
    const [isLoadingDistricts, setLoadingDistricts] = useState(false);
    const [isLoadingCost, setLoadingCost] = useState(false);
    
    const [provinceID, setProvinceID] = useState(customer.province_id);
    const [cityID, setCityID] = useState(customer.city_id);
    const [districtID, setDistrictID] = useState(customer.subdistrict_id);
    const [province, setProvince] = useState(customer.province);
    const [city, setCity] = useState(customer.city);
    const [district, setDistrict] = useState(customer.subdistrict);
    const [courier, setCourier] = useState(null);

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
    }, [isLoadingProvinces]);

    useEffect(() => {
        if (isLoadingCities && provinceID !== null) {
            setLoadingCities(false);
            axios.get(`${config.baseUrl}/api/ongkir/province/${provinceID}/city`)
            .then(response => {
                let res = response.data;
                setCities(res);
                setLoadingDistricts(true);
            })
        }
    }, [isLoadingCities, provinceID]);

    useEffect(() => {
        if (isLoadingDistricts && cityID !== null) {
            setLoadingDistricts(false);
            axios.get(`${config.baseUrl}/api/ongkir/province/${provinceID}/city/${cityID}/district`)
            .then(response => {
                let res = response.data;
                setDistricts(res);
            })
        }
    }, [isLoadingDistricts, cityID]);

    useEffect(() => {
        if (isLoadingCost) {
            setLoadingCost(false);
            axios.post(`${config.baseUrl}/api/ongkir/cost`, {
                code: order.code,
                district_id: districtID,
                courier: courier.code,
            })
            .then(response => {
                let res = response.data;
                setCosts(res.costs);
                console.log(res);
            })
        }
    }, [isLoadingCost]);

    if (provinces.length > 0) {
        return (
            <>
                {
                    districtID === null ?
                    <>
                        <h3 className="mt-0 mb-1">Pilih Pengiriman</h3>
                        <div>Atur ke mana pesananmu akan dikirim</div>
                        <div className="group">
                            <select name="province" id="province" required onChange={e => {
                                let val = JSON.parse(e.currentTarget.value);
                                setProvince(val.province);
                                setProvinceID(val.province_id);
                                setLoadingCities(true);
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
                            <label htmlFor="province" className="active">Provinsi :</label>
                        </div>

                        {
                            cities.length > 0 &&
                            <div className="group">
                                <select name="city" id="city" required onChange={e => {
                                    let val = JSON.parse(e.currentTarget.value);
                                    setCity(`${val.type} ${val.city_name}`);
                                    setCityID(val.city_id);
                                    setLoadingDistricts(true);
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
                                    // setLoadingCost(true);
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
                    </>
                    :
                    <>
                        <div className="flex row item-center gap-20 mb-2">
                            <div className="flex column grow-1">
                                <div className="text size-12">Kirim Ke</div>
                                <div className="mt-05 text bold">{district}</div>
                            </div>
                            <div className="pointer text bold size-12" onClick={() => {
                                setDistrict(null);
                                setDistrictID(null);
                            }} style={{color: user.accent_color}}>Ganti</div>
                        </div>

                        <div className="group">
                            <textarea name="address" id="address" required>{customer.address}</textarea>
                            <label htmlFor="address" className="active">Alamat Lengkap :</label>
                        </div>
                    </>
                }

                {
                    (provinceID !== null && cityID !== null && districtID !== null) &&
                    <>
                        {
                            courier === null ?
                            <>
                                <div className="text size-12 mt-2">Pilih Kurir</div>
                                <div className="flex row item-center gap-10">
                                    {
                                        couriers.map((cour, c) => (
                                            <div className={`flex column grow-1 pointer`} onClick={() => {
                                                setCourier(cour);
                                                setLoadingCost(true);
                                            }}>
                                                <img src={cour.image} alt={cour.code} className="h-80 ratio-4-3 cover" />
                                            </div>
                                        ))
                                    }
                                </div>
                            </>
                        :
                        <>
                            <div className="flex row item-center gap-20">
                                <div className="flex grow-1">
                                    <img src={courier.image} alt={courier.code} className="h-60 ratio-4-3 cover" />
                                </div>
                                <div className="pointer text bold size-12" onClick={() => {
                                    setCourier(null);
                                    setCosts([]);
                                }} style={{color: user.accent_color}}>Ganti</div>
                            </div>

                            <div className="flex column gap-20 mt-2">
                                {
                                    costs.map((cst, c) => (
                                        <div key={c} className="pointer border rounded p-2 flex row item-center gap-20" onClick={() => setCost(cst)} style={{
                                            borderColor: cost?.service === cst.service ? user.accent_color : '#ddd',
                                            backgroundColor: cost?.service === cst.service ? `${user.accent_color}10` : '#fff'
                                        }}>
                                            <div className="flex column grow-1">
                                                <div className="text bold size-14">{cst.service}</div>
                                                <div className="text size-12">{cst.description}</div>
                                            </div>
                                            <div className="flex column item-end">
                                                <div>{Currency(cst.cost[0].value).encode()}</div>
                                                {
                                                    cst.cost[0].etd !== "" &&
                                                    <div className="text size-12 muted">{cst.cost[0].etd} hari</div>
                                                }
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </>
                    }
                    </>
                }
            </>
        )
    }
}

export default ChooseShipping;
import axios from "axios";
import React, { useEffect, useState } from "react";
import config from "../config";
import LeftMenu from "./LeftMenu";
import Header from "./Header";

const AffiliateDashboard = () => {
    const [isLoading, setLoading] = useState(false);
    const [affiliator, setAffiliator] = useState(null);

    useEffect(() => {
        if (affiliator === null) {
            let myData = JSON.parse(window.localStorage.getItem('affiliator_data'));
            setAffiliator(myData);
        }
    }, [affiliator]);

    useEffect(() => {
        if (isLoading && affiliator !== null) {
            setLoading(false);
            axios.post(`${config.baseUrl}/api/affiliate/dashboard`, {
                token: affiliator.token,
            })
            .then(response => {
                let res = response.data;
            })
        }
    }, [isLoading]);

    return (
        <>
            <LeftMenu user={affiliator} />
            <Header />
            <div className="absolute left-20 right-0" style={{top: 70}}>
                sds
            </div>
        </>
    )
}

export default AffiliateDashboard;
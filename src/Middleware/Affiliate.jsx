import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AffiliateMiddleware = ({children}) => {
    const [affiliator, setAffiliator] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (affiliator === null) {
            let myData = JSON.parse(window.localStorage.getItem('affiliator_data'));
            if (myData === null) {
                navigate('/affiliate/login');
            } else {
                setAffiliator(myData)
            }
        }
    });

    if (affiliator !== null) {
        return children;
    }
}

export default AffiliateMiddleware;
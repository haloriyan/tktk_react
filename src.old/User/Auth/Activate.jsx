import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import config from "../../config";

const Activate = () => {
    const { email } = useParams();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (isLoading) {
            setLoading(false);
            axios.post(`${config.baseUrl}/api/user/activate`, {
                email: email,
            })
            .then(response => {
                let res = response.data;
            })
        }
    })

    return (
        <>
            {email}
        </>
    )
}

export default Activate;
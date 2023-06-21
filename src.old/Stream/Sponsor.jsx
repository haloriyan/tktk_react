import axios from "axios";
import React, { useEffect, useState } from "react";

const Sponsor = ({event, user}) => {
    const [sponsors, setSponsors] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (isLoading && user !== null) {
            setLoading(false);
            axios.post()
            .then(response => {
                let res = response.data;
                setSponsors(res.sponsors);
            })
        }
    });
    
    return (
        <div>
            Sponsor
        </div>
    )
}

export default Sponsor;
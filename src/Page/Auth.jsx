import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import config from "../config";
import LoadingScreen from "../Partials/LoadingScreen";
import { useGoogleLogin } from "@react-oauth/google";

const Auth = () => {
    const { token } = useParams();
    const [isLoading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        document.body.style.backgroundColor = "#fff";
        if (isLoading) {
            setLoading(false);
            axios.post(`${config.baseUrl}/api/user/auth`, {
                token
            })
            .then(response => {
                let res = response.data;
                setUser(res.user);
            })
        }
    })

    const doGoogleLogin = useGoogleLogin({
        onSuccess: tokenResponse => {
            let accessToken = tokenResponse.access_token;
            console.log(accessToken);
            // axios.post("https://oauth2.googleapis.com/token", null, {
            //     client_id: config.google_client_id,
            //     client_secret: config.google_client_secret
            // })
            // .then(response => {
            //     let res = response.data;
            //     console.log(res);
            // })
        },
    })

    if (user === null) {
        <LoadingScreen />
    } else {
        return (
            <>
                <div className="p-2">
                    <h3 className="mt-5 mb-1">Halo, {user.name}</h3>
                    <div>Pilih untuk menghubungkan akun Anda</div>

                    <button onClick={() => doGoogleLogin()} style={{
                        borderWidth: 1,
                        borderStyle: 'solid',
                        borderColor: config.primaryColor,
                        borderRadius: 8,
                        color: config.primaryColor,
                        width: '100%',
                        backgroundColor: '#fff',
                        marginTop: 20
                    }}>
                        Google
                    </button>
                </div>
            </>
        )
    }
}

export default Auth
const CustomerAuthenticate = (token, callback) => {
    axios.post(`${config.baseUrl}/api/user/${username}/customer/auth`, {
        token: myData.token,
    })
    .then(response => {
        let res = response.data;
        console.log(res);
        if (res.status === 200) {
            setCustomer(myData);
            setUser(res.user);
        } else {
            setCustomer('unauthenticated');
        }
    })
}

export default CustomerAuthenticate;
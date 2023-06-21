import React from "react";

const Otp = () => {
    const submit = e => {
        e.preventDefault();
    }
    return (
        <div className="LoginContent flex row item-center">
            <div className="flex column w-60" style={{height: '100%'}}>
                <div className="flex column justify-end grow-1 p-4 bg-red" style={{
                    backgroundImage: `url('/images/auth.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center'
                }}>
                    <div className="text size-42 bold">One Time Password</div>
                </div>
            </div>
            <div className="flex column item-center grow-1 p-4">
                <img src="/images/logo.png" alt="Logo Agendakota" className="h-50 mb-3" />

                <form action="#" onSubmit={submit}>
                    <input type="text" className="spacing-3 text center" />
                    <button className="mt-2 primary w-100">Verifikasi</button>
                </form>
            </div>
        </div>
    )
}

export default Otp;
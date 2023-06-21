import React from "react";
import Header from "../components/Header";
import banks from "../components/Banks";

const Payment = () => {
    return (
        <>
            <Header />
            <div className="content page">
                <div className="flex row justify-center">
                    <div className="w-70 mt-2">
                        <div className="text muted mb-1">Transfer Bank</div>
                        <div className="flex row gap-20 wrap">
                            {
                                banks.map((bank, b) => {
                                    if (bank.type === "bank") {
                                        return (
                                            <div className="bordered rounded flex column grow-1 basis-4 rounded">
                                                <img src={bank.image} alt={bank.code} className="rounded cover w-100" />
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                        <div className="text muted mb-1 mt-2">Dompet Digital</div>
                        <div className="flex row gap-20 wrap">
                            {
                                banks.map((bank, b) => {
                                    if (bank.type === "ewallet") {
                                        return (
                                            <div className="bordered rounded flex column basis-4 rounded">
                                                <img src={bank.image} alt={bank.code} className="rounded cover w-100" />
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Payment;
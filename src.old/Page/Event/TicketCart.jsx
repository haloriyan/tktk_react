import React, { useState } from "react";
import { AiOutlineMinus } from "react-icons/ai";
import Currency from "../../components/Currency";
import styles from "../../styles/Event/TicketCart.module.css";

const TicketCart = ({onDismiss, items, setItems, onOrder}) => {
    const quantityOptions = [1,2,3,4,5];

    return (
        <div className={`fixed right-5 w-35 bottom-10 ${styles.TicketCart}`}>
            <div className="bg-primary rounded-top-left rounded-top-right h-50 flex row item-center pl-2 pr-2">
                <h4 className="m-0 flex grow-1">Tiket Saya</h4>
                <div className="pointer" onClick={() => onDismiss()}>
                    <AiOutlineMinus />
                </div>
            </div>
            <div className={`${styles.TicketCartContent} p-2`}>
                {
                    items.map((item, i) => (
                        <div className="flex row item-center" key={i}>
                            <div className="flex column grow-1">
                                <div className="text bold">{item.name}</div>
                                <div className="flex row">
                                    <div className="text primary small">{Currency(item.total_price).encode()}</div>
                                </div>
                            </div>
                            <div className="flex row ml-1">
                                <select name="quantity" id="quantity" className="h-30 m-0 p-0 pl-1 pr-1" onChange={e => {
                                    let ticks = [...items];
                                    ticks[i]['quantity'] = e.currentTarget.value;
                                    ticks[i]['total_price'] = ticks[i].price * e.currentTarget.value;
                                    setItems(ticks);
                                }}>
                                    {
                                        quantityOptions.map((qty, q) => (
                                            <option key={q} value={qty} selected={qty == item.quantity ? true : false}>{qty}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                    ))
                }

                <div className="mt-2 pt-1 border top">
                    <button className="small mt-2 w-100 primary" onClick={() => onOrder()}>Pesan Tiket</button>
                </div>
            </div>
        </div>
    )
}

export default TicketCart;
import React from "react";
import Currency from "./Currency";
import styles from './styles/Tiket.module.css';
import { BiMinus, BiPlus, BiTrash } from "react-icons/bi";

const Tiket = ({ticket, onBuy, cart, setCart, openCart = null, index = 0}) => {
    const isExists = id => {
        let toReturn = null;
        cart.forEach(item => {
            if (item.ticket_id === id) {
                toReturn = item;
            }
        });
        return toReturn;
    }

    const setQuantity = (action = 'increase') => {
        let ca = [...cart];
        let q = 0;
        let isChanged = false;
        if (action === 'increase') {
            if (ca[index].quantity < 5) {
                q = ca[index].quantity + 1;
                ca[index].quantity = q;
                isChanged = true;
            }
        } else {
            if (ca[index].quantity > 0) {
                q = ca[index].quantity - 1;
                ca[index].quantity = q;
                isChanged = true;
            }
        }
        if (isChanged) {
            let newPrice = q * ca[index].price;
            ca[index].total_price = newPrice;
        }
        setCart(ca);
    }

    return (
        <div className={`relative bordered rounded-more flex column grow-1 p-2 pl-4 pr-4 ${styles.ticket}`}>
            <h3 className="m-0">{ticket.name}</h3>
            <div className="text">{ticket.description}</div>
            <div className="flex row">
                <div className={`${styles.Circle} ${styles.CircleLeft}`}>
                    <img src="/images/HalfCircle.svg" alt="" />
                </div>
                <div className="border bottom h-05 mb-1 mt-1 flex grow-1"></div>
                <div className={`${styles.Circle} ${styles.CircleRight}`}>
                    <img src="/images/HalfCircle.svg" alt="" />
                </div>
            </div>
            <div className="flex row item-center">
                <div className="text bold primary flex grow-1 mr-1">{Currency(ticket.price).encode()}</div>
                {
                    cart[index].quantity > 0 ?
                    <div className="flex row item-center">
                        <div className={`h-40 rounded ratio-1-1 border text primary pointer flex row item-center justify-center ${cart[index].quantity === 1 ? 'bg-primary' : ''}`} onClick={() => setQuantity('decrease')}>
                            {cart[index].quantity === 1 ? <BiTrash color="#fff" /> : <BiMinus />}
                        </div>
                        <div className="ml-3 mr-3">{cart[index].quantity}</div>
                        <div className={`h-40 rounded ratio-1-1 border text primary pointer flex row item-center justify-center`} onClick={() => setQuantity('increase')}>
                            <BiPlus />
                        </div>
                    </div>
                    :
                    <div className="bg-primary rounded pointer p-05 pl-2 pr-2" onClick={() => setQuantity('increase')}>
                        Beli
                    </div>
                }
            </div>
        </div>
    )
}

export default Tiket;
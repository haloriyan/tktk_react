import React from "react";
import styles from "./styles/BottomNav.module.css";
import { BiCart, BiConversation, BiFile, BiHome, BiShoppingBag, BiUser } from "react-icons/bi";
import config from "../config";

const BottomNav = ({active = 'home', username = 'halo', accent_color = config.primaryColor}) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 flex column item-center pb-1" style={{zIndex: 3}}>
            <div className={`bg-white flex row item-center h-70 ${styles.BottomNav}`}>
                <a href={`/${username}`} className={`${styles.NavItem} flex column grow-1 item-center`}>
                    <BiHome size={20} color={active === 'home' ? accent_color : '#555'} />
                    <div className={`text small-2 mt-05`} style={{color: active === 'home' ? accent_color : '#555'}}>Home</div>
                </a>
                <a href={`/${username}/chat`} className={`${styles.NavItem} flex column grow-1 item-center`}>
                    <BiConversation size={20} color={active === 'chat' ? accent_color : '#555'} />
                    <div className={`text small-2 mt-05`} style={{color: active === 'chat' ? accent_color : '#555'}}>Chat</div>
                </a>
                <a href={`/${username}/cart`} className={`${styles.NavItem} flex column grow-1 item-center`}>
                    <BiCart size={20} color={active === 'cart' ? accent_color : '#555'} />
                    <div className={`text small-2 mt-05`} style={{color: active === 'cart' ? accent_color : '#555'}}>Keranjang</div>
                </a>
                <a href={`/${username}/me`} className={`${styles.NavItem} flex column grow-1 item-center`}>
                    <BiUser size={20} color={active === 'me' ? accent_color : '#555'} />
                    <div className={`text small-2 mt-05`} style={{color: active === 'me' ? accent_color : '#555'}}>Saya</div>
                </a>
            </div>
        </div>
    )
}

export default BottomNav;
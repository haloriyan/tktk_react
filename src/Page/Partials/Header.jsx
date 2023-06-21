import React from "react";
import styles from "./styles/Header.module.css";
import { MdExpandMore } from "react-icons/md";
import { BiBox, BiHome, BiMessage, BiPhoneCall, BiStats } from "react-icons/bi";

const Header = ({title, parent = 'home'}) => {
    return (
        <div className={`fixed top-0 left-0 right-0 h-70 border bottom grey flex row item-center ${styles.Header}`}>
            <a href="/halo">
                <img src="/images/logo.png" alt="Logo Takotoko Header" className="h-40" />
            </a>
            <nav className={`flex grow-1 item-center ml-4 ${styles.MenuWrapper}`}>
                <a href="/" className={`${styles.MenuItem} text ${parent === 'home' ? 'primary bold border bottom-2' : 'black'}`}>
                    <li className={styles.MenuText}>Home</li>
                </a>
                <a href="/" className={`${styles.MenuItem} text ${parent === 'about' ? 'primary bold border bottom-2' : 'black'}`}>
                    <li className={styles.MenuText}>About</li>
                </a>
                <a href="#" className={`${styles.MenuItem} text ${parent === 'solution' ? 'primary bold border bottom-2' : 'black'}`}>
                    <li className={styles.MenuText}>Solusi
                        <MdExpandMore className={styles.MenuMore} />
                        <ul className={`${styles.SubMenuWrapper} fixed m-0 p-0`}>
                            <a href="/solution/advanced-analytic" className={`${styles.SubMenuItem} text black`}>
                                <div className="h-50 bg-blue transparent rounded-max ratio-1-1 centerize mr-2">
                                    <BiStats size={22} />
                                </div>
                                <div className="flex column grow-1">
                                    <li className={`${styles.MenuText} text bold`}>Advanced Analytic</li>
                                    <div className="text small muted">Cari tahu produk yang paling diminati</div>
                                </div>
                            </a>
                            <a href="/solution/artificial-care" className={`${styles.SubMenuItem} text black`}>
                                <div className="h-50 bg-blue transparent rounded-max ratio-1-1 centerize mr-2">
                                    <BiMessage size={22} />
                                </div>
                                <div className="flex column grow-1">
                                    <li className={`${styles.MenuText} text bold`}>Artificial Care</li>
                                    <div className="text small muted">Balas chat pelanggan secara otomatis</div>
                                </div>
                            </a>
                            <a href="/solution/product-management" className={`${styles.SubMenuItem} text black`}>
                                <div className="h-50 bg-blue transparent rounded-max ratio-1-1 centerize mr-2">
                                    <BiBox size={22} />
                                </div>
                                <div className="flex column grow-1">
                                    <li className={`${styles.MenuText} text bold`}>Product Management</li>
                                    <div className="text small muted">Kelola Produk dari Satu Perangkat</div>
                                </div>
                            </a>
                            <a href="/solution/customer-relation" className={`${styles.SubMenuItem} text black`}>
                                <div className="h-50 bg-blue transparent rounded-max ratio-1-1 centerize mr-2">
                                    <BiMessage size={22} />
                                </div>
                                <div className="flex column grow-1">
                                    <li className={`${styles.MenuText} text bold`}>Customer Relation</li>
                                    <div className="text small muted">Engage dan Follow Up Pelanggan</div>
                                </div>
                            </a>
                        </ul>
                    </li>
                </a>
                <a href="/pricing" className={`${styles.MenuItem} text ${parent === 'pricing' ? 'primary bold border bottom-2' : 'black'}`}>
                    <li className={styles.MenuText}>Harga</li>
                </a>
            </nav>
            <button className="primary rounded small">
                Download App
            </button>
        </div>
    )
}

export default Header;
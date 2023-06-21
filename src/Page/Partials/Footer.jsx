import React from "react";
import styles from "./styles/Footer.module.css";
import { BiEnvelope } from "react-icons/bi";
import { MdWhatsapp } from "react-icons/md";

const Footer = () => {
    return (
        <footer className={styles.Footer}>
            <div className={styles.Brand}>
                <img src="/images/logo.png" alt="Logo Takotoko" className={styles.BrandImage} />
                <div className="mt-2 mb-1 text size-20">PT TAKOTOKO NIAGA DARING</div>
                <div className="mb-2 text size-14">Jalan Bumiarjo 5 No. 4, Surabaya, Indonesia</div>
                <a href="mailto:takotoko.com@gmail.com" className="flex row item-center">
                    <BiEnvelope size={16} color="#999" />
                    <div className="text ml-1 size-14 muted">takotoko.com@gmail.com</div>
                </a>
                <a href="https://wa.me/6285159772902?text=Halo+takotoko" className="flex row item-center mt-1" target="_blank">
                    <MdWhatsapp size={16} color="#999" />
                    <div className="text ml-1 size-14 muted">+62 851 5977 2902</div>
                </a>
            </div>
            <div className={styles.Section}>
                <div className="text bold mb-2">PERUSAHAAN</div>
                <a href="/about" className="text black">
                    <li className={styles.LinkItem}>Tentang</li>
                </a>
                <a href="/terms" className="text black">
                    <li className={styles.LinkItem}>Kebijakan & Aturan Layanan</li>
                </a>
                <a href="/contact" className="text black">
                    <li className={styles.LinkItem}>Hubungi</li>
                </a>
            </div>
            <div className={styles.Section}>
                <div className="text bold mb-2">SOLUSI</div>
                <a href="/solution/advanced-analytic" className="text black">
                    <li className={styles.LinkItem}>Advanced Analytic</li>
                </a>
                <a href="#" className="text black">
                    <li className={styles.LinkItem}>Artificial Care</li>
                </a>
                <a href="/solution/product-management" className="text black">
                    <li className={styles.LinkItem}>Product Management</li>
                </a>
                <a href="/solution/customer-relation" className="text black">
                    <li className={styles.LinkItem}>Customer Relation</li>
                </a>
            </div>
            <div className={styles.Section}>
                <div className="text bold mb-2">SUMBER DAYA</div>
                <a href="https://blog.takotoko.com" target="_blank" className="text black">
                    <li className={styles.LinkItem}>Blog</li>
                </a>
                <a href="#" className="text black">
                    <li className={styles.LinkItem}>Help Center</li>
                </a>
            </div>
        </footer>
    )
}

export default Footer;
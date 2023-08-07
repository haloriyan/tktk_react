import React, { useState } from "react";
import Header from "./Partials/Header";
import { BiDownArrow, BiDownArrowAlt, BiHome } from "react-icons/bi";
import Footer from "./Partials/Footer";
import styles from "../styles/Page/Terms.module.css";

const Terms = () => {
    const [active, setActive] = useState(true);

    return (
        <>
            <Header parent="terms" />
            <div className={`fixed left-0 right-0 bg-white border bottom h-60 flex row item-center pl-2 pr-2 ${styles.NavigationIndicator}`} style={{top: 60}} onClick={() => {
                setActive(!active);
            }}>
                <div className="flex grow-1">Indicator Name</div>
                <BiDownArrow />
            </div>
            <div className={`fixed left-0 w-20 bg-white p-2 ${styles.LeftNavigator}`} style={{top: 120, marginTop: active ? 0 : -1000}}>
                <a href="#" className={`flex row item-center text black mb-1 ${styles.NavigatorItem}`}>
                    <div className={`h-5 rounded-max ratio-1-1 bg-black ${styles.NavigatorBullet}`}></div>
                    <div className="text ml-1 size-14">Definisi</div>
                </a>
                <a href="#" className={`flex row item-center text black mb-1 ${styles.NavigatorItem}`}>
                    <div className={`h-5 rounded-max ratio-1-1 bg-black ${styles.NavigatorBullet}`}></div>
                    <div className="text ml-1 size-14">Biaya</div>
                </a>
                <a href="#" className={`flex row item-center text black mb-1 ${styles.NavigatorItem}`}>
                    <div className={`h-5 rounded-max ratio-1-1 bg-black ${styles.NavigatorBullet}`}></div>
                    <div className="text ml-1 size-14">Kekayaan Intelektual</div>
                </a>
                <a href="#" className={`flex row item-center text black mb-1 ${styles.NavigatorItem}`}>
                    <div className={`h-5 rounded-max ratio-1-1 bg-black ${styles.NavigatorBullet}`}></div>
                    <div className="text ml-1 size-14">Hal-hal yang Dilarang</div>
                </a>
                <a href="#" className={`flex row item-center text black mb-1 ${styles.NavigatorItem}`}>
                    <div className={`h-5 rounded-max ratio-1-1 bg-black ${styles.NavigatorBullet}`}></div>
                    <div className="text ml-1 size-14">Batasan Tanggung Jawab</div>
                </a>
            </div>
            <div className={`absolute bottom-0 left-0 right-0 ${styles.TermContent}`}>
                <div className="flex row">
                    <div className={`flex column w-20 ${styles.Gapper}`}></div>
                    <div className={`flex column ${styles.InnerContent}`}>
                        <h2 className="text size-36 m-0">Ketentuan Penggunaan</h2>
                        <div className="text size-16 lh-30 mt-2">
                            Dengan menggunakan Takotoko, Anda berarti setuju dengan seluruh ketentuan penggunaan dan sanksi yang berlaku yang disebut pada halaman ini. Segala perubahan yang ada
                            pada laman ini akan diubah secara berkala dan Anda akan mendapat notifikasi mengenai perubahan yang ada pada ketentuan penggunaan kami.
                        </div>
                        <h3 className="text size-24 mb-0">1. Definisi</h3>
                        <div className="text size-16 lh-30 mt-2">
                            1.1. "Takotoko" adalah platform yang menawarkan aplikasi untuk mendukung operasional toko online yang dapat berupa aplikasi mobile maupun situs web dan selanjutnya dapat disebut sebagai "Kami"
                        </div>
                        <div className="text size-16 lh-30 mt-2">
                            1.2. "Anda" adalah pengguna platform Takotoko yang mengakses situs dan aplikasi baik yang telah terdaftar sebagai Toko Online maupun pengunjung halaman landing page Kami; Selanjutnya dapat disebut sebagai "Toko" / "Pengguna"
                        </div>
                        <div className="text size-16 lh-30 mt-2">
                            1.3. "Pelanggan" adalah orang yang mengunjung dan/atau bertransaksi pada toko yang terdaftar di platform Takotoko
                        </div>
                        <div className="text size-16 lh-30 mt-2">
                            1.4. "Konten" adalah segala informasi yang dapat berbentuk data, teks, gambar, grafik, audio, video, atau materi lainnya.
                        </div>
                        <div className="text size-16 lh-30 mt-2 ml-4">
                            1.4.1. "Konten" diartikan sebagaimana yang disebutkan pada poin 1.4 dan dibuat oleh Tim Kami
                        </div>
                        <div className="text size-16 lh-30 mt-2 ml-4">
                            1.4.2. "Konten Anda" diartikan sebagaimana yang disebutkan pada poin 1.4 dan dibuat oleh Pengguna
                        </div>
                        
                        <h3 className="text size-24 mb-0">This is Sub-Title</h3>
                        <div className="text size-16 lh-30 mt-2">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos, corporis. Id quis, ducimus modi delectus voluptates harum temporibus laudantium maxime soluta eum dolore! Consequuntur veniam sint vero dolor nihil accusantium!
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium ex in fuga ut blanditiis repudiandae minus. Fugiat, et error reprehenderit vel laborum suscipit nam a saepe aut laudantium maiores corporis.
                        </div>
                        <div className="text size-16 lh-30 mt-2">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos, corporis. Id quis, ducimus modi delectus voluptates harum temporibus laudantium maxime soluta eum dolore! Consequuntur veniam sint vero dolor nihil accusantium!
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium ex in fuga ut blanditiis repudiandae minus. Fugiat, et error reprehenderit vel laborum suscipit nam a saepe aut laudantium maiores corporis.
                        </div>
                    </div>
                </div>

                <div className="h-150"></div>
                <Footer />
            </div>
        </>
    )
}

export default Terms;
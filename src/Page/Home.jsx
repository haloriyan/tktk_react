import React, { useEffect } from "react";
import styles from "../styles/Page/Home.module.css";
import Header from "./Partials/Header";
import Footer from "./Partials/Footer";
import { BiBox, BiCar, BiGroup, BiMessage, BiStats, BiWallet } from "react-icons/bi";
import FAQ from "../components/FAQ.jsx";
import CTA from "./Partials/CTA";

const HomePage =() => {
    useEffect(() => {
        document.title = "Takotoko";
    }, []);
    return (
        <>
            <Header />
            <div className="absolute left-0 right-0" style={{top: 70}}>
                <div className={`bg-white flex row item-center h-650 pl-4 pr-4 ${styles.TopSection}`}>
                    <div className={`flex column grow-1 ${styles.TopSectionInfo}`}>
                        <h2 className={`text size-46 mt-1 mb-0 ${styles.TopTitle}`}>
                            Buat Website Toko Online untuk Jualan, Gratis!
                        </h2>
                        <div className={`text size-20 lh-35 mt-2 weight-300 ${styles.TopDescription}`}>
                            Lupakan jasa pembuatan website dengan harga mahal. Kamu bisa membuat toko online profesional sendiri dengan visual seperti aplikasi. Daftar dan Tambahkan Produk untuk langsung mulai jualanmu.
                        </div>

                        <div className="flex row mt-4">
                            <button className="primary">Coba Sekarang</button>
                        </div>
                    </div>
                    <img src="/images/customer-relation.png" alt="Customer Relation" className={styles.TopIllustration} />
                </div>

                <div className={`${styles.AboutSection} ${styles.Section} flex row gap-20 mt-5 mb-0`}>
                    <div className={`flex column ${styles.AboutLeft}`}>
                        <h3 className={`mt-0 text size-36 ${styles.AboutTitle}`}>Satu Solusi UMKM <br /> dan Bisnis Digital</h3>
                        <div className="w-20 h-5 rounded-max bg-primary"></div>
                    </div>
                    <div className={`flex column grow-1 ${styles.AboutRight}`}>
                        <div className={`text size-20 lh-35 weight-300 ${styles.AboutDescription}`}>
                            Bangun toko online hanya dalam hitungan menit dan mulai jualan berbagai jenis produk dan jasa. Kamu bisa menjual produk fisik maupun digital dengan mudah.
                            Kamu juga bisa mengoptimalkan penjualan hanya dari satu aplikasi dan layani pelangganmu secara otomatis.
                        </div>
                    </div>
                </div>
                <div className={`${styles.Section} mb-5`}>
                    <div className={styles.FeatureBoxWrapper}>
                        <a href="/solution/product-management" className={styles.FeatureBox}>
                            <div className="h-80 ratio-1-1 rounded-max bg-primary transparent centerize">
                                <BiBox size={32} />
                            </div>
                            <div className="flex column grow-1 ml-2">
                                <h4 className="m-0 text bold size-18">Product Management</h4>
                                <div className="mt-1 text small muted">Kelola Produk dari Satu Perangkat</div>
                            </div>
                        </a>
                        <a href="/solution/artificial-care" className={styles.FeatureBox}>
                            <div className="h-80 ratio-1-1 rounded-max bg-primary transparent centerize">
                                <BiMessage size={32} />
                            </div>
                            <div className="flex column grow-1 ml-2">
                                <h4 className="m-0 text bold size-18">Artificial Care</h4>
                                <div className="mt-1 text small muted">Otomatis Balas Chat dari Pelanggan</div>
                            </div>
                        </a>
                        <a href="#" className={styles.FeatureBox}>
                            <div className="h-80 ratio-1-1 rounded-max bg-primary transparent centerize">
                                <BiStats size={32} />
                            </div>
                            <div className="flex column grow-1 ml-2">
                                <h4 className="m-0 text bold size-18">Alat Beriklan</h4>
                                <div className="mt-1 text small muted">Terintegrasi dengan Google & Facebook Ads</div>
                            </div>
                        </a>
                        <a href="/solution/customer-relation" className={styles.FeatureBox}>
                            <div className="h-80 ratio-1-1 rounded-max bg-primary transparent centerize">
                                <BiGroup size={32} />
                            </div>
                            <div className="flex column grow-1 ml-2">
                                <h4 className="m-0 text bold size-18">Customer Relation</h4>
                                <div className="mt-1 text small muted">Cari Tahu Produk yang Diminati</div>
                            </div>
                        </a>
                        <a href="/solution/payment-gateway" className={styles.FeatureBox}>
                            <div className="h-80 ratio-1-1 rounded-max bg-primary transparent centerize">
                                <BiWallet size={32} />
                            </div>
                            <div className="flex column grow-1 ml-2">
                                <h4 className="m-0 text bold size-18">Pembayaran Multi Channel</h4>
                                <div className="mt-1 text small muted">Terima Pembayaran dari Berbagai Bank dan Dompet Digital</div>
                            </div>
                        </a>
                        <a href="/solution/shipping" className={styles.FeatureBox}>
                            <div className="h-80 ratio-1-1 rounded-max bg-primary transparent centerize">
                                <BiCar size={32} />
                            </div>
                            <div className="flex column grow-1 ml-2">
                                <h4 className="m-0 text bold size-18">Integrasi Ongkos Kirim</h4>
                                <div className="mt-1 text small muted">Hitung dan Tambahkan Ongkir ke Tagihan Secara Otomatis</div>
                            </div>
                        </a>
                    </div>

                    <div className="h-40"></div>
                </div>
                <div className={`${styles.Section} bg-whites flex column item-center`}>
                    <h3 className="m-0 text center size-36">Jualan Online itu Gampang!</h3>
                    <div className="w-100 text center mb-5 mt-1">Beneran Gampang! Ini ibarat berhitung. Mari kita coba</div>
                    <div className={`flex row item-center gap-10 w-100 ${styles.StepWrapper}`}>
                        <div className={`flex column item-center basis-4 grow-1 bg-white p-2 rounded-more border bottom-6 primary transparent ${styles.StepItem}`}>
                            <div className="h-50 text bold size-22 mb-1 rounded-max ratio-1-1 centerize bg-primary">1</div>
                            <img src="/images/illustration/chatting.png" className="w-100 mb-2" />
                            <h4 className="m-0 text center mt-1">Install Takotoko dari Google Play</h4>
                        </div>
                        <div className="bg-primary h-5 rounded-max rotate-z-145" style={{width: 90}}></div>
                        <div className={`flex column item-center basis-4 grow-1 bg-white p-2 rounded-more border bottom-6 primary transparent ${styles.StepItem}`}>
                            <div className="h-50 text bold size-22 mb-1 rounded-max ratio-1-1 centerize bg-primary">2</div>
                            <img src="/images/illustration/chatting.png" className="w-100 mb-2" />
                            <h4 className="m-0 text center mt-1">Isikan Data Tokomu saat Mendaftar</h4>
                        </div>
                        <div className="bg-primary h-5 rounded-max rotate-z-45" style={{width: 90}}></div>
                        <div className={`flex column item-center basis-4 grow-1 bg-white p-2 rounded-more border bottom-6 primary transparent ${styles.StepItem}`}>
                            <div className="h-50 text bold size-22 mb-1 rounded-max ratio-1-1 centerize bg-primary">3</div>
                            <img src="/images/illustration/chatting.png" className="w-100 mb-2" />
                            <h4 className="m-0 text center mt-1">Tambahkan Produk Pertamamu</h4>
                        </div>
                        <div className="bg-primary h-5 rounded-max rotate-z-145" style={{width: 90}}></div>
                        <div className={`flex column item-center basis-4 grow-1 bg-white p-2 rounded-more border bottom-6 primary transparent ${styles.StepItem}`}>
                            <div className="h-50 text bold size-22 mb-1 rounded-max ratio-1-1 centerize bg-primary">4</div>
                            <img src="/images/illustration/chatting.png" className="w-100 mb-2" />
                            <h4 className="m-0 text center mt-1">Bagikan Link Toko dan Mulai Jualan</h4>
                        </div>
                    </div>
                </div>

                {/* 

                
                <div className="h-80"></div>
                <div className={`${styles.Section} bg-white flex column item-center`}>
                    <div className="h-40"></div>
                    <h3 className="mt-0 text center size-36">Frequently Asked Question</h3>
                    <FAQ />
                </div>

                */}
                <CTA />

                <Footer />
            </div>
        </>
    )
}

export default HomePage;
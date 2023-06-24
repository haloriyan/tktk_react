import React, { useEffect } from "react";
import styles from "../../styles/Page/CustomerRelation.module.css";
import Header from "../Partials/Header";
import Footer from "../Partials/Footer";
import config from "../../config";

const ArtificialCareSolution =() => {
    useEffect(() => {
        document.title = `Artificial Care - ${config.app_name}`
    }, []);
    return (
        <>
            <Header parent="solution" />
            <div className="absolute left-0 right-0" style={{top: 65}}>
                <div className={`bg-white flex row item-center h-650 pl-4 pr-4 ${styles.TopSection}`}>
                    <div className={`flex column grow-1 w-50 ${styles.TopSectionInfo}`}>
                        <div className="text small primary">Solusi &gt; Artificial Care</div>
                        <h2 className={`text size-46 mt-1 ${styles.TopSectionTitle}`}>Gak Perlu Lagi Sibuk Balas Chat Satu per Satu</h2>

                        <div className="flex ro">
                            <button className="primary">Coba Sekarang</button>
                        </div>
                    </div>
                    <img src="/images/illustration/chatting.png" alt="Artificial Care" className={styles.TopIllustration} />
                </div>

                <div className={`flex ${styles.Section}`}>
                    <img src="/images/woman-free.jpg" alt="Bebas Admin" className={`w-40 ratio-4-3 cover rounded-more ${styles.SectionImage}`} />
                    <div className={styles.SectionSpacer}></div>
                    <div className={`flex column grow-1 ${styles.SectionInfo}`}>
                        <div className="h-5 w-25 bg-primary rounded-max mb-2"></div>
                        <h3 className="text size-32 mt-0">Balas Chat Pelanggan Secara Otomatis</h3>
                        <div className="lh-30 text size-18 weight-300">Kamu akan memiliki penjaga toko virtual yang siap menjawab segala pertanyaan pelanggan secara langsung.</div>
                        <div className="text size-18 weight-300 lh-30 mt-2">
                            Kamu juga bisa mengunduh laporan percakapan setiap pelanggan apabila memerlukannya.
                        </div>
                    </div>
                </div>

                <div className={`flex ${styles.SectionReversed}`}>
                    <img src="/images/withdraw.jpg" alt="Withdraw" className={`w-40 ratio-4-3 cover rounded-more ${styles.SectionImage}`} />
                    <div className={styles.SectionSpacer}></div>
                    <div className={`flex column grow-1 ${styles.SectionInfo}`}>
                        <div className="h-5 w-25 bg-primary rounded-max mb-2"></div>
                        <h3 className="text size-32 mt-0">Transaksi dari Chat</h3>
                        <div className="lh-30 text size-18 weight-300">Pelanggan bahkan bisa membeli produk yang mereka sukai hanya dengan mengchat penjaga toko virtualmu.</div>
                        <div className="text size-18 weight-300 lh-30 mt-2">
                            Mereka dapat menanyakan produk, menambahkannya ke keranjang, hingga melakukan checkout pesanan dibantu oleh virtual assistant ini.
                        </div>
                    </div>
                </div>

                <div className={`flex ${styles.Section}`}>
                    <img src="/images/woman-free.jpg" alt="Bebas Admin" className={`w-40 ratio-4-3 cover rounded-more ${styles.SectionImage}`} />
                    <div className={styles.SectionSpacer}></div>
                    <div className={`flex column grow-1 ${styles.SectionInfo}`}>
                        <div className="h-5 w-25 bg-primary rounded-max mb-2"></div>
                        <h3 className="text size-32 mt-0">Personalisasi Asisten</h3>
                        <div className="lh-30 text size-18 weight-300">Ubah nama dan foto penjaga toko virtualmu agar pelanggan merasa nyaman dan tidak terasa seperti berbicara dengan robot.</div>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    )
}

export default ArtificialCareSolution;
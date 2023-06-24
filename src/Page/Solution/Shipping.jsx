import { useEffect } from "react";
import styles from "../../styles/Page/CustomerRelation.module.css";
import Footer from "../Partials/Footer";
import Header from "../Partials/Header";
import config from "../../config";

const ShippingSolution = () => {
    useEffect(() => {
        document.title = `Shipping Solution - ${config.app_name}`
    }, [])
    return (
        <>
            <Header parent="solution" />
            <div className="absolute left-0 right-0" style={{top: 65}}>
                <div className={`bg-white flex row item-center h-650 pl-4 pr-4 ${styles.TopSection}`}>
                    <div className={`flex column grow-1 w-50 ${styles.TopSectionInfo}`}>
                        <div className="text small primary">Solusi &gt; Shipping</div>
                        <h2 className={`text size-46 mt-1 ${styles.TopSectionTitle}`}>Kirim Pesanan ke Seluruh Indonesia Lebih Mudah</h2>

                        <div className="flex ro">
                            <button className="primary">Coba Sekarang</button>
                        </div>
                    </div>
                    <img src="/images/illustration/chatting.png" alt="Shipping" className={styles.TopIllustration} />
                </div>

                <div className={`flex ${styles.Section}`}>
                    <img src="/images/woman-free.jpg" alt="Bebas Admin" className={`w-40 ratio-4-3 cover rounded-more ${styles.SectionImage}`} />
                    <div className={styles.SectionSpacer}></div>
                    <div className={`flex column grow-1 ${styles.SectionInfo}`}>
                        <div className="h-5 w-25 bg-primary rounded-max mb-2"></div>
                        <h3 className="text size-32 mt-0">Kalkulasi Ongkos Kirim Secara Otomatis</h3>
                        <div className="lh-30 text size-18 weight-300">Dapatkan biaya pengiriman ke seluruh Indonesia menggunakan berbagai ekspedisi dan kurir paling andal.</div>
                        <div className="text size-18 weight-300 lh-30 mt-2">
                            Hitung ongkos kirim dan masukkan ke dalam tagihan pelanggan secara otomatis saat checkout pesanan.
                        </div>
                    </div>
                </div>

                <div className={`flex ${styles.SectionReversed}`}>
                    <img src="/images/withdraw.jpg" alt="Withdraw" className={`w-40 ratio-4-3 cover rounded-more ${styles.SectionImage}`} />
                    <div className={styles.SectionSpacer}></div>
                    <div className={`flex column grow-1 ${styles.SectionInfo}`}>
                        <div className="h-5 w-25 bg-primary rounded-max mb-2"></div>
                        <h3 className="text size-32 mt-0">Lacak Pengiriman dengan Mudah</h3>
                        <div className="lh-30 text size-18 weight-300">Setelah memasukkan nomor resi yang kamu dapatkan dari kurir, kamu bisa memantau pesanan yang kamu kirim secara real-time.</div>
                        <div className="text size-18 weight-300 lh-30 mt-2">
                            Ya, pelangganmu juga bisa melacaknya.
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    )
}

export default ShippingSolution;
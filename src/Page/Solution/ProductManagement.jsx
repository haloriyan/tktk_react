import React, { useEffect } from "react";
import styles from "../../styles/Page/CustomerRelation.module.css";
import Header from "../Partials/Header";
import Footer from "../Partials/Footer";
import config from "../../config";

const ProductManagementSolution =() => {
    useEffect(() => {
        document.title = `Product Management - ${config.app_name}`
    }, [])
    return (
        <>
            <Header parent="solution" />
            <div className="absolute left-0 right-0" style={{top: 70}}>
                <div className={`bg-white flex row item-center h-650 pl-4 pr-4 ${styles.TopSection}`}>
                    <div className={`flex column grow-1 w-50 ${styles.TopSectionInfo}`}>
                        <div className="text small primary">Solusi &gt; Product Management</div>
                        <h2 className={`text size-46 mt-1 ${styles.TopSectionTitle}`}>Kelola PRoduk dan Layanan Jasa di Satu Tempat</h2>

                        <div className="flex ro">
                            <button className="primary">Coba Sekarang</button>
                        </div>
                    </div>
                    <img src="/images/illustration/chatting.png" alt="Product Management" className={styles.TopIllustration} />
                </div>

                <div className={`flex ${styles.Section}`}>
                    <img src="/images/report.jpg" alt="Report" className={`w-40 ratio-4-3 cover rounded-more ${styles.SectionImage}`} />
                    <div className={styles.SectionSpacer}></div>
                    <div className={`flex column grow-1 ${styles.SectionInfo}`}>
                        <div className="h-5 w-25 bg-primary rounded-max mb-2"></div>
                        <h3 className="text size-32 mt-0">One Stop Selling</h3>
                        <div className="lh-30 text size-18 weight-300">Kamu bisa menjual berbagai jenis produk sekaligus layanan yang mungkin terkait dengan produkmu secara terpisah, namun masih dalam satu tokomu.</div>
                        <div className="text size-18 weight-300 lh-30 mt-2">
                            Sehingga kamu hanya perlu mengembangkan satu brand daripada mengelola brand yang berbeda untuk produk dan layanannya.
                        </div>
                    </div>
                </div>

                <div className={`flex ${styles.SectionReversed}`}>
                    <img src="/images/finance-report.jpg" alt="Report" className={`w-40 ratio-4-3 cover rounded-more ${styles.SectionImage}`} />
                    <div className={styles.SectionSpacer}></div>
                    <div className={`flex column grow-1 ${styles.SectionInfo}`}>
                        <div className="h-5 w-25 bg-primary rounded-max mb-2"></div>
                        <h3 className="text size-32 mt-0">Atur Varian Produk</h3>
                        <div className="lh-30 text size-18 weight-300">Setiap produk itu unik. Tambahkan variasi dari produk yang kamu jual tanpa mengatur item yang berbeda. Kamu juga bisa mengatur harga yang berbeda untuk setiap variasi produk ini.</div>
                        <div className="text size-18 weight-300 lh-30 mt-2">
                            Kamu dapat melihat laporan yang kamu butuhkan langsung ketika membuka aplikasi. Semuanya tersedia secara lengkap di sana.
                        </div>
                    </div>
                </div>

                <div className={`flex ${styles.Section}`}>
                    <img src="/images/report.jpg" alt="Report" className={`w-40 ratio-4-3 cover rounded-more ${styles.SectionImage}`} />
                    <div className={styles.SectionSpacer}></div>
                    <div className={`flex column grow-1 ${styles.SectionInfo}`}>
                        <div className="h-5 w-25 bg-primary rounded-max mb-2"></div>
                        <h3 className="text size-32 mt-0">Jadwal yang Menyesuaikan Luangmu</h3>
                        <div className="lh-30 text size-18 weight-300">Atur jadwal pelayanan pada hari apa saja dan jam berapa saja orang dapat memesan jasamu.</div>
                        <div className="text size-18 weight-300 lh-30 mt-2">
                            Sehingga kamu hanya perlu mengembangkan satu brand daripada mengelola brand yang berbeda untuk produk dan layanannya.
                        </div>
                    </div>
                </div>

                <div className={`flex ${styles.SectionReversed}`}>
                    <img src="/images/finance-report.jpg" alt="Report" className={`w-40 ratio-4-3 cover rounded-more ${styles.SectionImage}`} />
                    <div className={styles.SectionSpacer}></div>
                    <div className={`flex column grow-1 ${styles.SectionInfo}`}>
                        <div className="h-5 w-25 bg-primary rounded-max mb-2"></div>
                        <h3 className="text size-32 mt-0">Produk Fisik atau Digital? Bukan Soal!</h3>
                        <div className="lh-30 text size-18 weight-300">Kamu bisa menjual produk fisik yang memiliki volume maupun digital yang dapat diakses melalui perangkat elektronik.</div>
                        <div className="text size-18 weight-300 lh-30 mt-2">
                            Kamu atau pelanggan hanya perlu mengupload file yang kalian perlukan untuk kelancaran transaksi.
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    )
}

export default ProductManagementSolution;
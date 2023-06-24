import React, { useEffect } from "react";
import styles from "../../styles/Page/CustomerRelation.module.css";
import Header from "../Partials/Header";
import Footer from "../Partials/Footer";
import config from "../../config";

const AnalyticSolution =() => {
    useEffect(() => {
        document.title = `Advanced Analytic - ${config.app_name}`
    }, [])
    return (
        <>
            <Header parent="solution" />
            <div className="absolute left-0 right-0" style={{top: 60}}>
                <div className={`bg-white flex row item-center h-650 pl-4 pr-4 ${styles.TopSection}`}>
                    <div className={`flex column grow-1 w-50 ${styles.TopSectionInfo}`}>
                        <div className="text small primary">Solusi &gt; Advanced Analytic</div>
                        <h2 className={`text size-46 mt-1 ${styles.TopSectionTitle}`}>Cari Tahu Apa yang Customer Inginkan</h2>

                        <div className="flex ro">
                            <button className="primary">Coba Sekarang</button>
                        </div>
                    </div>
                    <img src="/images/customer-relation.png" alt="Customer Relation" className={styles.TopIllustration} />
                </div>

                <div className={`flex ${styles.Section}`}>
                    <img src="/images/report.jpg" alt="Report" className={`w-40 ratio-4-3 cover rounded-more ${styles.SectionImage}`} />
                    <div className={styles.SectionSpacer}></div>
                    <div className={`flex column grow-1 ${styles.SectionInfo}`}>
                        <div className="h-5 w-25 bg-primary rounded-max mb-2"></div>
                        <h3 className="text size-32 mt-0">Report yang Lengkap</h3>
                        <div className="lh-30 text size-18 weight-300">Menyajikan data dan statistik yang kamu perlukan untuk kebutuhan marketing dan engagement dengan pelanggan</div>
                        <div className="text size-18 weight-300 lh-30 mt-2">
                            Kamu dapat melihat laporan yang kamu butuhkan langsung ketika membuka aplikasi. Semuanya tersedia secara lengkap di sana.
                        </div>
                    </div>
                </div>

                <div className={`flex ${styles.SectionReversed}`}>
                    <img src="/images/finance-report.jpg" alt="Report" className={`w-40 ratio-4-3 cover rounded-more ${styles.SectionImage}`} />
                    <div className={styles.SectionSpacer}></div>
                    <div className={`flex column grow-1 ${styles.SectionInfo}`}>
                        <div className="h-5 w-25 bg-primary rounded-max mb-2"></div>
                        <h3 className="text size-32 mt-0">Rekap Laporan Keuangan</h3>
                        <div className="lh-30 text size-18 weight-300">Lihat bagaimana performa penjualanmu minggu atau bulan ini secara aktual dan spesifik.</div>
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
                        <h3 className="text size-32 mt-0">Siapa dan Dari Mana</h3>
                        <div className="lh-30 text size-18 weight-300">Kamu bisa mengetahui bagaimana orang-orang melihat tokomu, apakah dari sosmed, iklan, atau sumber lain.</div>
                        <div className="text size-18 weight-300 lh-30 mt-2">
                            Dengan begitu kamu dapat mempertimbangkan untuk menghilangkan atau bahkan memboost performa sumber trafikmu.
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    )
}

export default AnalyticSolution;
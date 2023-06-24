import React, { useEffect } from "react";
import Header from "../Partials/Header";
import styles from "../../styles/Page/CustomerRelation.module.css";
import Footer from "../Partials/Footer";
import config from "../../config";

const CustomerRelationSolution =() => {
    useEffect(() => {
        document.title = `Customer Relation - ${config.app_name}`
    }, [])
    return (
        <>
            <Header parent="solution" />
            <div className="absolute left-0 right-0" style={{top: 70}}>
                <div className={`bg-white flex row item-center h-650 pl-4 pr-4 ${styles.TopSection}`}>
                    <div className={`flex column grow-1 w-50 ${styles.TopSectionInfo}`}>
                        <div className="text small primary">Solusi &gt; Customer Relation</div>
                        <h2 className={`text size-46 mt-1 ${styles.TopSectionTitle}`}>Jaga Retensi dan Relasi dengan Pelanggan</h2>

                        <div className="flex ro">
                            <button className="primary">Coba Sekarang</button>
                        </div>
                    </div>
                    <img src="/images/customer-relation.png" alt="Customer Relation" className={styles.TopIllustration} />
                </div>

                <div className={`flex row ${styles.GetKnowSection}`}>
                    <img src="/images/customer.jpg" alt="Customer" className="w-40 ratio-4-3 cover rounded-more" />
                    <div className={styles.SectionSpacer}></div>
                    <div className={`flex column grow-1 ${styles.SectionInfo}`}>
                        <div className="h-5 w-25 bg-primary rounded-max mb-2"></div>
                        <h3 className="text size-32 mt-0">Lebih Kenal dengan Pelanggan</h3>
                        <div className="lh-30 text size-18 weight-300">Kamu bisa mengetahui informasi dasar pelanggan seperti nama, kontak, dan domisili tempat mereka tinggal.</div>
                        <div className="text size-18 weight-300 lh-30 mt-2">
                            Dengan mendengarkan secara aktif dan menganalisis data, bisnis dapat memberikan pengalaman yang personal, meningkatkan kepuasan, dan memperkuat kesuksesan bersama.
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    )
}

export default CustomerRelationSolution;
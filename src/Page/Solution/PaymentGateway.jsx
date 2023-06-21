import banks from "../../components/Banks";
import styles from "../../styles/Page/CustomerRelation.module.css";
import Footer from "../Partials/Footer";
import Header from "../Partials/Header";

const PaymentGatewaySolution = () => {
    return (
        <>
            <Header parent="solution" />
            <div className="absolute left-0 right-0" style={{top: 65}}>
                <div className="bg-white flex row item-center h-650 pl-4 pr-4">
                    <div className="flex column grow-1 w-50">
                        <div className="text small primary">Solusi &gt; Payment Gateway</div>
                        <h2 className="text size-46 mt-1">Terima Pembayaran dari Bank dan Dompet Digital</h2>

                        <div className="flex ro">
                            <button className="primary">Coba Sekarang</button>
                        </div>
                    </div>
                    <img src="/images/illustration/payment-gateway.png" alt="Payment Gateway" className="w-50" />
                </div>

                <div className={`flex ${styles.Section}`}>
                    <img src="/images/woman-free.jpg" alt="Bebas Admin" className={`w-40 ratio-4-3 cover rounded-more ${styles.SectionImage}`} />
                    <div className={styles.SectionSpacer}></div>
                    <div className={`flex column grow-1 ${styles.SectionInfo}`}>
                        <div className="h-5 w-25 bg-primary rounded-max mb-2"></div>
                        <h3 className="text size-32 mt-0">Bebaskan Pelanggan dari Biaya Admin</h3>
                        <div className="lh-30 text size-18 weight-300">Kamu bisa memilih apakah biaya admin akan dibebankan kepada pelanggan atau kamu yang membayarnya.</div>
                        <div className="text size-18 weight-300 lh-30 mt-2">
                            Tapi tenang, biaya admin ini relatif kecil. Hanya mulai dari 3% dari nominal transaksi yang dilakukan oleh pelanggan.
                        </div>
                    </div>
                </div>

                <div className={`flex ${styles.SectionReversed}`}>
                    <img src="/images/withdraw.jpg" alt="Withdraw" className={`w-40 ratio-4-3 cover rounded-more ${styles.SectionImage}`} />
                    <div className={styles.SectionSpacer}></div>
                    <div className={`flex column grow-1 ${styles.SectionInfo}`}>
                        <div className="h-5 w-25 bg-primary rounded-max mb-2"></div>
                        <h3 className="text size-32 mt-0">Withdraw Kapan Saja</h3>
                        <div className="lh-30 text size-18 weight-300">Tarik dana yang kamu hasilkan dari tokomu kapan saja tanpa proses panjang dan ribet.</div>
                        <div className="text size-18 weight-300 lh-30 mt-2">
                            Kamu hanya perlu menambahkan dan memilih rekening untuk menerima pendapatan yang memakan waktu kurang dari satu jam.
                        </div>
                    </div>
                </div>

                <div className={`flex ${styles.Section}`}>
                    <img src="/images/atm-use.jpg" alt="ATM Use" className={`w-40 ratio-4-3 cover rounded-more ${styles.SectionImage}`} />
                    <div className={styles.SectionSpacer}></div>
                    <div className={`flex column grow-1 ${styles.SectionInfo}`}>
                        <div className="h-5 w-25 bg-primary rounded-max mb-2"></div>
                        <h3 className="text size-32 mt-0">Kustomisasi Nama Virtual Account</h3>
                        <div className="lh-30 text size-18 weight-300">Terlihat lebih profesional dengan menampilkan nama tokomu pada layar ATM / Internet Banking ketika pelanggan akan membayar tagihan melalui Transfer Virtual Account.</div>
                    </div>
                </div>

                <div className="p-4 flex column item-center">
                    <h3 className="text size-32 mt-0">Bank dan Dompet Digital yang Didukung</h3>
                    <div className="flex row justify-center wrap gap-20 w-100">
                        <div className={`p-2 flex basis-5 grow-1 ${styles.SectionImage}`}>
                            <img src={banks.va[0].image} alt={banks.va[0].name} className="w-100" />
                        </div>
                        <div className={`p-2 flex basis-5 grow-1 ${styles.SectionImage}`}>
                            <img src={banks.va[1].image} alt={banks.va[1].name} className="w-100" />
                        </div>
                        <div className={`p-2 flex basis-5 grow-1 ${styles.SectionImage}`}>
                            <img src={banks.va[2].image} alt={banks.va[0].name} className="w-100" />
                        </div>
                        <div className={`p-2 flex basis-5 grow-1 ${styles.SectionImage}`}>
                            <img src={banks.va[3].image} alt={banks.va[0].name} className="w-100" />
                        </div>
                    </div>
                    <div className="flex row justify-center wrap gap-20 w-100 mt-2">
                        <div className={`p-2 flex basis-5 grow-1 ${styles.SectionImage}`}>
                            <img src={banks.ewallet[0].image} alt={banks.ewallet[0].name} className="w-100" />
                        </div>
                        <div className={`p-2 flex basis-5 grow-1 ${styles.SectionImage}`}>
                            <img src={banks.ewallet[1].image} alt={banks.ewallet[1].name} className="w-100" />
                        </div>
                        <div className={`p-2 flex basis-5 grow-1 ${styles.SectionImage}`}>
                            <img src={banks.ewallet[2].image} alt={banks.ewallet[2].name} className="w-100" />
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    )
}

export default PaymentGatewaySolution;
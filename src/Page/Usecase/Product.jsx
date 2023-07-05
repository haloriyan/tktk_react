import React from "react";
import Header from "../Partials/Header";
import styles from "../../styles/Page/CustomerRelation.module.css";
import Footer from "../Partials/Footer";
import { BiBox, BiChart, BiPackage, BiReceipt, BiTaxi } from "react-icons/bi";
import config from "../../config";

const ProductUsecase = () => {
    return (
        <>
            <Header parent="usecase" />
            <div className="absolute left-0 right-0" style={{top: 60}}>
                <div className={`bg-white flex row item-center h-650 pl-4 pr-4 ${styles.TopSection}`}>
                    <div className={`flex column grow-1 w-50 ${styles.TopSectionInfo}`}>
                        <div className="text small primary">Usecase &gt; Product Seller</div>
                        <h2 className={`text size-46 mt-1 ${styles.TopSectionTitle}`}>Permudah Pelanggan Membeli Produk di Tokomu</h2>
                        <div className="text size-20 lh-30 mb-4">
                            Ini seperti memiliki aplikasi toko online sendiri dengan fitur selengkap <br /> e-commerce namun tanpa bersaing dengan toko lain.
                        </div>

                        <div className="flex ro">
                            <button className="primary">Coba Sekarang</button>
                        </div>
                    </div>
                    <img src="/images/customer-relation.png" alt="Customer Relation" className={styles.TopIllustration} />
                </div>

                <div className={`${styles.Section} flex row gap-20`}>
                    <div className="bg-primary ratio-1-1 rounded bg-white flex column centerize basis-5 grow-1 p-2">
                        <BiPackage color={'#fff'} size={75} />
                        <div className="mt-2 text bold white center size-18">Atur Stok dari Genggamanmu</div>
                    </div>
                    <div className="bg-primary ratio-1-1 rounded bg-white flex column centerize basis-5 grow-1 p-2">
                        <BiReceipt color={'#fff'} size={75} />
                        <div className="mt-2 text bold white center size-18">Kelola dan Follow Up Order</div>
                    </div>
                    <div className="bg-primary ratio-1-1 rounded bg-white flex column centerize basis-5 grow-1 p-2">
                        <BiChart color={'#fff'} size={75} />
                        <div className="mt-2 text bold white center size-18">Cari Tahu Produk yang Paling Diminati</div>
                    </div>
                    <div className="bg-primary ratio-1-1 rounded bg-white flex column centerize basis-5 grow-1 p-2">
                        <BiTaxi color={'#fff'} size={75} />
                        <div className="mt-2 text bold white center size-18">Hitung Ongkir dan Bebankan Otomatis</div>
                    </div>
                    <div className="bg-primary ratio-1-1 rounded bg-white flex column centerize basis-5 grow-1 p-2">
                        <BiBox color={'#fff'} size={75} />
                        <div className="mt-2 text bold white center size-18">Atur Stok Sistematis</div>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    )
}

export default ProductUsecase;
import React from "react";
import Header from "../Partials/Header";
import styles from "../../styles/Page/CustomerRelation.module.css";
import Footer from "../Partials/Footer";
import { BiBox, BiChart, BiCog, BiMusic, BiNetworkChart, BiPackage, BiReceipt, BiTaxi } from "react-icons/bi";
import config from "../../config";
import { MdCheckroom, MdDinnerDining } from "react-icons/md";

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

                <div className="bg-primary p-4">
                    <div className="h-60"></div>
                    <h3 className="text center size-32 mt-0">Jual Apa Saja Dari Mana Saja.</h3>
                    <div className="flex row centerize gap-20 wrap">
                        <div className="flex column ratio-1-1 bordered rounded p-2 centerize" style={{borderBottomWidth: 8,borderColor: '#fff',height: 160}}>
                            <div className="h-80">
                                <MdCheckroom color={'#fff'} size={60} />
                            </div>
                            <div className="text center small">Fashion</div>
                        </div>
                        <div className="flex column ratio-1-1 bordered rounded p-2 centerize" style={{borderBottomWidth: 8,borderColor: '#fff',height: 160}}>
                            <div className="h-80">
                                <MdDinnerDining color={'#fff'} size={60} />
                            </div>
                            <div className="text center small">Food & Beverage</div>
                        </div>
                        <div className="flex column ratio-1-1 bordered rounded p-2 centerize" style={{borderBottomWidth: 8,borderColor: '#fff',height: 160}}>
                            <div className="h-80">
                                <BiNetworkChart color={'#fff'} size={60} />
                            </div>
                            <div className="text center small">Elektronik</div>
                        </div>
                        <div className="flex column ratio-1-1 bordered rounded p-2 centerize" style={{borderBottomWidth: 8,borderColor: '#fff',height: 160}}>
                            <div className="h-80">
                                <BiCog color={'#fff'} size={60} />
                            </div>
                            <div className="text center small">Alat dan Perkakas</div>
                        </div>
                        <div className="flex column ratio-1-1 bordered rounded p-2 centerize" style={{borderBottomWidth: 8,borderColor: '#fff',height: 160}}>
                            <div className="h-80">
                                <BiMusic color={'#fff'} size={60} />
                            </div>
                            <div className="text center small">Hobi dan Hiburan</div>
                        </div>
                    </div>

                    <div className="h-80"></div>
                </div>

                <div className={`flex ${styles.Section}`}>
                    <img src="/images/woman-free.jpg" alt="Bebas Admin" className={`w-40 ratio-4-3 cover rounded-more ${styles.SectionImage}`} />
                    <div className={styles.SectionSpacer}></div>
                    <div className={`flex column grow-1 ${styles.SectionInfo}`}>
                        <div className="h-5 w-25 bg-primary rounded-max mb-2"></div>
                        <h3 className="text size-32 mt-0">Kelola dan Follow-up Order</h3>
                        <div className="lh-30 text size-18 weight-300">
                            Kami tahu beberapa pelanggan menginginkan produk Anda, tetapi mereka terhalang sesuatu dan belum bisa membayar saat mereka keep order. Maka dari itu kita harus ingatkan kembali agar orderan tidak hilang.
                        </div>
                    </div>
                </div>

                <div className={`flex ${styles.SectionReversed}`}>
                    <img src="/images/withdraw.jpg" alt="Withdraw" className={`w-40 ratio-4-3 cover rounded-more ${styles.SectionImage}`} />
                    <div className={styles.SectionSpacer}></div>
                    <div className={`flex column grow-1 ${styles.SectionInfo}`}>
                        <div className="h-5 w-25 bg-primary rounded-max mb-2"></div>
                        <h3 className="text size-32 mt-0">Cari Tahu Produk yang Paling Diminati!</h3>
                        <div className="lh-30 text size-18 weight-300">Anda dapat mengetahui produk mana saja yang sering dilihat oleh pelanggan. Dengan ini Anda bisa mengoptimalkan budget kampanye beriklan.</div>
                    </div>
                </div>

                <div className={`flex ${styles.Section}`}>
                    <img src="/images/woman-free.jpg" alt="Bebas Admin" className={`w-40 ratio-4-3 cover rounded-more ${styles.SectionImage}`} />
                    <div className={styles.SectionSpacer}></div>
                    <div className={`flex column grow-1 ${styles.SectionInfo}`}>
                        <div className="h-5 w-25 bg-primary rounded-max mb-2"></div>
                        <h3 className="text size-32 mt-0">Hitung Ongkos Kirim Secara Otomatis</h3>
                        <div className="lh-30 text size-18 weight-300">
                            Dapatkan informasi biaya pengiriman ke seluruh Indonesia dengan berbagai ekspedisi dan kurir paling andal.
                        </div>
                        <div className="lh-30 text size-18 weight-300 mt-2">
                            Hitung ongkos kirim dan masukkan ke dalam tagihan pelanggan secara otomatis saat checkout pesanan.
                        </div>
                    </div>
                </div>

                <div className={`flex ${styles.SectionReversed}`}>
                    <img src="/images/withdraw.jpg" alt="Withdraw" className={`w-40 ratio-4-3 cover rounded-more ${styles.SectionImage}`} />
                    <div className={styles.SectionSpacer}></div>
                    <div className={`flex column grow-1 ${styles.SectionInfo}`}>
                        <div className="h-5 w-25 bg-primary rounded-max mb-2"></div>
                        <h3 className="text size-32 mt-0">Atur Stok Sistematis di Mana Saja</h3>
                        <div className="lh-30 text size-18 weight-300">Ubah jumlah ketersediaan produk di Toko dan marketplace seperti Shopee dan Tokopedia hanya dari satu aplikasi.</div>
                    </div>
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
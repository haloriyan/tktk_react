import React from "react";
import Header from "../Partials/Header";
import styles from "../../styles/Page/CustomerRelation.module.css";
import Footer from "../Partials/Footer";
import { MdBed, MdCamera, MdCameraAlt, MdCarRepair, MdFormatPaint, MdMonitorHeart, MdMusicNote, MdPalette, MdPallet, MdTv } from "react-icons/md";

const PhotographerUsecase =() => {
    return (
        <>
            <Header parent="usecase" />
            <div className="absolute left-0 right-0" style={{top: 60}}>
                <div className={`bg-white flex row item-center pl-4 pr-4 ${styles.TopSection}`} style={{height: 700}}>
                    <div className={`flex column grow-1 w-50 ${styles.TopSectionInfo}`}>
                        <div className="text small primary">Usecase &gt; Service Seller</div>
                        <h2 className={`text size-46 mt-1 ${styles.TopSectionTitle}`}>Atur Jadwal Janji dan Dapatkan Pengingat</h2>
                        <div className="text size-20 lh-30 mb-4">
                            Kelola jadwal janji-temu dengan pelanggan dan dapatkan pengingat sebelum waktu janji-temu berlangsung.
                        </div>

                        <div className="flex row">
                            <button className="primary">Coba Sekarang</button>
                        </div>
                    </div>
                    <img src="/images/customer-relation.png" alt="Customer Relation" className={styles.TopIllustration} />
                </div>

                <div className="bg-primary p-5">
                    <h3 className="text center size-32 mt-0">Apapun jasa yang kamu tawarkan, Takotoko membantumu mengatur janji-temu dan fitur utama lainnya.</h3>
                    <div className="flex row centerize gap-20 wrap">
                        <div className="flex column ratio-1-1 bordered rounded p-2 centerize" style={{borderBottomWidth: 8,borderColor: '#fff',height: 160}}>
                            <div className="h-80">
                                <MdCameraAlt size={60} />
                            </div>
                            <div className="text center small">Fotografer</div>
                        </div>
                        <div className="flex column ratio-1-1 bordered rounded p-2 centerize" style={{borderBottomWidth: 8,borderColor: '#fff',height: 160}}>
                            <div className="h-80">
                                <MdTv size={60} />
                            </div>
                            <div className="text center small">Reparasi Elektronik</div>
                        </div>
                        <div className="flex column ratio-1-1 bordered rounded p-2 centerize" style={{borderBottomWidth: 8,borderColor: '#fff',height: 160}}>
                            <div className="h-80">
                                <MdMonitorHeart size={60} />
                            </div>
                            <div className="text center small">Klinik dan Kesehatan</div>
                        </div>
                        <div className="flex column ratio-1-1 bordered rounded p-2 centerize" style={{borderBottomWidth: 8,borderColor: '#fff',height: 160}}>
                            <div className="h-80">
                                <MdCarRepair size={60} />
                            </div>
                            <div className="text center small">Bengkel dan Otomotif</div>
                        </div>
                        <div className="flex column ratio-1-1 bordered rounded p-2 centerize" style={{borderBottomWidth: 8,borderColor: '#fff',height: 160}}>
                            <div className="h-80">
                                <MdMusicNote size={60} />
                            </div>
                            <div className="text center small">Musik dan Hiburan</div>
                        </div>
                        <div className="flex column ratio-1-1 bordered rounded p-2 centerize" style={{borderBottomWidth: 8,borderColor: '#fff',height: 160}}>
                            <div className="h-80">
                                <MdPalette size={60} />
                            </div>
                            <div className="text center small">Design Grafis</div>
                        </div>
                        <div className="flex column ratio-1-1 bordered rounded p-2 centerize" style={{borderBottomWidth: 8,borderColor: '#fff',height: 160}}>
                            <div className="h-80">
                                <MdBed size={60} />
                            </div>
                            <div className="text center small">Penginapan dan Hospitality</div>
                        </div>
                    </div>
                </div>

                <div className={`flex ${styles.Section}`}>
                    <img src="/images/woman-free.jpg" alt="Bebas Admin" className={`w-40 ratio-4-3 cover rounded-more ${styles.SectionImage}`} />
                    <div className={styles.SectionSpacer}></div>
                    <div className={`flex column grow-1 ${styles.SectionInfo}`}>
                        <div className="h-5 w-25 bg-primary rounded-max mb-2"></div>
                        <h3 className="text size-32 mt-0">Bekerja Kapan Saja</h3>
                        <div className="lh-30 text size-18 weight-300">Atur jadwal ketersediaan sehingga orang-orang tidak bisa membuat janji di hari liburmu.</div>
                        <div className="text size-18 weight-300 lh-30 mt-2">
                            Kamu juga bisa mengatur jam berapa saja orang-orang ingin bertemu denganmu
                        </div>
                    </div>
                </div>

                <div className={`flex ${styles.SectionReversed}`}>
                    <img src="/images/withdraw.jpg" alt="Withdraw" className={`w-40 ratio-4-3 cover rounded-more ${styles.SectionImage}`} />
                    <div className={styles.SectionSpacer}></div>
                    <div className={`flex column grow-1 ${styles.SectionInfo}`}>
                        <div className="h-5 w-25 bg-primary rounded-max mb-2"></div>
                        <h3 className="text size-32 mt-0">Lupa? No Worries!</h3>
                        <div className="lh-30 text size-18 weight-300">Dapatkan pengingat sebelum janji-temu berlangsung. Kamu bisa mendapatkan kapan saja yang kamu inginkan, beberapa jam sebelum, atau beberapa hari.</div>
                    </div>
                </div>

                <div className={`flex ${styles.Section}`}>
                    <img src="/images/woman-free.jpg" alt="Bebas Admin" className={`w-40 ratio-4-3 cover rounded-more ${styles.SectionImage}`} />
                    <div className={styles.SectionSpacer}></div>
                    <div className={`flex column grow-1 ${styles.SectionInfo}`}>
                        <div className="h-5 w-25 bg-primary rounded-max mb-2"></div>
                        <h3 className="text size-32 mt-0">CRM yang Didesain Khusus</h3>
                        <div className="lh-30 text size-18 weight-300">Kembangkan hubungan klien yang lebih intens dengan memanfaatkan data historis mereka.</div>
                        <div className="text size-18 weight-300 lh-30 mt-2">
                            Bangun hubungan personal dengan pelanggan dengan meningkatkan nilai kepuasan agar dapat menciptakan retensi order
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    )
}

export default PhotographerUsecase;
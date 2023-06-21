import React from "react";
import { BiComment, BiEdit } from "react-icons/bi";

import styles from "../styles/NewsRead.module.css";
import BottomNav from "./Partials/BottomNav";

const NewsRead = () => {
    return (
        <>
            <div className="content top-0 pt-1">
                <img 
                    src="https://pbs.twimg.com/media/EUwcO0iUMAEZG-j.jpg" alt="News Cover" 
                    className="w-100 ratio-16-9 rounded-more cover"
                />

                <div className="text bold size-20 mt-1">Ahmad Syaifudin, Kiper Bapuk yang Didapuk sebagai Kapten</div>
                <div className="flex row item-center mt-1">
                    <div className="flex row item-center grow-1 basis-3 text small muted">
                        <BiEdit />
                        <div className="ml-1">Riyan Satria</div>
                    </div>
                    <div className="flex row item-center grow-1 basis-3 text small muted">
                        <BiComment />
                        <div className="ml-1">32 Komentar</div>
                    </div>
                    <div className="flex row item-center grow-1 basis-3 text small muted">
                        <BiComment />
                        <div className="ml-1">32 Komentar</div>
                    </div>
                </div>

                <div className='mt-2'>
                    <p>Surabaya - Dalam suatu kejutan mengejutkan, tim sepak bola lokal, Surabaya United, telah menunjuk Ahmad Syaifudin, seorang kiper yang dikenal dengan julukan "Kiper Bapuk", sebagai kapten tim mereka. Keputusan ini membuat gelombang kejutan di kalangan para penggemar dan pecinta sepak bola di Indonesia.</p>
                    <p>Ahmad Syaifudin, yang sering menjadi sorotan karena penampilannya yang kurang meyakinkan dan sering kali membuat kesalahan fatal, telah menjadi topik perbincangan di media sosial. Namun, pelatih Surabaya United, Farhan Darmawan, memiliki alasan kuat untuk mempercayakan ban kapten kepada Syaifudin.</p>
                    <p>Dalam konferensi pers yang diadakan oleh klub, Farhan Darmawan menjelaskan bahwa keputusan ini didasarkan pada kepribadian dan kepemimpinan yang dimiliki oleh Syaifudin di dalam dan di luar lapangan. Meskipun performanya sebagai seorang kiper belum mencapai ekspektasi, ia memiliki kemampuan untuk menginspirasi dan memotivasi rekan setimnya.</p>
                    <p>"Ahmad Syaifudin adalah sosok yang sangat berdedikasi, memiliki semangat juang yang tinggi, dan selalu berusaha memberikan yang terbaik bagi timnya," kata Darmawan. "Meskipun sering kali mendapatkan kritik, ia tetap mampu mempertahankan fokus dan membawa semangat tim yang tinggi."</p>
                    <p>Keputusan ini bukan tanpa kontroversi. Sebagian besar penggemar dan beberapa pemain lain menganggap bahwa penunjukan Syaifudin sebagai kapten tim adalah langkah yang salah. Mereka berpendapat bahwa seorang kapten harus menjadi contoh yang baik dan memiliki performa yang konsisten di lapangan.</p>
                    <p>Namun, manajemen Surabaya United tetap teguh pada keputusan mereka dan berharap bahwa kepercayaan ini akan memberikan motivasi tambahan bagi Syaifudin untuk meningkatkan permainannya. Mereka juga berharap bahwa keputusan ini akan membantu menciptakan atmosfer yang positif di dalam tim dan meningkatkan semangat juang seluruh anggota tim.</p>
                    <p>Bagaimanapun, hanya waktu yang akan menjawab apakah keputusan ini akan membawa hasil positif atau tidak. Ahmad Syaifudin, sang "Kiper Bapuk", harus membuktikan kemampuannya sebagai kapten dan membawa timnya meraih kesuksesan di kompetisi mendatang. Semua mata akan tertuju pada dirinya saat ia memimpin Surabaya United ke medan perang hijau dalam pertandingan berikutnya.</p>
                </div>

                <div className="h-80"></div>
                <BottomNav active="news" />
            </div>
        </>
    )
}

export default NewsRead
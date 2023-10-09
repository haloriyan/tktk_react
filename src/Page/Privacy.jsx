import Footer from "./Partials/Footer";
import Header from "./Partials/Header";

const Privacy = () => {
    return (
        <>
            <Header title={'Kebijakan Privasi'} parent="about" />
            <div className="absolute left-0 right-0" style={{top: 70}}>
                <div className="p-3">
                    <div className="h-40"></div>
                    <h1 className="mt-0">Kebijakan Privasi</h1>

                    <div>
                        Halaman <a href="#" className="text primary">Kebijakan Privasi</a> ini menjelaskan tentang bagaimana Kami mendapatkan, menggunakan, dan menjaga informasi yang pengguna (seller dan customer) berikan baik melalui aplikasi maupun layanan pihak ketiga.
                    </div>

                    <h3>1. Informasi yang Kami Dapatkan</h3>
                    <div>
                        Ketika pengguna mendaftar, menggunakan, dan/atau mengautentikasi layanan pihak ketiga, Kami bisa mendapatkan beberapa data pribadi seperti :
                    </div>
                    <div className="mt-2">
                        <b>1.1. Informasi Dasar</b>. Kami berhak mengakses dan menyimpan informasi dasar yang terhubung dengan akun layanan pihak ketiga pengguna, seperti nama, alamat email, dan foto profil.
                    </div>
                    <div className="mt-2">
                        <b>1.2. Izin Akses</b>. Kami akan meminta akses spesifik untuk mengakses beberapa data dan layanan dari pihak ketiga.
                    </div>

                    <h2>2. Bagaimana Kami Menggunakan Informasi Pengguna</h2>
                    <div>
                        Kami akan menggunakan informasi pengguna untuk berbagai layanan pihak ketiga, seperti :
                    </div>
                    <div className="mt-2">
                        <b>2.1. Akses ke Layanan Pihak Ketiga</b>. Untuk mengakses dan memproses layanan spesifik yang disediakan oleh pihak ketiga yang telah pengguna izinkan.
                    </div>
                    <div className="mt-2">
                        <b>2.2. Komunikasi.</b> Mengirim dan menerima informasi yang terkait dengan akses layanan takotoko dan/atau pihak ketiga
                    </div>

                    <h2>3. Pengelolaan dan Pembagian Informasi</h2>
                    <div>
                        Kami tidak menjual, menukarkan, atau membagikan data ke pihak manapun di luar kondisi berikut
                    </div>

                    <div className="mt-2">
                        <b>3.1. Penyedia Layanan Tambahan.</b> Kami mungkin membagikan data pengguna kepada pihak ketiga yang hanya untuk kelancaran proses bisnis dan/atau aplikasi
                    </div>
                    <div className="mt-2">
                        <b>3.2. Kewajiban Hukum.</b> Kami juga mungkin akan membagikan data pengguna kepada pihak berwenang atau hukum yang berlaku
                    </div>

                    <h2>4. Keamanan</h2>
                    <div>
                        Kami telah mengimplementasikan dan menguji secara teknis dan terorganisir untuk melindungi data pribadi pengguna. Meskipun demikian tidak ada transaksi online yang sepenuhnya aman dan kami tidak menjamin secara absolut terhadap keamanan data pengguna.
                    </div>

                    <h2>5. Hak-hak Pengguna</h2>
                    <div>
                        Pengguna dapat mengubah maupun menghapus data yang kami simpan kapan saja dan mungkin ada beberapa data yang memerlukan permintaan khusus untuk melakukan perubahan atau penghapusan.
                    </div>

                    <h2>6. Perubahan pada Kebijakan Privasi</h2>
                    <div>
                        Kami mungkin dan berhak untuk mengubah sebagian atau seluruh kebijakan privasi Kami kapan saja. Kami akan memberitahukan kepada seluruh pengguna beberapa waktu sebelum perubahan tersebut efektif.
                    </div>

                    <h2>7. Hubungi Kami</h2>
                    <div>
                        Apabila terdapat pertanyaan lebih lanjut pengguna dapat mengirimkan pesan melalui halaman <a href="/contact" className="text primary">Hubungi Kami</a>
                    </div>

                    <div className="h-40"></div>
                </div>

                <Footer />
            </div>
        </>
    )
}

export default Privacy;
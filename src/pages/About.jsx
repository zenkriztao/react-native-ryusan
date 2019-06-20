import React, { Component } from "react";
import Header from "../containers/Header";
import { Theme, TopAppBarFixedAdjust, Typography } from "rmwc";

export default class About extends Component {
    render() {
        return (
            <Theme tag="main" use="primary-bg on-primary">
                <Header />
                <TopAppBarFixedAdjust />
                <div className="page">
                    <div className="container">
                        <Typography use="headline4" tag="h1">
                            Tentang
                        </Typography>
                        <Typography use="body1" tag="h2">
                            Terima Kasih Kepada Allah Swt, Atas Berkat Rahmat-Nya Saya Dapat Menyelesaikan Aplikasi Cross Platform Ini Tanpa Adanya Hambatan Apapun.
                            Saya Selaku Dev Memiliki Konteks Beda Diantara Sekian Banyak Aplikasi Yang Ikut Serta Dalam Lomba Kihajar Lainnya Karena, 
                            Aplikasi Cross Platform Ini Menyimpan Banyak Fitur Menarik Dan Seru Lainnya Seperti:
                            </Typography><Typography use="headline5" tag="h3">
                            
                             1. Uji Pengetahuan Para Pengguna Bersama Teman/Sahabat Maupun Secara Pengguna Lainnya, Karena Di Aplikasi Ini Sediakan Fitur Multiplayer Online Battle Yang Sangat Bermanfaat dan Seru Untuk Dimainkan Dan Menambah Pengetahuan Lainnya </Typography><Typography use="headline5" tag="h4">
                             2. Terdapat Fitur Peringkat, Jadi Para Pengguna Bisa Bersaing Antar Para Pengguna Lain</Typography><Typography use="headline5" tag="h5">
                             3. Mudah Digunakan Karena, Tersedia Fitur Login Tamu,Dimana Para Pengguna Login Tidak Perlu Repot Daftar Sebelum Menggunakan </Typography><Typography use="headline5" tag="h6">
                             4. Penggunaan Nomor Smartphone Untuk Daftar Adalah Wujud Kita Sebagai Salah Satu Develop App Cross Platform Ini Dimana Banyak Pengguna Lain Bingung Mendaftar Melalui E-mail</Typography><Typography use="headline5" tag="h7"> </Typography><Typography use="headline5" tag="h8">
                             5. Login pengguna dan Penyimpanan Database yang Struktural dan Aman Untuk Dipakai Kedepan
                             </Typography><Typography use="headline5" tag="h9">
                             6. Tidak Ada Bug Maupun Error Lainnya Saat Menggunakan Aplikasi ini,Jadi Para Pengguna Nyaman Dalam Menggunakan Aplikasi Ini
                             </Typography><Typography use="headline5" tag="h10">
                            Aplikasi Ini Dibuat Dan Dikembangkan Dalam Rangka Lomba Aplikasi Lomba Kihajar  Dengan Tujuan
                            Memotivasi masyarakat untuk mengembangkan bahan belajar interaktif melalui perangkat mobile/handphone.

                            

                            Diharapkan Dengan Adanya Aplikasi Ini, Minat Masyarakat Dalam Hal Sosial Budaya Meningkat
                            </Typography><Typography use="caption" tag="h11">
                         -------------------------------- Credit --------------------------------------
</Typography><Typography use="caption" tag="h5">
                             Komunitas Reactjs dan React Native Di Telegram Yang Membantu 
                             <Typography use="caption" tag="h12">
                             www.Stackoverflow.com Sebagai Tempat Yang Paling Saya Kunjungi dan Menemani Saya Selama Ini</Typography>
                             <Typography use="caption" tag="h13">
                             Media Pembelajaran Hacktiv8 ,Dicoding, Petanikode,Programmer Unpas</Typography><Typography use="caption" tag="h14">
                            Keluarga dan Teman Yang Selama Ini Selalu Mendukung Dan Mendoakan Kelancaran Dalam Membuat Aplikasi </Typography>
                            <Typography use="caption" tag="h15">
                            www.flaticon.com
                            www.freepik.com 
                            www.wikipedia.com
                            www.sosialbudaya.com
                            </Typography>
                            </Typography>
                    </div>
                </div>
            </Theme>
        );
    }
}

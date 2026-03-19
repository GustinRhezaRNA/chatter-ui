# Chatter UI

Repository ini adalah antarmuka pengguna (Frontend/UI) dari aplikasi Chatter. Aplikasi ini merupakan *Single Page Application* (SPA) interaktif yang menonjolkan fitur percakapan langsung (*real-time chat*).

## Teknologi yang Digunakan
Bagian *frontend* ini dirancang dengan perangkat ekosistem web modern untuk memastikan performa yang cepat dan pengalaman interaksi pengguna yang instan.

- **Kerangka Kerja (Framework): React 19 & Vite**
  Menggunakan seri React terbaru dengan sistem *builder tools* Vite (menggantikan CRA/Webpack), menawarkan fase kompilasi super cepat saat pengembangan (HMR).
- **Apollo Client (GraphQL State Management)**
  Sistem utama untuk mengelola komunikasi data dengan *backend*. Apollo Client mengatur *caching* secara pintar tanpa harus menggunakan Redux untuk manajemen state yang berasal dari *network* API.
- **Komponen & Desain UI: Material UI (MUI) & Tailwind CSS 4**
  - **MUI (Material UI)** menyediakan paket komponen rapi dan profesional yang bisa disesuaikan seperti *Icons*, Dialog, Tombol, dll. 
  - **Tailwind CSS v4** digunakan secara luas melalui konsep *utility-first* agar memudahkan *styling* elemen khusus yang kompleks.
- **Otomatisasi Tipe: GraphQL Codegen**
  Menggunakan pustaka `@graphql-codegen/cli` dan `@graphql-codegen/client-preset`. Sangat krusial karena membaca skema langsung dari server GraphQL, lantas membuat abstraksi tipe TypeScript (*Type-safe*) dan berevolusi menjadi *React Hooks* untuk melakukan kueri secara instan (contoh: tidak perlu mendeklarasikan kueri manual, cukup memanggil *hooks* generator dari sistem ini).
- **Protokol Real-time: graphql-ws**
  Menjadi jembatan antara antarmuka ini dan server (*backend*) via WebSockets. Sehingga pesan-pesan yang datang muncul seketika di layar pengguna.
- **Routing: React Router DOM v7**
  Digunakan dalam bernavigasi transisi halaman (*client-side routing*) baik untuk manajemen sesi login, *signup* maupun ke *room chat* utama.

## Fitur Utama (*Frontend Features*)
1. **Reaktivitas Interaktif 100% Real-time**
   - Mendengarkan mutasi data dari *backend* dan memperbarui UI percakapan tepat di detik di saat sebuah pesan baru dilesatkan atau saat profil berubah.
2. **Infinite Scroll Berbasis Penelusuran (Pagination)**
   - Terintegrasi dengan `react-infinite-scroll-component` untuk menavigasi *history* (riwayat). Obrolan panjang tidak dimuat sekaligus untuk meminimalisasi *load payload*. Pesan lama dimuat saat pengguna menggulir obrolan ke bagian atas.
3. **Pengelolaan State JWT Sederhana dan Aman**
   - Karena *Backend* memberlakukan sistem *Cookies*, Apollo Client secara default membawa (membawa *credentials*) cookie JWT ini, membebaskan UI klien dari risiko menyimpan *Token* utuh ke penyimpanan lokal.
4. **Desain Cepat dan Ter-respons**
   - Aplikasi yang dirender ini mendukung semua ukuran layar (*Responsive*) dari panel percakapan samping di peramban *desktop*, dan menumpuk dengan baik saat berada di penampang peramban mobil (*mobile browsers*).

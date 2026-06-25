# 📚 E-Library: Sistem Manajemen Rental Buku Digital

**Oleh:** Manuel Johansen Dolok Saribu (NIM: 312410493)

Proyek ini adalah tugas Ujian Akhir Semester (UAS) mata kuliah Pemrograman Web 2. Aplikasi E-Library dibangun menggunakan arsitektur terpisah (*Decoupled Architecture*) antara Backend dan Frontend. Tema studi kasus yang dipilih pada proyek ini adalah Sistem Informasi Rental Buku / Komik Digital (E-Library).

## 🛠️ Spesifikasi Teknologi
*   **Backend:** CodeIgniter 4 (RESTful API Server)
*   **Frontend:** Vue.js 3 (SPA via CDN)
*   **UI Framework:** TailwindCSS
*   **HTTP Client:** Axios
*   **Database:** MySQL / MariaDB

## 🚀 Petunjuk Instalasi Lokal

Berikut adalah panduan singkat untuk menjalankan proyek backend dan frontend di komputer lokal:

### 1. Menjalankan Backend (API Server)
1. Buka terminal dan masuk ke folder backend: `cd backend-api`
2. Salin file `env` menjadi `.env` lalu atur konfigurasi kredensial database lokal Anda.
3. Install seluruh library dependensi: `composer install`
4. Jalankan server backend: `php spark serve` (Server akan berjalan di `http://localhost:8080`)

### 2. Menjalankan Frontend (SPA Client)
1. Buka terminal dan masuk ke folder frontend: `cd frontend-spa`
2. Pastikan konfigurasi Base URL Axios di dalam file `app.js` sudah mengarah ke port backend lokal (`http://localhost:8080`).
3. Buka file `index.html` menggunakan web server lokal ringan (seperti ekstensi **Live Server** di VS Code).

---

## 📸 Dokumentasi Tangkapan Layar (Screenshots)

### 1. Skema Relasi Tabel Database (phpMyAdmin)
*(Gambar skema relasi minimal 3 tabel)*
![Skema Database](URL_GAMBAR_SKEMA_DATABASE_DISINI)

### 2. Uji Coba Keamanan Token API (Postman)
*(Uji coba tembak API gagal / Error 401 lewat Postman akibat tidak melampirkan Bearer Token)*
![Error 401 Postman](URL_GAMBAR_POSTMAN_DISINI)

### 3. Antarmuka Aplikasi (UI)
**Halaman Login**
![Login UI](URL_GAMBAR_LOGIN_DISINI)

**Halaman Dashboard Admin & Visualisasi Data Tabel**
![Dashboard UI](URL_GAMBAR_DASHBOARD_DISINI)

**Tampilan Form Modal (Tambah/Edit Data)**
![Modal UI](URL_GAMBAR_MODAL_DISINI)

---

## 🔗 Tautan Penting
*   **Video Presentasi Proyek:** [Masukkan Link YouTube Anda di sini][cite: 2]
*   **Link Demo:** [Masukkan Link Demo Anda di sini (Jika di-hosting)][cite: 2]

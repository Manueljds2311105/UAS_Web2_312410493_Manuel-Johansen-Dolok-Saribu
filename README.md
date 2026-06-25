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
![Skema Database](https://github.com/Manueljds2311105/UAS_Web2_312410493_Manuel-Johansen-Dolok-Saribu/blob/44928fdba71e93874be03028347acfa5fe1a31a0/SS%20UASWEB2/Screenshot%202026-06-25%20110425.png)

### 2. Uji Coba Keamanan Token API (Postman)
*(Uji coba tembak API gagal / Error 401 lewat Postman akibat tidak melampirkan Bearer Token)*
![Error 401 Postman](https://github.com/Manueljds2311105/UAS_Web2_312410493_Manuel-Johansen-Dolok-Saribu/blob/44928fdba71e93874be03028347acfa5fe1a31a0/SS%20UASWEB2/Screenshot%202026-06-15%20153800.png)

### 3. Antarmuka Aplikasi (UI)
**Halaman Login**
![Login UI](https://github.com/Manueljds2311105/UAS_Web2_312410493_Manuel-Johansen-Dolok-Saribu/blob/44928fdba71e93874be03028347acfa5fe1a31a0/SS%20UASWEB2/Screenshot%202026-06-25%20115250.png)

**Halaman Dashboard Admin & Visualisasi Data Tabel**
![Dashboard UI](https://github.com/Manueljds2311105/UAS_Web2_312410493_Manuel-Johansen-Dolok-Saribu/blob/44928fdba71e93874be03028347acfa5fe1a31a0/SS%20UASWEB2/Screenshot%202026-06-25%20121650.png)

**Tampilan Form Modal (Tambah/Edit Data)**
![Modal UI](https://github.com/Manueljds2311105/UAS_Web2_312410493_Manuel-Johansen-Dolok-Saribu/blob/44928fdba71e93874be03028347acfa5fe1a31a0/SS%20UASWEB2/Screenshot%202026-06-25%20121705.png)
![Modal UI](https://github.com/Manueljds2311105/UAS_Web2_312410493_Manuel-Johansen-Dolok-Saribu/blob/44928fdba71e93874be03028347acfa5fe1a31a0/SS%20UASWEB2/Screenshot%202026-06-25%20121725.png)

---

## 🔗 Tautan Penting
*   [Video Penjelasan Proyek](https://youtu.be/jUCtSDYYHXk?si=lxt1fLVvpaBxI-24)
*   [Link Demo Web](http://rentalbuku.my.id/)

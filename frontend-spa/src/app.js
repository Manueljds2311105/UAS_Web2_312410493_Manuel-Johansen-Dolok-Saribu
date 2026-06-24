// Mengambil fungsi bawaan dari CDN Vue dan Vue Router yang ada di index.html
const { createApp } = Vue;
const { createRouter, createWebHashHistory } = VueRouter;

// Mengimpor komponen halaman modular berbasis SPA
// (File-file ini akan kita buat setelah ini)
import Home from './Home.js';
import Login from './Login.js';
import Register from './Register.js';
import Dashboard from './Dashboard.js';

// 1. Konfigurasi Vue Router & Manajemen Komponen
const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { 
        path: '/dashboard', 
        component: Dashboard,
        meta: { requiresAuth: true } // Memasang properti meta untuk proteksi rute panel admin
    }
];

const router = createRouter({
    history: createWebHashHistory(), // Menggunakan Hash Mode agar aman saat di-hosting di GitHub Pages
    routes,
});

// 2. Client-Side Security (Navigation Guards)
router.beforeEach((to, from, next) => {
    // Mengecek tanda pengenal login dari localStorage
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const role = localStorage.getItem('role'); // Ambil role user

    // Mencegat pengguna ilegal yang belum login ke rute yang butuh auth
    if (to.meta.requiresAuth && !isLoggedIn) {
        alert('Akses ditolak! Silakan login terlebih dahulu.');
        next('/login'); 
    } 
    // Mencegah user yang sudah login kembali ke form login atau register
    else if ((to.path === '/login' || to.path === '/register') && isLoggedIn) {
        if (role === 'admin') {
            next('/dashboard'); // Admin balik ke dashboard
        } else {
            next('/'); // Member balik ke katalog publik
        }
    } 
    else {
        next();
    }
});

// 3. Otomatisasi Token (Axios Interceptors)
// Mengarahkan Axios ke alamat backend CI4 lokal kamu
axios.defaults.baseURL = 'http://localhost:8080';


// Axios Request Interceptor: Menyuntikkan token dari localStorage ke header
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Axios Response Interceptor: Menangkap error 401 global
axios.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response && error.response.status === 401) {
        alert('Sesi Anda telah habis atau tidak valid. Silakan login kembali.');
        localStorage.clear(); // Hapus sesi jika terdeteksi 401
        router.push('/login'); // Tendang pengguna kembali ke form login
    }
    return Promise.reject(error);
});

// 4. Inisialisasi dan Mount Vue App
const app = createApp({});
app.use(router);
app.mount('#app');
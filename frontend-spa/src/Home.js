export default {
    template: `
        <div class="min-h-screen bg-gray-50 font-sans">
            <!-- Header E-Library dengan warna Biru Tua Elegan -->
            <div class="bg-slate-900 text-white p-8 text-center shadow-md relative border-b border-slate-800">
                <div class="max-w-4xl mx-auto flex justify-between items-center relative z-10">
                    <h1 class="text-2xl font-bold flex items-center">
                        <i class="fa-solid fa-book-journal-whills mr-3 text-purple-400"></i> E-Library
                    </h1>
                    <div class="space-x-3">
                        <!-- Tombol Login (Teks "Login Member" diganti "Login" saja) -->
                        <router-link v-if="!isLoggedIn" to="/login" class="bg-slate-800 hover:bg-slate-700 text-white px-5 py-2 rounded-lg font-semibold transition-colors text-sm border border-slate-700 flex items-center">
                            <i class="fa-solid fa-right-to-bracket mr-2 text-purple-400"></i> Login
                        </router-link>
                        
                        <!-- Jika Sudah Login -->
                        <div v-else class="flex items-center space-x-4">
                            <span class="text-sm font-semibold bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">Status: {{ role.toUpperCase() }}</span>
                            <router-link v-if="role === 'admin'" to="/dashboard" class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm shadow-sm">
                                Panel Admin
                            </router-link>
                            <button @click="handleLogout" class="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm shadow-sm border border-red-500/20 hover:border-red-500">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
                <div class="mt-8 relative z-10">
                    <p class="text-lg text-slate-300">Temukan dan jelajahi koleksi bacaan terbaik kami dengan mudah.</p>
                </div>
            </div>

            <!-- Konten Katalog -->
            <div class="max-w-6xl mx-auto p-8">
                <div v-if="pesanSukses" class="mb-6 bg-emerald-50 text-emerald-700 p-4 rounded-lg font-semibold border border-emerald-200 flex items-center shadow-sm">
                    <i class="fa-solid fa-circle-check text-xl mr-3"></i> {{ pesanSukses }}
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    <div v-for="buku in listBuku" :key="buku.id" class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col group">
                        <div class="relative h-64 overflow-hidden bg-slate-100">
                            <img :src="buku.cover_url || 'https://via.placeholder.com/300x400?text=No+Cover'" :alt="buku.judul" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                            <span class="absolute top-3 right-3 bg-purple-600/90 backdrop-blur text-white text-xs font-bold px-2.5 py-1 rounded">
                                {{ buku.kategori_genre }}
                            </span>
                        </div>
                        <div class="p-5 flex-1 flex flex-col">
                            <h3 class="font-bold text-slate-800 text-lg leading-snug mb-1">{{ buku.judul }}</h3>
                            <p class="text-slate-500 text-xs mb-4"><i class="fa-solid fa-pen-nib mr-1"></i> {{ buku.penulis || 'Anonim' }}</p>
                            
                            <div class="mt-auto flex items-center justify-between border-t border-slate-100 pt-4 mb-4">
                                <span class="text-sm font-semibold text-slate-700">Stok: {{ buku.stok }}</span>
                                <span v-if="buku.stok > 0" class="text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-1 rounded border border-emerald-100 flex items-center">
                                    <i class="fa-solid fa-check mr-1"></i> Tersedia
                                </span>
                                <span v-else class="text-red-600 text-xs font-bold bg-red-50 px-2 py-1 rounded border border-red-100 flex items-center">
                                    <i class="fa-solid fa-xmark mr-1"></i> Habis
                                </span>
                            </div>

                            <button @click="pinjamBuku(buku)" :disabled="buku.stok <= 0" 
                                :class="['w-full py-2.5 rounded-lg text-sm font-bold flex items-center justify-center transition-colors', 
                                buku.stok > 0 ? 'bg-purple-100 text-purple-700 hover:bg-purple-600 hover:text-white' : 'bg-slate-100 text-slate-400 cursor-not-allowed']">
                                <i class="fa-solid fa-book-open-reader mr-2"></i> {{ buku.stok > 0 ? 'Pinjam Sekarang' : 'Stok Habis' }}
                            </button>
                        </div>
                    </div>
                </div>
                
                <div v-if="listBuku.length === 0" class="text-center py-12 text-slate-500">
                    <i class="fa-solid fa-circle-notch fa-spin text-3xl mb-3 text-purple-600"></i>
                    <p>Memuat katalog buku...</p>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            listBuku: [],
            isLoggedIn: false,
            role: '',
            userId: '',
            pesanSukses: ''
        };
    },
    mounted() {
        if (localStorage.getItem('token')) {
            this.isLoggedIn = true;
            this.role = localStorage.getItem('role');
            this.userId = localStorage.getItem('user_id');
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        }
        this.ambilKatalogBuku();
    },
    methods: {
        async ambilKatalogBuku() {
            try {
                const response = await axios.get('/buku');
                this.listBuku = response.data;
            } catch (error) {
                console.error("Gagal memuat katalog", error);
            }
        },
        async pinjamBuku(buku) {
            if (!this.isLoggedIn) {
                alert("Kamu harus login terlebih dahulu untuk meminjam buku!");
                this.$router.push('/login');
                return;
            }
            if (confirm(`Apakah kamu yakin ingin meminjam buku "${buku.judul}"?`)) {
                try {
                    const dataRental = {
                        user_id: this.userId,
                        buku_id: buku.id,
                        tanggal: new Date().toISOString().split('T')[0]
                    };
                    await axios.post('/peminjaman', dataRental);
                    this.pesanSukses = `Berhasil! Buku "${buku.judul}" telah masuk ke daftar pinjamanmu.`;
                    this.ambilKatalogBuku(); 
                    setTimeout(() => { this.pesanSukses = ''; }, 5000);
                } catch (error) {
                    alert("Gagal meminjam buku. Pastikan stok masih ada dan token login aktif.");
                }
            }
        },
        handleLogout() {
            localStorage.clear();
            delete axios.defaults.headers.common['Authorization'];
            this.isLoggedIn = false;
            this.role = '';
            this.userId = '';
            alert("Berhasil Logout.");
        }
    }
};
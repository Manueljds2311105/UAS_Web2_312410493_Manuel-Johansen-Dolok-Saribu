export default {
    template: `
        <div class="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans relative">
            
            <aside class="w-full md:w-64 bg-slate-900 text-white flex flex-col shadow-xl z-10">
                <div class="p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                    <h2 class="text-xl font-bold flex items-center text-purple-400">
                        <i class="fa-solid fa-book-journal-whills mr-3"></i> E-Library
                    </h2>
                </div>
                
                <nav class="flex-1 p-4 space-y-2">
                    <button @click="activeTab = 'buku'" 
                        :class="['w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium', 
                                 activeTab === 'buku' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800 hover:text-white']">
                        <i class="fa-solid fa-book w-6 text-left"></i> Katalog Buku
                    </button>
                    
                    <button @click="activeTab = 'anggota'" 
                        :class="['w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium', 
                                 activeTab === 'anggota' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800 hover:text-white']">
                        <i class="fa-solid fa-users w-6 text-left"></i> Data Anggota
                    </button>
                    
                    <button @click="activeTab = 'rental'" 
                        :class="['w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium', 
                                 activeTab === 'rental' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800 hover:text-white']">
                        <i class="fa-solid fa-handshake w-6 text-left"></i> Riwayat Transaksi
                    </button>
                </nav>

                <div class="p-4 border-t border-slate-800">
                    <div class="text-xs text-slate-500 mb-4 text-center">Login sebagai <span class="font-bold text-slate-300">ADMINISTRATOR</span></div>
                    <button @click="handleLogout" class="w-full flex items-center justify-center px-4 py-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors text-sm font-medium">
                        <i class="fa-solid fa-right-from-bracket mr-2"></i> Logout
                    </button>
                </div>
            </aside>

            <main class="flex-1 p-8 overflow-y-auto">
                
                <div v-if="activeTab === 'buku'" class="space-y-6 animate-fade-in">
                    <div class="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-purple-100">
                        <div>
                            <h1 class="text-2xl font-bold text-slate-800">Manajemen Buku</h1>
                            <p class="text-sm text-slate-500 mt-1">Kelola data master katalog buku digital</p>
                        </div>
                        <button @click="showModalBuku = true" class="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-lg shadow-sm font-semibold text-sm transition-colors flex items-center">
                            <i class="fa-solid fa-plus mr-2"></i> Tambah Buku
                        </button>
                    </div>
                    
                    <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <table class="w-full text-left text-sm">
                            <thead class="bg-purple-50 text-purple-900 border-b border-purple-100">
                                <tr>
                                    <th class="p-4 font-semibold">Judul Buku</th>
                                    <th class="p-4 font-semibold">Genre</th>
                                    <th class="p-4 font-semibold text-center">Stok Sisa</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="buku in listBuku" :key="buku.id" class="border-b border-slate-100 hover:bg-slate-50">
                                    <td class="p-4 font-medium text-slate-800">{{ buku.judul }}</td>
                                    <td class="p-4 text-slate-600"><span class="px-2.5 py-1 bg-purple-100 text-purple-700 rounded-md text-xs font-semibold">{{ buku.kategori_genre }}</span></td>
                                    <td class="p-4 font-bold text-center text-slate-700">{{ buku.stok }}</td>
                                </tr>
                                <tr v-if="listBuku.length === 0"><td colspan="3" class="p-8 text-center text-slate-400">Tidak ada data buku.</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div v-if="activeTab === 'anggota'" class="space-y-6 animate-fade-in">
                    <div class="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-purple-100">
                        <div>
                            <h1 class="text-2xl font-bold text-slate-800">Data Anggota</h1>
                            <p class="text-sm text-slate-500 mt-1">Daftar pengguna terdaftar di sistem</p>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <table class="w-full text-left text-sm">
                            <thead class="bg-purple-50 text-purple-900 border-b border-purple-100">
                                <tr>
                                    <th class="p-4 font-semibold">ID</th>
                                    <th class="p-4 font-semibold">Username</th>
                                    <th class="p-4 font-semibold text-center">Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="user in listAnggota" :key="user.id" class="border-b border-slate-100 hover:bg-slate-50">
                                    <td class="p-4 text-slate-500">#{{ user.id }}</td>
                                    <td class="p-4 font-medium text-slate-800">{{ user.username }}</td>
                                    <td class="p-4 text-center">
                                        <span :class="['px-2.5 py-1 rounded-md text-xs font-bold', user.role === 'admin' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700']">
                                            {{ user.role.toUpperCase() }}
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div v-if="activeTab === 'rental'" class="space-y-6 animate-fade-in">
                    <div class="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-purple-100">
                        <div>
                            <h1 class="text-2xl font-bold text-slate-800">Monitoring Peminjaman</h1>
                            <p class="text-sm text-slate-500 mt-1">Pantau sirkulasi buku dan proses pengembalian</p>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <table class="w-full text-left text-sm">
                            <thead class="bg-purple-50 text-purple-900 border-b border-purple-100">
                                <tr>
                                    <th class="p-4 font-semibold">Tgl Pinjam</th>
                                    <th class="p-4 font-semibold">Anggota</th>
                                    <th class="p-4 font-semibold">Buku</th>
                                    <th class="p-4 font-semibold">Status</th>
                                    <th class="p-4 font-semibold text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="rental in listRental" :key="rental.id" class="border-b border-slate-100 hover:bg-slate-50">
                                    <td class="p-4 text-slate-600">{{ rental.tanggal }}</td>
                                    <td class="p-4 font-medium text-slate-800">{{ getNamaUser(rental.user_id) }}</td>
                                    <td class="p-4 font-medium text-slate-800">{{ getJudulBuku(rental.buku_id) }}</td>
                                    <td class="p-4">
                                        <span :class="['px-2.5 py-1 rounded-md text-xs font-bold', rental.status === 'dipinjam' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700']">
                                            <i :class="['mr-1 fa-solid', rental.status === 'dipinjam' ? 'fa-hourglass-half' : 'fa-check']"></i>
                                            {{ rental.status.toUpperCase() }}
                                        </span>
                                    </td>
                                    <td class="p-4 text-center">
                                        <button v-if="rental.status === 'dipinjam'" @click="kembalikanBuku(rental.id)" class="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded text-xs font-semibold shadow-sm transition-colors">
                                            Proses Pengembalian
                                        </button>
                                        <span v-else class="text-slate-400 text-xs italic"><i class="fa-solid fa-check-double mr-1"></i>Selesai</span>
                                    </td>
                                </tr>
                                <tr v-if="listRental.length === 0"><td colspan="5" class="p-8 text-center text-slate-400">Belum ada transaksi rental.</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            <div v-if="showModalBuku" class="fixed inset-0 bg-slate-900/60 flex items-center justify-center z-50 p-4">
                <div class="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
                    <div class="bg-purple-600 p-4 text-white flex justify-between items-center">
                        <h3 class="font-bold"><i class="fa-solid fa-book mr-2"></i> Tambah Buku Baru</h3>
                        <button @click="showModalBuku = false" class="text-purple-200 hover:text-white"><i class="fa-solid fa-xmark"></i></button>
                    </div>
                    <form @submit.prevent="simpanBuku" class="p-5 space-y-4">
                        <div>
                            <label class="block text-sm font-medium mb-1 text-slate-700">Judul Buku</label>
                            <input v-model="formBuku.judul" type="text" required class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm">
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium mb-1 text-slate-700">Genre</label>
                                <input v-model="formBuku.kategori_genre" type="text" required class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm">
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-1 text-slate-700">Stok Awal</label>
                                <input v-model="formBuku.stok" type="number" min="0" required class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm">
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1 text-slate-700">Penulis</label>
                            <input v-model="formBuku.penulis" type="text" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm">
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1 text-slate-700">URL Cover</label>
                            <input v-model="formBuku.cover_url" type="text" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm">
                        </div>
                        <div class="pt-3 flex justify-end space-x-2">
                            <button type="button" @click="showModalBuku = false" class="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-200">Batal</button>
                            <button type="submit" class="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-semibold hover:bg-purple-700">Simpan Buku</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            activeTab: 'buku',
            listBuku: [], listAnggota: [], listRental: [],
            showModalBuku: false,
            formBuku: { judul: '', kategori_genre: '', penulis: '', stok: 0, cover_url: '' }
        }
    },
    mounted() {
        this.fetchAllData();
    },
    methods: {
        async fetchAllData() {
            try {
                const [resBuku, resAnggota, resRental] = await Promise.all([
                    axios.get('/buku'),
                    axios.get('/users'),
                    axios.get('/peminjaman')
                ]);
                this.listBuku = resBuku.data;
                this.listAnggota = resAnggota.data;
                this.listRental = resRental.data;
            } catch (error) {
                console.error('Gagal memuat data dashboard:', error);
            }
        },
        async simpanBuku() {
            try {
                await axios.post('/buku', this.formBuku);
                this.showModalBuku = false;
                this.fetchAllData();
                this.formBuku = { judul: '', kategori_genre: '', penulis: '', stok: 0, cover_url: '' };
            } catch (error) { alert('Terjadi kesalahan saat menyimpan buku.'); }
        },
        async kembalikanBuku(idRental) {
            if(confirm('Yakin ingin memproses pengembalian buku ini? Stok akan otomatis bertambah.')) {
                try {
                    await axios.put(`/peminjaman/${idRental}`, { status: 'dikembalikan' });
                    this.fetchAllData();
                } catch (error) { alert('Gagal memproses pengembalian buku.'); }
            }
        },
        getNamaUser(id) {
            const user = this.listAnggota.find(u => u.id == id);
            return user ? user.username : `User #${id}`;
        },
        getJudulBuku(id) {
            const buku = this.listBuku.find(b => b.id == id);
            return buku ? buku.judul : `Buku #${id}`;
        },
        handleLogout() {
            localStorage.clear();
            delete axios.defaults.headers.common['Authorization'];
            this.$router.push('/login');
        }
    }
}
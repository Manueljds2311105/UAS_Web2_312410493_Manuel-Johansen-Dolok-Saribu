export default {
    template: `
        <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
            <div class="max-w-md w-full bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                <div class="bg-slate-900 text-white p-6 text-center border-b border-slate-800">
                    <h2 class="text-2xl font-bold"><i class="fa-solid fa-book-open-reader mr-2 text-purple-400"></i> E-Library Login</h2>
                    <p class="text-slate-400 text-xs mt-1">Masuk ke Sistem Perpustakaan</p>
                </div>
                <form @submit.prevent="handleLogin" class="p-6 space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1">Username</label>
                        <div class="relative rounded-md shadow-sm">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                <i class="fa-solid fa-user text-sm"></i>
                            </div>
                            <input v-model="username" type="text" required placeholder="Masukkan username" 
                                class="w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition-all text-sm">
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1">Password</label>
                        <div class="relative rounded-md shadow-sm">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                <i class="fa-solid fa-lock text-sm"></i>
                            </div>
                            <input v-model="password" :type="showPassword ? 'text' : 'password'" required placeholder="Masukkan password" 
                                class="w-full pl-10 pr-10 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition-all text-sm">
                            <button type="button" @click="showPassword = !showPassword" class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-purple-600">
                                <i :class="['fa-solid text-sm', showPassword ? 'fa-eye-slash' : 'fa-eye']"></i>
                            </button>
                        </div>
                    </div>
                    <button type="submit" class="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold shadow-md transition-all duration-200 text-sm mt-2 flex justify-center items-center">
                        <i class="fa-solid fa-right-to-bracket mr-2"></i> Masuk Sekarang
                    </button>
                    
                    <!-- Tautan ke Halaman Register -->
                    <div class="text-center text-xs text-slate-500 pt-4 border-t border-slate-100 mt-4">
                        Belum punya akun? <router-link to="/register" class="text-purple-600 font-bold hover:underline">Daftar Sekarang</router-link>
                    </div>
                    
                    <div class="text-center pt-2">
                        <router-link to="/" class="text-xs text-slate-400 hover:text-purple-600 transition-colors">
                            <i class="fa-solid fa-arrow-left mr-1"></i> Kembali ke Katalog Publik
                        </router-link>
                    </div>
                </form>
            </div>
        </div>
    `,
    data() { return { username: '', password: '', showPassword: false } },
    methods: {
        async handleLogin() {
            try {
                const res = await axios.post('/login', { username: this.username, password: this.password });
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('role', res.data.role);
                localStorage.setItem('user_id', res.data.user_id);
                localStorage.setItem('isLoggedIn', 'true');
                axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
                res.data.role === 'admin' ? this.$router.push('/dashboard') : this.$router.push('/');
            } catch (e) { alert('Login Gagal! Cek kembali username dan password.'); }
        }
    }
}
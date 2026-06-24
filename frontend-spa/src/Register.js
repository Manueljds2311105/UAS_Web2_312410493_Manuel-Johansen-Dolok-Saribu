export default {
    template: `
        <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div class="max-w-md w-full bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                <div class="bg-slate-900 text-white p-6 text-center">
                    <h2 class="text-2xl font-bold"><i class="fa-solid fa-user-plus mr-2 text-purple-400"></i> Daftar Member</h2>
                    <p class="text-slate-400 text-xs mt-1">Buat akun E-Library Anda</p>
                </div>
                
                <form @submit.prevent="handleRegister" class="p-6 space-y-4">
                    <div>
                        <label class="block text-sm font-medium mb-1">Username</label>
                        <input v-model="username" type="text" required placeholder="Buat username unik" class="w-full px-3 py-2 border rounded-lg text-sm">
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium mb-1">Password</label>
                        <div class="relative">
                            <input v-model="password" :type="showPassword ? 'text' : 'password'" required placeholder="Minimal 6 karakter" class="w-full px-3 py-2 border rounded-lg text-sm">
                            <button type="button" @click="showPassword = !showPassword" class="absolute right-3 top-2.5 text-slate-400 text-sm">
                                <i :class="['fa-solid', showPassword ? 'fa-eye-slash' : 'fa-eye']"></i>
                            </button>
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-medium mb-1">Konfirmasi Password</label>
                        <input v-model="confirmPassword" :type="showPassword ? 'text' : 'password'" required placeholder="Ketik ulang password" class="w-full px-3 py-2 border rounded-lg text-sm">
                    </div>

                    <div v-if="pesan" :class="['p-3 rounded-lg text-xs font-semibold flex items-center border', isError ? 'bg-red-50 text-red-700 border-red-100' : 'bg-emerald-50 text-emerald-700 border-emerald-100']">
                        <i :class="['fa-solid mr-2 text-base', isError ? 'fa-circle-exclamation' : 'fa-circle-check']"></i>
                        <span>{{ pesan }}</span>
                    </div>

                    <button type="submit" :disabled="loading" class="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold text-sm disabled:opacity-50">
                        {{ loading ? 'Memproses...' : 'Daftar Sekarang' }}
                    </button>
                    
                    <div class="text-center text-xs text-slate-500 pt-2">
                        Sudah punya akun? <router-link to="/login" class="text-purple-600 font-bold">Login di sini</router-link>
                    </div>
                </form>
            </div>
        </div>
    `,
    data() {
        return {
            username: '',
            password: '',
            confirmPassword: '',
            showPassword: false,
            loading: false,
            pesan: '',
            isError: false
        }
    },
    methods: {
        async handleRegister() {
            // Validasi kecocokan password
            if (this.password !== this.confirmPassword) {
                this.isError = true;
                this.pesan = 'Password dan Konfirmasi Password tidak cocok!';
                return;
            }

            this.loading = true;
            this.pesan = '';
            
            try {
                const res = await axios.post('/register', {
                    username: this.username,
                    password: this.password
                });
                
                this.isError = false;
                this.pesan = res.data.messages;
                
                // Jika sukses, bersihkan form dan arahkan ke halaman login setelah 2 detik
                setTimeout(() => {
                    this.$router.push('/login');
                }, 2000);

            } catch (error) {
                this.isError = true;
                if (error.response && error.response.data) {
                    this.pesan = error.response.data.messages;
                } else {
                    this.pesan = 'Gagal terhubung ke server.';
                }
            } finally {
                this.loading = false;
            }
        }
    }
}
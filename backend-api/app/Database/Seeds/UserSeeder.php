<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run()
    {
        $data = [
            'username' => 'admin',
            // Kita wajib melakukan hash pada password agar bisa diverifikasi oleh sistem login nanti
            'password' => password_hash('admin123', PASSWORD_BCRYPT),
            'role'     => 'admin'
        ];

        // Menyuntikkan data ke dalam tabel users
        $this->db->table('users')->insert($data);
    }
}
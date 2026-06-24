<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\UserModel;

class Auth extends ResourceController
{
    use ResponseTrait;

    public function login()
    {
        $userModel = new UserModel();
        
        // Tangkap input dari VueJS
        $json = $this->request->getJSON();
        $username = $json ? $json->username : $this->request->getVar('username');
        $password = $json ? $json->password : $this->request->getVar('password');

        // Cari user berdasarkan username di database
        $user = $userModel->where('username', $username)->first();

        // Jika user tidak ditemukan
        if (!$user) {
            return $this->fail('Username tidak ditemukan.', 400);
        }

        // Verifikasi password (menggunakan pencocokan teks biasa untuk keperluan UAS)
        if (!password_verify($password, $user['password'])) {
            return $this->fail('Password salah.', 400);
        }

        // Buat Token Sederhana berbasis Base64
        $tokenData = $user['username'] . ':' . $user['role'] . ':' . time();
        $token = base64_encode($tokenData);

        // Kirim balasan sukses beserta semua data kredensial ke VueJS
        $response = [
            'status'   => 200,
            'messages' => 'Login berhasil',
            'token'    => $token,
            'role'     => $user['role'],
            'user_id'  => $user['id'] // Wajib untuk fitur peminjaman mandiri
        ];
        
        return $this->respond($response);
    }
    public function register()
    {
        $userModel = new UserModel();
        
        // Tangkap input dari VueJS
        $json = $this->request->getJSON();
        $username = $json ? $json->username : $this->request->getVar('username');
        $password = $json ? $json->password : $this->request->getVar('password');

        // Cek apakah username sudah dipakai orang lain
        $cekUser = $userModel->where('username', $username)->first();
        if ($cekUser) {
            return $this->fail('Username sudah terdaftar, silakan pilih yang lain.', 400);
        }

        // Simpan data ke database
        $data = [
            'username' => $username,
            // Wajib di-hash agar aman dan bisa dibaca oleh fungsi login kita sebelumnya
            'password' => password_hash($password, PASSWORD_BCRYPT), 
            'role'     => 'member' // Otomatis mendaftar sebagai member
        ];

        $userModel->insert($data);

        $response = [
            'status'   => 201,
            'messages' => 'Pendaftaran berhasil! Silakan login.'
        ];
        
        return $this->respondCreated($response);
    }
}
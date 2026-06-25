<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\PeminjamanModel;
use App\Models\BukuModel;

class Peminjaman extends ResourceController
{
    use ResponseTrait;

    // 1. GET: Mengambil semua data peminjaman
    public function index()
    {
        $model = new PeminjamanModel();
        // Nanti di tingkat lanjut, kita bisa lakukan 'join' untuk menampilkan nama buku dan user
        $data = $model->findAll();
        return $this->respond($data);
    }

    // 2. POST: Membuat transaksi peminjaman baru
    public function create()
    {
        $peminjamanModel = new PeminjamanModel();
        $bukuModel = new BukuModel();

        // Tangkap data dari request
        $json = $this->request->getJSON();
        if ($json) {
            $data = [
                'user_id' => $json->user_id,
                'buku_id' => $json->buku_id,
                'tanggal' => $json->tanggal,
                'status'  => 'dipinjam' // Status default saat baru pinjam
            ];
        } else {
            $data = [
                'user_id' => $this->request->getVar('user_id'),
                'buku_id' => $this->request->getVar('buku_id'),
                'tanggal' => $this->request->getVar('tanggal'),
                'status'  => 'dipinjam'
            ];
        }

        // --- LOGIKA STOK BUKU ---
        $buku = $bukuModel->find($data['buku_id']);
        if (!$buku) {
            return $this->failNotFound('Buku tidak ditemukan.');
        }

        if ($buku['stok'] <= 0) {
            return $this->fail('Maaf, stok buku ini sedang habis.');
        }

        // Kurangi stok buku
        $stokBaru = $buku['stok'] - 1;
        $bukuModel->update($data['buku_id'], ['stok' => $stokBaru]);

        // Simpan transaksi peminjaman
        $peminjamanModel->insert($data);

        $response = [
            'status'   => 201,
            'messages' => [
                'success' => 'Buku berhasil dipinjam. Stok berkurang.'
            ]
        ];
        return $this->respondCreated($response);
    }

    // 3. PUT: Mengupdate transaksi (Misal: Mengembalikan buku)
    public function update($id = null)
    {
        $peminjamanModel = new PeminjamanModel();
        $bukuModel = new BukuModel();

        $transaksiLama = $peminjamanModel->find($id);
        if (!$transaksiLama) {
            return $this->failNotFound('Data peminjaman tidak ditemukan.');
        }

        $json = $this->request->getJSON();
        $statusBaru = $json ? $json->status : $this->request->getRawInputVar('status');

        // Jika status diubah dari 'dipinjam' menjadi 'dikembalikan'
        if ($transaksiLama['status'] === 'dipinjam' && $statusBaru === 'dikembalikan') {
            // Tambah kembali stok buku
            $buku = $bukuModel->find($transaksiLama['buku_id']);
            if ($buku) {
                $stokBaru = $buku['stok'] + 1;
                $bukuModel->update($transaksiLama['buku_id'], ['stok' => $stokBaru]);
            }
        }

        // Update status di tabel peminjaman
        $peminjamanModel->update($id, ['status' => $statusBaru]);

        $response = [
            'status'   => 200,
            'messages' => [
                'success' => 'Status peminjaman diperbarui.'
            ]
        ];
        return $this->respond($response);
    }

    // 4. DELETE: Menghapus data peminjaman
    public function delete($id = null)
    {
        $model = new PeminjamanModel();
        $cekData = $model->find($id);

        if ($cekData) {
            $model->delete($id);
            $response = [
                'status'   => 200,
                'messages' => [
                    'success' => 'Data riwayat peminjaman berhasil dihapus.'
                ]
            ];
            return $this->respondDeleted($response);
        } else {
            return $this->failNotFound('Data tidak ditemukan.');
        }
    }
}
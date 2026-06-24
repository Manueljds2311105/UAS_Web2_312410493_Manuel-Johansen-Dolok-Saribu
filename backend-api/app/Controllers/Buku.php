<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\BukuModel;

class Buku extends ResourceController
{
    use ResponseTrait;

    // 1. GET: Mengambil semua data buku
    public function index()
    {
        $model = new BukuModel();
        $data = $model->findAll();
        return $this->respond($data);
    }

    // 2. POST: Menyimpan data buku baru
    public function create()
    {
        $model = new BukuModel();
        $data = [
            'judul'          => $this->request->getVar('judul'),
            'kategori_genre' => $this->request->getVar('kategori_genre'),
            'penulis'        => $this->request->getVar('penulis'),
            'stok'           => $this->request->getVar('stok'),
            'cover_url'      => $this->request->getVar('cover_url'),
        ];
        
        $model->insert($data);
        
        $response = [
            'status'   => 201,
            'messages' => [
                'success' => 'Data buku berhasil ditambahkan.'
            ]
        ];
        return $this->respondCreated($response);
    }

    // 3. PUT: Mengubah/update data buku
    public function update($id = null)
    {
        $model = new BukuModel();
        
        // Menangkap data JSON dari VueJS (Axios)
        $json = $this->request->getJSON();
        
        if ($json) {
            $data = [
                'judul'          => $json->judul,
                'kategori_genre' => $json->kategori_genre,
                'penulis'        => $json->penulis,
                'stok'           => $json->stok,
                'cover_url'      => $json->cover_url,
            ];
        } else {
            // Fallback jika dikirim via form biasa
            $data = [
                'judul'          => $this->request->getVar('judul'),
                'kategori_genre' => $this->request->getVar('kategori_genre'),
                'penulis'        => $this->request->getVar('penulis'),
                'stok'           => $this->request->getVar('stok'),
                'cover_url'      => $this->request->getVar('cover_url'),
            ];
        }
        
        $model->update($id, $data);
        
        $response = [
            'status'   => 200,
            'messages' => [
                'success' => 'Data buku berhasil diubah.'
            ]
        ];
        return $this->respond($response);
    }

    // 4. DELETE: Menghapus data buku
    public function delete($id = null)
    {
        $model = new BukuModel();
        $cekData = $model->find($id);
        
        if ($cekData) {
            $model->delete($id);
            $response = [
                'status'   => 200,
                'messages' => [
                    'success' => 'Data buku berhasil dihapus.'
                ]
            ];
            return $this->respondDeleted($response);
        } else {
            return $this->failNotFound('Data buku tidak ditemukan.');
        }
    }
}
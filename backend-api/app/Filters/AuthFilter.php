<?php

namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Config\Services;

class AuthFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        // 1. Beri jalan bebas hambatan untuk metode GET (katalog) dan OPTIONS (CORS)
        if (in_array(strtolower($request->getMethod()), ['get', 'options'])) {
            return;
        }

        // 2. Tangkap header Authorization
        $header = $request->getHeaderLine('Authorization');
        
        // 3. Jika tidak ada header Authorization (Token kosong), tolak akses
        if (!$header) {
            return Services::response()
                ->setJSON([
                    'status' => 401,
                    'error' => 401,
                    'message' => 'Akses ditolak. Bearer Token tidak ditemukan.'
                ])
                ->setStatusCode(ResponseInterface::HTTP_UNAUTHORIZED);
        }

        // Ekstrak token (Pisahkan kata "Bearer " dan ambil kodenya)
        $token = explode(' ', $header)[1] ?? null;

        // 4. Validasi Token (Tolak jika token kosong/salah format)
        if (!$token) {
            return Services::response()
                ->setJSON([
                    'status' => 401,
                    'error' => 401,
                    'message' => 'Akses ditolak. Token tidak valid.'
                ])
                ->setStatusCode(ResponseInterface::HTTP_UNAUTHORIZED);
        }
        
        // Catatan: Jika kamu memiliki tabel khusus untuk memvalidasi token dari database, 
        // kamu bisa menambahkan logika pengecekan database tersebut di sini.
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        // Tidak perlu ada eksekusi setelah request
    }
}
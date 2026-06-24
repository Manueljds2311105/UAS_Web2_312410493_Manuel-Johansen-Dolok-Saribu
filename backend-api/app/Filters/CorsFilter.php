<?php

namespace App\Filters;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Filters\FilterInterface;

class CorsFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        // Mengizinkan semua domain (Live Server, GitHub Pages, dll)
        header('Access-Control-Allow-Origin: *');
        
        // MENGIZINKAN HEADER NGROK
        header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization, ngrok-skip-browser-warning');
        
        // Mengizinkan metode CRUD
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
        
        // TANGKAP REQUEST 'OPTIONS' (PREFLIGHT DARI BROWSER)
        if (strtolower($request->getMethod()) === 'options') {
            http_response_code(200);
            die();
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        // Tidak perlu ada kode di sini
    }
}
<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');
$routes->resource('buku');
$routes->resource('users');
$routes->resource('peminjaman');
// Rute untuk proses otentikasi login
// Pastikan namespace sesuai dengan struktur folder kamu
$routes->post('login', [\App\Controllers\Auth::class, 'login']);
$routes->post('register', [\App\Controllers\Auth::class, 'register']);

$routes->options('(:any)', static function() {
    return \Config\Services::response()->setStatusCode(200);
});


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
$routes->post('login', 'Auth::login');

$routes->options('(:any)', static function() {
    return \Config\Services::response()->setStatusCode(200);
});

$routes->post('register', 'Auth::register');
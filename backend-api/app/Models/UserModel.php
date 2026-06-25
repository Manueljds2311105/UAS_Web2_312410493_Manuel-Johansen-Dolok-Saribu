<?php

namespace App\Models;

use CodeIgniter\Model;

class UserModel extends Model
{
    protected $table            = 'users';
    protected $primaryKey       = 'id';
    protected $returnType       = 'array';
    // allowedFields wajib diisi agar fungsi insert/update CI4 tidak error
    protected $allowedFields    = ['username', 'password', 'role']; 
}
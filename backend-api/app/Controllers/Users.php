<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\UserModel;

class Users extends ResourceController
{
    use ResponseTrait;

    public function index()
    {
        $model = new UserModel();
        $data = $model->findAll();
        return $this->respond($data);
    }

    public function create()
    {
        $model = new UserModel();
        
        // Enkripsi password sebelum masuk ke database
        $passwordAsli = $this->request->getVar('password');
        $passwordHash = password_hash($passwordAsli, PASSWORD_BCRYPT);

        $data = [
            'username' => $this->request->getVar('username'),
            'password' => $passwordHash,
            'role'     => $this->request->getVar('role') ?? 'member',
        ];
        
        $model->insert($data);
        
        return $this->respondCreated([
            'status'   => 201,
            'messages' => ['success' => 'Data user berhasil ditambahkan.']
        ]);
    }

    public function update($id = null)
    {
        $model = new UserModel();
        $data = [
            'username' => $this->request->getRawInputVar('username'),
            'role'     => $this->request->getRawInputVar('role'),
        ];

        // Jika password ikut diubah, hash ulang
        $passwordBaru = $this->request->getRawInputVar('password');
        if (!empty($passwordBaru)) {
            $data['password'] = password_hash($passwordBaru, PASSWORD_BCRYPT);
        }
        
        $model->update($id, $data);
        
        return $this->respond([
            'status'   => 200,
            'messages' => ['success' => 'Data user berhasil diubah.']
        ]);
    }

    public function delete($id = null)
    {
        $model = new UserModel();
        $cekData = $model->find($id);
        
        if ($cekData) {
            $model->delete($id);
            return $this->respondDeleted([
                'status'   => 200,
                'messages' => ['success' => 'Data user berhasil dihapus.']
            ]);
        } else {
            return $this->failNotFound('Data user tidak ditemukan.');
        }
    }
}
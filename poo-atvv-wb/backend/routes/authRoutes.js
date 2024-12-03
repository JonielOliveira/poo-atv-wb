    const express = require('express');
    const router = express.Router();
    const authorizeRole = require('../middlewares/authorizeRole');
    const authorizeUserId = require('../middlewares/authorizeUserId');
    const { createUser,
            updateUser,
            deleteUser,
            listAllUsers,
            getPendingUsers,
            getApprovedUsers,
            approveUser,
            loginUser
        } = require('../controllers/authController');

    // [1] Criar um novo usuário
    router.post('/users', createUser);

    // [2] Atualizar um usuário específico
    router.put('/users/:userId', authorizeUserId, updateUser);

    // [3] Deletar um usuário específico
    router.delete('/users/:userId', authorizeRole(['admin']), deleteUser);

    // [4] Listar todos os usuários
    router.get('/users', authorizeRole(['admin']), listAllUsers);

    // [5] Obter todos os usuários não aprovados
    router.get('/users/pending', authorizeRole(['admin']), getPendingUsers);

    // [6] Obter todos os usuários aprovados
    router.get('/users/approved', authorizeRole(['admin']), getApprovedUsers);

    // [7] Aprovar um usuário
    router.patch('/users/approve', authorizeRole(['admin']), approveUser);

    // [8] Rota de Login do Usuário
    router.post('/login', loginUser);

    module.exports = router;

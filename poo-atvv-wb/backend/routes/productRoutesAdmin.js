const express = require('express');
const router = express.Router();
const authorizeRole = require('../middlewares/authorizeRole');
const {
  createProduct,
  updateProduct,
  deleteProduct,
  listAllProducts,
  getProductById,
  getActiveProducts,
  getInactiveProducts,
  activateProduct,
  deactivateProduct
} = require('../controllers/productController');

// [6] Obter todos os produtos ativos
router.get('/products/active', getActiveProducts);

// [7] Obter todos os produtos inativos
router.get('/products/inactive', authorizeRole(['admin']), getInactiveProducts);

// [1] Criar um novo produto
router.post('/products', authorizeRole(['admin']), createProduct);

// [2] Atualizar um produto específico
router.put('/products/:productId', authorizeRole(['admin']), updateProduct);

// [3] Deletar um produto específico
router.delete('/products/:productId', authorizeRole(['admin']), deleteProduct);

// [4] Listar todos os produtos
router.get('/products', authorizeRole(['admin']), listAllProducts);

// [5] Obter um produto específico pelo ID
router.get('/products/:productId', authorizeRole(['admin']), getProductById);

// [8] Ativar um produto específico pelo ID
router.patch('/products/activate/:productId', authorizeRole(['admin']), activateProduct);

// [9] Desativar um produto específico pelo ID
router.patch('/products/deactivate/:productId', authorizeRole(['admin']), deactivateProduct);

module.exports = router;

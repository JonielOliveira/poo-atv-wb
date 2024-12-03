const express = require('express');
const router = express.Router();
const authorizeRole = require('../middlewares/authorizeRole');
const {
  createSale,
  listAllSales,
  getSaleById,
  updatePaymentStatus,
  deleteSale
} = require('../controllers/saleController');

// [1] Criar uma nova venda
router.post('/sales', authorizeRole(['admin', 'client']), createSale);

// [2] Listar todas as vendas
router.get('/sales', authorizeRole(['admin']), listAllSales);

// [3] Obter uma venda específica pelo ID
router.get('/sales/:saleId', authorizeRole(['admin', 'client']), getSaleById);

// [4] Atualizar o status de pagamento de uma venda
router.patch('/sales/payment-status/:saleId', authorizeRole(['admin']), updatePaymentStatus);

// [5] Deletar uma venda específica pelo ID
router.delete('/sales/:saleId', authorizeRole(['admin']), deleteSale);

module.exports = router;

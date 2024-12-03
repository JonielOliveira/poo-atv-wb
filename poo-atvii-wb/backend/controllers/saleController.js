const Sale = require('../models/saleModel');
const Product = require('../models/productModel');
const Client = require('../models/userModel');

//[1] Método para criar uma nova venda
exports.createSale = async (req, res) => {
  try {
    const { clientId, productId, quantity, paymentMethod } = req.body;
    
    // Verifica se o cliente existe
    const client = await Client.findById(clientId);
    if (!client) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }

    // Verifica se o produto existe
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    // Verifica se a quantidade solicitada é suficiente
    if (product.quantity < quantity) {
      return res.status(400).json({ message: 'Quantidade insuficiente em estoque' });
    }

    // Calcula o preço total
    const totalPrice = product.price * quantity;

    // Cria a venda
    const newSale = new Sale({
      client: clientId,
      product: productId,
      quantity,
      totalPrice,
      paymentMethod,
      paymentStatus: 'pending', // Inicialmente, a venda está pendente até o pagamento ser confirmado
    });

    // Atualiza a quantidade do produto no estoque
    product.quantity -= quantity;
    await product.save();

    // Salva a venda
    await newSale.save();

    res.status(201).json({ message: 'Venda criada com sucesso', sale: newSale });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar venda', error: error.message });
  }
};

//[2] Método para listar todas as vendas
exports.listAllSales = async (req, res) => {
  try {
    const sales = await Sale.find().populate('client').populate('product');
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar todas as vendas', error: error.message });
  }
};

//[3] Método para obter uma venda específica pelo ID
exports.getSaleById = async (req, res) => {
  try {
    const { saleId } = req.params;
    const sale = await Sale.findById(saleId).populate('client').populate('product');

    if (!sale) {
      return res.status(404).json({ message: 'Venda não encontrada' });
    }

    res.status(200).json(sale);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar venda', error: error.message });
  }
};

//[4] Método para atualizar o status de pagamento de uma venda
exports.updatePaymentStatus = async (req, res) => {
  try {
    const { saleId } = req.params;
    const { paymentStatus } = req.body; // Ex: 'paid', 'pending', 'failed'

    if (!['paid', 'pending', 'failed'].includes(paymentStatus)) {
      return res.status(400).json({ message: 'Status de pagamento inválido' });
    }

    const sale = await Sale.findById(saleId);
    if (!sale) {
      return res.status(404).json({ message: 'Venda não encontrada' });
    }

    sale.paymentStatus = paymentStatus;
    await sale.save();

    res.status(200).json({ message: 'Status de pagamento atualizado com sucesso', sale });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar status de pagamento', error: error.message });
  }
};

//[5] Método para deletar uma venda
exports.deleteSale = async (req, res) => {
  try {
    const { saleId } = req.params;
    const sale = await Sale.findById(saleId);

    if (!sale) {
      return res.status(404).json({ message: 'Venda não encontrada' });
    }

    // Se a venda foi paga, não podemos desfazer a transação. Isso pode ser melhorado dependendo da lógica de negócios
    if (sale.paymentStatus === 'paid') {
      return res.status(400).json({ message: 'Não é possível excluir uma venda já paga' });
    }

    await Sale.findByIdAndDelete(saleId);
    res.status(200).json({ message: 'Venda excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir venda', error: error.message });
  }
};

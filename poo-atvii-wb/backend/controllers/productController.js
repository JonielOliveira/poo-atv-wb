const Product = require('../models/productModel');

//[1] Método para criar um novo produto
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, sku, quantity, type, category, images, tags, brand, discount } = req.body;
    
    const existingProduct = await Product.findOne({ sku });
    if (existingProduct) {
      return res.status(400).json({ message: 'Produto já existe com esse SKU' });
    }

    const newProduct = new Product({
      name,
      description,
      price,
      sku,
      quantity,
      type,
      category,
      images,
      tags,
      brand,
      discount,
    });
    await newProduct.save();

    res.status(201).json({ message: 'Produto criado com sucesso', product: newProduct });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar produto', error: error.message });
  }
};

//[2] Método para atualizar um produto específico usando o ID
exports.updateProduct = async (req, res) => {
  try {
    const { productId } = req.params; // Recebe o ID do produto da URL
    const productUpdates = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    Object.assign(product, productUpdates); // Atualiza o produto com os novos dados
    await product.save();

    res.status(200).json({ message: 'Produto atualizado com sucesso', product });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar produto', error: error.message });
  }
};

//[3] Método para deletar um produto específico usando o ID
exports.deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params; // Recebe o ID do produto da URL
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    await Product.findByIdAndDelete(productId);
    res.status(200).json({ message: 'Produto excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir produto', error: error.message });
  }
};

//[4] Método para obter todos os produtos
exports.listAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar todos os produtos', error: error.message });
  }
};

//[5] Método para obter um produto específico pelo ID
exports.getProductById = async (req, res) => {
  try {
    const { productId } = req.params; // Recebe o ID do produto da URL
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar produto', error: error.message });
  }
};

//[6] Método para obter os produtos ativos
exports.getActiveProducts = async (req, res) => {
  try {
    const activeProducts = await Product.find({ isActive: true }); // Busca produtos ativos
    res.status(200).json(activeProducts);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar produtos ativos', error });
  }
};

//[7] Método para obter os produtos inativos
exports.getInactiveProducts = async (req, res) => {
  try {
    const inactiveProducts = await Product.find({ isActive: false }); // Busca produtos inativos
    res.status(200).json(inactiveProducts);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar produtos inativos', error });
  }
};

//[8] Método para ativar um produto
exports.activateProduct = async (req, res) => {
  try {
    const { productId } = req.params; // Recebe o ID do produto dos parâmetros da URL
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    product.isActive = true;
    await product.save();

    res.status(200).json({ message: 'Produto ativado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao ativar o produto', error: error.message });
  }
};

//[9] Método para desativar um produto
exports.deactivateProduct = async (req, res) => {
  try {
    const { productId } = req.params; // Recebe o ID do produto dos parâmetros da URL
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    product.isActive = false;
    await product.save();

    res.status(200).json({ message: 'Produto desativado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao desativar o produto', error: error.message });
  }
};

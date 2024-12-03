const Product = require('../models/productModel');

exports.outOfStockReport = async (req, res) => {
  try {
    const outOfStockProducts = await Product.find({ quantity: 0 });
    res.json(outOfStockProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

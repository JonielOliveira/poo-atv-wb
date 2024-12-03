import React, { useState, useEffect } from 'react';
import api from '../services/api';

type Product = {
  _id: string;
  name: string;
  quantity: number;
};

const InventoryManager: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await api.get('/products');
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  const handleUpdateStock = async (productId: string) => {
    await api.put('/products/update', { productId, quantity });
    setProducts(products.map(product => product._id === productId ? { ...product, quantity } : product));
  };

  return (
    <div>
      <h2>Gerenciamento de Estoque</h2>
      <ul>
        {products.map(product => (
          <li key={product._id}>
            {product.name} - Em estoque: {product.quantity}
            <input type="number" value={quantity} onChange={e => setQuantity(Number(e.target.value))} />
            <button onClick={() => handleUpdateStock(product._id)}>Atualizar Estoque</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InventoryManager;

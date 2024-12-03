import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

interface Product {
  _id: string;
  name: string;
  type: ProductType;
  description: string;
  price: number;
  quantity: number;
  discount: { percentage: number; amount: number };
  images: string[];
}

type ProductType = "service" | "product";

const typeMap: Record<ProductType, string> = {
  service: "Serviço",
  product: "Produto",
};

const imgMap: Record<ProductType, string> = {
  service: "/assets/images/service_example.png",
  product: "/assets/images/product_example.png",
};

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const {id} = useAuth();


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/admin/products/active');
        setProducts(response.data);

        // Inicializa as quantidades mínimas para cada produto
        const initialQuantities: Record<string, number> = {};
        response.data.forEach((product: Product) => {
          initialQuantities[product._id] = 1; // valor mínimo
        });
        setQuantities(initialQuantities);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleQuantityChange = (productId: string, increment: boolean, max: number) => {
    setQuantities((prev) => {
      const newQuantity = increment
        ? Math.min(prev[productId] + 1, max) // Incrementa até o máximo disponível
        : Math.max(prev[productId] - 1, 1); // Decrementa até o mínimo de 1
      return { ...prev, [productId]: newQuantity };
    });
  };

  const handlePurchase = async (productId: string) => {
    if (id) {
      
      const selectedProduct = products.find(product => product._id === productId);

      // Verifica se a quantidade solicitada é válida
      if (!selectedProduct) {
        alert('Produto não encontrado.');
        return;
      }
  
      if (quantities[productId] > selectedProduct.quantity) {
        alert('Quantidade solicitada excede a disponível em estoque.');
        return;
      }

      try {
        const saleData = {
          clientId: id,
          productId: productId,
          quantity: quantities[productId], // usa a quantidade selecionada
          paymentMethod: 'cash',
        };
        console.log(saleData);
        const response = await api.post('/sale/sales', saleData);
        alert(`Venda realizada com sucesso! ID da Venda: ${response.data.sale._id}`);
      } catch (error) {
        console.error('Erro ao realizar a venda:', error);
        alert('Erro ao realizar a venda. Tente novamente mais tarde.');
      }
    } else {
      alert('Faça login para realizar uma compra!');
    }
  };
  
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    typeMap[product.type].toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="center-align">
        <img 
            src="/assets/icons/logo_name.png" 
            alt="Produtos" 
            style={{ width: '50%', height: 'auto' }} // ajuste o tamanho conforme necessário
        />
      </div>
      <div className="input-field col s12 center-align">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Pesquisar produtos..."
        />
      </div>
      <div className="row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="col s12 m6 l4" key={product._id}>
              <div className="card borda">
                <div className="card-image">
                  {/* <img src={product.images[0]} alt={product.name} /> */}
                  <img 
                    src={`${imgMap[product.type] || "/assets/images/product_example_dark.png" }`}
                    alt={product.name}
                    style={{ width: '80%', height: 'auto', display: 'block', margin: '0 auto' }}
                  />
                  <span className="card-title" style={{ fontWeight: 'bold', color: '#FF882A', marginLeft: '20px' }}>
                    {product.name}
                  </span>
                </div>
                <div className="card-content">
                  <p>{`Tipo: ${typeMap[product.type] || "--"}`}</p>
                  <p>{product.description}</p>
                  <p>
                    Preço: R$ {product.price.toFixed(2)}{' '}
                    {product.discount.percentage > 0 && (
                      <span className="red-text">
                        (Desconto: {product.discount.percentage}%)
                      </span>
                    )}
                  </p>
                  <p>
                    Disponível: {product.quantity}
                  </p>
                </div>
                <div className="card-action" style={{ textAlign: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                    <button
                      className="btn-small"
                      onClick={() => handleQuantityChange(product._id, false, product.quantity)}
                    >
                      -
                    </button>
                    <span>{quantities[product._id]}</span>
                    <button
                      className="btn-small"
                      onClick={() => handleQuantityChange(product._id, true, product.quantity)}
                    >
                      +
                    </button>
                    <button 
                      className="btn" 
                      onClick={() => handlePurchase(product._id)}
                    >
                      Comprar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="center-align">Nenhum produto ou serviço encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default Home;

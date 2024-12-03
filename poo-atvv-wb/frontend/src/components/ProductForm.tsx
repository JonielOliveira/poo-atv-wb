import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import NavbarOrange from './NavbarOrange';

interface ProductFormProps {
  productId?: string;
  onSuccess: () => void;
  title: string;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSuccess, title }) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [sku, setSku] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [brand, setBrand] = useState('');
  const [discount, setDiscount] = useState({ percentage: 0, amount: 0 });
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const calculatedAmount = (price * discount.percentage) / 100;
    setDiscount(prev => ({ ...prev, amount: calculatedAmount }));
  }, [price, discount.percentage]);

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        const response = await api.get(`/admin/products/${productId}`);
        const product = response.data;
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setSku(product.sku);
        setQuantity(product.quantity);
        setCategory(product.category);
        setImages(product.images);
        setTags(product.tags);
        setBrand(product.brand);
        setDiscount(product.discount);
        setIsActive(product.isActive);
      };
      fetchProduct();
    }
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const productData = {
        name,
        description,
        price,
        sku: "SKU" + (new Date().toISOString().replace(/[-T:.Z]/g, '')),
        quantity,
        type: "product",
        category,
        images,
        tags,
        brand,
        discount,
        dateAdded: new Date().toISOString().split('T')[0],
        isActive,
      };

      if (productId) {
        await api.put(`/admin/products/${productId}`, productData);
      } else {
        await api.post('/admin/products', productData);
      }

      alert('Produto salvo com sucesso!');
      onSuccess();
    } catch (error) {
      console.error('Erro ao salvar o produto', error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <NavbarOrange title={`Formulário de Produto (${title})`} />
        {/* <h4 className="center-align">Formulário de Produto</h4> */}
        <div className="collection borda branca">

          {/* SKU - Não Editável */}
          <div className="input-field col s12">
            <input type="text" value={sku} readOnly />
            <label>SKU</label>
          </div>

          {/* Nome do Produto */}
          <div className="input-field col s12">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label htmlFor="name">Nome do Produto</label>
          </div>

          {/* Descrição do Produto */}
          <div className="input-field col s12">
            <textarea
              id="description"
              className="materialize-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <label htmlFor="description">Descrição</label>
          </div>

          {/* Preço */}
          <div className="input-field col s12">
            <input
              type="number"
              value={price.toFixed(2)}
              onChange={(e) => setPrice(Number(e.target.value))}
              min={0}
              step={0.01}
              required
            />
            <label htmlFor="price">Preço</label>
          </div>

          {/* Quantidade */}
          <div className="input-field col s12">
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min={0}
              required
            />
            <label htmlFor="quantity">Quantidade</label>
          </div>

          {/* Categoria */}
          <div className="input-field col s12">
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor="category">Categoria</label>
          </div>

          {/* URLs das Imagens */}
          <div className="input-field col s12">
            <input
              type="text"
              value={images.join(', ')}
              onChange={(e) => setImages(e.target.value.split(',').map((img) => img.trim()))}
            />
            <label htmlFor="images">URLs das Imagens (separadas por vírgula)</label>
          </div>

          {/* Tags */}
          <div className="input-field col s12">
            <input
              type="text"
              value={tags.join(', ')}
              onChange={(e) => setTags(e.target.value.split(',').map((tag) => tag.trim()))}
            />
            <label htmlFor="tags">Tags (separadas por vírgula)</label>
          </div>

          {/* Marca */}
          <div className="input-field col s12">
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
            <label htmlFor="brand">Marca</label>
          </div>

          {/* Desconto (%) */}
          <div className="input-field col s12">
            <input
              type="number"
              value={discount.percentage}
              onChange={(e) => setDiscount({ ...discount, percentage: Number(e.target.value) })}
              min={0}
              max={100}
              step={0.01}
              required
            />
            <label htmlFor="discountPercentage">Desconto (%)</label>
          </div>

          {/* Valor do Desconto */}
          <div className="input-field col s12">
            <input
              type="number"
              value={discount.amount.toFixed(2)}
              readOnly
            />
            <label htmlFor="discountAmount">Valor do Desconto</label>
          </div>

          {/* Produto Ativo */}
          <div className="col s12">
            <label>
              <input
                type="checkbox"
                checked={isActive}
                onChange={() => setIsActive(!isActive)}
              />
              <span>Produto Ativo</span>
            </label>
          </div>

          {/* Botões de Ação */}
          <div className="col s12">
            <button type="button" className="btn" onClick={() => navigate(-1)}>
              Voltar
            </button>
            <button type="submit" className="btn teal" onClick={handleSubmit}>
              Salvar Produto
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductForm;

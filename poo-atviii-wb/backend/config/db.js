const mongoose = require('mongoose');
require('dotenv').config(); // Carrega as variáveis do arquivo .env
const User = require('../models/userModel');
const Product = require('../models/productModel');
const Sale = require('../models/saleModel');

// Obtém a variável MONGODB_URI do arquivo .env
const mongoURI = process.env.MONGODB_URI
const userDataSample = require('./userSampleDb.json');
const productDataSample = require('./productSampleDb.json');

//Função para ler registros de usuários json e inseri-los no db
async function populateUserSampleToDb() {
  try {
    for (const user of userDataSample) {
      await User.create({
        email: user.email,
        password: user.password,
        name: user.name,
        cpf: user.cpf,
        isApproved: user.isApproved,
        consentGiven: user.consentGiven,
        role: user.role
      });
      console.log(`Usuário ${user.email} inserido com sucesso.`);
    }

    console.log('Todos os usuários foram inseridos no banco.');
  } catch (error) {
    console.error('Erro ao inserir usuários:', error);
  }
}


async function populateProductSampleToDb() {
  try {
    for (const product of productDataSample) {
      await Product.create({
        name: product.name,
        description: product.description,
        price: product.price,
        sku: product.sku,
        quantity: product.quantity,
        type: product.type,
        category: product.category,
        images: product.images || [], // Adiciona array vazio se não houver imagens
        tags: product.tags || [],
        brand: product.brand,
        discount: product.discount || {},
        dateAdded: product.dateAdded || Date.now(),
        isActive: product.isActive
      });
      console.log(`Produto ${product.name} inserido com sucesso.`);
    }

    console.log('Todos os produtos foram inseridos no banco.');
  } catch (error) {
    console.error('Erro ao inserir produtos:', error);
  }
}

async function populateSalesToDb() {
  try {
    // Buscando todos os clientes e produtos no banco
    const users = await User.find({ role: 'client' }); // Filtra apenas os clientes
    const products = await Product.find(); // Busca todos os produtos

    if (users.length === 0 || products.length === 0) {
      console.log('Nenhum cliente ou produto encontrado para criar vendas.');
      return;
    }

    for (let i = 0; i < 20; i++) { // Gerar até 20 vendas
      // Escolher um cliente e um produto aleatoriamente
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomProduct = products[Math.floor(Math.random() * products.length)];

      // Definir uma quantidade aleatória (entre 1 e 5, por exemplo)
      const quantity = Math.floor(Math.random() * 5) + 1;

      // Calcular o preço total
      const totalPrice = quantity * randomProduct.price;

      // Escolher o status de pagamento aleatoriamente
      const paymentStatuses = ['paid', 'pending', 'failed'];
      const randomPaymentStatus = paymentStatuses[Math.floor(Math.random() * paymentStatuses.length)];

      // Criar a venda no banco
      await Sale.create({
        client: randomUser._id,
        product: randomProduct._id,
        quantity: quantity,
        totalPrice: totalPrice,
        saleDate: new Date(),
        paymentStatus: randomPaymentStatus,
        discountApplied: false,
        paymentMethod: 'cash'
      });

      console.log(`Venda criada para o cliente ${randomUser.email} com o produto ${randomProduct.name}.`);
    }

    console.log('Vendas geradas e inseridas no banco com sucesso.');
  } catch (error) {
    console.error('Erro ao criar vendas:', error);
  }
}


mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('MongoDB connected'); 
  
  try {
    // Encontrar um usuário Admin no banco de dados
    const users = await User.find({ role: 'admin' })
    if (users.length === 0) {
      console.log('Nenhum usuário admin encontrado no banco de dados...');

      const nome = process.env.ADMIN_NAME;
      const email = process.env.ADMIN_EMAIL;
      const senha = process.env.ADMIN_SENHA;

      User.create({ 
        email: email, 
        password: senha,
        name: nome,
        cpf: "123.456.789-00",
        isApproved: true,
        consentGiven: true,
        role: 'admin'
      });

      await populateUserSampleToDb();
      await populateProductSampleToDb();

      console.log('Usuário Admin Padrão criado com sucesso:');
      console.log(`Nome: ${nome}`);
      console.log(`E-mail: ${email}`);
      console.log(`Senha: ${senha}`);

    } else {
      console.log('Usuários Admin encontrados:');
      console.log(`Nome: ${users[0]['name']}`);
      console.log(`E-mail: ${users[0]['email']}`);
    }

    await populateSalesToDb();
  } catch (error) {
    console.error('Erro ao buscar usuário Admin: ', error.message);
  }

})
.catch(err => console.log(err));

module.exports = mongoose;

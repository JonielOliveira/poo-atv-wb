require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutesAdmin = require('./routes/productRoutesAdmin');
const reportRoutes = require('./routes/reportRoutes');
const saleRoutesAdmin = require('./routes/saleRoutesAdmin');

const app = express();

const backendPort = process.env.BACKEND_PORT || 5000;
const frontendPort = process.env.FRONTEND_PORT || 3000;

// Configura o CORS para permitir o frontend
app.use(cors({
    origin: `http://localhost:${frontendPort}` // Permite somente o frontend
}));

app.use(express.json());

app.use('/sale', saleRoutesAdmin);
app.use('/auth', authRoutes);
app.use('/admin', productRoutesAdmin);
// app.use('/products', productRoutes);
app.use('/reports', reportRoutes);


app.listen(backendPort, () => console.log(`Server running on port ${backendPort}`));

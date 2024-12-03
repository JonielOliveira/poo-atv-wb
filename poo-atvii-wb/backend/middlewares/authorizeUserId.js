const jwt = require('jsonwebtoken');

// Middleware para autorizar com base no userId
const authorizeUserId = (req, res, next) => {
  try {
    // Obtenha o token da requisição
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return res.status(403).json({ message: 'Acesso negado' });

    // Decodifique o token para obter o userId
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Verifique se o userId do token corresponde ao userId da rota
    if (decoded.userId !== req.params.userId) {
      return res.status(403).json({ message: 'Acesso negado' });
    }

    // Armazene o payload no `req.user` e prossiga
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Token inválido' });
  }
};

module.exports = authorizeUserId;

const jwt = require('jsonwebtoken');

// Middleware para autorizar por uma ou mais `roles`
const authorizeRole = (roles) => {
  return (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return res.status(403).json({ message: 'Acesso negado' });

    try {
      // Decodifique o token para obter o payload (incluindo o role)
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Verifique se o `role` do usuário está na lista de `roles` permitidas
      if (!roles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Acesso negado' });
      }

      // Armazene o payload no `req.user` e prossiga
      req.user = decoded;
      next();
    } catch (error) {
      res.status(400).json({ message: 'Token inválido' });
    }
  };
};

module.exports = authorizeRole;

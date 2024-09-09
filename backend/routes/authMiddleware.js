// authMiddleware.js
const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  // Check for Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  // console.log(authHeader);

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Verify JWT token
  jwt.verify(token, 'secret', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    // Attach user information to req
    req.user = user;
    next();
  });
};


module.exports = authenticateUser;

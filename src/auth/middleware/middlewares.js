// authentication.js

const jwt = require('jsonwebtoken');

// Middleware function to authenticate user
function authenticateUser(req, res, next) {
  // Extract the token from the request headers
  const token = req.headers.authorization;

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user ID to the request object
    req.userId = decoded.userId;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Return an error if token is invalid
    return res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = { authenticateUser };

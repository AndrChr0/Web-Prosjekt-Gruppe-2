const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) { res.status(401).json({ message: "A token is required for authentication" }); return; }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Token is not valid" });
    }
    req.user = decoded;
    next();
  });

};

const requireRole = (roles) => (req, res, next) => {
  if (!req.user || !req.user.role) {
    return res.status(403).json({ message: "No user or role found" });
  }

  // Convert a single role to an array
  if (typeof roles === 'string') {
    roles = [roles];
  }

  // If roles is not an array or any of the roles is not a string, throw an error
  if (!Array.isArray(roles) || roles.some(role => typeof role !== 'string')) {
    return res.status(500).json({ message: "Invalid roles" });
  }

  // Check if the roles array contains more than two roles and return an error if it does
  if (roles.length > 2) {
    return res.status(400).json({ message: "Error: No more than two roles are allowed." });
  }

  // if the user role is not in the roles array, return 403 Forbidden
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};


module.exports = { verifyToken, requireRole };

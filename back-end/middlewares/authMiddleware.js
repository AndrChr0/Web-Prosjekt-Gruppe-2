import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    console.log("Token received:", token); // Debugging
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log("Token verification error:", err); // Debugging
        return res.status(403).json({ message: "Token is not valid" });
      }
      req.user = decoded;
      next();
    });
  } else {
    res.status(401).json({ message: "A token is required for authentication" });
  }
};

const requireRole = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};

//module.exports = { verifyToken, requireRole };
export { verifyToken, requireRole };

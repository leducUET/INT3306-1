const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log(decoded);
      // Get user from the token
      req.userId = decoded.id;
      next();
    } catch (error) {
      res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }
  }

  if (!token) {
    res.status(401).json({
      success: false,
      message: "Not authorized, no token",
    });
  }
};

module.exports = { verifyToken };

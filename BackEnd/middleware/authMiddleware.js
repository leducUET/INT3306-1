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

      // Get user from the token
      req.userId = decoded.userId;
      next();
    } catch (error) {
      res.status(401).json({
        success: false,
        message: "Not authorized",
      });
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(401).json({
      success: false,
      message: "Not authorized",
    });
    throw new Error("Not authorized, no token");
  }
};

module.exports = { verifyToken };

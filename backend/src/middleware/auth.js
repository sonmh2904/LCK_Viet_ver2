const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ 
        code: 401, 
        message: "Không có token xác thực" 
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");
    
    // Get user from database
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ 
        code: 401, 
        message: "Token không hợp lệ" 
      });
    }

    if (!user.isActive) {
      return res.status(401).json({ 
        code: 401, 
        message: "Tài khoản đã bị khóa" 
      });
    }

    // Add user info to request
    req.user = {
      userId: user._id,
      email: user.email,
      role: user.role
    };

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(401).json({ 
      code: 401, 
      message: "Token không hợp lệ hoặc đã hết hạn" 
    });
  }
};

// Middleware to check if user is admin
const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ 
      code: 403, 
      message: "Không có quyền truy cập" 
    });
  }
  next();
};

module.exports = {
  authenticateToken,
  requireAdmin
};

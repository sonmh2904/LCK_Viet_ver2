const User = require("../../models/User.model");
const jwt = require("jsonwebtoken");

// Register
module.exports.register = async (req, res) => {
  try {
    const { email, password, fullname } = req.body;

    // Validation
    if (!email || !password || !fullname) {
      return res.status(400).json({ 
        code: 400, 
        message: "Vui lòng điền đầy đủ thông tin" 
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        code: 400, 
        message: "Mật khẩu phải có ít nhất 6 ký tự" 
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        code: 400, 
        message: "Email đã tồn tại" 
      });
    }

    // Create new user
    const user = new User({
      email,
      password,
      fullname,
      role: "admin" // Default admin for single user system
    });

    await user.save();

    // Generate token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "7d" }
    );

    res.status(201).json({
      code: 201,
      message: "Đăng ký thành công",
      data: {
        user: user.toJSON(),
        token
      }
    });

  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ 
      code: 500, 
      message: "Đăng ký thất bại", 
      error: error.message 
    });
  }
};

// Login
module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ 
        code: 400, 
        message: "Vui lòng điền email và mật khẩu" 
      });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ 
        code: 401, 
        message: "Email hoặc mật khẩu không đúng" 
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({ 
        code: 401, 
        message: "Tài khoản đã bị khóa" 
      });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ 
        code: 401, 
        message: "Email hoặc mật khẩu không đúng" 
      });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "7d" }
    );

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    res.json({
      code: 200,
      message: "Đăng nhập thành công",
      data: {
        user: user.toJSON(),
        token
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ 
      code: 500, 
      message: "Đăng nhập thất bại", 
      error: error.message 
    });
  }
};

// Get current user
module.exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ 
        code: 404, 
        message: "Không tìm thấy người dùng" 
      });
    }

    res.json({
      code: 200,
      message: "Lấy thông tin người dùng thành công",
      data: user.toJSON()
    });

  } catch (error) {
    console.error("Get current user error:", error);
    res.status(500).json({ 
      code: 500, 
      message: "Lấy thông tin người dùng thất bại", 
      error: error.message 
    });
  }
};

// Logout (client-side only, just clear token)
module.exports.logout = async (req, res) => {
  res.json({
    code: 200,
    message: "Đăng xuất thành công"
  });
};

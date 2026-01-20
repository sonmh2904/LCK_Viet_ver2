const Information = require("../../models/Information.model");

// Add new information
module.exports.addInformation = async (req, res) => {
  try {
    const { fullName, phoneNumber, province, district, description } = req.body;
    
    if (!fullName) {
      return res.status(400).json({ 
        code: 400, 
        message: "Họ và tên là bắt buộc" 
      });
    }
    
    if (!phoneNumber) {
      return res.status(400).json({ 
        code: 400, 
        message: "Số điện thoại là bắt buộc" 
      });
    }
    
    const newInformation = new Information({
      fullName,
      phoneNumber,
      province,
      district,
      description,
      status: "pending"
    });
    
    await newInformation.save();
    res.status(201).json({ 
      code: 201, 
      message: "Information created successfully", 
      data: newInformation 
    });
  } catch (error) {
    console.error("Error creating information:", error);
    res.status(400).json({ 
      code: 400, 
      message: "Lỗi khi tạo thông tin",
      error: error.message 
    });
  }
};

// Get all information
module.exports.getAllInformation = async (req, res) => {
  try {
    const informations = await Information.find().sort({ createdAt: -1 });
    res.json({ 
      code: 200, 
      message: "Informations fetched successfully", 
      data: informations 
    });
  } catch (error) {
    console.error("Error fetching informations:", error);
    res.status(500).json({ 
      code: 500, 
      message: "Failed to fetch informations", 
      error: error.message 
    });
  }
};

// Get information by ID
module.exports.getDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const information = await Information.findById(id);
    
    if (!information) {
      return res.status(404).json({ 
        code: 404, 
        message: "Không tìm thấy thông tin" 
      });
    }
    
    res.json({ 
      code: 200, 
      message: "Information fetched successfully", 
      data: information 
    });
  } catch (error) {
    console.error("Error fetching information:", error);
    res.status(500).json({ 
      code: 500, 
      message: "Failed to fetch information", 
      error: error.message 
    });
  }
};

// Update information status
module.exports.updateInformation = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({ 
        code: 400, 
        message: "Status là bắt buộc" 
      });
    }
    
    if (!["pending", "completed"].includes(status)) {
      return res.status(400).json({ 
        code: 400, 
        message: "Giá trị trạng thái không hợp lệ" 
      });
    }
    
    const updatedInformation = await Information.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    
    if (!updatedInformation) {
      return res.status(404).json({ 
        code: 404, 
        message: "Không tìm thấy thông tin" 
      });
    }
    
    res.json({ 
      code: 200, 
      message: "Information status updated successfully", 
      data: updatedInformation 
    });
  } catch (error) {
    console.error("Error updating information:", error);
    res.status(400).json({ 
      code: 400, 
      message: "Lỗi khi cập nhật thông tin",
      error: error.message 
    });
  }
};
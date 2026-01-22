const express = require('express');
const router = express.Router();
const {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
    hardDeleteCategory
} = require('../../controller/category/categories.controller');

// Middleware để validate request (optional)
const validateCategory = (req, res, next) => {
    const { name } = req.body;
    
    if (req.method === 'POST' && !name) {
        return res.status(400).json({
            code: 400,
            message: 'Tên danh mục là bắt buộc'
        });
    }
    
    next();
};

// Routes cho Categories

// POST /api/v1/categories - Tạo category mới
router.post('/', validateCategory, createCategory);

// GET /api/v1/categories - Lấy tất cả categories (với pagination và filter)
router.get('/', getAllCategories);

// GET /api/v1/categories/:id - Lấy category theo ID
router.get('/:id', getCategoryById);

// PUT /api/v1/categories/:id - Cập nhật category
router.put('/:id', validateCategory, updateCategory);

// PATCH /api/v1/categories/:id - Cập nhật partial category
router.patch('/:id', updateCategory);

// DELETE /api/v1/categories/:id - Soft delete category
router.delete('/:id', deleteCategory);

// DELETE /api/v1/categories/:id/hard - Hard delete category (xóa vĩnh viễn)
router.delete('/:id/hard', hardDeleteCategory);

module.exports = router;
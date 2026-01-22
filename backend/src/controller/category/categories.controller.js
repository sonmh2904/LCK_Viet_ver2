const Category = require('../../models/Categories.model');
const slugify = require('slugify');
const mongoose = require('mongoose');

// CREATE - Tạo category mới
const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        
        if (!name) {
            return res.status(400).json({
                code: 400,
                message: 'Tên danh mục là bắt buộc'
            });
        }

        // Tạo slug từ tên
        const slug = slugify(name, { lower: true, strict: true });

        // Kiểm tra slug đã tồn tại chưa
        const existingCategory = await Category.findOne({ slug });
        if (existingCategory) {
            return res.status(400).json({
                code: 400,
                message: 'Danh mục với tên này đã tồn tại'
            });
        }

        const category = new Category({
            name,
            slug
        });

        const savedCategory = await category.save();

        res.status(201).json({
            code: 201,
            message: 'Tạo danh mục thành công',
            data: savedCategory
        });
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({
            code: 500,
            message: 'Lỗi server khi tạo danh mục',
            error: error.message
        });
    }
};

// READ ALL - Lấy tất cả categories
const getAllCategories = async (req, res) => {
    try {
        const { page = 1, limit = 10, isActive } = req.query;
        
        // Build filter
        const filter = {};
        if (isActive !== undefined) {
            filter.isActive = isActive === 'true';
        }

        const categories = await Category.find(filter)
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await Category.countDocuments(filter);

        res.json({
            code: 200,
            message: 'Lấy danh sách danh mục thành công',
            data: {
                categories,
                pagination: {
                    currentPage: page,
                    totalPages: Math.ceil(total / limit),
                    totalItems: total,
                    itemsPerPage: limit
                }
            }
        });
    } catch (error) {
        console.error('Error getting categories:', error);
        res.status(500).json({
            code: 500,
            message: 'Lỗi server khi lấy danh sách danh mục',
            error: error.message
        });
    }
};

// READ ONE - Lấy category theo ID
const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                code: 400,
                message: 'ID danh mục không hợp lệ'
            });
        }

        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({
                code: 404,
                message: 'Không tìm thấy danh mục'
            });
        }

        res.json({
            code: 200,
            message: 'Lấy thông tin danh mục thành công',
            data: category
        });
    } catch (error) {
        console.error('Error getting category:', error);
        res.status(500).json({
            code: 500,
            message: 'Lỗi server khi lấy thông tin danh mục',
            error: error.message
        });
    }
};

// UPDATE - Cập nhật category
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, isActive } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                code: 400,
                message: 'ID danh mục không hợp lệ'
            });
        }

        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({
                code: 404,
                message: 'Không tìm thấy danh mục'
            });
        }

        // Nếu có thay đổi tên, tạo slug mới
        if (name && name !== category.name) {
            const newSlug = slugify(name, { lower: true, strict: true });
            
            // Kiểm tra slug mới có bị trùng không
            const existingCategory = await Category.findOne({ 
                slug: newSlug, 
                _id: { $ne: id } 
            });
            
            if (existingCategory) {
                return res.status(400).json({
                    code: 400,
                    message: 'Danh mục với tên này đã tồn tại'
                });
            }

            category.name = name;
            category.slug = newSlug;
        }

        // Cập nhật isActive nếu có
        if (isActive !== undefined) {
            category.isActive = isActive;
        }

        const updatedCategory = await category.save();

        res.json({
            code: 200,
            message: 'Cập nhật danh mục thành công',
            data: updatedCategory
        });
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({
            code: 500,
            message: 'Lỗi server khi cập nhật danh mục',
            error: error.message
        });
    }
};

// DELETE - Xóa category (soft delete bằng cách set isActive = false)
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                code: 400,
                message: 'ID danh mục không hợp lệ'
            });
        }

        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({
                code: 404,
                message: 'Không tìm thấy danh mục'
            });
        }

        // Soft delete
        category.isActive = false;
        await category.save();

        res.json({
            code: 200,
            message: 'Xóa danh mục thành công',
            data: category
        });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({
            code: 500,
            message: 'Lỗi server khi xóa danh mục',
            error: error.message
        });
    }
};

// HARD DELETE - Xóa vĩnh viễn category
const hardDeleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                code: 400,
                message: 'ID danh mục không hợp lệ'
            });
        }

        const category = await Category.findByIdAndDelete(id);

        if (!category) {
            return res.status(404).json({
                code: 404,
                message: 'Không tìm thấy danh mục'
            });
        }

        res.json({
            code: 200,
            message: 'Xóa vĩnh viễn danh mục thành công',
            data: category
        });
    } catch (error) {
        console.error('Error hard deleting category:', error);
        res.status(500).json({
            code: 500,
            message: 'Lỗi server khi xóa vĩnh viễn danh mục',
            error: error.message
        });
    }
};

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
    hardDeleteCategory
};
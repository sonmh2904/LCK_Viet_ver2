const express = require('express');
const router = express.Router();
const {
    createDesign,
    getAllDesigns,
    getDesignById,
    updateDesign,
    deleteDesign,
    getDesignsByCategory,
    getHighlightDesigns
} = require('../../controller/design/design.controller');

// Middleware để validate request (optional)
const validateDesign = (req, res, next) => {
    const { 
        projectName, 
        mainImage,
        investor, 
        implementationYear,
        projectType,
        address,
        landArea,
        constructionArea,
        floors,
        functionality,
        designUnit,
        categories 
    } = req.body;
    
    if (req.method === 'POST') {
        const requiredFields = [
            'projectName', 'mainImage', 'investor', 'implementationYear',
            'projectType', 'address', 'landArea', 'constructionArea',
            'floors', 'functionality', 'designUnit', 'categories'
        ];
        
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({
                    code: 400,
                    message: `${field} là bắt buộc`
                });
            }
        }
    }
    
    next();
};

// Routes cho Designs

// POST /api/v1/designs - Tạo design mới
router.post('/', validateDesign, createDesign);

// GET /api/v1/designs - Lấy tất cả designs (với pagination và filter)
router.get('/', getAllDesigns);

// GET /api/v1/designs/category/:categoryId - Lấy designs theo category
router.get('/category/:categoryId', getDesignsByCategory);

// GET /api/v1/designs/highlight - Lấy các thiết kế nổi bật
router.get('/highlight', getHighlightDesigns);

// GET /api/v1/designs/:id - Lấy design theo ID
router.get('/:id', getDesignById);

// PUT /api/v1/designs/:id - Cập nhật design
router.put('/:id', validateDesign, updateDesign);

// PATCH /api/v1/designs/:id - Cập nhật partial design
router.patch('/:id', updateDesign);

// DELETE /api/v1/designs/:id - Xóa design
router.delete('/:id', deleteDesign);

module.exports = router;

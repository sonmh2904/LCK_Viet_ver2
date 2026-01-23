const Design = require('../../models/Design.model');
const cloudinary = require("cloudinary").v2;
const mongoose = require("mongoose");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

// Helper function to upload base64 image to Cloudinary (with fallback)
const uploadBase64ToCloudinary = async (base64String, folder = 'lck-viet/designs') => {
    try {
        // Check if Cloudinary is configured
        if (!process.env.cloud_name || !process.env.api_key || !process.env.api_secret) {
            console.warn('Cloudinary not configured, using base64 fallback');
            return base64String; // Return base64 string as fallback
        }

        // Extract base64 data
        const matches = base64String.match(/^data:(.+?);base64,(.+)$/);
        if (!matches || matches.length !== 3) {
            throw new Error('Invalid base64 string format');
        }

        const mimeType = matches[1];
        const base64Data = matches[2];
        
        console.log(`Uploading to Cloudinary folder: ${folder}`);
        
        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(`data:${mimeType};base64,${base64Data}`, {
            folder,
            resource_type: 'image',
            allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
            transformation: [{ width: 1200, crop: 'limit', quality: 'auto' }]
        });

        console.log('Cloudinary upload successful:', result.secure_url);
        return result.secure_url;
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        console.error('Cloudinary error details:', {
            message: error.message,
            http_code: error.http_code,
            name: error.name
        });
        
        // Return base64 string as fallback
        console.log('Using base64 string as fallback');
        return base64String;
    }
};

// Helper function to delete image from Cloudinary
const deleteFromCloudinary = async (imageUrl) => {
    try {
        if (!imageUrl || !imageUrl.includes('cloudinary.com')) {
            return;
        }

        // Extract public_id from Cloudinary URL
        const urlParts = imageUrl.split('/');
        const filename = urlParts[urlParts.length - 1];
        const publicId = filename.split('.')[0];
        const folder = urlParts[urlParts.length - 2];
        
        console.log(`Deleting image from Cloudinary: ${folder}/${publicId}`);
        await cloudinary.uploader.destroy(`${folder}/${publicId}`);
    } catch (error) {
        console.error('Error deleting from Cloudinary:', error);
    }
};

// CREATE - Tạo design mới
const createDesign = async (req, res) => {
    try {
        console.log('Request body received:', req.body);
        
        const {
            projectName,
            mainImage,
            subImages,
            investor,
            implementationYear,
            projectType,
            address,
            investmentLevel,
            landArea,
            constructionArea,
            floors,
            functionality,
            designUnit,
            detailedDescription,
            categories,
            isHighlight
        } = req.body;

        // Validate required fields
        const requiredFields = [
            'projectName', 'mainImage', 'investor', 'implementationYear',
            'projectType', 'address', 'landArea', 'constructionArea',
            'floors', 'functionality', 'designUnit', 'categories'
        ];

        for (const field of requiredFields) {
            if (!req.body[field]) {
                console.log(`Missing required field: ${field}`);
                return res.status(400).json({
                    code: 400,
                    message: `${field} là bắt buộc`
                });
            }
        }

        // Validate categories ObjectId
        if (!mongoose.Types.ObjectId.isValid(categories)) {
            console.log('Invalid category ID:', categories);
            return res.status(400).json({
                code: 400,
                message: 'ID danh mục không hợp lệ'
            });
        }

        // Validate subImages array (max 10 images)
        if (subImages && Array.isArray(subImages) && subImages.length > 10) {
            return res.status(400).json({
                code: 400,
                message: 'Tối đa 10 hình ảnh phụ được phép'
            });
        }

        // Upload main image to Cloudinary
        let mainImageUrl = mainImage;
        if (mainImage && mainImage.startsWith('data:')) {
            console.log('Processing main image...');
            mainImageUrl = await uploadBase64ToCloudinary(mainImage, 'lck-viet/designs/main');
            console.log('Main image processed:', mainImageUrl.startsWith('data:') ? 'Base64 fallback used' : 'Cloudinary upload successful');
        }

        // Upload sub images to Cloudinary
        let subImageUrls = [];
        if (subImages && Array.isArray(subImages)) {
            console.log('Processing sub images...');
            subImageUrls = await Promise.all(
                subImages.map(async (img, index) => {
                    if (img.startsWith('data:')) {
                        console.log(`Processing sub image ${index + 1}...`);
                        return await uploadBase64ToCloudinary(img, `lck-viet/designs/sub`);
                    }
                    return img;
                })
            );
            console.log('Sub images processed successfully');
        }

        const design = new Design({
            projectName,
            mainImage: mainImageUrl,
            subImages: subImageUrls,
            investor,
            implementationYear,
            projectType,
            address,
            investmentLevel,
            landArea,
            constructionArea,
            floors,
            functionality,
            designUnit,
            detailedDescription,
            categories,
            isHighlight: isHighlight || false
        });

        console.log('Saving design to database...');
        console.log('Design data before save:', {
            projectName,
            categories,
            categoriesType: typeof categories
        });
        
        const savedDesign = await design.save();

        // Populate category information
        await savedDesign.populate('categories', 'name slug');
        
        console.log('Design created successfully:', savedDesign._id);
        console.log('Design with populated category:', {
            id: savedDesign._id,
            projectName: savedDesign.projectName,
            category: savedDesign.categories
        });
        res.status(201).json({
            code: 201,
            message: 'Tạo thiết kế thành công',
            data: savedDesign
        });
    } catch (error) {
        console.error('Error creating design:', error);
        res.status(500).json({
            code: 500,
            message: 'Lỗi server khi tạo thiết kế',
            error: error.message
        });
    }
};

// READ ALL - Lấy tất cả designs
const getAllDesigns = async (req, res) => {
    try {
        const { 
            page = 1, 
            limit = 10, 
            categories,
            projectType,
            implementationYear,
            search 
        } = req.query;
        
        // Build filter
        const filter = {};
        if (categories) {
            filter.categories = categories;
        }
        if (projectType) {
            filter.projectType = { $regex: projectType, $options: 'i' };
        }
        if (implementationYear) {
            filter.implementationYear = parseInt(implementationYear);
        }
        if (search) {
            filter.$or = [
                { projectName: { $regex: search, $options: 'i' } },
                { investor: { $regex: search, $options: 'i' } },
                { address: { $regex: search, $options: 'i' } },
                { functionality: { $regex: search, $options: 'i' } }
            ];
        }

        const designs = await Design.find(filter)
            .populate('categories', 'name slug')
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        console.log('Fetched designs with categories:', designs.map(d => ({
            id: d._id,
            projectName: d.projectName,
            category: d.categories
        })));

        const total = await Design.countDocuments(filter);

        res.json({
            code: 200,
            message: 'Lấy danh sách thiết kế thành công',
            data: {
                designs,
                pagination: {
                    currentPage: parseInt(page),
                    totalPages: Math.ceil(total / limit),
                    totalItems: total,
                    itemsPerPage: parseInt(limit)
                }
            }
        });
    } catch (error) {
        console.error('Error getting designs:', error);
        res.status(500).json({
            code: 500,
            message: 'Lỗi server khi lấy danh sách thiết kế',
            error: error.message
        });
    }
};

// READ ONE - Lấy design theo ID
const getDesignById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                code: 400,
                message: 'ID thiết kế không hợp lệ'
            });
        }

        const design = await Design.findById(id).populate('categories', 'name slug');

        if (!design) {
            return res.status(404).json({
                code: 404,
                message: 'Không tìm thấy thiết kế'
            });
        }

        res.json({
            code: 200,
            message: 'Lấy thông tin thiết kế thành công',
            data: design
        });
    } catch (error) {
        console.error('Error getting design:', error);
        res.status(500).json({
            code: 500,
            message: 'Lỗi server khi lấy thông tin thiết kế',
            error: error.message
        });
    }
};

// UPDATE - Cập nhật design
const updateDesign = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                code: 400,
                message: 'ID thiết kế không hợp lệ'
            });
        }

        // Validate categories ObjectId if provided
        if (updateData.categories && !mongoose.Types.ObjectId.isValid(updateData.categories)) {
            return res.status(400).json({
                code: 400,
                message: 'ID danh mục không hợp lệ'
            });
        }

        // Validate isHighlight if provided
        if (updateData.isHighlight !== undefined && typeof updateData.isHighlight !== 'boolean') {
            return res.status(400).json({
                code: 400,
                message: 'isHighlight phải là giá trị boolean'
            });
        }

        // Get existing design to handle image cleanup
        const existingDesign = await Design.findById(id);
        if (!existingDesign) {
            return res.status(404).json({
                code: 404,
                message: 'Không tìm thấy thiết kế'
            });
        }

        // Handle main image update
        if (updateData.mainImage && updateData.mainImage.startsWith('data:')) {
            // Delete old main image from Cloudinary
            if (existingDesign.mainImage) {
                await deleteFromCloudinary(existingDesign.mainImage);
            }
            // Upload new main image
            updateData.mainImage = await uploadBase64ToCloudinary(updateData.mainImage, 'lck-viet/designs/main');
        }

        // Handle sub images update
        if (updateData.subImages && Array.isArray(updateData.subImages)) {
            // Validate max 10 images
            if (updateData.subImages.length > 10) {
                return res.status(400).json({
                    code: 400,
                    message: 'Tối đa 10 hình ảnh phụ được phép'
                });
            }

            // Delete old sub images from Cloudinary
            if (existingDesign.subImages && existingDesign.subImages.length > 0) {
                for (const oldImage of existingDesign.subImages) {
                    await deleteFromCloudinary(oldImage);
                }
            }

            // Upload new sub images
            updateData.subImages = await Promise.all(
                updateData.subImages.map((img) => {
                    if (img.startsWith('data:')) {
                        return uploadBase64ToCloudinary(img, 'lck-viet/designs/sub');
                    }
                    return img;
                })
            );
        }

        const design = await Design.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        ).populate('categories', 'name slug');

        if (!design) {
            return res.status(404).json({
                code: 404,
                message: 'Không tìm thấy thiết kế'
            });
        }

        res.json({
            code: 200,
            message: 'Cập nhật thiết kế thành công',
            data: design
        });
    } catch (error) {
        console.error('Error updating design:', error);
        res.status(500).json({
            code: 500,
            message: 'Lỗi server khi cập nhật thiết kế',
            error: error.message
        });
    }
};

// DELETE - Xóa design
const deleteDesign = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                code: 400,
                message: 'ID thiết kế không hợp lệ'
            });
        }

        const design = await Design.findById(id);

        if (!design) {
            return res.status(404).json({
                code: 404,
                message: 'Không tìm thấy thiết kế'
            });
        }

        // Delete images from Cloudinary
        if (design.mainImage) {
            await deleteFromCloudinary(design.mainImage);
        }

        if (design.subImages && design.subImages.length > 0) {
            for (const subImage of design.subImages) {
                await deleteFromCloudinary(subImage);
            }
        }

        // Delete design from database
        await Design.findByIdAndDelete(id);

        res.json({
            code: 200,
            message: 'Xóa thiết kế thành công',
            data: design
        });
    } catch (error) {
        console.error('Error deleting design:', error);
        res.status(500).json({
            code: 500,
            message: 'Lỗi server khi xóa thiết kế',
            error: error.message
        });
    }
};

// GET BY CATEGORY - Lấy designs theo category
const getDesignsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const { page = 1, limit = 10 } = req.query;

        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).json({
                code: 400,
                message: 'ID danh mục không hợp lệ'
            });
        }

        const designs = await Design.find({ categories: categoryId })
            .populate('categories', 'name slug')
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await Design.countDocuments({ categories: categoryId });

        res.json({
            code: 200,
            message: 'Lấy danh sách thiết kế theo danh mục thành công',
            data: {
                designs,
                pagination: {
                    currentPage: parseInt(page),
                    totalPages: Math.ceil(total / limit),
                    totalItems: total,
                    itemsPerPage: parseInt(limit)
                }
            }
        });
    } catch (error) {
        console.error('Error getting designs by category:', error);
        res.status(500).json({
            code: 500,
            message: 'Lỗi server khi lấy danh sách thiết kế theo danh mục',
            error: error.message
        });
    }
};

// GET HIGHLIGHT DESIGNS - Lấy các thiết kế nổi bật
const getHighlightDesigns = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        
        const designs = await Design.find({ isHighlight: true })
            .populate('categories', 'name slug')
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await Design.countDocuments({ isHighlight: true });

        res.json({
            code: 200,
            message: 'Lấy danh sách thiết kế nổi bật thành công',
            data: {
                designs,
                pagination: {
                    currentPage: parseInt(page),
                    totalPages: Math.ceil(total / limit),
                    totalItems: total,
                    itemsPerPage: parseInt(limit)
                }
            }
        });
    } catch (error) {
        console.error('Error getting highlight designs:', error);
        res.status(500).json({
            code: 500,
            message: 'Lỗi server khi lấy danh sách thiết kế nổi bật',
            error: error.message
        });
    }
};

module.exports = {
    createDesign,
    getAllDesigns,
    getDesignById,
    getDesignsByCategory,
    updateDesign,
    deleteDesign,
    getHighlightDesigns
};

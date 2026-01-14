const Blog = require("../../models/Blog.model");
const cloudinary = require("cloudinary").v2;
const fs = require("fs").promises;
const path = require("path");
const slugify = require("slugify");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

// Ensure upload directory exists
const uploadDir = path.join(process.cwd(), "uploads");
fs.mkdir(uploadDir, { recursive: true })
  .then(() => console.log("Uploads directory created or exists"))
  .catch((err) => console.error("Error creating uploads directory:", err));

// Generate slug from title
const generateSlug = (title) => {
  return slugify(title, {
    lower: true,
    strict: true,
    remove: /[*+~.()'"!:@]/g
  });
};

// Upload image to Cloudinary (with fallback to base64)
const uploadToCloudinary = async (filePath, base64Data = null) => {
  try {
    // If base64 data is provided, return it directly (fallback)
    if (base64Data) {
      console.log('Using base64 data fallback for image');
      return base64Data;
    }
    
    // Check if Cloudinary is configured
    if (!process.env.cloud_name || !process.env.api_key || !process.env.api_secret) {
      console.warn('Cloudinary not configured, using base64 fallback');
      throw new Error('Cloudinary not configured');
    }
    
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'blog-images',
      resource_type: 'auto'
    });
    return result.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    console.error('Cloudinary error details:', {
      message: error.message,
      http_code: error.http_code,
      name: error.name
    });
    throw new Error(`Cloudinary upload failed: ${error.message}`);
  }
};

// Blog Functions
module.exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json({ 
      code: 200, 
      message: "Blogs fetched successfully", 
      data: blogs 
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ 
      code: 500, 
      message: "Failed to fetch blogs", 
      error: error.message 
    });
  }
};

module.exports.getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOne({ slug });
    if (!blog) {
      return res.status(404).json({ 
        code: 404, 
        message: "Blog not found" 
      });
    }
    res.json({ 
      code: 200, 
      message: "Blog fetched successfully", 
      data: blog 
    });
  } catch (error) {
    console.error("Error fetching blog by slug:", error);
    res.status(500).json({ 
      code: 500, 
      message: "Failed to fetch blog", 
      error: error.message 
    });
  }
};

// Handle file upload
module.exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        code: 400, 
        message: 'No file uploaded' 
      });
    }

    const result = await uploadToCloudinary(req.file.path);
    
    // Clean up the uploaded file
    await fs.unlink(req.file.path);
    
    res.json({ 
      code: 200, 
      message: 'Image uploaded successfully', 
      data: { url: result } 
    });
  } catch (error) {
    console.error('Error handling file upload:', error);
    res.status(500).json({ 
      code: 500, 
      message: error.message 
    });
  }
};

// Create blog with slug and image
module.exports.createBlog = async (req, res) => {
  try {
    const { title, content, status } = req.body;
    
    if (!title) {
      return res
        .status(400)
        .json({ code: 400, message: "Tiêu đề là bắt buộc" });
    }
    
    if (!Array.isArray(content) || content.length === 0) {
      return res.status(400).json({ code: 400, message: "Mảng nội dung là bắt buộc" });
    }
    
    if (status && !["active", "inactive", "draft"].includes(status)) {
      return res
        .status(400)
        .json({ code: 400, message: "Giá trị trạng thái không hợp lệ" });
    }
    
    const slug = generateSlug(title);
    
    // Check if slug already exists
    const existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
      return res.status(400).json({ code: 400, message: "Tiêu đề bài viết đã tồn tại" });
    }
    
    let mainImageUrl = req.body.image || "";
    if (req.files && req.files.mainImage) {
      const result = await cloudinary.uploader.upload(
        req.files.mainImage[0].path,
        { folder: "blog_images" }
      );
      mainImageUrl = result.secure_url;
      await fs.unlink(req.files.mainImage[0].path);
    }
    
    const processedContent = await Promise.all(
      content.map(async (item, index) => {
        // Handle image blocks - if imageUrl is already provided (from upload), use it
        if (item.type === "image") {
          if (item.imageUrl) {
            // Image was already uploaded and has URL
            return {
              ...item,
              url: item.imageUrl // Map imageUrl to url for consistency
            };
          } else if (
            req.files &&
            req.files[`contentImages[${index}]`]
          ) {
            // Legacy file upload handling
            const contentImage = req.files[`contentImages[${index}]`][0];
            const result = await cloudinary.uploader.upload(contentImage.path, {
              folder: "blog_images",
            });
            await fs.unlink(contentImage.path);
            return { ...item, url: result.secure_url };
          }
        }
        
        return {
          ...item,
          bold: item.bold || false,
          italic: item.italic || false,
          fontSize: item.fontSize || "medium",
        };
      })
    );
    
    const newBlog = new Blog({
      title,
      content: processedContent,
      image: mainImageUrl,
      slug,
      status: status || "active",
    });
    
    await newBlog.save();
    res.status(201).json({ 
      code: 201, 
      message: "Blog created successfully", 
      data: newBlog 
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    if (req.files) {
      await Promise.all(
        Object.values(req.files)
          .flat()
          .map((file) => fs.unlink(file.path).catch(console.error))
      );
    }
    res.status(400).json({ 
      code: 400, 
      message: "Lỗi khi tạo bài viết",
      error: error.message 
    });
  }
};

// Update blog with slug and image
module.exports.updateBlog = async (req, res) => {
  try {
    const { slug } = req.params;
    const { title, content, status } = req.body;
    
    if (!title) {
      return res
        .status(400)
        .json({ code: 400, message: "Tiêu đề là bắt buộc" });
    }
    
    if (!Array.isArray(content) || content.length === 0) {
      return res.status(400).json({ code: 400, message: "Mảng nội dung là bắt buộc" });
    }
    
    if (status && !["active", "inactive", "draft"].includes(status)) {
      return res
        .status(400)
        .json({ code: 400, message: "Giá trị trạng thái không hợp lệ" });
    }
    
    const newSlug = title
      ? slugify(title, { lower: true, strict: true, locale: "vi" })
      : undefined;
    
    let mainImageUrl = req.body.image;
    if (req.files && req.files.mainImage) {
      const result = await cloudinary.uploader.upload(
        req.files.mainImage[0].path,
        { folder: "blog_images" }
      );
      mainImageUrl = result.secure_url;
      await fs.unlink(req.files.mainImage[0].path);
    }
    
    const processedContent = await Promise.all(
      content.map(async (item, index) => {
        // Handle image blocks - if imageUrl is already provided (from upload), use it
        if (item.type === "image") {
          if (item.imageUrl) {
            // Image was already uploaded and has URL
            return {
              ...item,
              url: item.imageUrl // Map imageUrl to url for consistency
            };
          } else if (req.files && req.files.contentImages) {
            // Legacy file upload handling
            const contentImage = req.files.contentImages.find(
              (file) => file.fieldname === `contentImages[${index}]` 
            );
            if (contentImage) {
              const result = await cloudinary.uploader.upload(contentImage.path, {
                folder: "blog_images",
              });
              await fs.unlink(contentImage.path);
              return { ...item, url: result.secure_url };
            }
          }
        }
        return {
          ...item,
          bold: item.bold || false,
          italic: item.italic || false,
          fontSize: item.fontSize || "medium",
        };
      })
    );
    
    const updatedBlog = await Blog.findOneAndUpdate(
      { slug },
      {
        title,
        content: processedContent,
        image: mainImageUrl,
        slug: newSlug,
        status: status || undefined,
        updatedAt: Date.now(),
      },
      { new: true }
    );
    
    if (!updatedBlog) {
      return res.status(404).json({ code: 404, message: "Không tìm thấy bài viết" });
    }
    
    res.json({ 
      code: 200, 
      message: "Blog updated successfully", 
      data: updatedBlog 
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    if (req.files) {
      await Promise.all(
        Object.values(req.files)
          .flat()
          .map((file) => fs.unlink(file.path).catch(console.error))
      );
    }
    res.status(400).json({ 
      code: 400, 
      message: "Lỗi khi cập nhật bài viết",
      error: error.message 
    });
  }
};

// Get top viewed blogs
module.exports.getTopViewedBlogs = async (req, res) => {
  try {
    const { limit = 5 } = req.query;
    const blogs = await Blog.find().sort({ views: -1 }).limit(parseInt(limit));
    res.json({ 
      code: 200, 
      message: "Top viewed blogs fetched successfully", 
      data: blogs 
    });
  } catch (error) {
    console.error("Error fetching top viewed blogs:", error);
    res.status(500).json({ 
      code: 500, 
      message: "Failed to fetch top viewed blogs", 
      error: error.message 
    });
  }
};

// Delete blog
module.exports.deleteBlog = async (req, res) => {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOne({ slug });
    
    if (!blog) {
      return res.status(404).json({ message: "Không tìm thấy bài viết" });
    }
    
    if (blog.status === "active") {
      // Soft delete: set status to inactive
      blog.status = "inactive";
      await blog.save();
      res.json({ message: "Bài viết được đặt thành không hoạt động", blog });
    } else {
      // Permanent delete
      await Blog.findOneAndDelete({ slug });
      res.json({ message: "Bài viết đã bị xóa vĩnh viễn" });
    }
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ message: "Lỗi khi xóa bài viết" });
  }
};
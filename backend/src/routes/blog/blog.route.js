const express = require("express");
const router = express.Router();
const blogController = require("../../controller/blog/blog.controller");
const Blog = require("../../models/Blog.model");
const multer = require("multer");
const path = require("path");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Debug route to check collection
router.get("/debug/collection", async (req, res) => {
    try {
        const collections = await Blog.db.db.listCollections().toArray();
        const blogCollection = collections.find(c => c.name === 'blogs');
        return res.json({
            message: "Collection debug info",
            dbName: Blog.db.name,
            collections: collections.map(c => c.name),
            blogCollectionExists: !!blogCollection,
            blogCollectionName: blogCollection ? blogCollection.name : null
        });
    } catch (error) {
        return res.json({ error: error.message });
    }
});

// GET /api/v1/blog - Get all blogs
router.get("/", blogController.getAllBlogs);

// GET /api/v1/blog/top-viewed - Get top viewed blogs
router.get("/top-viewed", blogController.getTopViewedBlogs);

// GET /api/v1/blog/:slug - Get blog by slug
router.get("/:slug", blogController.getBlogBySlug);

// POST /api/v1/blog/upload - Upload image
router.post("/upload", upload.single('image'), blogController.uploadImage);

// POST /api/v1/blog - Create new blog
router.post("/", blogController.createBlog);

// PUT /api/v1/blog/:slug - Update blog by slug
router.put("/:slug", blogController.updateBlog);

// DELETE /api/v1/blog/:slug - Delete blog by slug
router.delete("/:slug", blogController.deleteBlog);

module.exports = router;
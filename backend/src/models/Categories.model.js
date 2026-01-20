const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, unique: true },
    isActive: { type: Boolean, default: true }
}, {
    timestamps: true
});
categorySchema.index({ slug: 1 });
categorySchema.index({ parentCategoryId: 1 });

module.exports = mongoose.model('Category', categorySchema);
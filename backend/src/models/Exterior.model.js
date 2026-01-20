const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exteriorSchema = new Schema({
  projectName: {
    type: String,
    required: true,
    trim: true,
  },
  mainImage: {
    type: String,
    required: true,
    trim: true,
  },
  subImages: [{
    type: String,
    trim: true,
  }],
  investor: {
    type: String,
    required: true,
    trim: true,
  },
  implementationYear: {
    type: Number,
    required: true,
  },
  projectType: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  investmentLevel: {
    type: String,
    trim: true,
  },
  landArea: {
    type: Number,
    required: true,
  },
  constructionArea: {
    type: Number,
    required: true,
  },
  floors: {
    type: Number,
    required: true,
    min: 1,
  },
  functionality: {
    type: String,
    required: true,
    trim: true,
  },
  designUnit: {
    type: String,
    required: true,
    trim: true,
  },
  detailedDescription: {
    type: String,
    trim: true,
  },
  categories: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

exteriorSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

exteriorSchema.pre("findOneAndUpdate", function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});

const Exterior = mongoose.model("Exterior", exteriorSchema, "exteriors");
module.exports = Exterior;

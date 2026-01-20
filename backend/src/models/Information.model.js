const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const informationSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },
  province: {
    type: String,
    trim: true,
  },
  district: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
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

informationSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

informationSchema.pre("findOneAndUpdate", function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});

const Information = mongoose.model("Information", informationSchema, "information");
module.exports = Information;
const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    images: {
      type: Array,
      default: [],
      require: true,
    },
    billAvailable: {
      type: Boolean,
      require: true,
      default: false,
    },
    warrantyAvailable: {
      type: Boolean,
      require: true,
      default: false,
    },
    accessoryAvailable: {
      type: Boolean,
      require: true,
      default: false,
    },
    boxAvailable: {
      type: Boolean,
      require: true,
      default: false,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      require: true,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const product = mongoose.model("Product", productSchema);
module.exports = product;

const Product = require("../../model/Products/products");
const { success, error, validation } = require("../../helper/response");
const cloudinary = require("../../db/cloudinary");

exports.productImagesCtrl = async (req, res) => {
  try {
    const value = req.file;
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "shyMp",
    });
    const URL=result.secure_url
    const productId = req.body.ProductId;
    const updateProduct = await Product.findByIdAndUpdate(productId, {
      $push: { images: result.secure_url },
    });

    success(
      "Image Upload Successfully",
      { URL, updateProduct },
      "CREATED",
      res
    );
  } catch (err) {
    error(err.message, "INTERNAL_SERVER_ERROR", res);
  }
};

exports.productAddCtrl = async (req, res) => {
  try {
    const { name } = req.body;
    const existingProduct = await Product.findOne({ name: name });
    if (existingProduct) {
      return error("Product already exist", "CONFLICT", res);
    }
    const newProduct = await Product.create(req.body);
    await newProduct.save();
    success("Product Added Successfully", { newProduct }, "CREATED", res);
  } catch (err) {
    error(err.message, "INTERNAL_SERVER_ERROR", res);
  }
};

exports.getProductByIdCtrl = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id).populate("seller");
    product
      ? success("Product", { data: product }, "OK", res)
      : error("ProductNotFound", "NOT_FOUND", res);
  } catch (err) {
    error(err.message, "INTERNAL_SERVER_ERROR", res);
  }
};

exports.getAllProduct = async (req, res) => {
  try {
    const products = await Product.find({});
    success("Products", { data: products }, "OK", res);
  } catch (err) {
    error(err.message, "INTERNAL_SERVER_ERROR", res);
  }
};

exports.getAllProductBySellerId = async (req, res) => {
  try {
    const { seller,status,category=[] } = req.body; 
    let filters = {};
    if (seller) {
      filters.seller = seller;
    }
    if (status) {
      filters.status = status;
    }
    if (category.length>0) {
      filters.category = {$in:category};
    }
    const products = await Product.find(filters).sort({ createdAt: -1 }).populate("seller");
    success("These are all Products", { data: products }, "OK", res);
  } catch (err) {
    error(err.message, "INTERNAL_SERVER_ERROR", res);
  }
};

exports.updateProductInfo = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (product) {
      product.set(req.body);
      const updatedProduct = await product.save();
      success(
        "Product updated SuccessFully",
        { data: updatedProduct },
        "OK",
        res
      );
    } else {
      error("ProductNotFound", "NOT_FOUND", res);
    }
  } catch (err) {
    error(err.message, "INTERNAL_SERVER_ERROR", res);
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (product) {
      await Product.findByIdAndDelete(product);
      success("Product-deleted", { data: product }, "OK", res);
    } else {
      error("ProductNotFound", "NOT_FOUND", res);
    }
  } catch (err) {
    error(err.message, "INTERNAL_SERVER_ERROR", res);
  }
};

exports.updateProductStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { status },
      { new: true, useFindAndModify: false } 
    );
     if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({
      message: 'Product updated successfully',
      data: updatedProduct,
    });
  } catch (err) {
    error(err.message, "INTERNAL_SERVER_ERROR", res);
  }
};
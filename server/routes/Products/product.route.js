const express = require("express");
const Product = require("../../controller/Products/product.controller");
const { authenticate } = require("../../middleware/Authentication");
const multer = require("multer");

const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

const router = express.Router();

router.post(
  "/productImagesCtrl",
  authenticate,
  multer({ storage: storage }).single("file"),
  Product.productImagesCtrl
);

router.post("/productAddCtrl", authenticate, Product.productAddCtrl);
router.get("/getProductByIdCtrl/:id", authenticate, Product.getProductByIdCtrl);
router.get("/getAllProduct", Product.getAllProduct);
router.post("/getAllProductBySellerId",Product.getAllProductBySellerId);
router.patch("/updateProductInfo/:id", authenticate, Product.updateProductInfo);
router.delete("/deleteProduct/:id", authenticate, Product.deleteProduct);
router.patch("/updateProductStatus/:id", authenticate, Product.updateProductStatus);
module.exports = router;
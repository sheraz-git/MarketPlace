const express=require("express");
const User=require("../../controller/User/user.controller");
const {authenticate}=require("../../middleware/Authentication");
const router = express.Router();

router.post("/userSignup",User.userSignupCtrl);
router.post("/userLogin",User.userLoginCtrl);
router.get("/userProfile/:id",authenticate,User.getProfileByIdCtrl);
router.get("/getAllUser",authenticate,User.getAllUsers);
router.put("/UserUpdate/:id",User.updateUserInfo);
router.delete("/deleteUser/:id",User.deleteUser);
router.patch("/updateUserStatus/:id",User.updateUserStatus);

module.exports = router;
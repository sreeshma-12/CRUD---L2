const express = require("express");
const multer = require("multer");
const userController = require("../controllers/user.controller");
const { upload } = require("../utils/multer");
const router = express.Router();
router
    .route("/signup")
    .post(upload.single("profileImage"), userController.signup);
router.route("/login").post(userController.login);
router.route("/getUser/:id").get(userController.getUser);
router.route("/updateUser/:id").patch(userController.updateUser);
router.route("/deleteUser/:id").delete(userController.deleteUser);
module.exports = router;

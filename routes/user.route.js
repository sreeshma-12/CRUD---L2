const express = require("express");
const multer = require("multer");
const userController = require("../controllers/user.controller");
const { upload } = require("../utils/multer");
const { authorization } = require("../middleware/auth");
const router = express.Router();
router
    .route("/signup")
    .post(upload.single("profileImage"), userController.signup);
router.route("/login").post(userController.login);
router.route("/getUser").get(authorization, userController.getUser);
router
    .route("/updateUser")
    .put(
        authorization,
        upload.single("profileImage"),
        userController.updateUser
    );
router.route("/deleteUser/:id").delete(userController.deleteUser);
module.exports = router;

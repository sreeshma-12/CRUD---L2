const express = require("express");
const courseController = require("../controllers/course.controller");
const { authorization } = require("../middleware/auth");
const router = express.Router();
router.route("/create").post(courseController.createCourse);
router.route("/list").get(authorization, courseController.getCoursesByLocation);
module.exports = router;

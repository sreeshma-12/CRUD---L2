const Course = require("../models/course.model");
const User = require("../models/user.model");

exports.createCourse = async (req, res) => {
    const {
        class: courseClass,
        subject,
        board,
        latitude,
        longitude,
    } = req.body;

    try {
        const course = new Course({
            class: courseClass,
            subject,
            board,
            latitude,
            longitude,
        });
        await course.save();
        res.status(201).json({
            message: "Course created successfully",
            course,
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getCoursesByLocation = async (req, res) => {
    try {
        const userData = await User.findById(req.userId);
        console.log(userData);

        const courses = await Course.find();
        const filteredCourses = courses.filter((course) => {
            const distance = getDistanceFromLatLonInKm(
                userData.latitude,
                userData.longitude,
                course.latitude,
                course.longitude
            );
            return distance <= 10;
        });
        res.status(200).json(filteredCourses);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) *
            Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

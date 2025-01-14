const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { deleteImage } = require("../utils/multer");

const generateToken = (userEmail) => {
    const token = jwt.sign({ id: userEmail._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES,
    });
    return token;
};

// Signup
exports.signup = async (req, res) => {
    const { name, email, password, latitude, longitude } = req.body;
    const profileImage = req.file.filename;
    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(401).json({ message: "User already exist" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            profileImage,
            latitude,
            longitude,
        });

        const newUser = await user.save();

        return res
            .status(201)
            .json({ message: "User registered successfully" });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

// Login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ error: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch)
            return res.status(401).json({ error: "Invalid credentials" });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        return res.status(200).json({ token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get single user
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(400).send({ message: "User not found" });
        }
        return res.status(200).send({
            data: user,
            message: "User data fetched successfully ",
        });
    } catch (error) {
        return res.status(500).send({ message: "Internal server error" });
    }
};
// Get update user
exports.updateUser = async (req, res) => {
    try {
        const { name, password, latitude, longitude } = req.body;

        const userExist = await User.findById(req.userId);
        const profileImage = req.file
            ? req.file.filename
            : userExist.profileImage;

        // const profileImage = req.file.filename;

        if (!userExist) {
            return res.status(401).send({
                message: "User not found",
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const userUpdate = {
            name,
            password: hashedPassword,
            profileImage,
            latitude,
            longitude,
        };
        if (req.file) {
            userUpdate.profileImage = profileImage;

            deleteImage(userExist.profileImage);
        }
        if (password) {
            userUpdate.password = await bcrypt.hash(password, 10);
        }

        const updatedData = await User.findByIdAndUpdate(
            req.userId,
            userUpdate
        );

        return res.status(200).send({
            data: updatedData,
            message: "User data updated successfully ",
        });
    } catch (error) {
        console.log(error);

        res.status(500).send({ message: `${error.message}` });
    }
};

// Delete user
exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).send({ message: "User not found" });
        }

        res.status(200).send({
            data: deletedUser,
            message: "User deleted successfully",
        });
    } catch (error) {
        res.status(500).send({ message: `${error.message}` });
    }
};

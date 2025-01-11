const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
    class: { type: String, required: true },
    subject: { type: String, required: true },
    board: { type: String, required: true },
    latitude: { type: Number },
    longitude: { type: Number },
});

module.exports = mongoose.model("Course", courseSchema);

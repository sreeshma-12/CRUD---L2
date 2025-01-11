const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });
const express = require("express");
const cookie = require("cookie-parser");

const connectDB = require("./config/database");
const app = express();
const port = process.env.PORT;

connectDB();
app.use(express.json());
app.use(cookie());
app.use("/uploads", express.static("uploads"));
const userRoutes = require("./routes/user.route");
const courseRoutes = require("./routes/course.route");

app.use("/api/user", userRoutes);
app.use("/api/course", courseRoutes);

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});

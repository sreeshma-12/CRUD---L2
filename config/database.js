const mongoose = require("mongoose");
const connectDB = () => {
    mongoose
        .connect(process.env.DB_URL)
        .then((data) => {
            console.log("database connected", data.connection.host);
        })
        .catch((err) => {
            console.log("database error", err);
        });
};
module.exports = connectDB;

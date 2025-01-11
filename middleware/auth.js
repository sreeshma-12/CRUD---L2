const jwt = require("jsonwebtoken");
exports.authorization = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");

        if (authHeader && authHeader.startsWith("Bearer ")) {
            const token = authHeader.slice(7);
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.userId = decode.userId;
            next();
        } else {
            res.status(400).send({
                message: "Authorization token missing or incorrect format",
            });
        }
    } catch (error) {
        res.status(500).send({ message: "Internal server error" });
    }
};

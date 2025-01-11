const sendToken = (token, res) => {
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };
    res.status(200)
        .cookie("token", token, options)
        .send({ message: "login success..." });
};
module.exports = sendToken;

const sendToken = (user, statusCode, res) => {
    // creating jwt token
    const token = user.getJwtToken();

    // setting cookie
    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };

    res.cookie('token', token, options).status(statusCode).json({
        success: true,
        token,
        user,
    });
};

module.exports = sendToken;

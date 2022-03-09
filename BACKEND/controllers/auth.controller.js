 const { promisify } = require('util');

const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

const catchAsync = require('../helpers/catchAsync');

const AppError = require('../helpers/appError');

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

exports.signup = async (req, res, next) => {

    try {

        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
            role: req.body.role
        });
    
        const token = signToken(newUser._id);
    
        res.status(201).json({
            status: "success",
            token,
            user: newUser
        });

    } catch(err) {
        res.send(err)
    }

};

exports.login = async (req, res, next) => {

    try {

        const { email, password } = req.body;

        if(!email && !password) {
            return res.status(400).json({
                status: "fail",
                message: "Please provide email and password!"
            });
        }

        const user = await User.findOne({ email }).select('+password');

        if(!user || !(await user.correctPassword(password, user.password))) {
            return res.status(401).json({
                status: "fail",
                message: "Incorrect email or password"
            });
        }

        const token = signToken(user._id);

        res.status(200).json({
            status: "success",
            token
        });

    } catch (err) {
        return res.status(404).json({
            status: "fail",
            message: "Requested Fail !!"
        });
    }

};

exports.protect = catchAsync(async (req, res, next) => {

    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token) {
        return res.status(401).json({
            status: "fail",
            message: "You are not logged in! Please log in to get access"
        });
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);

    if(!currentUser) {
        return res.status(401).json({
            status: "fail",
            message: "The user belonging to this token does no longer exist."
        });
    }

    if(currentUser.changedPasswordAfter(decoded.iat)) {
        return res.status(401).json({
            status: "fail",
            message: "User recently changed password! Please log in again."
        });
    }
    req.user = currentUser;

    next();

});

exports.restrictTo = (...roles) => {

    return (req, res, next) => {

        if(!roles.includes(req.user.role)) {
            return next(new AppError('You do not have permission to perform this action', 403));
            // return res.status(403).json({
            //     status: "fail",
            //     message: "You do not have permission to perform this action"
            // });
        }

        next();
    };
}


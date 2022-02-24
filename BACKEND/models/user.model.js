const mongoose = require('mongoose');

const validator = require('validator');

const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A User must have a name']
    },
    email: {
        type: String,
        required: [true, 'A User must have an email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide an email !!']
    },
    role: {
        type: String,
        enum: ['user', 'owner', 'admin'],
        default: 'user'
    },
    image: {
        type: String
    },
    password: {
        type: String,
        required: [true, 'A user must have a passowrd'],
        minlength: 8,
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            validator: function(e) {
                return e === this.password;
            },
            message: 'Passwords are not the same !'
        }
    },
    passwordChangedAt: Date,
});

const Users = mongoose.model('users', userSchema);

userSchema.pre('save', async function(next) {

    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);

    this.passwordConfirm = undefined;
    next();

});

userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
}

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {

    const changeDateToTimestamp = parseInt(this.passwordChangedAt / 1000, 10);
    if(this.passwordChangedAt) {
        return JWTTimestamp < changeDateToTimestamp;  
    }

    return false;
}

const User = mongoose.model('user', userSchema);

module.exports = User;

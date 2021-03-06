/*
 * Author(s):
 * Leo Cheung
 */

// Required packages
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// User schema - Basic information
const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Export the module
module.exports = User = mongoose.model('users', UserSchema)
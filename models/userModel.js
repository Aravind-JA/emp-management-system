const mongoose = require('mongoose');

// Schema for the user record
const userSchema = mongoose.Schema({
    email: String,
    password: String,
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);
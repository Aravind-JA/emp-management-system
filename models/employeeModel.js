const mongoose = require('mongoose');

// Schema for the employee record
const employeeSchema = mongoose.Schema({
    name: String,
    email: String,
    phone: Number
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("employee", employeeSchema);
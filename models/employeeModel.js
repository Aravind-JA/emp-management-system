const mongoose = require('mongoose');

// Schema for the employee record
const employeeSchema = mongoose.Schema({
    // user_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref:"User"
    // },
    salutation: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: Number,
    dob: Date,
    gender: String,
    qualifications: String,
    address: String,
    country: String,
    state: String,
    city: String,
    pin:Number
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("employee", employeeSchema);
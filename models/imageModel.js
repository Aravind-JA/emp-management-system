const mongoose = require('mongoose');

const avatarSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
    },
    avatar: {
        type: String,
        required:true,
    }
},
{
    timestamps: true,
});

module.exports = mongoose.model("avatar",avatarSchema);
const asyncHandler = require('express-async-handler');
const multer = require('multer');
const Avatar = require('../models/imageModel');

// Set up multer storage and file filter
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed.'));
    }
};

const upload = multer({ storage, fileFilter });

const postAvatar = asyncHandler(async (req, res) => {
    const user_id = req.params.id;

    upload.single('avatar')(req, res, async (err) => {
        if (err) {
            res.status(200);
            throw new Error(err);
        }

        const avatar = req.file;

        if (!avatar) {
            res.status(400);
            throw new Error("No files selected.");
        }
        const newAvatar = await Avatar.create({
            user_id,
            avatar: req.file.path,
        });

        res.status(201).json(newAvatar);
    });
});

const getAvatar = asyncHandler(async (req, res) => {
    const user_id = req.params.id;

    const avatar = await Avatar.findOne({ user_id });

    if (!avatar) {
        res.status(400);
        throw new Error("No images found!!");
    }

    const imagePath = avatar.avatar;

    res.status(200).json(imagePath);
});


module.exports = { postAvatar, getAvatar };

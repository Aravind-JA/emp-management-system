const asyncHandler = require("express-async-handler");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// function to register new users
const registerUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!")
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(401);
        throw new Error("Already registered user.");
    }

    //hash password 
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    const user = await User.create({
        email,password: hashedPassword
    });

    console.log(`User created ${user}`);

    if (user) {
        res.status(200).json({ _id: user.id, email: user.email,password:user.password });
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }
});

//function to login a user
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory.")
    }
    const user = await User.findOne({ email });
    // compare hashedPassword
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
            {
                user: {
                    email: user.email,
                    password: user.password,
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1h" }
        );
        res.status(200).json({ accessToken });
    } else {
        res.status(400);
        throw new Error("Incorrect email or Password");
    }
});

//function to dispay current user
const currentUser = asyncHandler(async (req, res) => {
    res.json( req.user);
});

module.exports = { registerUser, loginUser, currentUser };
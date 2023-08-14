const express = require('express');
const { registerUser,loginUser,currentUser } = require('../controllers/userController');
const validateToken = require('../middleware/userValidation');

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/current").get(validateToken,currentUser);

module.exports = router;
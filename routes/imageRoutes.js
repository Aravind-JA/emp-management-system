const express = require('express');
const { postAvatar, getAvatar } = require('../controllers/imageController');
const router = express.Router();

router.route("/:id/avatar").post(postAvatar).get(getAvatar);

module.exports = router;
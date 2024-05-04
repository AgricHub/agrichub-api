const express = require('express');
const router = express.Router();
const { createUser } = require('../controllers/create-user');

router.post('/users', createUser);

module.exports = router;

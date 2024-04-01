const express = require('express');
const { createUser, companySignIn, createUserTesting } = require('../controllers/userController');
const router = express.Router();

router.post('/create-company', createUser);
// router.post('/create-company-testing', createUserTesting);
router.post('/company-signin', companySignIn);

module.exports = router;

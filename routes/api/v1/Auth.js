// Import necessary modules and functions
const express = require('express');
const AuthControl = require('../../../controllers/Auth');
const { checkSchema } = require('express-validator');

const router = express.Router();

const AuthSchema = require('../../../schema-validation/Auth');
// Define route for user registration
// This route is used to create a new user (patient, doctor, or admin)
router.post('/signup',   checkSchema(AuthSchema.signup), AuthControl.signup);

// Define route for user login
// This route allows users to authenticate and receive a JWT token
router.post('/login', checkSchema(AuthSchema.login), AuthControl.login);

module.exports = router;

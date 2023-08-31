const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

// create a User using: POST "/api/auth/createUser" no login required
router.post('/createUser', [
    body('name', "Enter a valid name").isLength({ min: 3 }),
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password must be at least 5 characters").isLength({ min: 5 })
], async (req, res) => {
    // If there are errors, return bad request and the errors

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ error: "This email already exists" });
        }

        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        res.json({ message: "User created successfully" });
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email === 1) {
            // Duplicate email error
            res.status(400).json({ message: "Email already in use" });
        } else {
            // Other errors
            res.status(500).json({ message: "An error occurred", error: error.message });
        }
    }
});

module.exports = router;

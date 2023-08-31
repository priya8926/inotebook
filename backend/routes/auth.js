
const express = require('express')
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');


// create a user using:POST "/api/auth/." doesn't require auth
router.post('/', [
body('name',"Enter a valid name").isLength({min :3}),
body('email',"enter a valid email").isEmail(),
body('password',"password must be atleast 5 character").isLength({min : 5})
], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    try {
    await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password 
    });
    res.json({ message: "User created successfully" , message : error.message});
} catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email === 1) {
        // Duplicate email error
        res.status(400).json({ message: "Email already in use" });
    } else {
        // Other errors
        res.status(500).json({ message: "An error occurred" });
    }
}

})
module.exports = router;
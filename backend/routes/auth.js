const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECRET = "priyaisagoodgirl";

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

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // create a new user
        const newUser = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email
        });
        const data = {
            newUser :{
                id : newUser.id
            }
        }
        const authToken = jwt.sign(data , JWT_SECRET)
        // res.json(newUser)
        res.json({authToken})
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


// Authenticate a User using: POST "/api/auth/login" no login required
router.post('/login', [
    body('email', "Enter a valid email").isEmail(),
    body('password', "password can not be blank").exists(),
], async (req, res) => {
    
     // If there are errors, return bad request and the errors
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
     }
     const{email,password} = req.body;
     try{
        let  user= await User.findOne({email});
        if(!user ){
            return res.status(400).json({error : "enter correct login details"});
        }

        const passwordCompare = await bcrypt.compare(password , user.password);
        if(!passwordCompare){
            return res.status(400).json({error : "enter correct login details"});
        }
        const payload = {
            user :{
                id : User.id
            }
        }
        const authtoken = jwt.sign(payload , JWT_SECRET);
        res.json({token : authtoken})
     }
     catch(error){
           console.error(error.message);
           res.status(500).send("Internal server error");
     }
})
module.exports = router;

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "priyaisagoodgirl";

//  router 1 : create a User using: POST "/api/auth/createUser" no login required
router.post('/createUser', [
    body('name', "Enter a valid name").isLength({ min: 3 }),
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password must be at least 5 characters").isLength({ min: 5 })
], async (req, res) => {
    let success = false;
    // If there are errors, return bad request and the errors

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let existingUser = await User.findOne({ success,email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ success, error: "This email already exists" });
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
        success = true;
        res.json({success,authToken})
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


// Route 2: Authenticate a User using: POST "/api/auth/login" no login required
router.post('/login', [
    body('email', "Enter a valid email").isEmail(),
    body('password', "password can not be blank").exists(),
], async (req, res) => {
    let success = false;
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
            success = false;
            return res.status(400).json({ success , error : "enter correct login details"});
        }
        const data = {
            user :{
                id : user.id
            }
        }
        const authtoken = jwt.sign(data , JWT_SECRET);
        success = true;
        res.json({ success , authtoken})
     }
     catch(error){
           console.error(error.message);
           res.status(500).send("Internal server error");
     }
})

// Route 3: Get loggedin user Details using : POST "/api/auth/getuser" . login required
router.post('/getuser' ,fetchuser, async(req,res) =>{

try {
    userId = req.user.id ; 
    const user = await User.findById(userId).select("-password");
     res.send(user);
} catch(error){
    console.error(error.message);
   return  res.status(500).send("Internal server error");
}
})
module.exports = router;

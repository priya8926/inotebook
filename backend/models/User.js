<<<<<<< HEAD
const mongoose = require('mongoose');

const UserSchema = new Schema({
    name : {
        type:String,
        required : true
    },
    email :{
        type : String,
        required : true,
        unique : true
    },
    password :{
        type : String ,
        required : true//password is a string
    },
    date : {
        type : Date,
        default : Date.now
    }

})

=======
const mongoose = require('mongoose');

const UserSchema = new Schema({
    name : {
        type:String,
        required : true
    },
    email :{
        type : String,
        required : true,
        unique : true
    },
    password :{
        type : String ,
        required : true//password is a string
    },
    date : {
        type : Date,
        default : Date.now
    }

})

>>>>>>> 14ac03c (module and routes files are added)
module.exports = mongoose.model('user' , UserSchema);
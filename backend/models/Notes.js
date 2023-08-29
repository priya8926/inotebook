<<<<<<< HEAD
const mongoose = require('mongoose');

const NoteSchema = new Schema({
    title : {
        type:String,
        required : true
    },
    desciption : {
        type : String,
        required : true,
    },
    tag :{
        type : String ,
        default : 'General'
    },
    date : {
        type : Date,
        default : Date.now
    }

})

=======
const mongoose = require('mongoose');

const NoteSchema = new Schema({
    title : {
        type:String,
        required : true
    },
    desciption : {
        type : String,
        required : true,
    },
    tag :{
        type : String ,
        default : 'General'
    },
    date : {
        type : Date,
        default : Date.now
    }

})

>>>>>>> 14ac03c (module and routes files are added)
module.exports = mongoose.model('user' , NoteSchema);
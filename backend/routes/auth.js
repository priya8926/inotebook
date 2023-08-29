<<<<<<< HEAD
const express = require('express')
const router =  express.Router();

router.get('/' , (req , res) =>{
    obj = {
        a : 'this',
        number : 34
    }
   res.json(obj)
})
=======
const express = require('express')
const router =  express.Router();

router.get('/' , (req , res) =>{
    obj = {
        a : 'this',
        number : 34
    }
   res.json(obj)
})
>>>>>>> 14ac03c (module and routes files are added)
module.exports = router;
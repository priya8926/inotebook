const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

// Router 1: Fetch all notes using: GET "/api/notes/fetchallnotes" no login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
   try {
      const notes = await Note.find({ user: req.user.id }).maxTimeMS(20000); // 20 seconds

      // const notes = await Note.find({ user: req.user.id });
      res.json(notes);
   } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
   }
});

// Router 2: Add a new Note using: POST "/api/notes/addnote" no login required
router.post('/addnote', fetchuser, [
   body('title', "Enter a valid title").isLength({ min: 3 }),
   body('description', "Description must be at least 5 characters").isLength({ min: 5 })
], async (req, res) => {
   try {
      const { title, description, tag } = req.body;
      //if there are errors, return bad request and the error 
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
         title, description, tag, user: req.user.id
      });
      const savedNote = await note.save();
      res.json(savedNote);
      // console.log(req.body);

   } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
   }
});

// Router 3:Update an existing Note using: POST "/api/notes/addnote" no login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
try {
   const { title, description, tag } = req.body;
   //Create a newNote object
   const newNote = {};
   if(title){newNote.title = title};
   if(description){newNote.description = description};
   if(tag){newNote.tag = tag};

   // find the note to be updated and update it 
   let note = await Note.findById(req.params.id);
   if(!note ){
       return res.status(404).send("Not Found")
   }
   if(note.user.toString() !== req.user.id){
      return res.status(401).send("Not Allowed")
   }
   note = await Note.findByIdAndUpdate(req.params.id , {$set : newNote} , {new:true}) 
   res.json({note})
} catch (error) {
   console.error(error.message);
   res.status(500).send("Internal server error");
}
})

/// Router 4:Delete an existing Note using: DELETE "/api/notes/deletenote" no login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
try {
   const { title, description, tag } = req.body;
   //Create a newNote object
   const newNote = {};
   if(title){newNote.title = title};
   if(description){newNote.description = description};
   if(tag){newNote.tag = tag};

   // find the note to be delete and deleted it 
   let note = await Note.findById(req.params.id);
   if(!note ){
       return res.status(404).send("Not Found")
   }
   //Allow deletion if user own this note
   if(note.user.toString() !== req.user.id){
      return res.status(401).send("Not Allowed")
   }
   note = await Note.findByIdAndDelete(req.params.id) 
   res.json({"sucess" : "Note has been deleted sucessfully" , note:note})
} catch (error) {
   console.error(error.message);
   res.status(500).send("Internal server error");
}
})
module.exports = router;

const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

// Router 1: Fetch all notes using: GET "/api/auth/fetchallnotes" no login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
   try {
      const notes = await Note.find({ user: req.user.id });
      res.json(notes);
   } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
   }
});

// Router 2: Add a new note using: POST "/api/auth/addnote" no login required
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
      console.log(req.body);

   } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
   }
});

module.exports = router;

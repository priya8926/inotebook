import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const notesInitial = [
    {
      "_id": "6507120cf61bthnf49535700b48",
      "user": "6506fa8c263bbc9adfe0ef05",
      "title": "my title",
      "description": "eat sleep code repeat",
      "tag": "coders",
      "date": "2023-09-17T14:49:48.025Z",
      "__v": 0
    },
    {
      "_id": "65071227f6we1bf49535700b4b",
      "user": "6506fa8c263bbc9adfe0ef05",
      "title": "my title",
      "description": "eat sleep code repeat ok...",
      "tag": "coders",
      "date": "2023-09-17T14:50:15.345Z",
      "__v": 0
    },
    {
      "_id": "6507120cf6edfsr1bf49535700b48",
      "user": "6506fa8c263bbc9adfe0ef05",
      "title": "my title",
      "description": "eat sleep code repeat",
      "tag": "coders",
      "date": "2023-09-17T14:49:48.025Z",
      "__v": 0
    },
    {
      "_id": "65071227f6sd1bf49535700b4b",
      "user": "6506fa8c263bbc9adfe0ef05",
      "title": "my title",
      "description": "eat sleep code repeat ok...",
      "tag": "coders",
      "date": "2023-09-17T14:50:15.345Z",
      "__v": 0
    },
    {
      "_id": "6507120cf61rhbf49535700b48",
      "user": "6506fa8c263bbc9adfe0ef05",
      "title": "my title",
      "description": "eat sleep code repeat",
      "tag": "coders",
      "date": "2023-09-17T14:49:48.025Z",
      "__v": 0
    },
    {
      "_id": "65071227f23461bf49535700b4b",
      "user": "6506fa8c263bbc9adfe0ef05",
      "title": "my title",
      "description": "eat sleep code repeat ok...",
      "tag": "coders",
      "date": "2023-09-17T14:50:15.345Z",
      "__v": 0
    },
    {
      "_id": "6507120cf63541bf49535700b48",
      "user": "6506fa8c263bbc9adfe0ef05",
      "title": "my title",
      "description": "eat sleep code repeat",
      "tag": "coders",
      "date": "2023-09-17T14:49:48.025Z",
      "__v": 0
    },
    {
      "_id": "65071227f61bddff49535700b4b",
      "user": "6506fa8c263bbc9adfe0ef05",
      "title": "my title",
      "description": "eat sleep code repeat ok...",
      "tag": "coders",
      "date": "2023-09-17T14:50:15.345Z",
      "__v": 0
    }
  ]
  const [notes, setNotes] = useState(notesInitial)
  
  //Add a Note
  const addNote = (title, description , tag) => {
    console.log('Adding a new note')
   const newNote = {
      "_id": "65071227f61bddff49535700b4b",
      "user": "6506fa8c263bbc9adfe0ef05",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2023-09-17T14:50:15.345Z",
      "__v": 0
    };
    // setNotes(notes.concat(notes))
    setNotes([...notes , newNote])
  }
  //delete a Note
  const deleteNote = (id) => {
    console.log("delete a note with id" + id)
    const newNote = notes.filter((notes)=>{return notes._id !== id})
    setNotes(newNote)

  }
  //Edit a Note
  const editNote = () => {

  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;
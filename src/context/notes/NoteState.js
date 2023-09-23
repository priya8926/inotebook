import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)


  //Get all  Note
  const getNotes = async () => {
    //todo: API call
    //API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUwNmZhOGMyNjNiYmM5YWRmZTBlZjA1In0sImlhdCI6MTY5NDk1NjE5Mn0.x36pO4oX6EzanQj9BJbR9ow6jfT_yx9D2SxP0RpGCKU'
      }
    });
    const json = await response.json();
    console.log(json);
    setNotes(json)

  }
  //Add a Note
  const addNote = async (title, description, tag) => {
    //todo: API call
    //API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUwNmZhOGMyNjNiYmM5YWRmZTBlZjA1In0sImlhdCI6MTY5NDk1NjE5Mn0.x36pO4oX6EzanQj9BJbR9ow6jfT_yx9D2SxP0RpGCKU'
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    console.log(json)

    console.log('Adding a new note');
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
    setNotes([...notes, newNote])
  }
  //delete a Note
  const deleteNote = async (id) => {
    //todo: API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUwNmZhOGMyNjNiYmM5YWRmZTBlZjA1In0sImlhdCI6MTY5NDk1NjE5Mn0.x36pO4oX6EzanQj9BJbR9ow6jfT_yx9D2SxP0RpGCKU'
      },
    });
    const json = await response.json();
    console.log(json);
    const newNote = notes.filter((notes) => { return notes._id !== id })
    setNotes(newNote)

  }
  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUwNmZhOGMyNjNiYmM5YWRmZTBlZjA1In0sImlhdCI6MTY5NDk1NjE5Mn0.x36pO4oX6EzanQj9BJbR9ow6jfT_yx9D2SxP0RpGCKU'
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    console.log(json)

    let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState;
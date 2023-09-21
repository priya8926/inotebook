import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';

const Notes = () => {
    const context = useContext(noteContext);
    const { notes, addNote} = context;
    return (
        <>
        <AddNote/>
        <div className="row my-3">
            <h3>Your Notes</h3>
            {notes.map((notes) => {
                return <Noteitem key ={notes._id} notes = {notes}/>
            })}
        </div>
        </>
    )
}

export default Notes

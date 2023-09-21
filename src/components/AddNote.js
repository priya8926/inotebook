import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [notes, setNotes] = useState({ title: "", description: "", tag: "defaults" })
    const handleClick = (e) => {
        e.preventDefault(); // page reload ni thay ena mate
        addNote(notes.title , notes.description , notes.tag);
    }
    const onChange = (e) => {
        setNotes({ ...notes, [e.target.name]: e.target.value })
    }
    return (
        <div className="container my-3">
            <h3>Add a Note</h3>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={onChange} />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
            </form>
        </div>
    )
}

export default AddNote;


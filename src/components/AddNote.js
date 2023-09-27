import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [notes, setNotes] = useState({ title: "", description: "", tag: "" })
    
    const handleClick = (e) => {
        e.preventDefault(); // page reload ni thay ena mate
        addNote(notes.title , notes.description , notes.tag);
        setNotes({ title: "", description: "", tag: "" });
        props.showAlert("Added successfully" , "success")
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
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange}minLength={5} required value={notes.title}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={onChange} minLength={5} required value={notes.description}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} minLength={5} required value={notes.tag}/>
                </div>
                <button disabled={notes.title.length<5 || notes.description.length<5} type="button" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote;


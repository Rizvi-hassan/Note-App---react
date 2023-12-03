import React, {useState, useContext} from 'react'
import noteContext from '../contexts/notes/noteContext'

const AddNote = () => {

    const context = useContext(noteContext);
    const [note, setNote] = useState({title:"", description:"", tag:"public"})

    const { addNote } = context;
    
    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
    }

    const onchange = (e) =>{
        setNote({...note, [e.target.name]: e.target.value})
    }
    return (
        <div className="container my-3">
            <h2>Add New Note</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onchange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={onchange} />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Save</button>
            </form>
            <hr />
        </div>
    )
}

export default AddNote
